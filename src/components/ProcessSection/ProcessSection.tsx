"use client";

import { useRef, useEffect } from "react";
import { Search, Layers, RefreshCw, PackageCheck } from "lucide-react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import SquareIcon from "@/components/SquareIcon/SquareIcon";
import type { Dictionary } from "@/lib/getDictionary";
import { shouldReduceMotion, reveal, observe, wrapWords, revealWords, EASE, DURATION } from "@/lib/animation";
import styles from "./ProcessSection.module.css";

const STEP_ICONS = [Search, Layers, RefreshCw, PackageCheck] as const;

export default function ProcessSection({ dict }: { dict: Dictionary["process"] }) {
  const introRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduceMotion()) return;

    const cleanups: (() => void)[] = [];

    // ── Intro: label + heading word reveal + description ──
    const introEl = introRef.current;
    const label = introEl?.querySelector<HTMLElement>('p:first-child') ?? introEl?.querySelector<HTMLElement>('[class*="label"]');
    const h2 = introEl?.querySelector<HTMLElement>('h2');
    const desc = introEl?.querySelector<HTMLElement>(`.${styles.description}`);

    if (label) {
      label.style.transition = 'none';
      label.style.opacity = '0';
      label.style.transform = 'translateY(8px)';
    }
    const words = h2 ? wrapWords(h2) : [];
    if (desc) {
      desc.style.transition = 'none';
      desc.style.opacity = '0';
      desc.style.transform = 'scale(0.98) translateY(12px)';
    }

    cleanups.push(observe(introEl, 0.3, () => {
      if (label) {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          label.style.transition = `opacity 600ms ${EASE}, transform 600ms ${EASE}`;
          label.style.opacity = '1';
          label.style.transform = 'translateY(0)';
          setTimeout(() => { label.style.transform = ''; label.style.transition = ''; }, 600);
        }));
      }
      revealWords(words, 80, 50);
      if (desc) {
        const descDelay = words.length * 50 + 160;
        requestAnimationFrame(() => requestAnimationFrame(() => {
          desc.style.transition = `opacity ${DURATION}ms ${EASE} ${descDelay}ms, transform ${DURATION}ms ${EASE} ${descDelay}ms`;
          desc.style.opacity = '1';
          desc.style.transform = 'scale(1) translateY(0)';
          setTimeout(() => { desc.style.transform = ''; desc.style.transition = ''; }, DURATION + descDelay);
        }));
      }
    }));

    // ── Steps grid ──
    const grid = gridRef.current;
    if (grid) {
      const steps = Array.from(grid.querySelectorAll<HTMLElement>(`:scope > .${styles.step}`));
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
        <div ref={introRef} className={styles.intro}>
          <SectionHeader label={dict.label} heading={dict.heading} />
          <p className={styles.description}>{dict.description}</p>
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
