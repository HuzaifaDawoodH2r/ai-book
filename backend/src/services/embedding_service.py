import os
from typing import List
from qdrant_client import QdrantClient
from qdrant_client.http import models
from qdrant_client.http.models import Distance, VectorParams
from openai import OpenAI
from dotenv import load_dotenv
from src.logging_config import logger

load_dotenv()

class EmbeddingService:
    def __init__(self):
        # Initialize OpenAI client
        self.openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

        self.qdrant_client = QdrantClient(
            url=os.getenv("QDRANT_URL"),
            api_key=os.getenv("QDRANT_API_KEY")
        )
        self.collection_name = "book_content"
        self.vector_size = 1536  # OpenAI's embedding dimension
        self.distance = Distance.COSINE

        # Initialize the collection if it doesn't exist
        self._initialize_collection()

    def _initialize_collection(self):
        """Initialize the Qdrant collection for storing document embeddings"""
        try:
            # Check if collection exists
            self.qdrant_client.get_collection(self.collection_name)
            logger.info(f"Collection '{self.collection_name}' already exists")
        except:
            # Collection doesn't exist, create it
            self.qdrant_client.create_collection(
                collection_name=self.collection_name,
                vectors_config=VectorParams(size=self.vector_size, distance=self.distance)
            )
            logger.info(f"Created new collection '{self.collection_name}'")

    def generate_embedding(self, text: str) -> List[float]:
        """Generate embedding for the given text using OpenAI"""
        try:
            response = self.openai_client.embeddings.create(
                input=text,
                model="text-embedding-ada-002"
            )
            return response.data[0].embedding
        except Exception as e:
            logger.error(f"Error generating embedding: {e}")
            raise e

    def store_document_embedding(self, doc_id: str, content: str, metadata: dict = None) -> bool:
        """Store document content and its embedding in Qdrant"""
        try:
            embedding = self.generate_embedding(content)

            self.qdrant_client.upsert(
                collection_name=self.collection_name,
                points=[
                    models.PointStruct(
                        id=doc_id,
                        vector=embedding,
                        payload={
                            "content": content,
                            "metadata": metadata or {}
                        }
                    )
                ]
            )
            logger.info(f"Stored embedding for document {doc_id}")
            return True
        except Exception as e:
            logger.error(f"Error storing document embedding: {e}")
            return False

    def search_similar_documents(self, query: str, top_k: int = 5) -> List[dict]:
        """Search for similar documents based on the query"""
        try:
            query_embedding = self.generate_embedding(query)

            results = self.qdrant_client.search(
                collection_name=self.collection_name,
                query_vector=query_embedding,
                limit=top_k
            )

            # Extract and return relevant information
            documents = []
            for result in results:
                documents.append({
                    "id": result.id,
                    "content": result.payload["content"],
                    "metadata": result.payload["metadata"],
                    "score": result.score
                })

            logger.info(f"Found {len(documents)} similar documents for query")
            return documents
        except Exception as e:
            logger.error(f"Error searching for similar documents: {e}")
            return []

    def delete_document(self, doc_id: str) -> bool:
        """Delete a document from the collection"""
        try:
            self.qdrant_client.delete(
                collection_name=self.collection_name,
                points_selector=models.PointIdsList(
                    points=[doc_id]
                )
            )
            logger.info(f"Deleted document {doc_id} from collection")
            return True
        except Exception as e:
            logger.error(f"Error deleting document: {e}")
            return False

# Initialize the embedding service as a singleton
embedding_service = EmbeddingService()