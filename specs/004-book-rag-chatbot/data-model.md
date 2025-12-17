# Data Model: Book RAG Chatbot

## Overview
This document defines the data models for the Book RAG Chatbot feature, derived from the entities identified in the feature specification.

## Entities

### Query
**Description**: Represents a user's question or input to the chatbot

**Fields**:
- `id` (string): Unique identifier for the query
- `text` (string): The actual text of the user's question
- `timestamp` (datetime): When the query was submitted
- `conversation_id` (string): Reference to the conversation this query belongs to
- `selected_text` (string, optional): Text selected by the user that takes priority in response generation

**Validation Rules**:
- `text` must be between 1 and 2000 characters
- `text` must not be empty or consist only of whitespace

### Document
**Description**: Represents a chunk of book content stored in the vector database

**Fields**:
- `id` (string): Unique identifier for the document chunk
- `content` (string): The actual text of the document chunk
- `source` (string): Reference to the original document (book, chapter, page, etc.)
- `embedding` (list[float]): Vector embedding of the content
- `metadata` (dict): Additional information about the content chunk

**Validation Rules**:
- `content` must be between 10 and 4000 characters
- `embedding` must be a valid vector of appropriate dimensions for the embedding model

### Response
**Description**: Represents the system's answer generated based on retrieved document chunks

**Fields**:
- `id` (string): Unique identifier for the response
- `text` (string): The generated response text
- `query_id` (string): Reference to the original query
- `source_documents` (list[string]): IDs of documents used to generate the response
- `timestamp` (datetime): When the response was generated
- `confidence_score` (float, optional): Confidence level in the response accuracy

**Validation Rules**:
- `text` must not be empty
- `confidence_score` must be between 0 and 1 if provided

### Conversation
**Description**: Represents a session containing the history of query-response pairs between user and system

**Fields**:
- `id` (string): Unique identifier for the conversation
- `created_at` (datetime): When the conversation started
- `updated_at` (datetime): When the conversation was last updated
- `messages` (list[object]): List of message objects (queries and responses)
- `user_id` (string, optional): Identifier for the user (if tracking is enabled)

**Validation Rules**:
- `messages` must contain alternating Query and Response objects
- `messages` list cannot exceed 100 entries (to prevent memory issues)

### Book Content
**Description**: The source material that serves as the knowledge base for the RAG system

**Fields**:
- `id` (string): Unique identifier for the book
- `title` (string): Title of the book
- `author` (string): Author of the book
- `content` (string): Full text of the book
- `chunk_size` (int): Size of chunks when processing the book content
- `document_chunks` (list[Document]): Related document chunks created from this book
- `indexed_at` (datetime): When the book was last indexed

**Validation Rules**:
- `title` must not be empty
- `content` must not be empty

## State Transitions

### Conversation State
- **NEW**: A new conversation is initiated when a user first opens the chat interface
- **ACTIVE**: The conversation has received at least one query-response pair
- **INACTIVE**: The conversation has not been updated in 30 minutes
- **ENDED**: The conversation explicitly ended by user action or system timeout

## Relationships

- A **Conversation** has many **Query** objects (1 to many)
- A **Query** has many **Response** objects (1 to many, though typically 1 to 1 in simple cases)
- A **Response** references multiple **Document** objects (many to many through source_documents)
- A **Book Content** is split into many **Document** chunks (1 to many)
- A **Query** may reference a **Book Content** source (many to many)

## Constraints

- Responses must only be generated from document chunks that are part of the indexed book content
- If no relevant documents are found for a query, the response must be "This information is not available in this book"
- Conversation history is session-based and does not persist across browser sessions
- All queries and responses must be validated against the book content to ensure zero hallucination