"use client";

import { useRef, useEffect } from "react";
import { Component, Route, CodeXml } from "lucide-react";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import SectionHeader, { type SectionHeaderHandle } from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import type { Dictionary } from "@/lib/getDictionary";
import { shouldReduceMotion, observe, revealEl, STAGGER, afterLayout, isMobileViewport, hideEl } from "@/lib/animation";
import styles from "./AboutSection.module.css";

const SKILL_ICONS = [Component, Route, CodeXml] as const;

const BODY_HIGHLIGHTS: Record<string, string[][]> = {
  fr: [
    ["produits complexes"],
    ["double compétence design & front-end"],
  ],
  en: [
    ["complex products"],
    ["dual design & front-end expertise"],
  ],
  es: [
    ["productos complejos"],
    ["doble competencia en diseño y front-end"],
  ],
};

function highlight(text: string, words: string[]) {
  const norm = (s: string) => s.replace(/ /g, ' ').normalize('NFC');
  let parts: React.ReactNode[] = [text];
  for (const word of words) {
    const nWord = norm(word);
    parts = parts.flatMap((part) => {
      if (typeof part !== "string") return [part];
      const nPart = norm(part);
      const result: React.ReactNode[] = [];
      let last = 0;
      let idx = nPart.indexOf(nWord);
      while (idx !== -1) {
        if (idx > last) result.push(part.slice(last, idx));
        result.push(<span key={word + idx} className={styles.highlight}>{part.slice(idx, idx + word.length)}</span>);
        last = idx + word.length;
        idx = nPart.indexOf(nWord, last);
      }
      if (last < part.length) result.push(part.slice(last));
      return result;
    });
  }
  return parts;
}

export default function AboutSection({ dict, lang = "fr" }: { dict: Dictionary["about"]; lang?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<SectionHeaderHandle>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (shouldReduceMotion()) return;
    const bodyDiv = bodyRef.current;
    const wrapper = cardRef.current;
    const bodyPs = bodyDiv ? Array.from(bodyDiv.children as HTMLCollectionOf<HTMLElement>) : [];
    const items = wrapper?.firstElementChild
      ? Array.from((wrapper.firstElementChild as HTMLElement).children as HTMLCollectionOf<HTMLElement>)
      : [];
    bodyPs.forEach(p => { hideEl(p); });
    if (wrapper) wrapper.style.opacity = '0';
    items.forEach(item => { hideEl(item); });
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;
    const isMobile = isMobileViewport();
    const cleanups = [watchSection(), watchCard()];
    return () => cleanups.forEach(fn => fn());

    function watchSection(): () => void {
      const section = sectionRef.current;
      if (!section) return () => {};
      const bodyDiv = bodyRef.current;
      const bodyPs = bodyDiv ? Array.from(bodyDiv.children as HTMLCollectionOf<HTMLElement>) : [];
      return observe(section, isMobile ? 0 : 0.1, () => {
        afterLayout(() => {
          headerRef.current?.trigger(0);
          bodyPs.forEach((p, i) => revealEl(p, 2 * STAGGER + i * STAGGER));
        });
      }, isMobile ? '0px 0px -15% 0px' : '0px');
    }

    function watchCard(): () => void {
      const wrapper = cardRef.current;
      if (!wrapper) return () => {};
      const featureCard = wrapper.firstElementChild as HTMLElement | null;
      if (!featureCard) return () => {};
      const items = Array.from(featureCard.children as HTMLCollectionOf<HTMLElement>);
      if (!items.length) return () => {};
      if (isMobile) {
        const cardCleanup = observe(wrapper, 0, () => {
          wrapper.style.transition = 'none';
          wrapper.style.opacity = '1';
        });
        const itemCleanups = items.map(item =>
          observe(item, 0.2, () => {
            afterLayout(() => revealEl(item));
          })
        );
        return () => { cardCleanup(); itemCleanups.forEach(fn => fn()); };
      }
      return observe(wrapper, 0.1, () => {
        wrapper.style.transition = 'none';
        wrapper.style.opacity = '1';
        afterLayout(() => {
          items.forEach((item, i) => revealEl(item, i * STAGGER));
        });
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="a-propos">
      <div className={styles.container}>
        <div ref={infoRef} className={styles.info}>
          <SectionHeader
            ref={headerRef}
            skipObserver
            label={dict.label}
            heading={
              <>
                {dict.headingPre}
                {dict.headingBreak && <br className={styles.headingBreak} />}
                <span className={styles.accent}>{dict.headingAccent}</span>
                {dict.headingPost}
              </>
            }
          />

          <div ref={bodyRef} className={styles.body}>
            {dict.body.map((text, i) => (
              <p key={i} className={styles.bodyText}>
                {highlight(text, BODY_HIGHLIGHTS[lang]?.[i] ?? [])}
              </p>
            ))}
          </div>
        </div>

        <div ref={cardRef} className={styles.card}>
          <FeatureCard>
            {dict.skills.map(({ title, description }, i) => (
              <FeatureItem key={title} icon={SKILL_ICONS[i]} title={title} description={description} />
            ))}
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}
