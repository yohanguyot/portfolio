"use client";

import { useRef, useEffect } from "react";
import { TriangleAlert, Layers } from "lucide-react";
import Image from "next/image";
import SectionHeader, { type SectionHeaderHandle } from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import type { Dictionary } from "@/lib/getDictionary";
import { shouldReduceMotion, observe, revealEl, observeFeatureCard, STAGGER, afterLayout, isMobileViewport, hideEl, hideFeatureCard } from "@/lib/animation";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import styles from "./ProjectDecision.module.css";

const ICONS = [TriangleAlert, Layers];

type Props = { dict: Dictionary["bloom"]["decision"] };

export default function ProjectDecision({ dict }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<SectionHeaderHandle>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const cardWrapRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (shouldReduceMotion()) return;
    const descEl = descRef.current;
    const imageWrap = imageWrapRef.current;
    if (descEl) hideEl(descEl);
    if (imageWrap) hideEl(imageWrap);
    hideFeatureCard(cardWrapRef.current?.firstElementChild as HTMLElement | null);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;
    const isMobile = isMobileViewport();
    const cleanups = [
      watchSection(),
      watchImage(),
      observeFeatureCard(cardWrapRef.current?.firstElementChild as HTMLElement | null, isMobile),
    ];
    return () => cleanups.forEach(fn => fn());

    function watchSection(): () => void {
      const section = sectionRef.current;
      if (!section) return () => {};
      const descEl = descRef.current;
      return observe(section, isMobile ? 0 : 0.1, () => {
        afterLayout(() => {
          headerRef.current?.trigger(0);
          if (descEl) revealEl(descEl, 2 * STAGGER);
        });
      }, isMobile ? '0px 0px -15% 0px' : '0px');
    }

    function watchImage(): () => void {
      const imageWrap = imageWrapRef.current;
      if (!imageWrap) return () => {};
      return observe(imageWrap, 0.1, () => {
        afterLayout(() => revealEl(imageWrap!));
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.top}>
          <SectionHeader ref={headerRef} skipObserver label={dict.label} heading={dict.heading} />
          <p ref={descRef} className={styles.description}>{dict.description}</p>
        </div>

        <div ref={imageWrapRef} className={styles.imageWrap}>
          <Image
            src="/images/projects/bloom/tokens.png"
            alt="Diagramme des tokens Bloom : primitifs, sémantiques et composants"
            width={1440}
            height={900}
            className={styles.image}
          />
        </div>

        <div ref={cardWrapRef}>
          <FeatureCard direction="horizontal">
            {dict.features.map((f, i) => (
              <FeatureItem
                key={f.title}
                icon={ICONS[i]}
                title={f.title}
                description={f.description}
              />
            ))}
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}
