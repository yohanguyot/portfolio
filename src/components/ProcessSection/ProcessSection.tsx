"use client";

import { useRef, useEffect } from "react";
import { Search, Layers, RefreshCw, PackageCheck } from "lucide-react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import SquareIcon from "@/components/SquareIcon/SquareIcon";
import type { Dictionary } from "@/lib/getDictionary";
import { shouldReduceMotion, observe, EASE, DURATION } from "@/lib/animation";
import styles from "./ProcessSection.module.css";

const STEP_ICONS = [Search, Layers, RefreshCw, PackageCheck] as const;

export default function ProcessSection({ dict }: { dict: Dictionary["process"] }) {
  const descRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduceMotion()) return;

    const cleanups: (() => void)[] = [];

    // SectionHeader gère label + h2. On anime seulement la description.
    const desc = descRef.current;

    if (desc) { desc.style.transition = 'none'; desc.style.opacity = '0'; desc.style.transform = 'scale(0.98) translateY(12px)'; }
    void desc?.offsetHeight;

    cleanups.push(observe(desc, 0.3, () => {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (desc) {
          desc.style.transition = `opacity ${DURATION}ms ${EASE}, transform ${DURATION}ms ${EASE}`;
          desc.style.opacity = '1';
          desc.style.transform = 'scale(1) translateY(0)';
          setTimeout(() => { desc.style.transform = ''; desc.style.transition = ''; }, DURATION);
        }
      }));
    }));

    // ── Steps grid ──
    const grid = gridRef.current;
    if (grid) {
      const steps = Array.from(grid.children as HTMLCollectionOf<HTMLElement>);
      const isMobile = window.matchMedia('(max-width: 768px)').matches;

      grid.style.opacity = '0';
      steps.forEach(s => {
        s.style.transition = 'none';
        s.style.opacity = '0';
        s.style.transform = 'scale(0.98) translateY(12px)';
      });

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
              s.style.transition = `opacity ${DURATION}ms ${EASE} ${i * 120}ms, transform ${DURATION}ms ${EASE} ${i * 120}ms`;
              s.style.opacity = '1';
              s.style.transform = 'scale(1) translateY(0)';
              setTimeout(() => { s.style.transform = ''; s.style.transition = ''; }, DURATION + i * 120);
            });
          }));
        }));
      }
    }

    return () => cleanups.forEach(fn => fn());
  }, []);

  return (
    <section className={styles.section} id="process">
      <div className={styles.container}>
        <div className={styles.intro}>
          <SectionHeader label={dict.label} heading={dict.heading} />
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
