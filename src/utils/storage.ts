// localStorage utility for chat history management
const CHAT_HISTORY_KEY = 'docusaurus-chat-history';
const MAX_HISTORY_SIZE = 10;

export interface ChatHistoryItem {
  sessionId: string;
  messageHistory: any[]; // Using any because we'll import from chat.ts which might cause circular deps
  timestamp: number;
}

export interface PathBasedChatHistory {
  [path: string]: any[]; // Array of messages for a specific path
}

export const storageUtil = {
  // Save chat history to localStorage for a specific path
  saveToHistory: (path: string, messageHistory: any[]): void => {
    try {
      // Get existing history
      const existingHistory = storageUtil.getHistory();

      // Update history for the specific path
      existingHistory[path] = messageHistory;

      // Save to localStorage
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(existingHistory));
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  },

  // Retrieve all chat history from localStorage
  getHistory: (): PathBasedChatHistory => {
    try {
      const historyString = localStorage.getItem(CHAT_HISTORY_KEY);
      if (!historyString) {
        return {};
      }

      const history = JSON.parse(historyString);
      return typeof history === 'object' && history !== null ? history : {};
    } catch (error) {
      console.error('Error retrieving chat history:', error);
      return {};
    }
  },

  // Get chat history for a specific path
  getHistoryForPath: (path: string): any[] => {
    const history = storageUtil.getHistory();
    return history[path] || [];
  },

  // Clear all chat history
  clearHistory: (): void => {
    try {
      localStorage.removeItem(CHAT_HISTORY_KEY);
    } catch (error) {
      console.error('Error clearing chat history:', error);
    }
  },

  // Clear chat history for a specific path
  clearHistoryForPath: (path: string): void => {
    try {
      const history = storageUtil.getHistory();
      delete history[path];
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Error clearing path history:', error);
    }
  }
};