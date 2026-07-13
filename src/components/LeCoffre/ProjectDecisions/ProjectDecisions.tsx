"use client";

import { useRef, useEffect } from "react";
import { LayoutPanelLeft, ListChecks, ShieldCheck } from "lucide-react";
import SectionHeader, { type SectionHeaderHandle } from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import { shouldReduceMotion, observe, observeFeatureCard, afterLayout, isMobileViewport, hideFeatureCard } from "@/lib/animation";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import type { Dictionary } from "@/lib/getDictionary";
import styles from "./ProjectDecisions.module.css";

const ICONS = [LayoutPanelLeft, ListChecks, ShieldCheck];

type Props = { dict: Dictionary["lecoffre"]["decisions"] };

export default function ProjectDecisions({ dict }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<SectionHeaderHandle>(null);
  const featureRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (shouldReduceMotion()) return;
    hideFeatureCard(featureRef.current?.firstElementChild as HTMLElement | null);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;
    const isMobile = isMobileViewport();
    const cleanups = [
      watchHeader(),
      observeFeatureCard(featureRef.current?.firstElementChild as HTMLElement | null, isMobile),
    ];
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
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <SectionHeader ref={headerRef} label={dict.label} heading={dict.heading} skipObserver />
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
