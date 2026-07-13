"use client";

import { useRef, useEffect } from "react";
import { GitFork, ListChecks, Tag, Lock } from "lucide-react";
import Image from "next/image";
import SectionHeader, { type SectionHeaderHandle } from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import { shouldReduceMotion, observe, revealEl, observeFeatureCard, STAGGER, afterLayout, isMobileViewport, hideEl, hideFeatureCard } from "@/lib/animation";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import type { Dictionary } from "@/lib/getDictionary";
import styles from "./ProjectCGP.module.css";

const ICONS = [GitFork, ListChecks, Tag, Lock];

type Props = { dict: Dictionary["wenimmo"]["cgp"] };

export default function ProjectCGP({ dict }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<SectionHeaderHandle>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (shouldReduceMotion()) return;
    const paragraphEl = paragraphRef.current;
    const imageWrap = imageWrapRef.current;
    if (paragraphEl) hideEl(paragraphEl);
    if (imageWrap) hideEl(imageWrap);
    hideFeatureCard(featureRef.current?.firstElementChild as HTMLElement | null);
    void imageWrap?.offsetHeight;
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;
    const section = sectionRef.current;
    if (!section) return;
    const isMobile = isMobileViewport();
    const cleanups = [
      watchSplit(),
      observeFeatureCard(featureRef.current?.firstElementChild as HTMLElement | null, isMobile),
    ];
    return () => cleanups.forEach(fn => fn());

    function watchSplit(): () => void {
      const imageWrap = imageWrapRef.current;
      const paragraphEl = paragraphRef.current;
      if (isMobile) {
        const textCleanup = observe(section!, 0, () => {
          afterLayout(() => {
            headerRef.current?.trigger(0);
            if (paragraphEl) revealEl(paragraphEl, 2 * STAGGER);
          });
        }, '0px 0px -15% 0px');
        if (!imageWrap) return textCleanup;
        const imgCleanup = observe(imageWrap, 0.2, () => {
          afterLayout(() => revealEl(imageWrap!));
        });
        return () => { textCleanup(); imgCleanup(); };
      }
      return observe(section!, 0.1, () => {
        afterLayout(() => {
          headerRef.current?.trigger(0);
          if (paragraphEl) revealEl(paragraphEl, 2 * STAGGER);
          if (imageWrap) revealEl(imageWrap, STAGGER);
        });
      }, '0px');
    }

  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.split}>
          <div className={styles.textCol}>
            <SectionHeader ref={headerRef} label={dict.label} heading={dict.heading} skipObserver />
            <p ref={paragraphRef} className={styles.paragraph}>{dict.description}</p>
          </div>
          <div ref={imageWrapRef} className={styles.imageWrap}>
            <Image
              src="/images/projects/wenimmo/cgp.png"
              alt="Interface Wenimmo — tunnel de souscription CGP"
              width={1440}
              height={900}
              className={styles.image}
            />
          </div>
        </div>

        <div ref={featureRef}>
          <FeatureCard direction="horizontal" wrap>
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
