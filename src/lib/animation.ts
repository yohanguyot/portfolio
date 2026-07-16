export const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
export const DURATION = 600;
export const STAGGER = 80;
export const NAV_SCROLL_OFFSET = 76;
export const MOBILE_BREAKPOINT = 1024;
export const HIDDEN_TRANSFORM = 'scale(0.98) translateY(12px)';

const _motionQuery = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)')
  : null;
export const shouldReduceMotion = (): boolean => _motionQuery?.matches ?? false;

const _mobileQuery = typeof window !== 'undefined'
  ? window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)
  : null;
export const isMobileViewport = (): boolean => _mobileQuery?.matches ?? false;

export function afterLayout(fn: () => void): void {
  requestAnimationFrame(() => requestAnimationFrame(fn));
}

export function hideEl(el: HTMLElement): void {
  el.style.opacity = '0';
  el.style.transform = HIDDEN_TRANSFORM;
}

export function revealEl(el: HTMLElement, delay = 0): () => void {
  el.style.transition = `opacity ${DURATION}ms ${EASE} ${delay}ms, transform ${DURATION}ms ${EASE} ${delay}ms`;
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  getComputedStyle(el).opacity; // force style resolution on Safari before transitioning
  el.style.opacity = '1';
  el.style.transform = 'scale(1) translateY(0)';
  const id = setTimeout(() => {
    el.style.transform = '';
    el.style.transition = '';
  }, DURATION + delay);
  return () => clearTimeout(id);
}

export function prepareReveal(el: HTMLElement, delay = 0): () => void {
  el.style.transition = 'none';
  el.style.opacity = '0';
  el.style.transform = HIDDEN_TRANSFORM;
  void el.offsetHeight;
  return () => afterLayout(() => revealEl(el, delay));
}

export function observe(
  el: HTMLElement | null,
  threshold: number,
  onEnter: () => void,
  rootMargin = '0px 0px -5% 0px'
): () => void {
  if (!el) return () => {};
  const obs = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    obs.disconnect();
    onEnter();
  }, { threshold, rootMargin });
  obs.observe(el);
  return () => obs.disconnect();
}

export function hideFeatureCard(card: HTMLElement | null): void {
  if (!card) return;
  card.style.opacity = '0';
  Array.from(card.children as HTMLCollectionOf<HTMLElement>).forEach(item => hideEl(item));
}

export function observeFeatureCard(card: HTMLElement | null, isMobile: boolean): () => void {
  if (!card) return () => {};
  const items = Array.from(card.children as HTMLCollectionOf<HTMLElement>);
  if (!items.length) return () => {};
  if (isMobile) {
    const cardCleanup = observe(card, 0, () => {
      card.style.transition = 'none';
      card.style.opacity = '1';
    });
    const itemCleanups = items.map(item =>
      observe(item, 0.2, () => afterLayout(() => revealEl(item)))
    );
    return () => { cardCleanup(); itemCleanups.forEach(fn => fn()); };
  }
  return observe(card, 0.1, () => {
    card.style.transition = 'none';
    card.style.opacity = '1';
    afterLayout(() => items.forEach((item, i) => revealEl(item, i * STAGGER)));
  });
}

