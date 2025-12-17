from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from enum import Enum

class MessageRole(str, Enum):
    USER = "user"
    ASSISTANT = "assistant"

class Message(BaseModel):
    role: MessageRole
    content: str
    timestamp: datetime

class Conversation(BaseModel):
    id: str
    created_at: datetime
    updated_at: datetime
    messages: List[Message]
    user_id: Optional[str] = None
    
    class Config:
        # This allows the model to work with ORM objects
        from_attributes = True