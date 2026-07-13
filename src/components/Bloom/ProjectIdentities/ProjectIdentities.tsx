"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import SectionHeader, { type SectionHeaderHandle } from "@/components/SectionHeader/SectionHeader";
import type { Dictionary } from "@/lib/getDictionary";
import { shouldReduceMotion, observe, revealEl, STAGGER, afterLayout, isMobileViewport, hideEl } from "@/lib/animation";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import styles from "./ProjectIdentities.module.css";

type Props = { dict: Dictionary["bloom"]["identities"] };

export default function ProjectIdentities({ dict }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<SectionHeaderHandle>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (shouldReduceMotion()) return;
    const bodyEl = bodyRef.current;
    const imagesEl = imagesRef.current;
    const bodyPs = bodyEl ? Array.from(bodyEl.children as HTMLCollectionOf<HTMLElement>) : [];
    const imageWraps = imagesEl ? Array.from(imagesEl.children as HTMLCollectionOf<HTMLElement>) : [];
    bodyPs.forEach(p => { hideEl(p); });
    imageWraps.forEach(img => { hideEl(img); });
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;
    const isMobile = isMobileViewport();
    const cleanups = [watchSection(), watchImages()];
    return () => cleanups.forEach(fn => fn());

    function watchSection(): () => void {
      const section = sectionRef.current;
      if (!section) return () => {};
      const bodyEl = bodyRef.current;
      const bodyPs = bodyEl ? Array.from(bodyEl.children as HTMLCollectionOf<HTMLElement>) : [];
      return observe(section, isMobile ? 0 : 0.1, () => {
        afterLayout(() => {
          headerRef.current?.trigger(0);
          bodyPs.forEach((p, i) => revealEl(p, 2 * STAGGER + i * STAGGER));
        });
      }, isMobile ? '0px 0px -15% 0px' : '0px');
    }

    function watchImages(): () => void {
      const imagesEl = imagesRef.current;
      if (!imagesEl) return () => {};
      const imageWraps = Array.from(imagesEl.children as HTMLCollectionOf<HTMLElement>);
      if (!imageWraps.length) return () => {};
      if (isMobile) {
        const imgCleanups = imageWraps.map(img =>
          observe(img, 0.2, () => {
            afterLayout(() => revealEl(img));
          })
        );
        return () => imgCleanups.forEach(fn => fn());
      }
      return observe(imagesEl, 0.1, () => {
        afterLayout(() => {
          imageWraps.forEach((img, i) => revealEl(img, i * STAGGER));
        });
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.top}>
          <SectionHeader ref={headerRef} skipObserver label={dict.label} heading={dict.heading} />
          <div ref={bodyRef} className={styles.body}>
            <p className={styles.paragraph}>{dict.p1}</p>
            <p className={styles.paragraph}>{dict.p2}</p>
          </div>
        </div>

        <div ref={imagesRef} className={styles.images}>
          <div className={styles.imageWrap}>
            <Image
              src="/images/projects/bloom/erable-theme.png"
              alt="Interface Bloom avec le thème Erable"
              width={1440}
              height={900}
              className={`${styles.image} ${styles.imageDim}`}
            />
          </div>
          <div className={styles.imageWrap}>
            <Image
              src="/images/projects/bloom/lqr-house-theme.png"
              alt="Interface Bloom avec le thème LQR House"
              width={1440}
              height={900}
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
