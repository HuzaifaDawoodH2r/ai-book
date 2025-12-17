from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class QueryModel(BaseModel):
    id: Optional[str] = None
    text: str
    conversation_id: str
    timestamp: Optional[datetime] = None
    selected_text: Optional[str] = None