import { useState, useRef, useLayoutEffect, useCallback } from 'react';

// Persists across remounts (language switches) within the same browser session.
// We keep the largest threshold ever measured so the nav never downgrades to
// desktop based on a shorter label set (e.g. "EN" narrower than "Français").
let persistedThreshold = 0;

export function useNavMobileBreakpoint(navRef: React.RefObject<HTMLElement | null>) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const thresholdRef = useRef(persistedThreshold);
  const isMobileRef = useRef(isMobile);

  useLayoutEffect(() => {
    if (!navRef.current) return;

    function measureThreshold() {
      if (!navRef.current || isMobileRef.current) return;
      const t = navRef.current.scrollWidth + 48;
      persistedThreshold = Math.max(persistedThreshold, t);
      thresholdRef.current = persistedThreshold;
    }

    function check() {
      const mobile = window.innerWidth <= 600 || (thresholdRef.current > 0 && window.innerWidth < thresholdRef.current);
      if (mobile !== isMobileRef.current) {
        isMobileRef.current = mobile;
        setIsMobile(mobile);
      }
    }

    measureThreshold();
    check();
    setMounted(true);
    document.fonts.ready.then(() => { measureThreshold(); check(); });
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkDesktopSize = useCallback(() => {
    return thresholdRef.current > 0 && window.innerWidth >= thresholdRef.current && window.innerWidth > 600;
  }, []);

  return { isMobile, mounted, checkDesktopSize };
}
