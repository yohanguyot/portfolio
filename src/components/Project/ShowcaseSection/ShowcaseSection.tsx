"use client";

import { useRef, useEffect, ReactNode } from "react";
import Image from "next/image";
import SectionHeader, { type SectionHeaderHandle } from "@/components/SectionHeader/SectionHeader";
import { shouldReduceMotion, observe, revealEl, STAGGER, afterLayout, isMobileViewport, hideEl } from "@/lib/animation";
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
    if (descEl) hideEl(descEl);
    if (imageWrap) hideEl(imageWrap);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;
    const section = sectionRef.current;
    if (!section) return;

    const isMobile = isMobileViewport();
    const cleanups = [watchText(), watchImage()];
    return () => cleanups.forEach(fn => fn());

    function watchText(): () => void {
      const descEl = descRef.current;
      return observe(section!, isMobile ? 0 : 0.1, () => {
        afterLayout(() => {
          headerRef.current?.trigger(0);
          if (descEl) revealEl(descEl, 2 * STAGGER);
        });
      }, isMobile ? '0px 0px -15% 0px' : '0px');
    }

    function watchImage(): () => void {
      const imageWrap = imageWrapRef.current;
      if (!imageWrap) return () => {};
      return observe(imageWrap, isMobile ? 0.2 : 0.1, () => {
        afterLayout(() => revealEl(imageWrap!));
      });
    }
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
