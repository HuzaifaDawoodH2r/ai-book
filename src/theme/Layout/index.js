import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import SideChatbot from '@site/src/components/SideChatbot/SideChatbot';

/**
 * Layout Wrapper Component
 * This component wraps the original Docusaurus layout with the SideChatbot component
 * to ensure the chatbot appears on every page without modifying existing functionality.
 */
export default function Layout(props) {
  return (
    <>
      <OriginalLayout {...props}>
        {props.children}
        <SideChatbot />
      </OriginalLayout>
    </>
  );
}