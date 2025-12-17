/**
 * BookRagChatbot component
 * This serves as an alternative implementation of the chatbot functionality
 * primarily maintained for backward compatibility or alternative integration methods
 */

import React from 'react';
import SideChatbot from './components/SideChatbot/SideChatbot';

/**
 * BookRagChatbot component
 * An alternative implementation of the chatbot functionality
 */
export default function BookRagChatbot() {
  // This component simply renders the SideChatbot for backward compatibility
  return <SideChatbot />;
}