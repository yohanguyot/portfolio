"use client";

import { Children, cloneElement, isValidElement, useRef, useEffect, type ReactNode, type Ref } from "react";
import Image from "next/image";
import SectionHeader, { type SectionHeaderHandle } from "@/components/SectionHeader/SectionHeader";
import { shouldReduceMotion, observe, EASE, DURATION } from "@/lib/animation";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import styles from "./SplitSection.module.css";

type Props = {
  imageSrc: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  dimImage?: boolean;
  priority?: boolean;
  children: ReactNode;
};

export default function SplitSection({
  imageSrc,
  imageAlt = "",
  imagePosition = "right",
  dimImage,
  priority,
  children,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const internalHeaderRef = useRef<SectionHeaderHandle>(null);

  // Inject skipObserver + ref into the first child (always SectionHeader)
  const childArray = Children.toArray(children);
  const processedChildren = childArray.map((child, i) => {
    if (i === 0 && isValidElement(child)) {
      return cloneElement(child as React.ReactElement<{ ref?: Ref<SectionHeaderHandle>; skipObserver?: boolean }>, {
        ref: internalHeaderRef,
        skipObserver: true,
      });
    }
    return child;
  });

  useIsomorphicLayoutEffect(() => {
    if (shouldReduceMotion()) return;
    const textCol = textColRef.current;
    const imageWrap = imageWrapRef.current;
    if (!textCol || !imageWrap) return;
    // Reveal textCol container immediately (CSS sets opacity:0 for SSR)
    textCol.style.opacity = '1';
    // Hide body (last child) separately so it can cascade after heading
    const bodyDiv = textCol.lastElementChild as HTMLElement | null;
    if (bodyDiv) {
      bodyDiv.style.opacity = '0';
      bodyDiv.style.transform = 'scale(0.98) translateY(12px)';
    }
    imageWrap.style.opacity = '0';
    imageWrap.style.transform = 'scale(0.98) translateY(12px)';
    void imageWrap.offsetHeight;
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;
    const section = sectionRef.current;
    const textCol = textColRef.current;
    const imageWrap = imageWrapRef.current;
    if (!section || !textCol || !imageWrap) return;

    const cleanups: (() => void)[] = [];
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;
    const bodyDiv = textCol.lastElementChild as HTMLElement | null;

    if (isMobile) {
      // Stacked: text cascade on section entry, image when it scrolls into view
      cleanups.push(observe(section, 0, () => {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          internalHeaderRef.current?.trigger(0);
          if (bodyDiv) {
            bodyDiv.style.transition = `opacity ${DURATION}ms ${EASE} 160ms, transform ${DURATION}ms ${EASE} 160ms`;
            bodyDiv.style.opacity = '1';
            bodyDiv.style.transform = 'scale(1) translateY(0)';
            setTimeout(() => { bodyDiv.style.transform = ''; bodyDiv.style.transition = ''; }, DURATION + 160);
          }
        }));
      }, '0px 0px -15% 0px'));

      cleanups.push(observe(imageWrap, 0.2, () => {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          imageWrap.style.transition = `opacity ${DURATION}ms ${EASE}, transform ${DURATION}ms ${EASE}`;
          imageWrap.style.opacity = '1';
          imageWrap.style.transform = 'scale(1) translateY(0)';
          setTimeout(() => { imageWrap.style.transform = ''; imageWrap.style.transition = ''; }, DURATION);
        }));
      }));
    } else {
      // Desktop: side-by-side → single observer + stagger
      // imageLeft : image(0ms) → label(80ms) → heading(160ms) → body(240ms)
      // imageRight: label(0ms) → [image(80ms) + heading(80ms)] → body(160ms)
      const imageFirst = imagePosition === 'left';
      const headerDelay = imageFirst ? 80 : 0;
      const imgDelay = imageFirst ? 0 : 80;
      const bodyDelay = headerDelay + 160;

      cleanups.push(observe(section, 0.1, () => {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          internalHeaderRef.current?.trigger(headerDelay);

          imageWrap.style.transition = `opacity ${DURATION}ms ${EASE} ${imgDelay}ms, transform ${DURATION}ms ${EASE} ${imgDelay}ms`;
          imageWrap.style.opacity = '1';
          imageWrap.style.transform = 'scale(1) translateY(0)';
          setTimeout(() => { imageWrap.style.transform = ''; imageWrap.style.transition = ''; }, DURATION + imgDelay);

          if (bodyDiv) {
            bodyDiv.style.transition = `opacity ${DURATION}ms ${EASE} ${bodyDelay}ms, transform ${DURATION}ms ${EASE} ${bodyDelay}ms`;
            bodyDiv.style.opacity = '1';
            bodyDiv.style.transform = 'scale(1) translateY(0)';
            setTimeout(() => { bodyDiv.style.transform = ''; bodyDiv.style.transition = ''; }, DURATION + bodyDelay);
          }
        }));
      }, '0px'));
    }

    return () => cleanups.forEach(fn => fn());
  }, [imagePosition]);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${imagePosition === "left" ? styles.imageLeft : ""}`}
    >
      <div className={styles.container}>
        <div ref={textColRef} className={styles.textCol}>{processedChildren}</div>
        <div ref={imageWrapRef} className={styles.imageWrap}>
          <Image src={imageSrc} alt={imageAlt} width={1440} height={900} priority={priority} className={`${styles.image}${dimImage ? ` ${styles.dim}` : ""}`} />
        </div>
      </div>
    </section>
  );
}
