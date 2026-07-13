"use client";

import { useRef, useEffect } from "react";
import { Hash, Tag, Component } from "lucide-react";
import SectionHeader, { type SectionHeaderHandle } from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import type { Dictionary } from "@/lib/getDictionary";
import { shouldReduceMotion, observe, revealEl, observeFeatureCard, STAGGER, afterLayout, isMobileViewport, hideEl, hideFeatureCard } from "@/lib/animation";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import styles from "./ProjectArchitecture.module.css";

const ICONS = [Hash, Tag, Component];

type Props = { dict: Dictionary["bloom"]["architecture"] };

export default function ProjectArchitecture({ dict }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<SectionHeaderHandle>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardWrapRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (shouldReduceMotion()) return;
    const descEl = descRef.current;
    if (descEl) hideEl(descEl);
    hideFeatureCard(cardWrapRef.current?.firstElementChild as HTMLElement | null);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;
    const isMobile = isMobileViewport();
    const cleanups = [
      watchSection(),
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
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.top}>
          <SectionHeader ref={headerRef} skipObserver label={dict.label} heading={dict.heading} />
          <p ref={descRef} className={styles.description}>{dict.description}</p>
        </div>

        <div ref={cardWrapRef}>
          <FeatureCard direction="horizontal">
            {dict.layers.map((layer, i) => (
              <FeatureItem
                key={layer.title}
                icon={ICONS[i]}
                title={layer.title}
                description={layer.description}
                label={layer.label}
              />
            ))}
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}
