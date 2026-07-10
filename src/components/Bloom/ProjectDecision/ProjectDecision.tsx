"use client";

import { useRef, useEffect } from "react";
import { TriangleAlert, Layers } from "lucide-react";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import type { Dictionary } from "@/lib/getDictionary";
import { shouldReduceMotion, observe, EASE, DURATION } from "@/lib/animation";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import styles from "./ProjectDecision.module.css";

const ICONS = [TriangleAlert, Layers];

type Props = { dict: Dictionary["bloom"]["decision"] };

export default function ProjectDecision({ dict }: Props) {
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

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const cleanups: (() => void)[] = [];

    if (descEl) {
      cleanups.push(observe(descEl, 0.3, () => {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          descEl.style.transition = `opacity ${DURATION}ms ${EASE}, transform ${DURATION}ms ${EASE}`;
          descEl.style.opacity = '1';
          descEl.style.transform = 'scale(1) translateY(0)';
          setTimeout(() => { descEl.style.transform = ''; descEl.style.transition = ''; }, DURATION);
        }));
      }));
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
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.top}>
          <SectionHeader label={dict.label} heading={dict.heading} />
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
