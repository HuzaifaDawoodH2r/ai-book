# Quickstart Guide: Physical AI Book

## Getting Started

### Prerequisites
- Node.js 18+ LTS installed
- npm or yarn package manager
- Git for version control
- A modern web browser for previewing content

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```
   This command starts a local development server and opens the site in your default browser at `http://localhost:3000`.

4. **Preview and edit content**
   - The site will automatically reload when you make changes to content files
   - Content files are located in the `docs/` directory
   - Edit any markdown file in the docs directory to see changes reflected in the browser

### Content Structure

The Physical AI Book is organized as follows:

```
docs/
├── intro.md                    # Introduction to the book
├── chapter-1/                  # Chapter 1 directory
│   ├── index.md                # Chapter 1 overview page
│   ├── lesson-1-1.md           # Lesson 1.1: Understanding Physical AI Fundamentals
│   ├── lesson-1-2.md           # Lesson 1.2: Sensors and Actuators in Physical AI
│   └── lesson-1-3.md           # Lesson 1.3: Real-World Applications and Prototyping
└── ...
```

### Creating New Content

1. **Add a new lesson**:
   - Create a new markdown file in the appropriate chapter directory
   - Follow the lesson format template as defined in docs/lesson-template.md
   - Use the custom components (ExerciseContainer, CodeRunner) for interactive elements

2. **Update the sidebar**:
   - Edit `sidebars.js` to include your new content in the navigation
   - Ensure the new content appears in the correct position in the navigation hierarchy

3. **Using Custom Components**:
   - For hands-on exercises, use the ExerciseContainer component
   - For interactive code examples, use the CodeRunner component
   - See existing lessons for examples of how to implement these

### Building for Production

To build the static site for deployment:

```bash
npm run build
# or
yarn build
```

This creates a `build/` directory with the complete static site that can be deployed to any web server.

### Deploying

The site can be deployed to various platforms:
- GitHub Pages: Use the `gh-pages` branch
- Netlify/Vercel: Point to the `build` directory
- Custom server: Serve the contents of the `build` directory

### Testing Content

- Use the development server to preview changes in real-time
- Verify that all internal links work correctly
- Ensure code examples render properly
- Test navigation between pages
- Check responsive behavior on different screen sizes
- Validate accessibility features
- Test offline functionality (PWA)