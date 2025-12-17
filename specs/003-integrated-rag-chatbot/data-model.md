# Data Model: Integrated RAG Chatbot

**Feature**: 003-integrated-rag-chatbot  
**Date**: 2025-12-15  
**Input**: Feature specification from `/specs/003-integrated-rag-chatbot/spec.md`

## Overview

This document defines the data models for the integrated RAG chatbot. It captures the entities and their relationships based on the requirements from the feature specification.

## Entity Models

### Query
- **Description**: Represents a user's question or request to the chatbot
- **Fields**:
  - `id`: UUID (primary key)
  - `question`: string (the user's question text)
  - `selected_text`: string (optional, text selected by user on the page)
  - `timestamp`: datetime (when the query was made)
  - `session_id`: UUID (foreign key to ChatSession)

### Document
- **Description**: Represents a chunk of book content stored in the vector database
- **Fields**:
  - `id`: UUID (primary key, corresponds to Qdrant point ID)
  - `content`: string (the text content of the chunk)
  - `source_file`: string (the original Markdown file path)
  - `metadata`: JSON (additional information about the chunk)
  - `embedding`: vector (OpenAI embedding of the content)
  - `created_at`: datetime (when the document was indexed)

### Response
- **Description**: Represents the chatbot's response to a user query
- **Fields**:
  - `id`: UUID (primary key)
  - `content`: string (the response text)
  - `sources`: array of Document IDs (documents used to generate the response)
  - `timestamp`: datetime (when the response was generated)
  - `session_id`: UUID (foreign key to ChatSession)
  - `query_id`: UUID (foreign key to Query)

### ChatSession
- **Description**: Represents a persistent conversation session between user and chatbot
- **Fields**:
  - `id`: UUID (primary key)
  - `user_id`: string (optional, to associate with authenticated users)
  - `created_at`: datetime (when the session started)
  - `updated_at`: datetime (when the last message was exchanged)
  - `is_active`: boolean (whether the session is currently active)

### Chunk
- **Description**: Represents a processed segment of book content for embedding
- **Fields**:
  - `id`: UUID (primary key)
  - `document_id`: UUID (foreign key to Document)
  - `content`: string (text content of the chunk)
  - `start_pos`: integer (starting position in original text)
  - `end_pos`: integer (ending position in original text)
  - `chunk_index`: integer (order of the chunk in the document)
  - `metadata`: JSON (source information, file location, etc.)

## Relationships

- ChatSession (1) → Query (Many): A chat session contains multiple queries
- Query (1) → Response (1): Each query generates one response
- Response (Many) → Document (Many): A response can reference multiple documents
- Document (1) → Chunk (Many): A document is broken into multiple chunks

## Validation Rules

### Query Validation
- `question` must be between 1 and 1000 characters
- If `selected_text` is provided, it must be between 1 and 5000 characters

### Document Validation
- `content` must be between 10 and 2000 characters (for effective chunking)
- `source_file` must be a valid path within the `/website/docs` directory

### Response Validation
- `content` must not be empty
- Must reference at least one source document if the response is based on book content
- If no sources are available, content must be exactly "This information is not available in this book."

## State Transitions

### ChatSession States
- `active`: When the session has ongoing conversation
- `inactive`: When no activity has occurred for a period (e.g., 30 minutes)
- `archived`: When explicitly closed by user or system cleanup

## Constraints

- Queries without sufficient context in selected text or book content must result in the exact response: "This information is not available in this book."
- Document chunks must not exceed token limits for the embedding model
- All sensitive information must be excluded from stored data