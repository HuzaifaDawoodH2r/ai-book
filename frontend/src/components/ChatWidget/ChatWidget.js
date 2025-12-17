import React, { useEffect, useRef } from 'react';
import MessageList from '../MessageList/MessageList';
import InputArea from '../InputArea/InputArea';
import './ChatWidget.css';

const ChatWidget = ({
  messages,
  onSendMessage,
  isOpen,
  onClose,
  onReset,
  isLoading
}) => {
  const chatContainerRef = useRef(null);

  if (!isOpen) {
    return null;
  }

  // Focus management for accessibility
  useEffect(() => {
    if (isOpen && chatContainerRef.current) {
      chatContainerRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div
      className="chat-widget"
      ref={chatContainerRef}
      tabIndex={0}  // Make the widget focusable
      role="dialog"
      aria-modal="true"
      aria-label="Book Assistant Chat"
    >
      <div className="chat-header" role="banner">
        <h3>Book Assistant</h3>
        <div className="header-buttons">
          <button
            className="reset-button"
            onClick={onReset}
            aria-label="Reset conversation"
          >
            🔄
          </button>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>
      </div>
      <div className="chat-body" role="main">
        <MessageList messages={messages} />
        <InputArea
          onSendMessage={onSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ChatWidget;