---
id: 001
title: ai-book RAG Chatbot Constitution
stage: constitution
date: 2025-12-15
surface: agent
model: gpt-4
feature: none
branch: main
user: user
command: /sp.constitution
labels: [constitution, rag, ai-book]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
 - README.md
 - docs/content-guidelines.md
 - .specify/templates/plan-template.md
 - .specify/templates/spec-template.md
 - .specify/templates/tasks-template.md
tests:
 - none
---

## Prompt

```
$ARGUMENTS
```

Project Name: ai-book RAG Chatbot

Purpose:
Build an integrated Retrieval-Augmented Generation (RAG) chatbot embedded inside a Docusaurus-based book.

Core Principles:
- Book-grounded answers only
- Retrieval before generation
- Zero hallucination tolerance
- Selected text has highest priority
- Clean, readable, production-ready code

Rules:
- The chatbot must answer ONLY using the book content
- If an answer is not present in the book, respond exactly:
  "This information is not available in this book."
- If selected_text is provided, ignore vector search
- No external knowledge or assumptions allowed

Tech Constraints:
- FastAPI backend
- Qdrant Cloud (Free Tier)
- Neon Serverless Postgres
- OpenAI embeddings
- Docusaurus frontend

Quality Standards:
- Clear folder structure
- Well-commented code
- Separation of concerns
- Secure environment variable usage

## Response snapshot

I've successfully updated the project constitution for the ai-book RAG Chatbot according to your specifications. Here's the summary:

## Summary of Changes

**New Version**: 1.1.0 (incremented from 1.0.0)
**Bump Rationale**: This was a MINOR version bump because we added new principles specific to the RAG chatbot functionality and materially expanded guidance from the Physical AI educational context to the RAG chatbot system.

## Key Changes Made

1. **Updated Core Principles**:
   - Book-Grounded Answers Only
   - Retrieval Before Generation
   - Zero Hallucination Tolerance
   - Selected Text Priority
   - Production-Ready Code Standards

2. **Updated Documentation**:
   - README.md: Changed from Physical AI Book to ai-book RAG Chatbot
   - Content Guidelines: Updated for RAG-specific requirements
   - Plan Template: Added RAG-specific constitution check
   - Spec Template: Updated with RAG-specific requirements
   - Tasks Template: Added RAG-specific task examples

## Files Updated

- `.specify/memory/constitution.md` - Updated with new RAG chatbot principles
- `README.md` - Updated project description and setup instructions
- `docs/content-guidelines.md` - Updated for RAG system content
- `.specify/templates/plan-template.md` - Added RAG-specific constitution check
- `.specify/templates/spec-template.md` - Updated with RAG-specific requirements
- `.specify/templates/tasks-template.md` - Added RAG-specific tasks

## Sync Impact Report

- Version change: 1.0.0 → 1.1.0
- Added sections: RAG-specific principles and tech constraints
- Modified principles: Changed from Physical AI educational content to RAG chatbot functionality
- Removed sections: Physical AI-specific principles
- Templates requiring updates: All templates updated (✅)
- Follow-up TODOs: None

## Suggested Commit Message

`docs: amend constitution to v1.1.0 (RAG chatbot principles + governance update)`

All dependent templates have been updated to align with the new constitution, and the system now properly reflects the ai-book RAG Chatbot project instead of the previous Physical AI Book project.

## Outcome

- ✅ Impact: Successfully migrated project constitution from Physical AI Book to ai-book RAG Chatbot
- 🧪 Tests: No tests required for constitution updates
- 📁 Files: 6 files updated to reflect new project direction
- 🔁 Next prompts: Ready for feature specification and planning
- 🧠 Reflection: The constitution now properly guides RAG-specific development

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin feature specification based on new constitution