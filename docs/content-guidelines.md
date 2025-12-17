# Content Guidelines for the ai-book RAG Chatbot

## Target Audience

These guidelines are for contributors to the ai-book RAG Chatbot. The target audience for the system is users looking for accurate, book-grounded answers with zero hallucination tolerance. The system serves both end users seeking information from the book and developers maintaining the RAG system.

## Brand Voice

- Accurate, reliable, and transparent
- Clearly acknowledges limitations when information isn't available in the source material
- Professional yet approachable tone that builds trust through consistency
- Maintains honesty by refusing to generate unsupported content
- Clear, technically accurate explanations of RAG processes

## Content Format Template

Each content section must follow this consistent structure:

1. **Introduction**: Brief overview of the content's relevance to the RAG system
2. **Context**: Information about how this content relates to the book being queried
3. **Core Content**: The actual book content that will be retrieved by the RAG system
4. **Examples**: Sample queries that would successfully retrieve this content
5. **Limitations**: What the content does NOT cover that users might expect
6. **Related Content**: Connections to other relevant sections in the book

## Writing Style

- Write with accuracy and precision - all content will be subject to retrieval by the RAG system
- Use clear, unambiguous language that the vector search can effectively match
- Structure content with clear headings and subheadings for better chunking
- Define technical terms when introduced, as users may search for specific concepts
- Keep paragraphs focused and reasonably sized for effective vector embedding
- Use consistent terminology throughout the documentation

## Technical Requirements

- Write all content in Markdown format following Docusaurus standards
- Use Docusaurus-specific features like admonitions for important notes about the RAG system
- Implement proper heading structure (H1 for major topics, H2 for subtopics, etc.)
- Use Docusaurus' syntax highlighting for any code examples in the book content
- Ensure all content is accessible, following WCAG 2.1 AA standards
- Structure content to be easily chunked for vector storage in Qdrant

## RAG-Specific Guidelines

- Each content section should be self-contained enough that retrieval provides complete context
- Include cross-references to related content that users might want to explore
- Mark content that might be frequently searched with appropriate keywords
- Write content with retrieval in mind - consider how users will phrase their queries
- Avoid ambiguity that could lead to incorrect retrieval

## Content Review Process

Before content is published:

1. Verify that the content can be accurately retrieved by the RAG system
2. Check that responses based on this content would be accurate and helpful
3. Ensure the content follows the template structure
4. Confirm accessibility standards are met
5. Verify that the content doesn't contradict other book content
6. Test sample queries that should retrieve this content