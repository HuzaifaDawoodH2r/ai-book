// Utility to capture current page context (URL and title)
export const contextCapture = {
  // Get the current page URL
  getCurrentPageUrl: (): string => {
    return window.location.href;
  },

  // Get the current page title
  getCurrentPageTitle: (): string => {
    return document.title || 'Untitled Page';
  },

  // Get both URL and title as a context object
  getCurrentContext: (): { currentPageUrl: string; currentPageTitle: string } => {
    return {
      currentPageUrl: contextCapture.getCurrentPageUrl(),
      currentPageTitle: contextCapture.getCurrentPageTitle()
    };
  }
};