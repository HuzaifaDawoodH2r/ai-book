from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from src.api.chat import router as chat_router
from src.api.documents import router as documents_router
from src.config import settings
from src.logging_config import logger
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app with lifespan
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup events
    logger.info("Starting up ai-book RAG Chatbot API...")

    # Check if all required settings are configured
    if not settings.is_configured:
        logger.warning("Not all required environment variables are set")
    else:
        logger.info("All required environment variables are set")

    yield  # This is where the application runs

    # Shutdown events
    logger.info("Shutting down ai-book RAG Chatbot API...")


app = FastAPI(
    title="AI Book RAG Chatbot API",
    description="API for the integrated Retrieval-Augmented Generation chatbot",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers with updated prefixes according to API spec
app.include_router(chat_router, prefix="/api/chat", tags=["chat"])
app.include_router(documents_router, prefix="/api/documents", tags=["documents"])

@app.get("/")
def read_root():
    logger.info("Root endpoint accessed")
    return {
        "message": "Welcome to the AI Book RAG Chatbot API",
        "status": "ready",
        "endpoints": [
            "/api/chat",
            "/api/documents",
            "/docs",
            "/redoc"
        ]
    }

@app.get("/health")
def health_check():
    logger.info("Health check endpoint accessed")
    return {"status": "healthy"}

# Add exception handlers for error logging
@app.exception_handler(500)
async def internal_exception_handler(request, exc):
    logger.error(f"Internal server error: {exc}", exc_info=True)
    return {"message": "Internal server error", "status": 500}

@app.exception_handler(404)
async def not_found_exception_handler(request, exc):
    logger.warning(f"Resource not found: {request.url}")
    return {"message": "Resource not found", "status": 404}

if __name__ == "__main__":
    import uvicorn
    # Run with uvicorn for development
    # Use --reload flag to enable hot reloading during development
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=True  # Enable auto-reload for development
    )