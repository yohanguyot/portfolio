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
      col.style.opacity = '0';
      col.style.transform = 'scale(0.98) translateY(12px)';
    });
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;
    const colsEl = colsRef.current;
    if (!colsEl) return;

    const cols = Array.from(colsEl.children as HTMLCollectionOf<HTMLElement>);
    const cleanup = observe(colsEl, 0.1, () => {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        cols.forEach((col, i) => {
          const delay = i * 80;
          col.style.transition = `opacity ${DURATION}ms ${EASE} ${delay}ms, transform ${DURATION}ms ${EASE} ${delay}ms`;
          col.style.opacity = '1';
          col.style.transform = 'scale(1) translateY(0)';
          setTimeout(() => { col.style.transform = ''; col.style.transition = ''; }, DURATION + delay);
        });
      }));
    });

    return cleanup;
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
