# Research Summary: Book RAG Chatbot

## Overview
This document summarizes the research conducted to resolve unknowns and clarify requirements for the Book RAG Chatbot feature. The research addresses all NEEDS CLARIFICATION markers from the feature specification and identifies the best technical approach for implementation.

## Decision 1: Books to Index

**Issue**: Which specific books should be indexed for the RAG system?

**Research**: The ai-book project is focused on educational content about AI, so the most logical approach is to index the content from the current book that is already in the repository.

**Decision**: Index the content from the existing ai-book content in the repository
**Rationale**: This provides immediate value to users, leverages existing content, and aligns with the project's educational focus
**Alternatives considered**: 
- Multiple different books (more complex implementation)
- User uploaded documents (requires additional security and validation)

## Decision 2: Document Upload Capability

**Issue**: Should the system allow users to upload their own documents?

**Research**: Based on the project's focus on specific book content and the constitutional requirement for zero hallucination, allowing user documents would significantly complicate the system and potentially violate the core principle of book-grounded answers.

**Decision**: Do not allow user document uploads initially
**Rationale**: Maintains the integrity of book-grounded responses, simplifies implementation, aligns with zero hallucination requirement
**Alternatives considered**:
- Allow user uploads (would require complex validation and could introduce hallucinations)
- Allow multiple pre-approved books (more complex but still manageable)

## Decision 3: Backend Architecture

**Issue**: What backend infrastructure approach should be used?

**Research**: Based on the constitution document, there's a clear requirement to use FastAPI for backend, Qdrant Cloud for vector storage, Neon Serverless Postgres for metadata, and OpenAI for embeddings.

**Decision**: Use FastAPI backend with Qdrant Cloud and Neon Postgres as specified in constitution
**Rationale**: Aligns with constitutional requirements, leverages proven technologies, works within free tier constraints
**Alternatives considered**:
- Self-hosted vector database (more complex setup and maintenance)
- Different LLM provider (would require changing constitution)

## Decision 4: Chatbot Button Implementation

**Issue**: How to implement the chatbot button as requested in the command?

**Research**: The requirement is to have a button that shows the chatbot on the homepage. This is consistent with the spec's requirement to have the chatbot available on the right side of the homepage.

**Decision**: Implement a floating action button that toggles the chat widget visibility
**Rationale**: Provides easy access while keeping the interface clean, standard UX pattern for chat applications
**Alternatives considered**:
- Always-visible widget (takes up more space)
- Menu item (less direct access)

## Decision 5: Homepage Integration

**Issue**: How to integrate with the existing homepage?

**Research**: Based on the project structure, this is a Docusaurus-based documentation site. The chatbot should integrate as a React component that works within the Docusaurus framework.

**Decision**: Create a Docusaurus-compatible React component for the chatbot
**Rationale**: Works seamlessly with existing infrastructure, follows established patterns
**Alternatives considered**:
- Standalone widget (might not integrate well with the site)
- Iframe integration (would create additional complexity)

## Technology Stack Summary

- **Backend**: FastAPI with async support for handling concurrent requests
- **Vector Storage**: Qdrant Cloud for document embeddings
- **Metadata Storage**: Neon Serverless Postgres
- **Embeddings/LLM**: OpenAI
- **Frontend**: React components for Docusaurus integration
- **Frontend State Management**: React hooks
- **Styling**: CSS modules or Tailwind CSS for responsive design