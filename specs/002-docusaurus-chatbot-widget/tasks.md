---

description: "Task list for Docusaurus Chatbot Widget implementation"
---

# Tasks: Docusaurus Chatbot Widget

**Input**: Design documents from `/specs/002-docusaurus-chatbot-widget/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The feature specification did not explicitly request tests, so no test tasks are included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web application**: `src/` at repository root for the React components
- Paths shown below assume web application structure based on plan.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Set up development environment for Docusaurus chatbot widget
- [X] T002 Create initial directory structure for chatbot components in src/components/ChatWidget/
- [X] T003 [P] Install necessary dependencies: React, TypeScript definitions

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Create base ChatWidget component structure with TypeScript interfaces in src/components/ChatWidget/ChatWidget.tsx
- [X] T005 [P] Implement ChatMessage entity model in src/types/chat.ts
- [X] T006 [P] Implement ChatSession entity model in src/types/chat.ts
- [X] T007 Create API service for chat endpoint communication in src/services/chatService.ts
- [X] T008 Set up localStorage utility for chat history management in src/utils/storage.ts
- [X] T009 Define CSS styles and responsive classes for widget in src/components/ChatWidget/ChatWidget.css

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Access Documentation via Chat (Priority: P1) 🎯 MVP

**Goal**: Enable users to open the chat widget, type a question, and receive an answer from documentation with source references

**Independent Test**: Can be fully tested by opening a documentation page, clicking the chat icon, typing a question related to the content, and receiving a relevant response with proper source attribution.

### Implementation for User Story 1

- [X] T010 [P] [US1] Create ChatWidget collapsed state UI in src/components/ChatWidget/ChatWidget.Collapsed.tsx
- [X] T011 [P] [US1] Create ChatWidget expanded state UI in src/components/ChatWidget/ChatWidget.Expanded.tsx
- [X] T012 [US1] Implement widget toggle functionality between collapsed/expanded states in src/components/ChatWidget/ChatWidget.tsx
- [X] T013 [US1] Create message display component in src/components/ChatWidget/MessageDisplay.tsx
- [X] T014 [US1] Create message input component with submit functionality in src/components/ChatWidget/MessageInput.tsx
- [X] T015 [US1] Integrate chat API service with message submission in src/components/ChatWidget/ChatWidget.tsx
- [X] T016 [US1] Implement loading indicator during API request in src/components/ChatWidget/ChatWidget.tsx
- [X] T017 [US1] Display source references with each answer in src/components/ChatWidget/MessageDisplay.tsx

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Context-aware Queries (Priority: P2)

**Goal**: Automatically include the current page context (URL and title) in the query to provide more relevant answers

**Independent Test**: Can be tested by comparing answers to the same question when asked from different pages to verify the context affects the response.

### Implementation for User Story 2

- [X] T018 [P] [US2] Create context capture utility to get current page URL and title in src/utils/contextCapture.ts
- [X] T019 [US2] Modify chat API service to include context information in requests in src/services/chatService.ts
- [X] T020 [US2] Update message submission to include page context in src/components/ChatWidget/ChatWidget.tsx

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Responsive Chat Experience (Priority: P3)

**Goal**: Ensure the chat interface works well on mobile devices with appropriate UI (full-width bottom sheet) and doesn't interfere with page content

**Independent Test**: Can be tested by opening the widget on both desktop and mobile screen sizes and verifying it adapts appropriately.

### Implementation for User Story 3

- [X] T021 [P] [US3] Create mobile-specific styles for bottom sheet UI in src/components/ChatWidget/ChatWidget.mobile.css
- [X] T022 [P] [US3] Implement responsive design logic to detect device type in src/components/ChatWidget/ChatWidget.tsx
- [X] T023 [US3] Adapt widget layout for mobile (bottom sheet) vs desktop (floating panel) in src/components/ChatWidget/ChatWidget.tsx
- [X] T024 [US3] Ensure widget doesn't interfere with page scrolling in src/components/ChatWidget/ChatWidget.css

**Checkpoint**: At this point, User Stories 1, 2 AND 3 should all work independently

---

## Phase 6: User Story 4 - Trust and Transparency (Priority: P2)

**Goal**: Ensure users see a clear disclaimer that answers come from official documentation and properly display when information is not available

**Independent Test**: Can be verified by ensuring the disclaimer is always visible in the chat interface and checking that missing information responses are displayed as specified.

### Implementation for User Story 4

- [X] T025 [P] [US4] Add disclaimer text "Answers are generated only from official documentation" to UI in src/components/ChatWidget/ChatWidget.tsx
- [X] T026 [US4] Handle special response case "This information is not available in the provided documentation" in src/components/ChatWidget/ChatWidget.tsx
- [X] T027 [US4] Display special response to users exactly as received from backend in src/components/ChatWidget/MessageDisplay.tsx

**Checkpoint**: All user stories should now be independently functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T028 [P] Add accessibility attributes (ARIA) to chat widget components in src/components/ChatWidget/*.tsx
- [X] T029 Implement keyboard navigation support for chat widget in src/components/ChatWidget/ChatWidget.tsx
- [X] T030 [P] Add error handling for network failures in src/services/chatService.ts
- [X] T031 Add loading states and error messages for various failure scenarios in src/components/ChatWidget/ChatWidget.tsx
- [X] T032 [P] Implement message history management (limit to 10 messages) in src/components/ChatWidget/ChatWidget.tsx
- [X] T033 Optimize bundle size to meet <100KB requirement in src/components/ChatWidget/ChatWidget.tsx
- [X] T034 [P] Add lazy loading implementation for chat widget in src/components/ChatWidget/index.tsx
- [ ] T035 Integrate with Docusaurus to ensure widget appears on all pages in docusaurus.config.js

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3 → P2)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Builds upon US1 functionality
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Independent of US1/US2 but uses same components
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - Independent of other stories but modifies UI

### Within Each User Story

- Core UI components before integration
- Service integration after UI components
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
# Launch all parallel tasks for User Story 1 together:
Task: "Create ChatWidget collapsed state UI in src/components/ChatWidget/ChatWidget.Collapsed.tsx"
Task: "Create ChatWidget expanded state UI in src/components/ChatWidget/ChatWidget.Expanded.tsx"
Task: "Create message display component in src/components/ChatWidget/MessageDisplay.tsx"
Task: "Create message input component with submit functionality in src/components/ChatWidget/MessageInput.tsx"
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
5. Add User Story 4 → Test independently → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
   - Developer D: User Story 4
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence