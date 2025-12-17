import React, { useState } from 'react';
import './InputArea.css';

const InputArea = ({ onSendMessage, isLoading }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <form className="input-area" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder={isLoading ? "Processing your request..." : "Ask about the book..."}
        disabled={isLoading}
        className={`input-field ${isLoading ? 'loading' : ''}`}
        aria-busy={isLoading}
        aria-label={isLoading ? "Processing your request, please wait" : "Type your question about the book"}
      />
      <button
        type="submit"
        disabled={isLoading || !inputText.trim()}
        className="send-button"
        aria-label={isLoading ? "Processing" : "Send message"}
      >
        {isLoading ? (
          <span className="loading-indicator" aria-label="Loading">⏳</span>
        ) : (
          'Send'
        )}
      </button>
    </form>
  );
};

export default InputArea;