---
id: "002"
title: "plan-docusaurus-side-chatbot"
stage: "plan"
date_iso: "2025-12-16"
surface: "agent"
model: "unknown"
feature: "001-docusaurus-side-chatbot"
branch: "001-docusaurus-side-chatbot"
user: "user"
command: "/sp.plan $ARGUMENTS"
labels:
  - "planning"
  - "chatbot"
  - "docusaurus"
  - "ui"
links:
  SPEC: "../spec.md"
  TICKET: null
  ADR: null
  PR: null
files_yaml:
  - "specs/001-docusaurus-side-chatbot/plan.md"
  - "specs/001-docusaurus-side-chatbot/research.md"
  - "specs/001-docusaurus-side-chatbot/data-model.md"
  - "specs/001-docusaurus-side-chatbot/quickstart.md"
  - "specs/001-docusaurus-side-chatbot/contracts/interfaces.md"
tests_yaml: []
prompt_text: |
  $ARGUMENTS

  Execute the implementation planning workflow using the plan template to generate design artifacts.

  Given that feature description, do this:

  1. **Setup**: Run `.specify/scripts/powershell/setup-plan.ps1 -Json` from repo root and parse JSON for FEATURE_SPEC, IMPL_PLAN, SPECS_DIR, BRANCH. For single quotes in args like "I'm Groot", use escape syntax: e.g 'I'\''m Groot' (or double-quote if possible: "I'm Groot").

  2. **Load context**: Read FEATURE_SPEC and `.specify/memory/constitution.md`. Load IMPL_PLAN template (already copied).

  3. **Execute plan workflow**: Follow the structure in IMPL_PLAN template to:
     - Fill Technical Context (mark unknowns as "NEEDS CLARIFICATION")
     - Fill Constitution Check section from constitution
     - Evaluate gates (ERROR if violations unjustified)
     - Phase 0: Generate research.md (resolve all NEEDS CLARIFICATION)
     - Phase 1: Generate data-model.md, contracts/, quickstart.md
     - Phase 1: Update agent context by running the agent script
     - Re-evaluate Constitution Check post-design

  4. **Stop and report**: Command ends after Phase 2 planning. Report branch, IMPL_PLAN path, and generated artifacts.

  ## Phases

  ### Phase 0: Outline & Research

  1. **Extract unknowns from Technical Context** above:
     - For each NEEDS CLARIFICATION → research task
     - For each dependency → best practices task
     - For each integration → patterns task

  2. **Generate and dispatch research agents**:

     ```text
     For each unknown in Technical Context:
       Task: "Research {unknown} for {feature context}"
     For each technology choice:
       Task: "Find best practices for {tech} in {domain}"
     ```

  3. **Consolidate findings** in `research.md` using format:
     - Decision: [what was chosen]
     - Rationale: [why chosen]
     - Alternatives considered: [what else evaluated]

  **Output**: research.md with all NEEDS CLARIFICATION resolved

  ### Phase 1: Design & Contracts

  **Prerequisites:** `research.md` complete

  1. **Extract entities from feature spec** → `data-model.md`:
     - Entity name, fields, relationships
     - Validation rules from requirements
     - State transitions if applicable

  2. **Generate API contracts** from functional requirements:
     - For each user action → endpoint
     - Use standard REST/GraphQL patterns
     - Output OpenAPI/GraphQL schema to `/contracts/`

  3. **Agent context update**:
     - Run `.specify/scripts/powershell/update-agent-context.ps1 -AgentType qwen`
     - These scripts detect which AI agent is in use
     - Update the appropriate agent-specific context file
     - Add only new technology from current plan
     - Preserve manual additions between markers

  **Output**: data-model.md, /contracts/*, quickstart.md, agent-specific file

response_text: |
  Completed implementation planning for the Docusaurus Side Floating Chatbot feature. The planning phase included:

  1. Creating the implementation plan with technical context and architecture
  2. Completing Phase 0 - Research to resolve implementation approaches
  3. Creating data models for the component state and messages
  4. Defining interface contracts for potential future API interactions
  5. Creating a quickstart guide for implementation
  6. Updating agent context with new technologies and requirements

  All planning artifacts have been created and the implementation is ready to move to the task breakdown phase.
outcome: "Planning completed with all artifacts generated and constitutional requirements verified"
evaluation: "Successfully planned the Docusaurus Side Floating Chatbot implementation"
---
