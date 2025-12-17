from pydantic import BaseModel, Field
from typing import Optional, List, Dict
from datetime import datetime
from uuid import UUID, uuid4


class Query(BaseModel):
    """
    Represents a user's question or request to the chatbot
    """
    id: UUID = Field(default_factory=uuid4)
    question: str = Field(..., min_length=1, max_length=1000)
    selected_text: Optional[str] = Field(default=None, min_length=1, max_length=5000)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    session_id: UUID


class Document(BaseModel):
    """
    Represents a chunk of book content stored in the vector database
    """
    id: UUID = Field(default_factory=uuid4)
    content: str = Field(..., min_length=10, max_length=2000)
    source_file: str  # Must be a valid path within the /website/docs directory
    metadata: Dict = Field(default_factory=dict)
    embedding: Optional[List[float]] = None  # Vector for OpenAI embedding
    created_at: datetime = Field(default_factory=datetime.utcnow)


class Response(BaseModel):
    """
    Represents the chatbot's response to a user query
    """
    id: UUID = Field(default_factory=uuid4)
    content: str = Field(..., min_length=1)
    sources: List[str] = Field(default_factory=list)  # List of source document IDs
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    session_id: UUID
    query_id: UUID


class ChatSession(BaseModel):
    """
    Represents a persistent conversation session between user and chatbot
    """
    id: UUID = Field(default_factory=uuid4)
    user_id: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True


class Chunk(BaseModel):
    """
    Represents a processed segment of book content for embedding
    """
    id: UUID = Field(default_factory=uuid4)
    document_id: UUID
    content: str = Field(..., min_length=10, max_length=2000)
    start_pos: int
    end_pos: int
    chunk_index: int
    metadata: Dict = Field(default_factory=dict)