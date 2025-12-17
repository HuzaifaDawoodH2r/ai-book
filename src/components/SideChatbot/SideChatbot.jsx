import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from '@docusaurus/router';
import { useThemeConfig } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { storageUtil } from '@site/src/utils/storage';
import './SideChatbot.css';

/**
 * SideChatbot component
 * A floating chat interface that appears on every page of the Physical AI Book
 */
export default function SideChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const location = useLocation();

  // Load chat history from localStorage when component mounts
  useEffect(() => {
    const chatHistory = storageUtil.getHistory();
    const currentPathHistory = chatHistory[location.pathname] || [];
    setMessages(currentPathHistory);
  }, [location.pathname]);

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle text selection
  useEffect(() => {
    const handleMouseUp = () => {
      const selectedText = window.getSelection().toString().trim();
      if (selectedText) {
        setSelectedText(selectedText);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage = { id: Date.now(), text: inputValue, sender: 'user', timestamp: new Date() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // In a real implementation, this would call the backend API
      // For now, we'll simulate a response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulated response
      const botMessage = {
        id: Date.now() + 1,
        text: `I received your message: "${inputValue}". This is a simulated response. In the full implementation, this would connect to the Physical AI knowledge base to provide accurate, book-grounded answers without hallucinations.`,
        sender: 'bot',
        timestamp: new Date()
      };
      
      const updatedMessages = [...newMessages, botMessage];
      setMessages(updatedMessages);
      
      // Save to localStorage
      storageUtil.saveToHistory(location.pathname, updatedMessages);
    } catch (error) {
      console.error('Error getting response:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error processing your request.',
        sender: 'bot',
        timestamp: new Date()
      };
      const updatedMessages = [...newMessages, errorMessage];
      setMessages(updatedMessages);
      
      // Save to localStorage
      storageUtil.saveToHistory(location.pathname, updatedMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseSelectedText = () => {
    if (selectedText) {
      setInputValue(selectedText);
      inputRef.current?.focus();
      setSelectedText('');
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const clearChat = () => {
    setMessages([]);
    storageUtil.clearHistoryForPath(location.pathname);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <>
      {/* Floating button to open chat */}
      {!isOpen && (
        <button 
          className="chatbot-button" 
          onClick={toggleChat}
          aria-label="Open chat"
          title="Ask about Physical AI concepts"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h3>Physical AI Assistant</h3>
            <div className="chatbot-controls">
              <button 
                onClick={clearChat} 
                className="chatbot-clear-btn"
                title="Clear chat history for this page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </button>
              <button 
                onClick={toggleChat} 
                className="chatbot-close-btn"
                title="Close chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.length === 0 ? (
              <div className="chatbot-welcome">
                <p>Hello! I'm your Physical AI Assistant.</p>
                <p>Ask me about concepts from the Physical AI Book, and I'll provide accurate, book-grounded answers.</p>
                {selectedText && (
                  <div className="selected-text-notice">
                    <p>You selected: <em>"{selectedText.substring(0, 60)}{selectedText.length > 60 ? '...' : ''}"</em></p>
                    <button onClick={handleUseSelectedText}>Ask about this</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`chatbot-message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                  >
                    <div className="message-content">
                      {message.text}
                    </div>
                    <div className="message-timestamp">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="chatbot-message bot-message">
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          <form className="chatbot-input-form" onSubmit={handleSubmit}>
            {selectedText && !isOpen && (
              <div className="selected-text-prompt">
                <span>Selected: "{selectedText.substring(0, 40)}..."</span>
                <button type="button" onClick={handleUseSelectedText}>Ask &rarr;</button>
              </div>
            )}
            <div className="input-container">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Physical AI concepts..."
                rows="1"
                disabled={isLoading}
              />
              <button type="submit" disabled={!inputValue.trim() || isLoading}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}