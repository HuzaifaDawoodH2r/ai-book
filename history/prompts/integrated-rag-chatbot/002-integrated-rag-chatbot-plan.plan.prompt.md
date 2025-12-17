---
id: 002
title: Integrated RAG Chatbot Plan
stage: plan
date: 2025-12-15
surface: agent
model: gpt-4
feature: integrated-rag-chatbot
branch: 003-integrated-rag-chatbot
user: user
command: /sp.plan
labels: [rag, chatbot, ai-book, planning, architecture]
links:
  spec: specs/003-integrated-rag-chatbot/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/003-integrated-rag-chatbot/plan.md
 - specs/003-integrated-rag-chatbot/research.md
 - specs/003-integrated-rag-chatbot/data-model.md
 - specs/003-integrated-rag-chatbot/quickstart.md
 - specs/003-integrated-rag-chatbot/contracts/chat-api.yaml
tests:
 - none
---

## Prompt

```
$ARGUMENTS
```

Create a technical implementation plan for the ai-book RAG chatbot.

Tech Stack:
- Backend: FastAPI (Python)
- Embeddings: OpenAI text-embedding-3-small
- Vector DB: Qdrant Cloud
- Relational DB: Neon Serverless Postgres
- Frontend: Docusaurus + React

Architecture Plan:
1. Content Ingestion Layer
   - Read Markdown files
   - Chunk content
   - Generate embeddings
   - Store in Qdrant

2. Retrieval & Generation Layer
   - Embed user query
   - Retrieve top relevant chunks
   - Inject context into LLM prompt
   - Generate grounded answer

3. Selected Text Mode
   - Bypass retrieval
   - Use selected text directly as context

4. API Layer
   - POST /chat endpoint
   - Request: question, selected_text
   - Response: answer

5. UI Integration
   - Floating chat widget
   - Appears on every page
   - Bottom-right placement

Deployment Plan:
- Local development with uvicorn
- Environment variables for secrets

## Response snapshot

Created a comprehensive technical implementation plan for the ai-book RAG chatbot with the following deliverables:

1. Implementation Plan (plan.md): Complete technical plan with architecture and constitution check
2. Research (research.md): Resolved technical uncertainties and framework decisions
3. Data Model (data-model.md): Complete entity relationship definitions
4. API Contracts (contracts/chat-api.yaml): OpenAPI specification for the chat API
5. Quickstart Guide (quickstart.md): Step-by-step setup and usage instructions
6. Agent Context: Updated QWEN.md with new technology stack information

The plan successfully passes all constitution checks:
- Book-grounded answers only
- Retrieval before generation
- Zero hallucination tolerance
- Selected text priority
- Tech stack compliance
- Production-ready code standards

## Outcome

- ✅ Impact: Complete technical foundation established for RAG chatbot implementation
- 🧪 Tests: No tests required at planning phase
- 📁 Files: 5 files created (plan, research, data model, quickstart, API contracts)
- 🔁 Next prompts: Ready for /sp.tasks to generate implementation tasks
- 🧠 Reflection: All constitutional requirements verified and incorporated into design

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): All constitution checks pass
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Proceed to task generation phase