// RAG-specific client logic
import apiClient from './apiClient';

class RagClient {
  // Send a message to the chatbot
  async sendMessage(conversationId, query, selectedText = null) {
    try {
      const response = await apiClient.post('/api/chat/send', {
        query,
        conversation_id: conversationId,
        selected_text: selectedText
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  // Start a new conversation
  async startConversation() {
    try {
      const response = await apiClient.post('/api/chat/start-conversation');
      return response.data;
    } catch (error) {
      console.error('Error starting conversation:', error);
      throw error;
    }
  }

  // Reset a conversation
  async resetConversation(conversationId) {
    try {
      const response = await apiClient.post('/api/chat/reset-conversation', {
        conversation_id: conversationId
      });
      return response.data;
    } catch (error) {
      console.error('Error resetting conversation:', error);
      throw error;
    }
  }

  // Index book content
  async indexBookContent(title, content, sourceMetadata = {}) {
    try {
      const response = await apiClient.post('/api/documents/index', {
        title,
        content,
        source_metadata: sourceMetadata
      });
      return response.data;
    } catch (error) {
      console.error('Error indexing document:', error);
      throw error;
    }
  }
}

export default new RagClient();