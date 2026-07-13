declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params?: Record<string, string>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}