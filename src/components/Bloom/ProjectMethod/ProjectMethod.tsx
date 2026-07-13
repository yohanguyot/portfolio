"use client";

import { useRef, useEffect } from "react";
import { FileCheck, Variable } from "lucide-react";
import SectionHeader, { type SectionHeaderHandle } from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import type { Dictionary } from "@/lib/getDictionary";
import { shouldReduceMotion, observe, revealEl, observeFeatureCard, STAGGER, afterLayout, isMobileViewport, hideEl, hideFeatureCard } from "@/lib/animation";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import styles from "./ProjectMethod.module.css";

const ICONS = [FileCheck, Variable];

type Props = { dict: Dictionary["bloom"]["method"] };

export default function ProjectMethod({ dict }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<SectionHeaderHandle>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const cardWrapRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (shouldReduceMotion()) return;
    const bodyEl = bodyRef.current;
    const bodyPs = bodyEl ? Array.from(bodyEl.children as HTMLCollectionOf<HTMLElement>) : [];
    bodyPs.forEach(p => { hideEl(p); });
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
      const bodyEl = bodyRef.current;
      const bodyPs = bodyEl ? Array.from(bodyEl.children as HTMLCollectionOf<HTMLElement>) : [];
      return observe(section, isMobile ? 0 : 0.1, () => {
        afterLayout(() => {
          headerRef.current?.trigger(0);
          bodyPs.forEach((p, i) => revealEl(p, 2 * STAGGER + i * STAGGER));
        });
      }, isMobile ? '0px 0px -15% 0px' : '0px');
    }
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <SectionHeader
            ref={headerRef}
            skipObserver
            label={dict.label}
            heading={dict.heading.split("\n").map((line, i) => (
              <span key={i} style={{ display: "block" }}>{line}</span>
            ))}
          />
          <div ref={bodyRef} className={styles.body}>
            <p className={styles.paragraph}>{dict.p1}</p>
            <p className={styles.paragraph}>{dict.p2}</p>
          </div>
        </div>

        <div ref={cardWrapRef} className={styles.featureCard}>
          <FeatureCard>
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
