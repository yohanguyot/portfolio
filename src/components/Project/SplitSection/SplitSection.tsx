"use client";

import { Children, cloneElement, isValidElement, useRef, useEffect, type ReactNode, type Ref } from "react";
import Image from "next/image";
import SectionHeader, { type SectionHeaderHandle } from "@/components/SectionHeader/SectionHeader";
import { shouldReduceMotion, observe, revealEl, STAGGER, afterLayout, isMobileViewport, hideEl } from "@/lib/animation";
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
            hideEl(bodyDiv);
    }
        hideEl(imageWrap);
    void imageWrap.offsetHeight;
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;
    const section = sectionRef.current;
    const textCol = textColRef.current;
    const imageWrap = imageWrapRef.current;
    if (!section || !textCol || !imageWrap) return;

    const isMobile = isMobileViewport();
    const bodyDiv = textCol.lastElementChild as HTMLElement | null;
    const cleanups = isMobile ? watchMobile() : [watchDesktop()];
    return () => cleanups.forEach(fn => fn());

    function watchMobile(): (() => void)[] {
      return [
        observe(section!, 0, () => {
          afterLayout(() => {
            internalHeaderRef.current?.trigger(0);
            if (bodyDiv) revealEl(bodyDiv, 2 * STAGGER);
          });
        }, '0px 0px -15% 0px'),
        observe(imageWrap!, 0.2, () => {
          afterLayout(() => revealEl(imageWrap!));
        }),
      ];
    }

    function watchDesktop(): () => void {
      const imageFirst = imagePosition === 'left';
      const headerDelay = imageFirst ? 80 : 0;
      const imgDelay = imageFirst ? 0 : 80;
      const bodyDelay = headerDelay + 2 * STAGGER;
      return observe(section!, 0.1, () => {
        afterLayout(() => {
          internalHeaderRef.current?.trigger(headerDelay);
          revealEl(imageWrap!, imgDelay);
          if (bodyDiv) revealEl(bodyDiv, bodyDelay);
        });
      }, '0px');
    }
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
