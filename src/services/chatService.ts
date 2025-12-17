import { ContextInfo, BackendResponse } from '../types/chat';

// Define the request type
interface ChatRequest {
  query: string;
  context?: ContextInfo;
}

// Chat API service with enhanced error handling
export class ChatService {
  private baseUrl: string;

  constructor(baseUrl: string = '') {
    // Default to empty string, which means relative to current domain
    this.baseUrl = baseUrl;
  }

  async sendQuery(query: string, context?: ContextInfo): Promise<BackendResponse> {
    try {
      const request: ChatRequest = {
        query,
        context
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`${this.baseUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        // Handle different types of HTTP errors
        if (response.status >= 500) {
          throw new Error(`Server error: ${response.status} - ${response.statusText}`);
        } else if (response.status >= 400) {
          throw new Error(`Client error: ${response.status} - ${response.statusText}`);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const data: BackendResponse = await response.json();

      // Handle the special case where the answer is 'This information is not available in the provided documentation.'
      if (data.answer === 'This information is not available in the provided documentation.') {
        console.log('Backend returned: No documentation found for this query');
      }

      return data;
    } catch (error) {
      // Handle network errors, timeouts, etc.
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout: The server took too long to respond');
        }
        throw error; // Re-throw the error to be handled by the calling function
      }
      throw new Error('An unknown error occurred while sending the query');
    }
  }
}

// Create default instance
export const chatService = new ChatService();