export {};

declare global {
  interface Window {
    jarvinhoAPI: {
      getUserHome: () => string;
    };
  }
}