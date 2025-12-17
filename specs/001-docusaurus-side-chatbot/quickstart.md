# Quickstart Guide: Docusaurus Side Floating Chatbot

## Overview
This guide provides the steps necessary to implement and use the SideChatbot component in a Docusaurus site.

## Getting Started

### Prerequisites
- Docusaurus 2.x project
- Node.js 16+ installed
- Basic understanding of React components

### Installation Steps

1. Create the component structure in your Docusaurus project:
   ```bash
   mkdir -p src/components/SideChatbot
   mkdir -p src/theme/Layout
   ```

2. Create the SideChatbot component:
   - Create `src/components/SideChatbot/SideChatbot.js` with the main component implementation
   - Create `src/components/SideChatbot/SideChatbot.module.css` with component styling

3. Create the layout override:
   - Create `src/theme/Layout/index.js` that wraps the original layout with the SideChatbot component

4. The component will automatically appear on all pages once these files are in place.

## Component Structure

### Main Files
```
src/
├── components/
│   └── SideChatbot/
│       ├── SideChatbot.js         # Main component logic
│       ├── SideChatbot.module.css # Component styling
│       ├── ChatWindow.js          # Chat window sub-component
│       └── ChatWindow.module.css  # Chat window styling
└── theme/
    └── Layout/
        └── index.js               # Docusaurus layout wrapper
```

### SideChatbot.js
This is the main component that contains:
- State management for open/closed status
- Message history state
- Toggle function for the chat window
- The floating button UI
- The chat window UI (when open)

### Layout/index.js
This file:
- Imports the original Docusaurus layout
- Wraps all content with the SideChatbot component
- Ensures the chatbot appears on every page

## Configuration Options

Currently, the component has built-in configuration that can be modified directly in the component files:
- Header title text
- Input field placeholder text
- Initial open/closed state
- Positioning values

## Usage

The component requires no additional imports or configuration on individual pages. Once implemented as described above, it will automatically:
- Appear on every Docusaurus page
- Maintain proper positioning
- Allow users to open/close the chat window
- Allow users to type and submit messages

## Customization

### Styling
- Modify the CSS module files to change colors, dimensions, and animation properties
- The component uses CSS modules to ensure styles don't affect the rest of the site

### Functionality
- Update the message submission handler in the component file
- Add additional state management as needed for more advanced features
- Extend the component to include additional UI elements if needed

## Development Workflow

1. Make changes to the SideChatbot component files
2. Run the Docusaurus development server: `npm run start`
3. Test the component on different pages and screen sizes
4. Adjust CSS positioning and styling as needed

## Testing

### Manual Testing
1. Verify the floating button appears on the bottom-right of every page
2. Test that the chat window opens and closes with the toggle button
3. Verify the input field works and messages appear in the chat history
4. Test responsiveness on different screen sizes

### Component Testing (if implemented)
1. Use Jest and React Testing Library to test component functionality
2. Test state changes and event handlers
3. Verify component renders correctly in different states

## Troubleshooting

### Component Not Appearing
- Verify that `src/theme/Layout/index.js` is correctly implemented
- Check that the file name and path match exactly what Docusaurus expects
- Ensure there are no JavaScript errors preventing the component from rendering

### Positioning Issues
- Check that the CSS includes `position: fixed` for the floating elements
- Verify the bottom and right values are appropriate for your site's layout

### Style Conflicts
- Ensure CSS modules are being used properly to avoid global style conflicts
- Check that the component's styles are not being overridden by global styles