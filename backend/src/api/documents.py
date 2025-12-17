from fastapi import APIRouter, HTTPException
from typing import List
from src.models.document import DocumentModel
from src.services.document_service import DocumentService

router = APIRouter()

# Initialize document service
document_service = DocumentService()

@router.post("/index", response_model=dict)
async def index_document(document: DocumentModel):
    """
    Index book content to the vector database for RAG operations
    """
    try:
        result = await document_service.index_document(
            title=document.title,
            content=document.content,
            source_metadata=document.source_metadata
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))