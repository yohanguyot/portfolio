// Stub matchMedia — jsdom doesn't implement it
Object.defineProperty(globalThis, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Stub requestAnimationFrame — jsdom doesn't implement it
let rafId = 0;
globalThis.requestAnimationFrame = (cb) => {
  const id = ++rafId;
  Promise.resolve().then(() => cb(performance.now()));
  return id;
};
globalThis.cancelAnimationFrame = () => {};

// Stub IntersectionObserver
class MockIntersectionObserver {
  private callback: IntersectionObserverCallback;
  private disconnected = false;
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: number[] = [];

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element) {
    // Expose on the target so tests can trigger intersection
    (target as HTMLElement & { __io__: MockIntersectionObserver }).__io__ = this;
  }

  trigger(isIntersecting: boolean) {
    if (this.disconnected) return;
    this.callback(
      [{ isIntersecting, target: document.body } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }

  unobserve() {}
  disconnect() { this.disconnected = true; }
  takeRecords() { return []; }
}

globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
