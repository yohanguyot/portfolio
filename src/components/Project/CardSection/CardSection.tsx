"use client";

import { useRef, useEffect, ReactNode } from "react";
import SectionHeader, { type SectionHeaderHandle } from "@/components/SectionHeader/SectionHeader";
import { shouldReduceMotion, observe, EASE, DURATION, revealEl, STAGGER, afterLayout, hideEl, isMobileViewport } from "@/lib/animation";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import styles from "./CardSection.module.css";

type Props = {
  label: string;
  heading: string;
  children: ReactNode;
};

export default function CardSection({ label, heading, children }: Props) {
  const headerRef = useRef<SectionHeaderHandle>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (shouldReduceMotion()) return;
    const card = cardRef.current;
    const body = bodyRef.current;
    if (!card) return;
    card.style.opacity = '1'; // override CSS opacity:0 — parent visible, seuls les enfants portent l'animation
    card.style.transform = 'scale(0.97) translateY(24px)';
    if (body) hideEl(body);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;
    const card = cardRef.current;
    const body = bodyRef.current;
    if (!card) return;

    const isMobile = isMobileViewport();
    const cleanup = observe(card, isMobile ? 0 : 0.1, () => {
      afterLayout(() => {
        headerRef.current?.trigger(0);

        card.style.transition = `transform ${DURATION}ms ${EASE}`;
        card.style.transform = 'scale(1) translateY(0)';
        setTimeout(() => { card.style.transform = ''; card.style.transition = ''; }, DURATION);

        if (body) {
          const delay = 2 * STAGGER;
          revealEl(body, delay);
        }
      });
    }, isMobile ? '0px' : '0px 0px -5% 0px');

    return cleanup;
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div ref={cardRef} className={styles.card}>
          <SectionHeader ref={headerRef} label={label} heading={heading} skipObserver />
          <div ref={bodyRef} className={styles.body}>{children}</div>
        </div>
      </div>
    </section>
  );
}
