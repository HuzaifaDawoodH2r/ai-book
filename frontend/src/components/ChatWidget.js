import React, { useState, useEffect } from 'react';
import './ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedText, setSelectedText] = useState('');

  // Function to get selected text
  const getSelectedText = () => {
    const text = window.getSelection().toString();
    return text.trim();
  };

  // Function to handle sending a message
  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Get any currently selected text
    const currentSelectedText = getSelectedText();
    const textToSend = currentSelectedText || selectedText || '';

    const userMessage = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: inputValue,
          selected_text: textToSend,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const botMessage = { id: Date.now() + 1, text: data.response, sender: 'bot' };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const errorData = await response.json();
        const errorMessage = { 
          id: Date.now() + 1, 
          text: `Error: ${errorData.message || 'Something went wrong'}`, 
          sender: 'bot' 
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage = { 
        id: Date.now() + 1, 
        text: `Network error: ${error.message}`, 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setInputValue('');
    setIsLoading(false);
  };

  // Function to handle key press (Enter to send)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Effect to register event listener for capturing selected text
  useEffect(() => {
    const handleSelectionChange = () => {
      const selected = getSelectedText();
      if (selected) {
        setSelectedText(selected);
      }
    };

    document.addEventListener('mouseup', handleSelectionChange);
    
    return () => {
      document.removeEventListener('mouseup', handleSelectionChange);
    };
  }, []);

  return (
    <div className="chat-widget">
      {/* Chat bubble to open/close the widget */}
      <button 
        className={`chat-toggle ${isOpen ? 'open' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>AI Book Assistant</h3>
          </div>
          
          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="welcome-message">
                <p>Hello! I'm your AI assistant for this book.</p>
                <p>You can ask me questions about the content, or select text and ask questions about it.</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.sender}`}>
                  <div className="message-content">{msg.text}</div>
                </div>
              ))
            )}
            
            {isLoading && (
              <div className="message bot">
                <div className="message-content">Thinking...</div>
              </div>
            )}
          </div>
          
          <div className="chat-input-area">
            {selectedText && (
              <div className="selected-text-preview">
                Selected: "{selectedText.substring(0, 50)}{selectedText.length > 50 ? '...' : ''}"
              </div>
            )}
            <div className="input-container">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask a question about the book..."
                rows={2}
              />
              <button 
                onClick={sendMessage} 
                disabled={!inputValue.trim() || isLoading}
                className="send-button"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;