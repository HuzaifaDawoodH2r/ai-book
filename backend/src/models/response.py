from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ResponseModel(BaseModel):
    id: Optional[str] = None
    text: str
    query_id: str
    source_documents: List[str]
    timestamp: Optional[datetime] = None
    confidence_score: Optional[float] = None