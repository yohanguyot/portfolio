"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { shouldReduceMotion, observe, EASE, DURATION } from "@/lib/animation";
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
  const colsRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (shouldReduceMotion()) return;
    const colsEl = colsRef.current;
    if (!colsEl) return;
    Array.from(colsEl.children as HTMLCollectionOf<HTMLElement>).forEach(col => {
      col.style.opacity = '1'; // neutralise le opacity:0 CSS (SSR), les enfants prennent le relais
      const imageWrap = col.firstElementChild as HTMLElement | null;
      const text = col.lastElementChild as HTMLElement | null;
      if (imageWrap) { imageWrap.style.opacity = '0'; imageWrap.style.transform = 'scale(0.98) translateY(12px)'; }
      if (text) { text.style.opacity = '0'; text.style.transform = 'scale(0.98) translateY(12px)'; }
    });
    void colsEl.offsetHeight;
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;
    const colsEl = colsRef.current;
    if (!colsEl) return;

    const cols = Array.from(colsEl.children as HTMLCollectionOf<HTMLElement>);
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;
    const cleanups: (() => void)[] = [];

    if (isMobile) {
      // Empilé : chaque imageWrap et text a son propre observer, cascade naturelle au scroll.
      cols.forEach(col => {
        const imageWrap = col.firstElementChild as HTMLElement | null;
        const text = col.lastElementChild as HTMLElement | null;
        [imageWrap, text].forEach(el => {
          if (!el) return;
          cleanups.push(observe(el, 0.2, () => {
            requestAnimationFrame(() => requestAnimationFrame(() => {
              el.style.transition = `opacity ${DURATION}ms ${EASE}, transform ${DURATION}ms ${EASE}`;
              el.style.opacity = '1';
              el.style.transform = 'scale(1) translateY(0)';
              setTimeout(() => { el.style.transform = ''; el.style.transition = ''; }, DURATION);
            }));
          }));
        });
      });
    } else {
      // Côte à côte : un seul trigger sur le container + stagger orchestré gauche→droite,
      // image en premier dans chaque colonne, texte +80ms après.
      cleanups.push(observe(colsEl, 0.1, () => {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          cols.forEach((col, i) => {
            const imageWrap = col.firstElementChild as HTMLElement | null;
            const text = col.lastElementChild as HTMLElement | null;
            const imgDelay = i * 80;
            const textDelay = i * 80 + 80;
            if (imageWrap) {
              imageWrap.style.transition = `opacity ${DURATION}ms ${EASE} ${imgDelay}ms, transform ${DURATION}ms ${EASE} ${imgDelay}ms`;
              imageWrap.style.opacity = '1';
              imageWrap.style.transform = 'scale(1) translateY(0)';
              setTimeout(() => { imageWrap.style.transform = ''; imageWrap.style.transition = ''; }, DURATION + imgDelay);
            }
            if (text) {
              text.style.transition = `opacity ${DURATION}ms ${EASE} ${textDelay}ms, transform ${DURATION}ms ${EASE} ${textDelay}ms`;
              text.style.opacity = '1';
              text.style.transform = 'scale(1) translateY(0)';
              setTimeout(() => { text.style.transform = ''; text.style.transition = ''; }, DURATION + textDelay);
            }
          });
        }));
      }));
    }

    return () => cleanups.forEach(fn => fn());
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeader label={label} heading={heading} />
        <div ref={colsRef} className={styles.cols}>
          {items.map((item) => (
            <div key={item.title} className={styles.col}>
              <div className={styles.imageWrap}>
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  width={1440}
                  height={900}
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
