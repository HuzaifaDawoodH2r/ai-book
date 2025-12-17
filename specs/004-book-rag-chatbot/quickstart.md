# Quickstart Guide: Book RAG Chatbot

## Overview
This guide provides the steps necessary to get the Book RAG Chatbot up and running for development.

## Prerequisites
- Python 3.11+ installed
- Node.js 16+ installed (for frontend development)
- Access to OpenAI API key
- Access to Qdrant Cloud (Free Tier)
- Access to Neon Serverless Postgres

## Environment Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install fastapi uvicorn python-dotenv openai qdrant-client psycopg2-binary
```

4. Set up environment variables by creating a `.env` file:
```bash
OPENAI_API_KEY=your_openai_api_key
QDRANT_URL=your_qdrant_cloud_url
QDRANT_API_KEY=your_qdrant_api_key
NEON_DB_URL=your_neon_db_connection_string
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install JavaScript dependencies:
```bash
npm install
```

3. The frontend uses environment variables via the build system - these will be provided during the build process.

## Running the Application

### Backend
```bash
cd backend
uvicorn src.main:app --reload
```

The backend API will be available at `http://localhost:8000`.

### Frontend
```bash
cd frontend
npm start
```

The frontend will be available at `http://localhost:3000`.

## Key Components

### Backend Structure
```
backend/
├── src/
│   ├── models/
│   │   ├── query.py           # Query data model
│   │   ├── document.py        # Document data model
│   │   ├── response.py        # Response data model
│   │   └── conversation.py    # Conversation data model
│   ├── services/
│   │   ├── rag_service.py     # Core RAG logic
│   │   ├── embedding_service.py # Embedding operations
│   │   └── document_service.py # Document processing
│   ├── api/
│   │   ├── chat.py           # Chat API endpoints
│   │   └── documents.py      # Document management endpoints
│   └── main.py               # FastAPI application
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── ChatWidget/       # Main chat interface
│   │   ├── ChatButton/       # Toggle button for chat visibility
│   │   └── ...               # Other UI components
│   ├── services/
│   │   ├── apiClient.js      # API communication layer
│   │   └── ragClient.js      # RAG-specific frontend logic
│   └── hooks/
│       └── useChat.js        # Chat state management
```

## Development Workflow

1. Make changes to the backend in the `src` directory
2. Run backend tests: `pytest tests/`
3. Make changes to the frontend in the `src` directory
4. Run frontend tests: `npm test`
5. Test the integration by running both servers and using the chat interface

## Testing

### Backend Tests
```bash
cd backend
pytest tests/  # Run all backend tests
pytest tests/unit/  # Run only unit tests
```

### Frontend Tests
```bash
cd frontend
npm test  # Run all frontend tests
npm run test:watch  # Run tests in watch mode
```

## Deployment

### Backend
The backend can be deployed to any platform that supports Python applications (e.g., Heroku, AWS, GCP, etc.).

### Frontend
The frontend can be built and deployed as a static site:
```bash
npm run build
```

## Troubleshooting

### Common Issues

- **OpenAI API Error**: Verify your API key is correct and has sufficient quota
- **Qdrant Connection Error**: Check your URL and API key for Qdrant Cloud
- **Database Connection Error**: Verify your Neon Postgres connection string
- **Frontend Cannot Connect to Backend**: Check that backend is running and CORS is configured correctly

For more detailed documentation, refer to the individual component README files in their respective directories.