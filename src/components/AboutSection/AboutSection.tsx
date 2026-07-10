"use client";

import { useRef, useEffect } from "react";
import { Component, Route, CodeXml } from "lucide-react";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import type { Dictionary } from "@/lib/getDictionary";
import { shouldReduceMotion, observe, EASE, DURATION } from "@/lib/animation";
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
    bodyPs.forEach(p => { p.style.opacity = '0'; p.style.transform = 'scale(0.98) translateY(12px)'; });
    if (wrapper) wrapper.style.opacity = '0';
    items.forEach(item => { item.style.opacity = '0'; item.style.transform = 'scale(0.98) translateY(12px)'; });
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;

    const cleanups: (() => void)[] = [];

    const bodyDiv = bodyRef.current;
    const bodyPs = bodyDiv ? Array.from(bodyDiv.children as HTMLCollectionOf<HTMLElement>) : [];

    cleanups.push(observe(bodyDiv, 0.3, () => {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        bodyPs.forEach((p, i) => {
          const delay = i * 80;
          p.style.transition = `opacity ${DURATION}ms ${EASE} ${delay}ms, transform ${DURATION}ms ${EASE} ${delay}ms`;
          p.style.opacity = '1';
          p.style.transform = 'scale(1) translateY(0)';
          setTimeout(() => { p.style.transform = ''; p.style.transition = ''; }, DURATION + delay);
        });
      }));
    }));

    // ── Skill card: surface instant + items stagger ──
    const wrapper = cardRef.current;
    if (wrapper) {
      const featureCard = wrapper.firstElementChild as HTMLElement | null;
      const items = featureCard
        ? Array.from(featureCard.children as HTMLCollectionOf<HTMLElement>)
        : [];

      const isMobile = window.matchMedia('(max-width: 768px)').matches;

      if (isMobile) {
        cleanups.push(observe(wrapper, 0, () => {
          wrapper.style.transition = 'none';
          wrapper.style.opacity = '1';
        }));
        items.forEach(item => {
          cleanups.push(observe(item, 0.2, () => {
            requestAnimationFrame(() => requestAnimationFrame(() => {
              item.style.transition = `opacity ${DURATION}ms ${EASE}, transform ${DURATION}ms ${EASE}`;
              item.style.opacity = '1';
              item.style.transform = 'scale(1) translateY(0)';
              setTimeout(() => { item.style.transform = ''; item.style.transition = ''; }, DURATION);
            }));
          }));
        });
      } else {
        cleanups.push(observe(wrapper, 0.1, () => {
          wrapper.style.transition = 'none';
          wrapper.style.opacity = '1';
          requestAnimationFrame(() => requestAnimationFrame(() => {
            items.forEach((item, i) => {
              item.style.transition = `opacity ${DURATION}ms ${EASE} ${i * 80}ms, transform ${DURATION}ms ${EASE} ${i * 80}ms`;
              item.style.opacity = '1';
              item.style.transform = 'scale(1) translateY(0)';
              setTimeout(() => { item.style.transform = ''; item.style.transition = ''; }, DURATION + i * 80);
            });
          }));
        }));
      }
    }

    return () => cleanups.forEach(fn => fn());
  }, []);

  return (
    <section className={styles.section} id="a-propos">
      <div className={styles.container}>
        <div ref={infoRef} className={styles.info}>
          <SectionHeader
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
