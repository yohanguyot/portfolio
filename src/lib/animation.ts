export const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
export const DURATION = 600;

export const shouldReduceMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function reveal(el: HTMLElement, delay = 0): () => void {
  el.style.transition = 'none';
  el.style.opacity = '0';
  el.style.transform = 'scale(0.98) translateY(12px)';
  void el.offsetHeight;
  return () => {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.transition = `opacity ${DURATION}ms ${EASE} ${delay}ms, transform ${DURATION}ms ${EASE} ${delay}ms`;
      el.style.opacity = '1';
      el.style.transform = 'scale(1) translateY(0)';
      setTimeout(() => {
        el.style.transform = '';
        el.style.transition = '';
      }, DURATION + delay);
    }));
  };
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

