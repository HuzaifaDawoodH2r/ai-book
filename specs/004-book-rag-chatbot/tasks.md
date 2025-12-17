---

description: "Task list for Book RAG Chatbot implementation"
---

# Tasks: Book RAG Chatbot

**Input**: Design documents from `/specs/004-book-rag-chatbot/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`, `src/` for Docusaurus integration
- Paths shown below follow the planned structure for this feature

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create backend project structure per implementation plan in backend/
- [ ] T002 Create frontend project structure per implementation plan in frontend/
- [ ] T003 [P] Initialize Python project with FastAPI, Qdrant, OpenAI dependencies in backend/
- [ ] T004 [P] Initialize JavaScript project with React dependencies in frontend/
- [ ] T005 [P] Configure environment variables for Qdrant Cloud, Neon Postgres, and OpenAI API in backend/.env
- [ ] T006 Create initial directory structure for backend/src/models, backend/src/services, backend/src/api
- [ ] T007 Create initial directory structure for frontend/src/components, frontend/src/services, frontend/src/hooks

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T008 Setup Qdrant Cloud connection and vector collection for book content in backend/src/services/embedding_service.py
- [ ] T009 [P] Implement database schema for metadata in Neon Serverless Postgres in backend/src/models/conversation.py
- [ ] T010 [P] Setup API routing and middleware structure for FastAPI backend in backend/src/main.py
- [ ] T011 Create base models for Query, Document, and Response entities in backend/src/models/
- [ ] T012 Configure error handling and logging infrastructure in backend/src/main.py
- [ ] T013 Setup embedding service using OpenAI embeddings in backend/src/services/embedding_service.py
- [ ] T014 Create conversation management service in backend/src/services/conversation_service.py
- [ ] T015 [P] Create API client service for backend communication in frontend/src/services/apiClient.js
- [ ] T016 [P] Create RAG-specific client logic in frontend/src/services/ragClient.js

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Homepage Chatbot Access (Priority: P1) 🎯 MVP

**Goal**: Implement chatbot widget on the right side of the homepage that allows users to ask questions about book content and receive responses grounded in book content

**Independent Test**: Can be fully tested by placing the chatbot widget on the homepage, entering a question about book content, and receiving a response grounded in the book's content

### Implementation for User Story 1

- [ ] T017 [P] [US1] Create ChatButton component in frontend/src/components/ChatButton/ChatButton.js
- [ ] T018 [P] [US1] Create ChatWidget component in frontend/src/components/ChatWidget/ChatWidget.js
- [ ] T019 [P] [US1] Create MessageList component in frontend/src/components/MessageList/MessageList.js
- [ ] T020 [P] [US1] Create InputArea component in frontend/src/components/InputArea/InputArea.js
- [ ] T021 [US1] Implement ChatButton toggle functionality in frontend/src/components/ChatButton/ChatButton.js
- [ ] T022 [US1] Implement useChat hook for chat state management in frontend/src/hooks/useChat.js
- [ ] T023 [US1] Implement chat API endpoint for sending queries in backend/src/api/chat.py
- [ ] T024 [US1] Implement RAG service logic in backend/src/services/rag_service.py
- [ ] T025 [US1] Integrate Docusaurus-compatible chatbot component in src/components/BookRagChatbot.js
- [ ] T026 [US1] Add chatbot CSS styling in src/css/chatbot.css
- [ ] T027 [US1] Create document service for retrieving book content in backend/src/services/document_service.py

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Book-Specific Responses (Priority: P1)

**Goal**: Ensure responses are based only on book content so users can trust the accuracy of the information provided

**Independent Test**: Can be tested by asking the chatbot questions about specific topics from the book and verifying the responses align with book content

### Implementation for User Story 2

- [ ] T028 [P] [US2] Update RAG service to enforce book-grounded responses in backend/src/services/rag_service.py
- [ ] T029 [P] [US2] Implement response validation to ensure content alignment in backend/src/services/rag_service.py
- [ ] T030 [US2] Add logic to return "This information is not available in this book" when content is not found in backend/src/services/rag_service.py
- [ ] T031 [US2] Enhance document retrieval to include source tracking in backend/src/services/document_service.py
- [ ] T032 [US2] Update chat API to include source document information in responses in backend/src/api/chat.py
- [ ] T033 [US2] Add response verification in frontend to display source information in frontend/src/components/MessageList/MessageList.js

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Responsive Chat Interface (Priority: P2)

**Goal**: Implement a clean, non-intrusive interface positioned on the right side that is responsive to different screen sizes

**Independent Test**: Can be tested by opening the homepage on different devices/screen sizes and verifying the chatbot widget remains accessible and properly positioned

### Implementation for User Story 3

- [ ] T034 [P] [US3] Implement responsive design for ChatWidget in frontend/src/components/ChatWidget/ChatWidget.js
- [ ] T035 [P] [US3] Add mobile-friendly positioning for the chatbot in src/css/chatbot.css
- [ ] T036 [US3] Implement responsive behavior for different screen sizes in frontend/src/components/ChatButton/ChatButton.js
- [ ] T037 [US3] Add media queries for responsive design in src/css/chatbot.css
- [ ] T038 [US3] Implement accessibility features for the chat interface in frontend/src/components/ChatWidget/ChatWidget.js
- [ ] T039 [US3] Add visual feedback for loading states in frontend/src/components/ChatWidget/ChatWidget.js

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Integration & Polish

**Purpose**: Connect frontend and backend, optimize performance and finalize UI/UX

- [ ] T040 Implement conversation history maintenance within the current session in backend/src/services/conversation_service.py
- [ ] T041 Add clear way to reset or start a new conversation in frontend/src/components/ChatWidget/ChatWidget.js
- [ ] T042 Implement proper indexing of book content to Qdrant in backend/src/services/document_service.py
- [ ] T043 Create endpoint for document management in backend/src/api/documents.py
- [ ] T044 [P] Add unit tests for backend services in backend/tests/unit/
- [ ] T045 [P] Add component tests for frontend in frontend/tests/
- [ ] T046 Performance optimization to ensure response times under 5 seconds
- [ ] T047 [P] Documentation updates in docs/
- [ ] T048 Code cleanup and refactoring
- [ ] T049 Security hardening
- [ ] T050 Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Integration & Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Depends on US1's basic functionality
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Can work in parallel with US1 and US2

### Within Each User Story

- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all components for User Story 1 together:
Task: "Create ChatButton component in frontend/src/components/ChatButton/ChatButton.js"
Task: "Create ChatWidget component in frontend/src/components/ChatWidget/ChatWidget.js"
Task: "Create MessageList component in frontend/src/components/MessageList/MessageList.js"
Task: "Create InputArea component in frontend/src/components/InputArea/InputArea.js"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Complete Integration & Polish → Deploy/Demo (Complete feature!)

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Ensure all implementation adheres to RAG-specific requirements: book-grounded answers, zero hallucination tolerance, selected text priority