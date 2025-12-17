from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any, Optional
from pydantic import BaseModel
import uuid
from datetime import datetime

from src.models.query import QueryModel
from src.models.response import ResponseModel
from src.services.rag_service import rag_service
from src.services.conversation_service import conversation_service
from src.logging_config import logger

router = APIRouter()

class ChatRequest(BaseModel):
    query: str
    conversation_id: str
    selected_text: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    conversation_id: str
    source_documents: List[str]
    confidence_score: Optional[float] = None

class ConversationResponse(BaseModel):
    conversation_id: str
    status: str

class ResetRequest(BaseModel):
    conversation_id: str

class SuccessResponse(BaseModel):
    success: bool
    message: str

class ErrorResponse(BaseModel):
    error: str
    message: str

@router.post("/send")
async def send_message(chat_request: ChatRequest):
    """
    Submit a query to the RAG system and receive a response based on book content
    """
    try:
        logger.info(f"Received query: {chat_request.query[:50]}... for conversation {chat_request.conversation_id}")
        
        # Add user message to conversation
        conversation_service.add_message_to_conversation(
            chat_request.conversation_id, 
            "user", 
            chat_request.query
        )
        
        # Prepare the context for RAG service
        context = {
            "selected_text": chat_request.selected_text,
            "conversation_id": chat_request.conversation_id
        }
        
        # Get response from RAG service
        response_text, source_docs, confidence = await rag_service.get_answer(
            query=chat_request.query,
            context=context
        )
        
        # Add assistant response to conversation
        conversation_service.add_message_to_conversation(
            chat_request.conversation_id, 
            "assistant", 
            response_text
        )
        
        # Create response object
        response = ChatResponse(
            response=response_text,
            conversation_id=chat_request.conversation_id,
            source_documents=source_docs,
            confidence_score=confidence
        )
        
        logger.info(f"Response generated for conversation {chat_request.conversation_id}")
        return response
        
    except Exception as e:
        logger.error(f"Error processing chat request: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/start-conversation")
async def start_conversation():
    """
    Initialize a new conversation session
    """
    try:
        # Create a new conversation
        new_conversation = conversation_service.create_conversation()
        
        response = ConversationResponse(
            conversation_id=new_conversation.id,
            status="started"
        )
        
        logger.info(f"Started new conversation: {new_conversation.id}")
        return response
        
    except Exception as e:
        logger.error(f"Error starting conversation: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/reset-conversation")
async def reset_conversation(reset_request: ResetRequest):
    """
    Clear the conversation history and start fresh
    """
    try:
        success = conversation_service.reset_conversation(reset_request.conversation_id)
        
        if success:
            response = SuccessResponse(
                success=True,
                message="Conversation reset successfully"
            )
            logger.info(f"Conversation reset: {reset_request.conversation_id}")
            return response
        else:
            raise HTTPException(status_code=404, detail="Conversation not found")
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error resetting conversation: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))