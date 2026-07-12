"use client";

import { useRef, useEffect, ReactNode } from "react";
import { shouldReduceMotion, observe, EASE, DURATION } from "@/lib/animation";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import styles from "./TextSection.module.css";

type Props = {
  label: string;
  heading: string;
  children: ReactNode;
};

export default function TextSection({ label, heading, children }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (shouldReduceMotion()) return;
    const labelEl = labelRef.current;
    const headingEl = headingRef.current;
    const bodyEl = bodyRef.current;
    if (labelEl) { labelEl.style.opacity = '0'; labelEl.style.transform = 'scale(0.98) translateY(12px)'; }
    if (headingEl) { headingEl.style.opacity = '0'; headingEl.style.transform = 'scale(0.98) translateY(12px)'; }
    if (bodyEl) { bodyEl.style.opacity = '0'; bodyEl.style.transform = 'scale(0.98) translateY(12px)'; }
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;
    const section = sectionRef.current;
    const labelEl = labelRef.current;
    const headingEl = headingRef.current;
    const bodyEl = bodyRef.current;
    if (!section) return;

    const isMobile = window.matchMedia('(max-width: 1024px)').matches;
    return observe(section, isMobile ? 0 : 0.1, () => {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (labelEl) {
          labelEl.style.transition = `opacity ${DURATION}ms ${EASE}, transform ${DURATION}ms ${EASE}`;
          labelEl.style.opacity = '1';
          labelEl.style.transform = 'scale(1) translateY(0)';
          setTimeout(() => { labelEl.style.transform = ''; labelEl.style.transition = ''; }, DURATION);
        }
        if (headingEl) {
          headingEl.style.transition = `opacity ${DURATION}ms ${EASE} 80ms, transform ${DURATION}ms ${EASE} 80ms`;
          headingEl.style.opacity = '1';
          headingEl.style.transform = 'scale(1) translateY(0)';
          setTimeout(() => { headingEl.style.transform = ''; headingEl.style.transition = ''; }, DURATION + 80);
        }
        if (bodyEl) {
          bodyEl.style.transition = `opacity ${DURATION}ms ${EASE} 160ms, transform ${DURATION}ms ${EASE} 160ms`;
          bodyEl.style.opacity = '1';
          bodyEl.style.transform = 'scale(1) translateY(0)';
          setTimeout(() => { bodyEl.style.transform = ''; bodyEl.style.transition = ''; }, DURATION + 160);
        }
      }));
    }, isMobile ? '0px 0px -15% 0px' : '0px');
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <p ref={labelRef} className={styles.label}>{label}</p>
        <div className={styles.row}>
          <h2 ref={headingRef} className={styles.heading}>{heading}</h2>
          <div ref={bodyRef} className={styles.body}>{children}</div>
        </div>
      </div>
    </section>
  );
}
