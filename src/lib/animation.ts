export const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
export const DURATION = 800;

export const shouldReduceMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function reveal(el: HTMLElement, delay = 0): () => void {
  el.style.transition = 'none';
  el.style.opacity = '0';
  el.style.transform = 'scale(0.98) translateY(12px)';
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
  onEnter: () => void
): () => void {
  if (!el) return () => {};
  const obs = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    obs.disconnect();
    onEnter();
  }, { threshold });
  obs.observe(el);
  return () => obs.disconnect();
}

export function wrapWords(el: HTMLElement): HTMLElement[] {
  const words: HTMLElement[] = [];

  function walk(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? '';
      const parts = text.split(/(\s+)/);
      const frag = document.createDocumentFragment();
      for (const part of parts) {
        if (/\S/.test(part)) {
          const outer = document.createElement('span');
          outer.style.cssText = 'overflow:hidden;display:inline-block;vertical-align:top;';
          const inner = document.createElement('span');
          inner.style.cssText = 'display:inline-block;transform:translateY(110%);';
          inner.textContent = part;
          outer.appendChild(inner);
          frag.appendChild(outer);
          words.push(inner);
        } else {
          frag.appendChild(document.createTextNode(part));
        }
      }
      node.parentNode?.replaceChild(frag, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      if (el.tagName === 'BR') return;
      // Treat inline elements (span, strong, em…) as atomic words to preserve
      // effects like background-clip:text that break when we split their internals.
      const outer = document.createElement('span');
      outer.style.cssText = 'overflow:hidden;display:inline-block;vertical-align:top;';
      const inner = document.createElement('span');
      inner.style.cssText = 'display:inline-block;transform:translateY(110%);';
      el.parentNode?.insertBefore(outer, el);
      outer.appendChild(inner);
      inner.appendChild(el);
      words.push(inner);
    }
  }

  walk(el);
  return words;
}

export function revealWords(words: HTMLElement[], startDelay = 0, stagger = 50) {
  words.forEach((word, i) => {
    word.style.transition = `transform ${DURATION}ms ${EASE} ${startDelay + i * stagger}ms`;
    word.style.transform = 'translateY(0)';
  });
}
