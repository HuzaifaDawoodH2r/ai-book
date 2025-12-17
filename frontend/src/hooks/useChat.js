import { useState, useEffect } from 'react';
import ragClient from '../services/ragClient';

const useChat = () => {
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Initialize conversation when component mounts
  useEffect(() => {
    const initConversation = async () => {
      try {
        const response = await ragClient.startConversation();
        setConversationId(response.conversation_id);
      } catch (error) {
        console.error('Error starting conversation:', error);
      }
    };

    initConversation();
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const sendMessage = async (text) => {
    if (!conversationId || !text.trim()) return;

    // Add user message to UI immediately
    const userMessage = {
      role: 'user',
      content: text,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Send message to backend
      const response = await ragClient.sendMessage(conversationId, text);
      
      // Add assistant response to UI
      const assistantMessage = {
        role: 'assistant',
        content: response.response,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message to UI
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetConversation = async () => {
    if (!conversationId) return;

    try {
      await ragClient.resetConversation(conversationId);
      setMessages([]);
      // Optionally start a new conversation after reset
      // const response = await ragClient.startConversation();
      // setConversationId(response.conversation_id);
    } catch (error) {
      console.error('Error resetting conversation:', error);
    }
  };

  return {
    conversationId,
    messages,
    isLoading,
    isOpen,
    toggleChat,
    closeChat,
    sendMessage,
    resetConversation
  };
};

export default useChat;