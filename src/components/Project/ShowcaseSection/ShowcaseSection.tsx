"use client";

import { useRef, useEffect, ReactNode } from "react";
import Image from "next/image";
import SectionHeader, { type SectionHeaderHandle } from "@/components/SectionHeader/SectionHeader";
import { shouldReduceMotion, observe, EASE, DURATION } from "@/lib/animation";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import styles from "./ShowcaseSection.module.css";

type Props = {
  label: string;
  heading: string;
  description: ReactNode;
  imageSrc: string;
  imageAlt?: string;
  dimImage?: boolean;
};

export default function ShowcaseSection({
  label,
  heading,
  description,
  imageSrc,
  imageAlt = "",
  dimImage,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<SectionHeaderHandle>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (shouldReduceMotion()) return;
    const descEl = descRef.current;
    const imageWrap = imageWrapRef.current;
    if (descEl) { descEl.style.opacity = '0'; descEl.style.transform = 'scale(0.98) translateY(12px)'; }
    if (imageWrap) { imageWrap.style.opacity = '0'; imageWrap.style.transform = 'scale(0.98) translateY(12px)'; }
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;
    const section = sectionRef.current;
    const descEl = descRef.current;
    const imageWrap = imageWrapRef.current;
    if (!section) return;

    // label → heading (80ms) → desc (160ms) → image (240ms)
    const cleanup = observe(section, 0.1, () => {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        headerRef.current?.trigger(0);

        if (descEl) {
          descEl.style.transition = `opacity ${DURATION}ms ${EASE} 160ms, transform ${DURATION}ms ${EASE} 160ms`;
          descEl.style.opacity = '1';
          descEl.style.transform = 'scale(1) translateY(0)';
          setTimeout(() => { descEl.style.transform = ''; descEl.style.transition = ''; }, DURATION + 160);
        }
        if (imageWrap) {
          imageWrap.style.transition = `opacity ${DURATION}ms ${EASE} 240ms, transform ${DURATION}ms ${EASE} 240ms`;
          imageWrap.style.opacity = '1';
          imageWrap.style.transform = 'scale(1) translateY(0)';
          setTimeout(() => { imageWrap.style.transform = ''; imageWrap.style.transition = ''; }, DURATION + 240);
        }
      }));
    });

    return cleanup;
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <SectionHeader ref={headerRef} label={label} heading={heading} skipObserver />
          <div ref={descRef} className={styles.description}>{description}</div>
        </div>
        <div ref={imageWrapRef} className={styles.imageWrap}>
          <Image src={imageSrc} alt={imageAlt} width={1440} height={900} className={`${styles.image}${dimImage ? ` ${styles.dim}` : ""}`} />
        </div>
      </div>
    </section>
  );
}
