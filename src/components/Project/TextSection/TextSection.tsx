"use client";

import { useRef, useEffect, ReactNode } from "react";
import { shouldReduceMotion, observe, revealEl, STAGGER, afterLayout, isMobileViewport, hideEl } from "@/lib/animation";
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
    if (labelEl) hideEl(labelEl);
    if (headingEl) hideEl(headingEl);
    if (bodyEl) hideEl(bodyEl);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;
    const section = sectionRef.current;
    const labelEl = labelRef.current;
    const headingEl = headingRef.current;
    const bodyEl = bodyRef.current;
    if (!section) return;

    const isMobile = isMobileViewport();
    return observe(section, isMobile ? 0 : 0.1, () => {
      afterLayout(() => {
        if (labelEl) {
          revealEl(labelEl);
        }
        if (headingEl) {
          revealEl(headingEl, STAGGER);
        }
        if (bodyEl) {
          revealEl(bodyEl, 2 * STAGGER);
        }
      });
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
