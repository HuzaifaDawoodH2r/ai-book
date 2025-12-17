import logging
from typing import List, Optional
from qdrant_client import QdrantClient
from qdrant_client.http import models
from qdrant_client.http.models import PointStruct, Filter
from uuid import UUID
import openai
from ..config import settings
from ..models.document import Document


class VectorSearchService:
    """
    Service for handling vector search operations with Qdrant
    """
    
    def __init__(self):
        # Initialize Qdrant client
        if settings.qdrant_api_key:
            self.qdrant_client = QdrantClient(
                url=settings.qdrant_url,
                api_key=settings.qdrant_api_key
            )
        else:
            self.qdrant_client = QdrantClient(url=settings.qdrant_url)
        
        # Collection name
        self.collection_name = settings.qdrant_collection_name
        
        # Set up logging
        self.logger = logging.getLogger(__name__)
    
    def _get_embedding(self, text: str) -> List[float]:
        """
        Get embedding for a text using OpenAI
        """
        response = openai.embeddings.create(
            input=text,
            model="text-embedding-3-small"  # Using the specified model from the plan
        )
        return response.data[0].embedding
    
    async def search(self, query_text: str, top_k: int = 5, filters: Optional[Filter] = None) -> List[Document]:
        """
        Search for documents in the vector database similar to the query text
        """
        try:
            query_embedding = self._get_embedding(query_text)
            
            # Search in Qdrant
            search_results = self.qdrant_client.search(
                collection_name=self.collection_name,
                query_vector=query_embedding,
                limit=top_k,
                query_filter=filters,
                with_payload=True,
                with_vectors=False
            )
            
            documents = []
            for result in search_results:
                document_data = result.payload
                # Create Document instance from payload
                doc = Document(
                    id=UUID(result.id) if isinstance(result.id, str) else result.id,
                    content=document_data["content"],
                    source_file=document_data["source_file"],
                    metadata=document_data.get("metadata", {})
                )
                documents.append(doc)
            
            return documents
        except Exception as e:
            self.logger.error(f"Error searching vectors: {str(e)}")
            return []
    
    async def search_with_selected_text(self, selected_text: str, question: str, top_k: int = 5) -> List[Document]:
        """
        Search using both selected text and question as context
        """
        # For selected text queries, we don't need to perform vector search
        # Instead, we create a document from the selected text
        doc = Document(
            id=UUID(int=0),  # Using a placeholder UUID
            content=selected_text,
            source_file="selected_text",
            metadata={"question": question}
        )
        return [doc]
    
    async def add_document(self, content: str, source_file: str, doc_id: Optional[str] = None, metadata: Optional[dict] = None) -> str:
        """
        Add a single document to the vector database
        """
        if not metadata:
            metadata = {}
        
        try:
            # Create embedding for the content
            embedding = self._get_embedding(content)
            
            # Generate document ID if not provided
            if not doc_id:
                import uuid
                doc_id = str(uuid.uuid4())
            
            # Prepare payload
            payload = {
                "content": content,
                "source_file": source_file,
                "metadata": metadata
            }
            
            # Upsert to Qdrant
            self.qdrant_client.upsert(
                collection_name=self.collection_name,
                points=[
                    PointStruct(
                        id=doc_id,
                        vector=embedding,
                        payload=payload
                    )
                ]
            )
            
            return doc_id
        except Exception as e:
            self.logger.error(f"Error adding document: {str(e)}")
            raise
    
    async def batch_add_documents(self, documents: List[tuple]) -> List[str]:
        """
        Add multiple documents to the vector database at once
        documents: List of tuples (content, source_file, metadata)
        """
        try:
            points = []
            doc_ids = []
            
            for i, (content, source_file, metadata) in enumerate(documents):
                if not metadata:
                    metadata = {}
                
                # Create embedding for the content
                embedding = self._get_embedding(content)
                
                # Generate document ID
                doc_id = f"{source_file}_doc_{i}"
                
                # Prepare payload
                payload = {
                    "content": content,
                    "source_file": source_file,
                    "metadata": metadata
                }
                
                # Create point structure
                point = PointStruct(
                    id=doc_id,
                    vector=embedding,
                    payload=payload
                )
                
                points.append(point)
                doc_ids.append(doc_id)
            
            # Batch upsert to Qdrant
            self.qdrant_client.upsert(
                collection_name=self.collection_name,
                points=points
            )
            
            return doc_ids
        except Exception as e:
            self.logger.error(f"Error batch adding documents: {str(e)}")
            raise
    
    async def delete_document(self, doc_id: str) -> bool:
        """
        Delete a document from the vector database
        """
        try:
            self.qdrant_client.delete(
                collection_name=self.collection_name,
                points_selector=models.PointIdsList(
                    points=[doc_id]
                )
            )
            return True
        except Exception as e:
            self.logger.error(f"Error deleting document: {str(e)}")
            return False
    
    async def check_similarity(self, text1: str, text2: str) -> float:
        """
        Calculate similarity between two texts using their embeddings
        """
        try:
            emb1 = self._get_embedding(text1)
            emb2 = self._get_embedding(text2)
            
            # Calculate cosine similarity
            dot_product = sum(a * b for a, b in zip(emb1, emb2))
            magnitude1 = sum(a * a for a in emb1) ** 0.5
            magnitude2 = sum(a * a for a in emb2) ** 0.5
            
            if magnitude1 == 0 or magnitude2 == 0:
                return 0.0
            
            similarity = dot_product / (magnitude1 * magnitude2)
            return similarity
        except Exception as e:
            self.logger.error(f"Error calculating similarity: {str(e)}")
            return 0.0