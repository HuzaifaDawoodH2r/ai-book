import React from 'react';
import './MessageList.css';

const MessageList = ({ messages }) => {
  const messageListRef = React.useRef(null);

  React.useEffect(() => {
    // Auto-scroll to bottom when messages change
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="message-list" ref={messageListRef}>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
        >
          <div className="message-content">
            {message.content}

            {/* Display source information for assistant messages */}
            {message.role === 'assistant' && message.sources && message.sources.length > 0 && (
              <div className="message-sources">
                <small>Sources: {message.sources.join(', ')}</small>
              </div>
            )}
          </div>
          <div className="message-timestamp">
            {message.timestamp ? new Date(message.timestamp).toLocaleTimeString() : ''}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;