// Enum types
export type ChatWidgetState = 'COLLAPSED' | 'EXPANDED';
export type SenderType = 'USER' | 'SYSTEM';
export type WidgetPosition = 'FIXED_BOTTOM_RIGHT';
export type DeviceType = 'DESKTOP' | 'MOBILE';

// ChatMessage entity model
export interface ChatMessage {
  messageId: string;
  content: string;
  sender: SenderType;
  timestamp: Date;
  sourceReference?: string;
  isLoading?: boolean;
}

// Validation function for ChatMessage
export const validateChatMessage = (message: ChatMessage): boolean => {
  return (
    message.content.trim() !== '' &&
    (message.sender === 'USER' || message.sender === 'SYSTEM') &&
    message.timestamp <= new Date()
  );
};

// ChatSession entity model
export interface ChatSession {
  sessionId: string;
  currentPageUrl: string;
  currentPageTitle: string;
  messageHistory: ChatMessage[];
  isActive: boolean;
  createdTimestamp: Date;
}

// Validation function for ChatSession
export const validateChatSession = (session: ChatSession): boolean => {
  return (
    session.messageHistory.length <= 10 &&
    /^https?:\/\/.*/.test(session.currentPageUrl) &&
    session.currentPageTitle.length <= 200
  );
};

// Additional interfaces for API responses
export interface SourceReference {
  documentTitle: string;
  documentUrl: string;
  section: string;
  confidenceScore: number;
}

// Validation function for SourceReference
export const validateSourceReference = (ref: SourceReference): boolean => {
  return (
    ref.documentTitle.trim() !== '' &&
    /^https?:\/\/.*/.test(ref.documentUrl) &&
    ref.confidenceScore >= 0 && ref.confidenceScore <= 1
  );
};

export interface BackendResponse {
  responseId: string;
  answer: string;
  sourceReferences: SourceReference[];
  contextUsed?: ContextInfo;
  timestamp: Date;
}

export interface ContextInfo {
  currentPageUrl: string;
  currentPageTitle: string;
  additionalContext?: string;
}