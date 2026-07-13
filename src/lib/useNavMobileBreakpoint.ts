import { useState, useRef, useLayoutEffect, useCallback } from 'react';

export function useNavMobileBreakpoint(navRef: React.RefObject<HTMLElement | null>) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const thresholdRef = useRef(0);
  const isMobileRef = useRef(false);

  useLayoutEffect(() => {
    if (!navRef.current) return;

    function measureThreshold() {
      if (!navRef.current || isMobileRef.current) return;
      thresholdRef.current = navRef.current.scrollWidth + 48;
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
