import { useState, useEffect } from 'react';

const SECTION_IDS = ['projets', 'a-propos', 'process'];
const NAV_HEIGHT = 60;

export function useScrollSpy(isHome: boolean) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (!isHome) { setActiveSection(null); return; }
    const offset = NAV_HEIGHT + Math.round(window.innerHeight * 0.25);

    function getActive() {
      const scrollY = window.scrollY + offset;
      let active: string | null = null;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) active = id;
      }
      return active;
    }

    function onScroll() { setActiveSection(getActive()); }
    setActiveSection(getActive());
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  return activeSection;
}
