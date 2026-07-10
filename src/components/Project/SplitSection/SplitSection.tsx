"use client";

import { useRef, useEffect, ReactNode } from "react";
import Image from "next/image";
import { shouldReduceMotion, observe, EASE, DURATION } from "@/lib/animation";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import styles from "./SplitSection.module.css";

type Props = {
  imageSrc: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  dimImage?: boolean;
  children: ReactNode;
};

export default function SplitSection({
  imageSrc,
  imageAlt = "",
  imagePosition = "right",
  dimImage,
  children,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (shouldReduceMotion()) return;
    const textCol = textColRef.current;
    const imageWrap = imageWrapRef.current;
    if (!textCol || !imageWrap) return;
    textCol.style.opacity = '0';
    textCol.style.transform = 'scale(0.98) translateY(12px)';
    imageWrap.style.opacity = '0';
    imageWrap.style.transform = 'scale(0.98) translateY(12px)';
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;
    const section = sectionRef.current;
    const textCol = textColRef.current;
    const imageWrap = imageWrapRef.current;
    if (!section || !textCol || !imageWrap) return;

    const cleanup = observe(section, 0.1, () => {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        textCol.style.transition = `opacity ${DURATION}ms ${EASE}, transform ${DURATION}ms ${EASE}`;
        textCol.style.opacity = '1';
        textCol.style.transform = 'scale(1) translateY(0)';
        setTimeout(() => { textCol.style.transform = ''; textCol.style.transition = ''; }, DURATION);

        const delay = 80;
        imageWrap.style.transition = `opacity ${DURATION}ms ${EASE} ${delay}ms, transform ${DURATION}ms ${EASE} ${delay}ms`;
        imageWrap.style.opacity = '1';
        imageWrap.style.transform = 'scale(1) translateY(0)';
        setTimeout(() => { imageWrap.style.transform = ''; imageWrap.style.transition = ''; }, DURATION + delay);
      }));
    }, '0px 0px -15% 0px');

    return cleanup;
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${imagePosition === "left" ? styles.imageLeft : ""}`}
    >
      <div className={styles.container}>
        <div ref={textColRef} className={styles.textCol}>{children}</div>
        <div ref={imageWrapRef} className={styles.imageWrap}>
          <Image src={imageSrc} alt={imageAlt} width={1440} height={900} className={`${styles.image}${dimImage ? ` ${styles.dim}` : ""}`} />
        </div>
      </div>
    </section>
  );
}
