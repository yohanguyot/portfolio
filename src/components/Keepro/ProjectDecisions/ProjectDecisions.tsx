"use client";

import { useRef, useEffect } from "react";
import { EyeOff, Group, Layers2 } from "lucide-react";
import SectionHeader, { type SectionHeaderHandle } from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import { shouldReduceMotion, observe, revealEl, observeFeatureCard, STAGGER, afterLayout, isMobileViewport, hideEl, hideFeatureCard } from "@/lib/animation";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import type { Dictionary } from "@/lib/getDictionary";
import styles from "./ProjectDecisions.module.css";

const ICONS = [EyeOff, Group, Layers2];

type Props = { dict: Dictionary["keepro"]["decisions"] };

export default function ProjectDecisions({ dict }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<SectionHeaderHandle>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (shouldReduceMotion()) return;
    const descEl = descRef.current;
    if (descEl) hideEl(descEl);
    hideFeatureCard(featureRef.current?.firstElementChild as HTMLElement | null);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;
    const isMobile = isMobileViewport();
    const cleanups = [
      watchSection(),
      observeFeatureCard(featureRef.current?.firstElementChild as HTMLElement | null, isMobile),
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
        <div className={styles.header}>
          <SectionHeader ref={headerRef} label={dict.label} heading={dict.heading} skipObserver />
          <p ref={descRef} className={styles.description}>{dict.description}</p>
        </div>
        <div ref={featureRef}>
          <FeatureCard direction="horizontal">
            {dict.features.map((f, i) => (
              <FeatureItem
                key={i}
                direction="column"
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
