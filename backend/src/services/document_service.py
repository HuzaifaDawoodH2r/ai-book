import uuid
from typing import Dict, Any, List
from src.services.embedding_service import embedding_service
from src.logging_config import logger

class DocumentService:
    async def index_document(self, title: str, content: str, source_metadata: Dict[str, Any] = None) -> Dict[str, Any]:
        """
        Index a document by creating embeddings and storing in the vector database
        """
        # Generate a unique ID for this document
        document_id = str(uuid.uuid4())

        # Prepare metadata with source tracking
        metadata = {
            "title": title,
            "source_metadata": source_metadata or {},
            "indexed_at": str(__import__('datetime').datetime.now())
        }

        # Store the document content and its embedding
        success = embedding_service.store_document_embedding(
            doc_id=document_id,
            content=content,
            metadata=metadata
        )

        if success:
            result = {
                "document_id": document_id,
                "status": "completed",
                "chunks_indexed": 1  # For now we're treating the entire content as one chunk
            }
            logger.info(f"Successfully indexed document: {title} with ID {document_id}")
            return result
        else:
            error_msg = f"Failed to index document: {title}"
            logger.error(error_msg)
            raise Exception(error_msg)

    async def search_documents(self, query: str, top_k: int = 5) -> List[Dict[str, Any]]:
        """
        Search for documents relevant to the query with enhanced source tracking
        """
        results = embedding_service.search_similar_documents(query, top_k)

        # Enhance results with additional source tracking
        enhanced_results = []
        for result in results:
            # Include additional metadata for better source tracking
            enhanced_result = {
                "id": result["id"],
                "content": result["content"],
                "source_metadata": result["metadata"].get("source_metadata", {}),
                "title": result["metadata"].get("title", "Unknown"),
                "indexed_at": result["metadata"].get("indexed_at", "Unknown"),
                "score": result["score"]
            }
            enhanced_results.append(enhanced_result)

        logger.info(f"Found {len(enhanced_results)} documents for query")
        return enhanced_results

    async def delete_document(self, document_id: str) -> bool:
        """
        Delete a document from the index
        """
        success = embedding_service.delete_document(document_id)
        if success:
            logger.info(f"Successfully deleted document: {document_id}")
        else:
            logger.warning(f"Failed to delete document: {document_id}")
        return success

    async def get_document_by_id(self, document_id: str) -> Dict[str, Any]:
        """
        Get a specific document by its ID for source verification
        """
        # This would require a method in the embedding service to get a specific point
        # For now, we'll return a structure indicating this functionality
        # In a more complete implementation, Qdrant provides methods to retrieve specific points
        logger.info(f"Retrieving document by ID: {document_id}")
        # Note: This is a placeholder implementation
        # A full implementation would use Qdrant's retrieve methods
        return {
            "id": document_id,
            "content": "Content retrieval by ID would be implemented here",
            "metadata": {}
        }