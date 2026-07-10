import { useEffect, useLayoutEffect } from 'react';

// useLayoutEffect on client (fires before paint → no FOUC), useEffect on server (no-op).
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
