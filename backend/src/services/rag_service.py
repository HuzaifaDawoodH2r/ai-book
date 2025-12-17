import asyncio
from typing import List, Tuple, Optional
import time
from src.services.embedding_service import embedding_service
from src.services.document_service import document_service
from src.logging_config import logger
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

class RAGService:
    def __init__(self):
        self.top_k = 5  # Number of documents to retrieve
        self.openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    async def get_answer(self, query: str, context: dict = None) -> Tuple[str, List[str], Optional[float]]:
        """
        Get an answer to a query based on book content using RAG

        Args:
            query: The user's question
            context: Additional context like selected text or conversation ID

        Returns:
            Tuple of (response_text, source_documents, confidence_score)
        """
        start_time = time.time()

        try:
            selected_text = context.get('selected_text', None) if context else None
            conversation_id = context.get('conversation_id', None) if context else None

            # If selected text is provided, prioritize it over vector search
            if selected_text:
                logger.info(f"Using selected text for query: {query[:50]}...")
                # Use the selected text as the primary context
                response_text = await self._generate_response_with_context(query, selected_text)
                duration = time.time() - start_time
                logger.info(f"RAG response generated in {duration:.2f}s for selected_text query")
                return response_text, ["selected_text"], 0.9  # High confidence for selected text

            # Perform vector search to find relevant documents
            logger.info(f"Performing vector search for query: {query[:50]}...")
            documents = await document_service.search_documents(query, top_k=self.top_k)

            # If no documents found, return the specific response
            if not documents:
                logger.warning(f"No relevant documents found for query: {query[:50]}...")
                duration = time.time() - start_time
                logger.info(f"RAG response generated in {duration:.2f}s (no docs found)")
                return "This information is not available in this book.", [], 0.0

            # Build context from retrieved documents
            context_texts = [doc['content'] for doc in documents]
            context_str = "\n\n".join(context_texts)

            # Generate response based on the context
            response_text = await self._generate_response_with_context(query, context_str)

            # Extract document IDs as source documents
            source_docs = [doc['id'] for doc in documents]

            # For now, return a default confidence score
            # In a real implementation, we'd calculate this based on various factors
            confidence_score = min(0.9, len(documents) * 0.2)  # Simple heuristic

            duration = time.time() - start_time
            logger.info(f"Generated response for query: {query[:50]}... in {duration:.2f}s")

            # Add performance warning if response took too long
            if duration > 5.0:
                logger.warning(f"Response time exceeded 5 seconds: {duration:.2f}s for query: {query[:50]}...")

            return response_text, source_docs, confidence_score

        except Exception as e:
            duration = time.time() - start_time
            logger.error(f"Error in RAG service after {duration:.2f}s: {str(e)}")
            return "An error occurred while processing your request.", [], 0.0

    async def _generate_response_with_context(self, query: str, context: str) -> str:
        """
        Generate a response using the provided context
        """
        try:
            # Build the prompt to ensure the response is grounded in the provided context
            prompt = f"""
            You are an AI assistant that answers questions based only on the provided context from a book.
            Your response must be based solely on the information provided in the context.
            If the answer is not available in the context, respond exactly: "This information is not available in this book."

            Context:
            {context}

            Question: {query}

            Answer:
            """

            # Use OpenAI to generate the response
            response = self.openai_client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "system",
                        "content": "You are an AI assistant that answers questions based only on provided context from a book. Do not make up information. If the information is not in the provided context, respond with exactly: 'This information is not available in this book.'"
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                max_tokens=500,
                temperature=0.1  # Low temperature for factual responses
            )

            answer = response.choices[0].message.content.strip()

            # Validate that the response aligns with book-grounded answers requirement
            if not self._is_response_from_context(answer, context):
                logger.warning(f"Generated response may not be grounded in provided context: {query[:50]}...")
                return "This information is not available in this book."

            return answer

        except Exception as e:
            logger.error(f"Error generating response with context: {str(e)}")
            return "An error occurred while generating the response."

    def _is_response_from_context(self, response: str, context: str) -> bool:
        """
        Verify that the response is based on the provided context.
        This is a simplified check - in a more sophisticated implementation,
        we would use semantic similarity or other advanced techniques.
        """
        # If the specific response is returned, it's valid
        if "This information is not available in this book." == response:
            return True

        # Check if the response contains content that's likely from the context
        # This is a basic check - in a real implementation, we'd use embeddings or NLP techniques
        response_lower = response.lower()
        context_lower = context.lower()

        # Tokenize the response into sentences or key phrases
        import re
        # Split the response into sentences or phrases
        phrases = re.split(r'[.!?;]', response)

        # Count how many phrases or parts of the response appear in the context
        matching_parts = 0
        total_parts = len([p for p in phrases if p.strip()])

        for phrase in phrases:
            phrase = phrase.strip()
            if len(phrase) > 10:  # Only check meaningful phrases
                # Check if this phrase appears in the context
                if phrase.lower() in context_lower:
                    matching_parts += 1
                # Also check for key terms from the phrase
                elif any(term in context_lower for term in phrase.split() if len(term) > 4):
                    matching_parts += 1

        # If a significant portion of the response matches the context, consider it valid
        # This is a simple heuristic; a more sophisticated implementation would use semantic similarity
        if total_parts > 0 and (matching_parts / total_parts) > 0.3:  # 30% overlap threshold
            return True

        # Additional check: if specific named entities or facts in the response
        # also appear in the context, it's likely grounded in the context
        import string
        # Extract potential named entities (words that start with capital letters)
        words = response.split()
        context_words = set(context.lower().split())

        entity_matches = 0
        total_entities = 0
        for word in words:
            clean_word = word.strip(string.punctuation)
            if clean_word and clean_word[0].isupper() and len(clean_word) > 2:
                total_entities += 1
                if clean_word.lower() in context_words:
                    entity_matches += 1

        if total_entities > 0 and (entity_matches / total_entities) > 0.3:  # 30% entity match threshold
            return True

        # If we can't verify it's from the context, return False to enforce book-grounded answers
        return False

# Initialize the RAG service as a singleton
rag_service = RAGService()