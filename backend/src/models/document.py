from pydantic import BaseModel
from typing import Optional, Dict, Any, List

class DocumentModel(BaseModel):
    id: Optional[str] = None
    title: str
    content: str
    source: Optional[str] = None
    embedding: Optional[List[float]] = None
    source_metadata: Optional[Dict[str, Any]] = None