"use client";

import { useRef, useEffect } from "react";
import { Component, Route, CodeXml } from "lucide-react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import type { Dictionary } from "@/lib/getDictionary";
import { shouldReduceMotion, reveal, observe, wrapWords, revealWords, EASE, DURATION } from "@/lib/animation";
import styles from "./AboutSection.module.css";

const SKILL_ICONS = [Component, Route, CodeXml] as const;

export default function AboutSection({ dict }: { dict: Dictionary["about"] }) {
  const infoRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduceMotion()) return;

    const cleanups: (() => void)[] = [];

    // ── Info: label + heading word reveal + body paragraphs ──
    const infoEl = infoRef.current;
    const label = infoEl?.querySelector<HTMLElement>('p.'+styles.sectionLabel) ?? infoEl?.querySelector<HTMLElement>('[class*="label"]');
    const h2 = infoEl?.querySelector<HTMLElement>('h2');
    const bodyPs = infoEl ? Array.from(infoEl.querySelectorAll<HTMLElement>(`.${styles.bodyText}`)) : [];

    if (label) {
      label.style.transition = 'none';
      label.style.opacity = '0';
      label.style.transform = 'translateY(8px)';
    }
    const words = h2 ? wrapWords(h2) : [];
    bodyPs.forEach((p, i) => {
      p.style.transition = 'none';
      p.style.opacity = '0';
      p.style.transform = 'scale(0.98) translateY(12px)';
      void p.offsetHeight;
    });

    cleanups.push(observe(infoEl, 0.1, () => {
      if (label) {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          label.style.transition = `opacity 600ms ${EASE}, transform 600ms ${EASE}`;
          label.style.opacity = '1';
          label.style.transform = 'translateY(0)';
          setTimeout(() => { label.style.transform = ''; label.style.transition = ''; }, 600);
        }));
      }
      revealWords(words, 80, 50);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const wordsDelay = words.length * 50 + 80;
        bodyPs.forEach((p, i) => {
          p.style.transition = `opacity ${DURATION}ms ${EASE} ${wordsDelay + i * 100}ms, transform ${DURATION}ms ${EASE} ${wordsDelay + i * 100}ms`;
          p.style.opacity = '1';
          p.style.transform = 'scale(1) translateY(0)';
          setTimeout(() => { p.style.transform = ''; p.style.transition = ''; }, DURATION + wordsDelay + i * 100);
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

      wrapper.style.opacity = '0';
      items.forEach(item => {
        item.style.transition = 'none';
        item.style.opacity = '0';
        item.style.transform = 'scale(0.98) translateY(12px)';
      });

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
              item.style.transition = `opacity ${DURATION}ms ${EASE} ${i * 120}ms, transform ${DURATION}ms ${EASE} ${i * 120}ms`;
              item.style.opacity = '1';
              item.style.transform = 'scale(1) translateY(0)';
              setTimeout(() => { item.style.transform = ''; item.style.transition = ''; }, DURATION + i * 120);
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

          <div className={styles.body}>
            {dict.body.map((text, i) => (
              <p key={i} className={styles.bodyText}>{text}</p>
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
