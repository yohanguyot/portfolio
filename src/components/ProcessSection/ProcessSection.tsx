"use client";

import { useRef, useEffect } from "react";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { Search, Layers, RefreshCw, PackageCheck } from "lucide-react";
import SectionHeader, { type SectionHeaderHandle } from "@/components/SectionHeader/SectionHeader";
import SquareIcon from "@/components/SquareIcon/SquareIcon";
import type { Dictionary } from "@/lib/getDictionary";
import { shouldReduceMotion, observe, revealEl, STAGGER, afterLayout, isMobileViewport, hideEl } from "@/lib/animation";
import styles from "./ProcessSection.module.css";

const STEP_ICONS = [Search, Layers, RefreshCw, PackageCheck] as const;

export default function ProcessSection({ dict }: { dict: Dictionary["process"] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<SectionHeaderHandle>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (shouldReduceMotion()) return;
    const desc = descRef.current;
    const grid = gridRef.current;
    if (desc) hideEl(desc);
    if (grid) {
      grid.style.opacity = '0';
      Array.from(grid.children as HTMLCollectionOf<HTMLElement>).forEach(s => {
        hideEl(s);
      });
    }
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;
    const isMobile = isMobileViewport();
    const cleanups = [watchSection(), watchGrid()];
    return () => cleanups.forEach(fn => fn());

    function watchSection(): () => void {
      const section = sectionRef.current;
      if (!section) return () => {};
      const desc = descRef.current;
      return observe(section, isMobile ? 0 : 0.1, () => {
        afterLayout(() => {
          headerRef.current?.trigger(0);
          if (desc) revealEl(desc, 2 * STAGGER);
        });
      }, isMobile ? '0px 0px -15% 0px' : '0px');
    }

    function watchGrid(): () => void {
      const grid = gridRef.current;
      if (!grid) return () => {};
      const steps = Array.from(grid.children as HTMLCollectionOf<HTMLElement>);
      if (isMobile) {
        const gridCleanup = observe(grid, 0, () => {
          grid.style.transition = 'none';
          grid.style.opacity = '1';
        });
        const stepCleanups = steps.map(s =>
          observe(s, 0.2, () => {
            afterLayout(() => revealEl(s));
          })
        );
        return () => { gridCleanup(); stepCleanups.forEach(fn => fn()); };
      }
      return observe(grid, 0.1, () => {
        grid.style.transition = 'none';
        grid.style.opacity = '1';
        afterLayout(() => {
          steps.forEach((s, i) => revealEl(s, i * STAGGER));
        });
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="process">
      <div className={styles.container}>
        <div className={styles.intro}>
          <SectionHeader ref={headerRef} label={dict.label} heading={dict.heading} skipObserver />
          <p ref={descRef} className={styles.description}>{dict.description}</p>
        </div>

        <div ref={gridRef} className={styles.stepsGrid}>
          {dict.steps.map(({ title, description, label }, i) => (
            <div key={label} className={styles.step}>
              <div className={styles.stepContent}>
                <SquareIcon icon={STEP_ICONS[i]} />
                <div className={styles.body}>
                  <h3 className={styles.stepTitle}>{title}</h3>
                  <p className={styles.stepDesc}>{description}</p>
                </div>
              </div>
              <p className={styles.stepLabel}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
