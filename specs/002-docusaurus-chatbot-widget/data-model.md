# Data Model: Docusaurus Chatbot Widget

## Overview
This document defines the data structures and relationships for the Docusaurus Chatbot Widget, as extracted from the feature specification.

## Entities

### ChatWidget
The frontend UI component that appears on all pages, managing collapsed/expanded states and user interaction.

**Attributes:**
- widgetId: string (unique identifier for the widget instance)
- state: ChatWidgetState (collapsed or expanded)
- position: WidgetPosition (fixed, bottom-right corner)
- isVisible: boolean (whether widget is visible on page)
- isMobile: boolean (whether current view is mobile)

**Relationships:**
- Contains 0..* ChatMessage instances
- Contains 1 ChatSession instance

### ChatMessage
Represents individual exchanges between user and system, containing query, response, timestamp, and metadata.

**Attributes:**
- messageId: string (unique identifier for the message)
- content: string (the actual text content of the message)
- sender: SenderType (either "user" or "system")
- timestamp: Date (time when message was sent/received)
- sourceReference: string (optional - source of information for system responses)
- isLoading: boolean (for user interface display while waiting for response)

**Relationships:**
- Belongs to 1 ChatSession
- Optional source reference to documentation content

### ChatSession
Contains the history of messages (limited to last 10) and context information (current page URL, title).

**Attributes:**
- sessionId: string (unique identifier for the session)
- currentPageUrl: string (URL of the page where the session started)
- currentPageTitle: string (title of the page where the session started)
- messageHistory: ChatMessage[1..10] (ordered list of messages, limited to 10)
- isActive: boolean (whether the session is currently in progress)
- createdTimestamp: Date (when the session was created)

**Relationships:**
- Contains 0..* ChatMessage instances
- Associated with 1 ChatWidget

### BackendResponse
Structured data from the backend containing answer text and source references.

**Attributes:**
- responseId: string (identifier for this specific response)
- answer: string (the main answer text provided by the backend)
- sourceReferences: SourceReference[] (list of sources used to generate the answer)
- contextUsed: ContextInfo (information about context used in the response)
- timestamp: Date (when the response was generated)

**Relationships:**
- Maps to 1 ChatMessage (the system response message)
- Contains 0..* SourceReference instances

### SourceReference
Reference to the specific documentation source used to generate the answer.

**Attributes:**
- documentTitle: string (title of the source document)
- documentUrl: string (URL to the source document)
- section: string (specific section within the document)
- confidenceScore: number (how confident the system is in this source, 0-1)

**Relationships:**
- Belongs to 1 BackendResponse
- References 1 specific documentation item

### ContextInfo
Information about the current page context sent with each query.

**Attributes:**
- currentPageUrl: string (URL of the current page)
- currentPageTitle: string (title of the current page)
- additionalContext: string (optional additional context information)

**Relationships:**
- Included with 1 ChatMessage (the user query)
- Used by 1 BackendResponse

## Enums

### ChatWidgetState
- COLLAPSED: Widget is minimized to a circular icon
- EXPANDED: Widget is showing the full chat panel

### SenderType
- USER: Message sent by the user
- SYSTEM: Message sent by the chatbot system

### WidgetPosition
- FIXED_BOTTOM_RIGHT: Fixed position at the bottom-right of the viewport

### DeviceType
- DESKTOP: Larger screen devices with floating panel UI
- MOBILE: Smaller screen devices with bottom sheet UI

## Validation Rules

### ChatMessage Validation
- content must not be empty or contain only whitespace
- timestamp must be in the past or present (not future)
- sender must be either "user" or "system"

### ChatSession Validation
- messageHistory must not exceed 10 messages
- currentPageUrl must be a valid URL
- currentPageTitle must not exceed 200 characters

### SourceReference Validation
- documentUrl must be a valid URL
- confidenceScore must be between 0 and 1 (inclusive)
- documentTitle must not be empty

## State Transitions

### ChatWidget State Transitions
1. **Initial State**: COLLAPSED
2. **User Action**: Click on widget icon
3. **Result**: State changes to EXPANDED; Chat panel appears
4. **User Action**: Click on close button or outside the panel (on desktop)
5. **Result**: State changes back to COLLAPSED

### ChatSession State Transitions
1. **Initial State**: No active session
2. **User Action**: Click on widget icon on any page
3. **Result**: New session created with currentPageUrl and currentPageTitle
4. **User Action**: Send a message
5. **Result**: Message added to messageHistory
6. **System Action**: Receive response
7. **Result**: System response added to messageHistory
8. **Periodically**: If more than 10 messages exist, oldest messages are purged