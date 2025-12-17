import uuid
from datetime import datetime
from typing import List, Dict, Optional
from src.models.conversation import Conversation, Message, MessageRole
from src.logging_config import logger

class ConversationService:
    def __init__(self):
        # In-memory storage for conversations (in production, use a database)
        self.conversations: Dict[str, Conversation] = {}
    
    def create_conversation(self, user_id: Optional[str] = None) -> Conversation:
        """Create a new conversation"""
        conversation_id = str(uuid.uuid4())
        new_conversation = Conversation(
            id=conversation_id,
            created_at=datetime.now(),
            updated_at=datetime.now(),
            messages=[],
            user_id=user_id
        )
        
        self.conversations[conversation_id] = new_conversation
        logger.info(f"Created new conversation: {conversation_id}")
        
        return new_conversation
    
    def get_conversation(self, conversation_id: str) -> Optional[Conversation]:
        """Get an existing conversation"""
        return self.conversations.get(conversation_id)
    
    def add_message_to_conversation(self, conversation_id: str, role: MessageRole, content: str) -> Optional[Conversation]:
        """Add a message to an existing conversation"""
        conversation = self.get_conversation(conversation_id)
        
        if not conversation:
            logger.warning(f"Attempted to add message to non-existent conversation: {conversation_id}")
            return None
        
        message = Message(
            role=role,
            content=content,
            timestamp=datetime.now()
        )
        
        conversation.messages.append(message)
        conversation.updated_at = datetime.now()
        
        logger.info(f"Added {role} message to conversation: {conversation_id}")
        return conversation
    
    def reset_conversation(self, conversation_id: str) -> bool:
        """Reset a conversation by clearing its messages"""
        conversation = self.get_conversation(conversation_id)
        
        if not conversation:
            logger.warning(f"Attempted to reset non-existent conversation: {conversation_id}")
            return False
        
        # Keep the conversation object but clear messages
        conversation.messages = []
        conversation.updated_at = datetime.now()
        
        logger.info(f"Reset conversation: {conversation_id}")
        return True
    
    def delete_conversation(self, conversation_id: str) -> bool:
        """Delete a conversation"""
        if conversation_id in self.conversations:
            del self.conversations[conversation_id]
            logger.info(f"Deleted conversation: {conversation_id}")
            return True
        else:
            logger.warning(f"Attempted to delete non-existent conversation: {conversation_id}")
            return False

# Initialize the conversation service as a singleton
conversation_service = ConversationService()