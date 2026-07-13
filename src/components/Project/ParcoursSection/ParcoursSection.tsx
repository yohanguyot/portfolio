"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import SectionHeader, { type SectionHeaderHandle } from "@/components/SectionHeader/SectionHeader";
import { shouldReduceMotion, observe, revealEl, STAGGER, afterLayout, isMobileViewport, hideEl } from "@/lib/animation";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import styles from "./ParcoursSection.module.css";

export type ParcoursItem = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
};

type Props = {
  label: string;
  heading: string;
  items: ParcoursItem[];
  dimImage?: boolean;
};

export default function ParcoursSection({ label, heading, items, dimImage }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<SectionHeaderHandle>(null);
  const colsRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (shouldReduceMotion()) return;
    const colsEl = colsRef.current;
    if (!colsEl) return;
    Array.from(colsEl.children as HTMLCollectionOf<HTMLElement>).forEach(col => {
      col.style.opacity = '1'; // neutralise le opacity:0 CSS (SSR), les enfants prennent le relais
      const imageWrap = col.firstElementChild as HTMLElement | null;
      const text = col.lastElementChild as HTMLElement | null;
      if (imageWrap) hideEl(imageWrap);
      if (text) hideEl(text);
    });
    void colsEl.offsetHeight;
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;
    const colsEl = colsRef.current;
    if (!colsEl) return;

    const cols = Array.from(colsEl.children as HTMLCollectionOf<HTMLElement>);
    const isMobile = isMobileViewport();
    const cleanups = [watchHeader(), watchCols()];
    return () => cleanups.forEach(fn => fn());

    function watchHeader(): () => void {
      const section = sectionRef.current;
      if (!section) return () => {};
      return observe(section, isMobile ? 0 : 0.1, () => {
        afterLayout(() => {
          headerRef.current?.trigger(0);
        });
      }, isMobile ? '0px 0px -15% 0px' : '0px');
    }

    function watchCols(): () => void {
      if (isMobile) {
        const elCleanups = cols.flatMap(col => {
          const imageWrap = col.firstElementChild as HTMLElement | null;
          const text = col.lastElementChild as HTMLElement | null;
          return [imageWrap, text].filter(Boolean).map(el =>
            observe(el!, 0.2, () => {
              afterLayout(() => revealEl(el!));
            })
          );
        });
        return () => elCleanups.forEach(fn => fn());
      }
      return observe(colsEl!, 0.1, () => {
        afterLayout(() => {
          cols.forEach((col, i) => {
            const imageWrap = col.firstElementChild as HTMLElement | null;
            const text = col.lastElementChild as HTMLElement | null;
            if (imageWrap) revealEl(imageWrap, i * STAGGER);
            if (text) revealEl(text, i * STAGGER + STAGGER);
          });
        });
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <SectionHeader ref={headerRef} skipObserver label={label} heading={heading} />
        <div ref={colsRef} className={styles.cols}>
          {items.map((item, i) => (
            <div key={item.title} className={styles.col}>
              <div className={styles.imageWrap}>
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  width={1440}
                  height={900}
                  loading={i === 0 ? "eager" : "lazy"}
                  className={`${styles.image}${dimImage ? ` ${styles.dim}` : ""}`}
                />
              </div>
              <div className={styles.text}>
                <p className={styles.title}>{item.title}</p>
                <p className={styles.desc}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
