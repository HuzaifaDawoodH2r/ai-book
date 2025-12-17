# Research Summary: Docusaurus Side Floating Chatbot

## Overview
This document summarizes the research conducted to inform the implementation of the Docusaurus side floating chatbot feature.

## Decision 1: React Component Architecture

**Issue**: How to structure the React components for the floating chatbot.

**Research**: Best practices for building floating UI components in React suggest using a combination of position:fixed elements and React state for visibility toggling.

**Decision**: Implement as a main SideChatbot component with sub-components for the chat window
**Rationale**: This provides a clean separation of concerns while maintaining the isolated nature required by the specification
**Alternatives considered**: 
- Single monolithic component (would be harder to maintain)
- Separate button and window components without parent container (would complicate state management)

## Decision 2: Docusaurus Integration Method

**Issue**: How to inject the chatbot on every page without modifying existing theme files.

**Research**: Docusaurus provides a way to wrap all pages through theme extension at src/theme/Layout. This is the recommended approach in the Docusaurus documentation for functionality that needs to appear on every page.

**Decision**: Use Docusaurus theme extension at src/theme/Layout/index.js to wrap the main layout with the SideChatbot component
**Rationale**: This is the official Docusaurus approach for site-wide functionality that doesn't require modifying existing pages directly
**Alternatives considered**:
- Adding import statements to every MDX file (would be impractical and error-prone)
- Using a custom plugin (more complex than necessary for this use case)

## Decision 3: CSS Approach

**Issue**: How to properly style the floating chatbot with fixed positioning.

**Research**: CSS modules provide isolation and prevent style conflicts with existing site styles. Position:fixed is the appropriate approach for floating elements that remain in view regardless of page scroll.

**Decision**: Use CSS modules with position:fixed for proper floating behavior
**Rationale**: CSS modules ensure no style conflicts with existing site, and position:fixed meets the requirement for fixed positioning
**Alternatives considered**:
- Global CSS classes (would risk conflicts with existing styles)
- Inline styles (would be harder to maintain and customize)

## Decision 4: State Management

**Issue**: How to manage the open/closed state of the chat window.

**Research**: React's useState hook is the standard approach for managing component state in functional components. For the chat history, we can maintain an array of messages in state.

**Decision**: Use React's useState for managing visibility and message history
**Rationale**: This is the standard React approach and fits well with the component requirements
**Alternatives considered**:
- External state management libraries like Redux (unnecessary complexity for this simple use case)
- Prop drilling (not applicable since the component is self-contained)

## Decision 5: Responsive Design Implementation

**Issue**: How to ensure proper positioning across different screen sizes.

**Research**: CSS media queries and viewport units (vw, vh) along with appropriate fixed positions can ensure the chatbot appears correctly on all devices.

**Decision**: Implement responsive positioning with media queries and appropriate fixed values
**Rationale**: This approach ensures consistent positioning across devices and screen sizes
**Alternatives considered**:
- Dynamic calculations in JavaScript (would be more complex and potentially slower)
- Different components for different screen sizes (unnecessary overhead)