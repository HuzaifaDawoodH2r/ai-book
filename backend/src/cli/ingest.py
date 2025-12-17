"""
Content Ingestion Script for AI-Book RAG Chatbot

This script ingests Markdown files from the /website/docs directory,
chunks the content, generates embeddings, and stores them in Qdrant.
"""

import os
import asyncio
from pathlib import Path
from typing import List
import markdown
from bs4 import BeautifulSoup
from .src.services.rag_service import RAGService
from .src.config import settings


async def extract_text_from_markdown(file_path: Path) -> str:
    """
    Extract text content from a Markdown file
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        md_content = f.read()
    
    # Convert markdown to HTML then extract text
    html_content = markdown.markdown(md_content)
    soup = BeautifulSoup(html_content, 'html.parser')
    text = soup.get_text()
    
    return text


async def ingest_documents():
    """
    Main function to ingest all documents from /website/docs
    """
    print("Starting content ingestion...")
    
    # Initialize RAG service
    rag_service = RAGService()
    
    # Define source directory
    source_dir = Path(settings.get('SOURCE_DIR', './website/docs'))
    
    if not source_dir.exists():
        print(f"Source directory does not exist: {source_dir}")
        return
    
    # Get all markdown files
    md_files = list(source_dir.rglob("*.md"))
    print(f"Found {len(md_files)} markdown files to process")
    
    for i, file_path in enumerate(md_files):
        print(f"Processing ({i+1}/{len(md_files)}): {file_path}")
        
        try:
            # Extract text from markdown
            content = await extract_text_from_markdown(file_path)
            
            # Add document to vector store
            doc_id = await rag_service.add_document(
                content=content,
                source_file=str(file_path.relative_to(source_dir))
            )
            
            print(f"  - Added document with ID: {doc_id}")
            
        except Exception as e:
            print(f"  - Error processing {file_path}: {str(e)}")
            continue
    
    print("Content ingestion completed!")


if __name__ == "__main__":
    # Run the ingestion
    asyncio.run(ingest_documents())