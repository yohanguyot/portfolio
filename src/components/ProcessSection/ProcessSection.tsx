"use client";

import { useRef, useEffect } from "react";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { Search, Layers, RefreshCw, PackageCheck } from "lucide-react";
import SectionHeader, { type SectionHeaderHandle } from "@/components/SectionHeader/SectionHeader";
import SquareIcon from "@/components/SquareIcon/SquareIcon";
import type { Dictionary } from "@/lib/getDictionary";
import { shouldReduceMotion, observe, EASE, DURATION } from "@/lib/animation";
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
    if (desc) { desc.style.opacity = '0'; desc.style.transform = 'scale(0.98) translateY(12px)'; }
    if (grid) {
      grid.style.opacity = '0';
      Array.from(grid.children as HTMLCollectionOf<HTMLElement>).forEach(s => {
        s.style.opacity = '0'; s.style.transform = 'scale(0.98) translateY(12px)';
      });
    }
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;

    const cleanups: (() => void)[] = [];

    const isMobile = window.matchMedia('(max-width: 1024px)').matches;

    const section = sectionRef.current;
    const desc = descRef.current;

    if (section) {
      cleanups.push(observe(section, isMobile ? 0 : 0.1, () => {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          headerRef.current?.trigger(0);
          if (desc) {
            desc.style.transition = `opacity ${DURATION}ms ${EASE} 160ms, transform ${DURATION}ms ${EASE} 160ms`;
            desc.style.opacity = '1';
            desc.style.transform = 'scale(1) translateY(0)';
            setTimeout(() => { desc.style.transform = ''; desc.style.transition = ''; }, DURATION + 160);
          }
        }));
      }, isMobile ? '0px 0px -15% 0px' : '0px'));
    }

    // ── Steps grid ──
    const grid = gridRef.current;
    if (grid) {
      const steps = Array.from(grid.children as HTMLCollectionOf<HTMLElement>);
      if (isMobile) {
        cleanups.push(observe(grid, 0, () => {
          grid.style.transition = 'none';
          grid.style.opacity = '1';
        }));
        steps.forEach(s => {
          cleanups.push(observe(s, 0.2, () => {
            requestAnimationFrame(() => requestAnimationFrame(() => {
              s.style.transition = `opacity ${DURATION}ms ${EASE}, transform ${DURATION}ms ${EASE}`;
              s.style.opacity = '1';
              s.style.transform = 'scale(1) translateY(0)';
              setTimeout(() => { s.style.transform = ''; s.style.transition = ''; }, DURATION);
            }));
          }));
        });
      } else {
        cleanups.push(observe(grid, 0.1, () => {
          grid.style.transition = 'none';
          grid.style.opacity = '1';
          requestAnimationFrame(() => requestAnimationFrame(() => {
            steps.forEach((s, i) => {
              s.style.transition = `opacity ${DURATION}ms ${EASE} ${i * 80}ms, transform ${DURATION}ms ${EASE} ${i * 80}ms`;
              s.style.opacity = '1';
              s.style.transform = 'scale(1) translateY(0)';
              setTimeout(() => { s.style.transform = ''; s.style.transition = ''; }, DURATION + i * 80);
            });
          }));
        }));
      }
    }

    return () => cleanups.forEach(fn => fn());
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
