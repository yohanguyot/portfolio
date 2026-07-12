"use client";

import { useRef, useEffect } from "react";
import { TriangleAlert, Layers } from "lucide-react";
import Image from "next/image";
import SectionHeader, { type SectionHeaderHandle } from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import type { Dictionary } from "@/lib/getDictionary";
import { shouldReduceMotion, observe, EASE, DURATION } from "@/lib/animation";
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
    const featureCard = cardWrapRef.current?.firstElementChild as HTMLElement | null;
    const items = featureCard ? Array.from(featureCard.children as HTMLCollectionOf<HTMLElement>) : [];
    if (descEl) { descEl.style.opacity = '0'; descEl.style.transform = 'scale(0.98) translateY(12px)'; }
    if (imageWrap) { imageWrap.style.opacity = '0'; imageWrap.style.transform = 'scale(0.98) translateY(12px)'; }
    if (featureCard) featureCard.style.opacity = '0';
    items.forEach(item => { item.style.opacity = '0'; item.style.transform = 'scale(0.98) translateY(12px)'; });
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;

    const descEl = descRef.current;
    const imageWrap = imageWrapRef.current;
    const featureCard = cardWrapRef.current?.firstElementChild as HTMLElement | null;
    const items = featureCard ? Array.from(featureCard.children as HTMLCollectionOf<HTMLElement>) : [];

    const section = sectionRef.current;
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;
    const cleanups: (() => void)[] = [];

    // Cascade coordonnée : label(0) → heading(80ms) → desc(160ms)
    if (section) {
      cleanups.push(observe(section, isMobile ? 0 : 0.1, () => {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          headerRef.current?.trigger(0);
          if (descEl) {
            descEl.style.transition = `opacity ${DURATION}ms ${EASE} 160ms, transform ${DURATION}ms ${EASE} 160ms`;
            descEl.style.opacity = '1';
            descEl.style.transform = 'scale(1) translateY(0)';
            setTimeout(() => { descEl.style.transform = ''; descEl.style.transition = ''; }, DURATION + 160);
          }
        }));
      }, isMobile ? '0px 0px -15% 0px' : '0px'));
    }

    if (imageWrap) {
      cleanups.push(observe(imageWrap, 0.1, () => {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          imageWrap.style.transition = `opacity ${DURATION}ms ${EASE}, transform ${DURATION}ms ${EASE}`;
          imageWrap.style.opacity = '1';
          imageWrap.style.transform = 'scale(1) translateY(0)';
          setTimeout(() => { imageWrap.style.transform = ''; imageWrap.style.transition = ''; }, DURATION);
        }));
      }));
    }

    if (featureCard && items.length) {
      if (isMobile) {
        cleanups.push(observe(featureCard, 0, () => { featureCard.style.transition = 'none'; featureCard.style.opacity = '1'; }));
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
        cleanups.push(observe(featureCard, 0.1, () => {
          featureCard.style.transition = 'none';
          featureCard.style.opacity = '1';
          requestAnimationFrame(() => requestAnimationFrame(() => {
            items.forEach((item, i) => {
              const delay = i * 80;
              item.style.transition = `opacity ${DURATION}ms ${EASE} ${delay}ms, transform ${DURATION}ms ${EASE} ${delay}ms`;
              item.style.opacity = '1';
              item.style.transform = 'scale(1) translateY(0)';
              setTimeout(() => { item.style.transform = ''; item.style.transition = ''; }, DURATION + delay);
            });
          }));
        }));
      }
    }

    return () => cleanups.forEach(fn => fn());
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
