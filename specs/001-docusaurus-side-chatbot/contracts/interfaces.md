# Interface Definition: Docusaurus Side Floating Chatbot

## Overview
This document defines the interface for potential future API interactions with the chatbot component. The current implementation is UI-focused and doesn't require server communication, but this interface provides a foundation for future functionality.

## Frontend Component Interface

### SideChatbot Component Props
```javascript
{
  headerTitle: string,        // Title to display in chat header
  placeholderText: string,    // Placeholder text for input field
  initialOpenState: boolean,  // Whether chat window starts open
  onMessageSubmit: function, // Callback when user submits a message
  onOpenChange: function,    // Callback when chat window opens/closes
}
```

### Message Submission Interface
```javascript
{
  message: string,            // The message text to submit
  senderId: string,          // Identifier for the sender (optional)
  timestamp: Date,           // When the message was created
}
```

### Message Display Interface
```javascript
{
  id: string,                // Unique identifier for the message
  text: string,              // The content of the message
  sender: 'user' | 'system', // Who sent the message
  timestamp: Date,           // When the message was sent
  status: 'sent' | 'delivered' | 'error' // Status of the message (optional)
}
```

## Future API Considerations

If future versions require server communication, potential endpoints would include:

### Send Message
- **POST** `/api/messages`
- **Request**: `{ message: string, conversationId?: string }`
- **Response**: `{ success: boolean, messageId: string, timestamp: string }`

### Get Conversation History
- **GET** `/api/conversations/{conversationId}`
- **Response**: `{ messages: Message[], lastUpdated: string }`

### Create New Conversation
- **POST** `/api/conversations`
- **Response**: `{ conversationId: string, createdAt: string }`