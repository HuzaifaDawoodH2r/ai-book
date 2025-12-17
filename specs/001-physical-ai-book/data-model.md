# Data Model: Physical AI Book

## Content Entities

### Chapter
- **Definition**: A major division of the book containing multiple lessons on related Physical AI topics
- **Fields**:
  - id: string (unique identifier, e.g., "chapter-1")
  - title: string (chapter title)
  - description: string (brief overview of the chapter content)
  - lessons: array of Lesson entities (ordered list of lessons in the chapter)
  - position: integer (chapter number in the book sequence)
  - prerequisites: array of string (concepts that should be understood before this chapter)

### Lesson
- **Definition**: A focused educational unit within a chapter that covers specific concepts
- **Fields**:
  - id: string (unique identifier, e.g., "lesson-1-1")
  - title: string (lesson title)
  - chapterId: string (reference to the parent chapter)
  - content: string (main content in Markdown format)
  - learningObjectives: array of string (2-4 specific, measurable outcomes)
  - handsOnExercise: Exercise entity (integrated practical activity)
  - position: integer (lesson number within the chapter)
  - prerequisites: array of string (concepts that should be understood before this lesson)
  - relatedLessons: array of string (references to related lessons)

### Exercise
- **Definition**: An interactive activity for learners to apply concepts from the lesson
- **Fields**:
  - id: string (unique identifier)
  - title: string (exercise title)
  - description: string (instructions and context for the exercise)
  - type: string (e.g., "code", "simulation", "problem-solving", "reflection")
  - difficulty: string (e.g., "beginner", "intermediate")
  - estimatedTime: integer (time in minutes to complete)
  - requiredResources: array of string (files, tools, or materials needed)
  - successCriteria: array of string (how to know the exercise was completed successfully)

### ContentGuidelines
- **Definition**: Standards and practices for creating consistent educational materials
- **Fields**:
  - targetAudience: string (beginners to intermediate learners)
  - brandVoice: object (style and tone specifications)
  - lessonFormat: object (template structure requirements)
  - technicalRequirements: array of string (formatting and compatibility rules)
  - accessibilityStandards: object (WCAG 2.1 AA compliance requirements)

## Validation Rules

### Chapter Validation
- Title must be 3-100 characters
- Description must be 10-500 characters
- Must have 1-20 lessons
- Position must be a positive integer
- ID must be unique across all chapters

### Lesson Validation
- Title must be 3-100 characters
- Content must follow the lesson format template defined in the spec
- Must have 1-4 learning objectives
- Must include exactly one hands-on exercise
- Position must be a positive integer within the chapter
- ID must be unique across all lessons

### Exercise Validation
- Title must be 3-100 characters
- Description must be 20-1000 characters
- Type must be one of the defined exercise types
- Estimated time must be between 5-120 minutes
- Must have at least one success criterion

## State Transitions

### Content Lifecycle
- Draft → Review → Approved → Published
  - Draft: Content is being created
  - Review: Content is being evaluated for quality and accuracy
  - Approved: Content has passed review and is ready for publication
  - Published: Content is live and accessible to learners

Each state transition requires specific validation:
- Review: Content must have no broken links, all code examples must be validated, and content must follow guidelines
- Approved: Content must pass accessibility checks and have been reviewed by a subject matter expert
- Published: Content must be deployed successfully and all links must be verified in the live environment