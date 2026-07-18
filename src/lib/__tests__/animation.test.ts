import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  EASE,
  DURATION,
  STAGGER,
  ANIMATION_CLEANUP_BUFFER_MS,
  HIDDEN_TRANSFORM,
  afterLayout,
  hideEl,
  revealEl,
  observe,
  hideFeatureCard,
  observeFeatureCard,
} from '../animation';

function makeEl(): HTMLElement {
  return document.createElement('div');
}

// ─── Constants ────────────────────────────────────────────────────────────────

describe('constants', () => {
  it('HIDDEN_TRANSFORM matches the @keyframes revealEl from-state', () => {
    expect(HIDDEN_TRANSFORM).toBe('scale(0.98) translateY(12px)');
  });

  it('STAGGER is 80ms', () => {
    expect(STAGGER).toBe(80);
  });

  it('ANIMATION_CLEANUP_BUFFER_MS is 50ms', () => {
    expect(ANIMATION_CLEANUP_BUFFER_MS).toBe(50);
  });
});

// ─── hideEl ───────────────────────────────────────────────────────────────────

describe('hideEl', () => {
  it('sets opacity to 0', () => {
    const el = makeEl();
    hideEl(el);
    expect(el.style.opacity).toBe('0');
  });

  it('sets transform to HIDDEN_TRANSFORM', () => {
    const el = makeEl();
    hideEl(el);
    expect(el.style.transform).toBe(HIDDEN_TRANSFORM);
  });
});

// ─── revealEl ─────────────────────────────────────────────────────────────────

describe('revealEl', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it('sets animation string with correct duration, easing, and delay', () => {
    const el = makeEl();
    revealEl(el, 100);
    expect(el.style.animation).toContain(`${DURATION}ms`);
    expect(el.style.animation).toContain(EASE);
    expect(el.style.animation).toContain('100ms');
    expect(el.style.animation).toContain('forwards');
  });

  it('clears transition before starting animation', () => {
    const el = makeEl();
    el.style.transition = 'opacity 200ms';
    revealEl(el);
    expect(el.style.transition).toBe('');
  });

  it('cleanup timer leaves element fully visible', () => {
    const el = makeEl();
    hideEl(el);
    revealEl(el, 0);

    vi.advanceTimersByTime(DURATION + ANIMATION_CLEANUP_BUFFER_MS + 1);

    expect(el.style.opacity).toBe('1');
    expect(el.style.transform).toBe('');
    expect(el.style.animation).toBe('');
  });

  it('cancel handle leaves element visible immediately, even mid-animation', () => {
    const el = makeEl();
    hideEl(el);

    const cancel = revealEl(el, 0);
    // Cancel before the cleanup timer fires
    cancel();

    expect(el.style.opacity).toBe('1');
    expect(el.style.transform).toBe('');
    expect(el.style.animation).toBe('');
  });

  it('cancel handle prevents the cleanup timer from overwriting state', () => {
    const el = makeEl();
    const cancel = revealEl(el, 0);
    cancel();

    // Advance past where the timer would have fired
    vi.advanceTimersByTime(DURATION + ANIMATION_CLEANUP_BUFFER_MS + 100);

    // Still visible — no double-set side-effects
    expect(el.style.opacity).toBe('1');
  });

  it('uses zero delay when none is provided', () => {
    const el = makeEl();
    revealEl(el);
    expect(el.style.animation).toContain('0ms');
  });
});

// ─── afterLayout ──────────────────────────────────────────────────────────────

describe('afterLayout', () => {
  it('calls the callback after two animation frames', async () => {
    const cb = vi.fn();
    afterLayout(cb);
    expect(cb).not.toHaveBeenCalled();
    // Each rAF resolves as a microtask in our stub
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    expect(cb).toHaveBeenCalledOnce();
  });
});

// ─── observe ──────────────────────────────────────────────────────────────────

describe('observe', () => {
  it('returns a no-op when element is null', () => {
    const cleanup = observe(null, 0.1, vi.fn());
    expect(() => cleanup()).not.toThrow();
  });

  it('calls onEnter when the element intersects', () => {
    const el = makeEl();
    const onEnter = vi.fn();
    observe(el, 0.1, onEnter);

    const io = (el as HTMLElement & { __io__: { trigger: (v: boolean) => void } }).__io__;
    io.trigger(true);

    expect(onEnter).toHaveBeenCalledOnce();
  });

  it('does not call onEnter when element leaves viewport', () => {
    const el = makeEl();
    const onEnter = vi.fn();
    observe(el, 0.1, onEnter);

    const io = (el as HTMLElement & { __io__: { trigger: (v: boolean) => void } }).__io__;
    io.trigger(false);

    expect(onEnter).not.toHaveBeenCalled();
  });

  it('fires onEnter only once (observer disconnects after first intersection)', () => {
    const el = makeEl();
    const onEnter = vi.fn();
    observe(el, 0.1, onEnter);

    const io = (el as HTMLElement & { __io__: { trigger: (v: boolean) => void } }).__io__;
    io.trigger(true);
    io.trigger(true);

    expect(onEnter).toHaveBeenCalledOnce();
  });

  it('cleanup disconnects the observer', () => {
    const el = makeEl();
    const onEnter = vi.fn();
    const cleanup = observe(el, 0.1, onEnter);
    cleanup();

    // After disconnect, triggering should not call onEnter
    const io = (el as HTMLElement & { __io__: { trigger: (v: boolean) => void } }).__io__;
    io.trigger(true);

    expect(onEnter).not.toHaveBeenCalled();
  });
});

// ─── hideFeatureCard ──────────────────────────────────────────────────────────

describe('hideFeatureCard', () => {
  it('is a no-op for null', () => {
    expect(() => hideFeatureCard(null)).not.toThrow();
  });

  it('sets card opacity to 0', () => {
    const card = makeEl();
    hideFeatureCard(card);
    expect(card.style.opacity).toBe('0');
  });

  it('hides each child with HIDDEN_TRANSFORM', () => {
    const card = makeEl();
    const child1 = makeEl();
    const child2 = makeEl();
    card.appendChild(child1);
    card.appendChild(child2);

    hideFeatureCard(card);

    expect(child1.style.opacity).toBe('0');
    expect(child1.style.transform).toBe(HIDDEN_TRANSFORM);
    expect(child2.style.opacity).toBe('0');
    expect(child2.style.transform).toBe(HIDDEN_TRANSFORM);
  });
});

// ─── observeFeatureCard ───────────────────────────────────────────────────────

describe('observeFeatureCard', () => {
  it('returns a no-op for null', () => {
    const cleanup = observeFeatureCard(null, false);
    expect(() => cleanup()).not.toThrow();
  });

  it('returns a no-op for a card with no children', () => {
    const card = makeEl();
    const cleanup = observeFeatureCard(card, false);
    expect(() => cleanup()).not.toThrow();
  });

  it('desktop: reveals card instantly and starts item stagger on intersection', async () => {
    const card = makeEl();
    const item1 = makeEl();
    const item2 = makeEl();
    card.appendChild(item1);
    card.appendChild(item2);
    card.style.opacity = '0';

    observeFeatureCard(card, false);

    const io = (card as HTMLElement & { __io__: { trigger: (v: boolean) => void } }).__io__;
    io.trigger(true);

    expect(card.style.opacity).toBe('1');
    expect(card.style.transition).toBe('none');

    // afterLayout schedules two rAF frames; flush them via microtask queue
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));

    expect(item1.style.animation).toContain('revealEl');
    expect(item2.style.animation).toContain('revealEl');
  });
});
