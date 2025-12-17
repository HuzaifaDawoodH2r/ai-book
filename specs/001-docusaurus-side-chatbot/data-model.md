# Data Model: Docusaurus Side Floating Chatbot

## Overview
This document defines the data models for the Docusaurus Side Floating Chatbot feature. Since this is primarily a UI component with minimal data requirements, the data model is lightweight and focused on the message structure and component state.

## Entities

### Message
**Description**: Represents a message in the chat history

**Fields**:
- `id` (string): Unique identifier for the message
- `text` (string): The content of the message
- `sender` (string): Either "user" or "system" indicating who sent the message
- `timestamp` (datetime): When the message was sent

**Validation Rules**:
- `text` must not be empty or consist only of whitespace
- `sender` must be either "user" or "system"
- `id` must be unique within the chat session

### ChatState
**Description**: Represents the state of the chat interface

**Fields**:
- `isOpen` (boolean): Whether the chat window is currently open or closed
- `messages` (array[Message]): List of messages in the current chat session
- `isMinimized` (boolean): Whether the chat window is minimized (if this feature is implemented)

**Validation Rules**:
- `isOpen` must be a boolean value
- `messages` array must not exceed a maximum length (e.g., 50 messages) to prevent memory issues

### ComponentConfiguration
**Description**: Configuration options for the SideChatbot component

**Fields**:
- `position` (object): Contains x and y coordinates for positioning the chat button
- `initialOpenState` (boolean): Whether the chat window should start open or closed
- `headerTitle` (string): The text to display in the chat window header
- `placeholderText` (string): The placeholder text for the input box

**Validation Rules**:
- `position` must contain valid coordinate values
- `headerTitle` must not be empty
- `placeholderText` is optional but if provided must not be just whitespace

## State Transitions

### Chat Window Visibility
- **CLOSED**: Initial state where only the floating button is visible
- **OPEN**: The chat window is fully expanded and visible
- **MINIMIZED**: The chat window is reduced to a smaller size (optional state)

## Relationships

- A **ChatState** contains many **Message** objects (1 to many)
- A **SideChatbot Component** has one **ChatState** object (1 to 1)

## Constraints

- Messages are stored in memory only for the current session
- No persistent storage is required for the basic implementation
- Message history is reset when the component is unmounted
- The component must maintain consistent positioning regardless of page height