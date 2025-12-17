# Quickstart Guide: Integrated RAG Chatbot

**Feature**: 003-integrated-rag-chatbot  
**Date**: 2025-12-15

## Overview

This guide provides a quick start for setting up and running the integrated RAG chatbot for the ai-book project.

## Prerequisites

- Python 3.9+
- Node.js 18+
- Access to OpenAI API key
- Access to Qdrant Cloud (Free Tier)
- Access to Neon Serverless Postgres

## Setup Instructions

### 1. Environment Setup

First, clone the repository and navigate to the project directory:

```bash
git clone <repository-url>
cd ai-book
```

### 2. Backend Setup

1. Navigate to the backend directory (or project root if using monorepo structure):

2. Install Python dependencies:

```bash
pip install fastapi uvicorn openai qdrant-client python-dotenv psycopg2-binary tiktoken
```

3. Set up environment variables by creating a `.env` file:

```bash
OPENAI_API_KEY=your_openai_api_key
QDRANT_URL=your_qdrant_cloud_url
QDRANT_API_KEY=your_qdrant_api_key
NEON_DB_URL=your_neon_postgres_connection_string
```

### 3. Frontend Setup

1. Install Node.js dependencies:

```bash
npm install
```

### 4. Content Ingestion

Run the content ingestion script to process Markdown files from `/website/docs`:

```bash
python -m backend.src.cli.ingest
```

This will:
- Read all Markdown files from `/website/docs`
- Chunk the content appropriately
- Generate embeddings using OpenAI
- Store the embeddings in Qdrant Cloud

### 5. Running the Application

1. Start the backend server:

```bash
uvicorn backend.main:app --reload
```

The backend will run on `http://localhost:8000` by default.

2. Start the Docusaurus frontend:

```bash
npm start
```

The frontend will run on `http://localhost:3000` by default.

## Basic Usage

1. Visit the book website (running on `http://localhost:3000`)
2. Use the floating chat widget at the bottom-right of any page
3. Type your question about the book content
4. Receive a response grounded in the book content

### With Selected Text

1. Select text on any book page
2. Click on the chat widget or press the designated shortcut
3. Your question will be answered based on the selected text with higher priority

## API Endpoints

The backend provides a `/chat` endpoint:

```
POST /chat
```

Request body:
```json
{
  "question": "Your question here",
  "selected_text": "Optional selected text from the page"
}
```

Response:
```json
{
  "response": "The chatbot's answer",
  "sources": ["list of source document IDs used"]
}
```

## Testing

Run backend tests:
```bash
pytest
```

Run frontend tests:
```bash
npm test
```

## Troubleshooting

1. **Qdrant connection issues**: Verify your QDRANT_URL and QDRANT_API_KEY are correct
2. **Slow responses**: Check your OpenAI API key and rate limits
3. **No results**: Ensure content ingestion completed successfully
4. **Chat widget not appearing**: Check that Docusaurus is loading the chat plugin correctly