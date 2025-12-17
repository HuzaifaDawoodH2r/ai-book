import React from 'react';
import './ChatButton.css';

const ChatButton = ({ onClick, isOpen }) => {
  return (
    <button 
      className={`chat-button ${isOpen ? 'open' : ''}`}
      onClick={onClick}
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      {isOpen ? (
        <span className="close-icon">✕</span>
      ) : (
        <span className="chat-icon">💬</span>
      )}
    </button>
  );
};

export default ChatButton;