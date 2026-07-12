"use client";

import { useRef, useEffect } from "react";
import { LayoutTemplate, ArrowLeftRight, Shield } from "lucide-react";
import SectionHeader, { type SectionHeaderHandle } from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import { shouldReduceMotion, observe, EASE, DURATION } from "@/lib/animation";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import type { Dictionary } from "@/lib/getDictionary";
import styles from "./ProjectDecisions.module.css";

const ICONS = [LayoutTemplate, ArrowLeftRight, Shield];

type Props = { dict: Dictionary["wenimmo"]["decisions"] };

export default function ProjectDecisions({ dict }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<SectionHeaderHandle>(null);
  const featureRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (shouldReduceMotion()) return;
    const card = featureRef.current?.firstElementChild as HTMLElement | null;
    if (card) {
      card.style.opacity = '0';
      Array.from(card.children as HTMLCollectionOf<HTMLElement>).forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.98) translateY(12px)';
      });
    }
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;
    const section = sectionRef.current;
    if (!section) return;
    const card = featureRef.current?.firstElementChild as HTMLElement | null;
    const items = card ? Array.from(card.children as HTMLCollectionOf<HTMLElement>) : [];

    const isMobile = window.matchMedia('(max-width: 1024px)').matches;
    const cleanups: (() => void)[] = [];

    cleanups.push(observe(section, isMobile ? 0 : 0.1, () => {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        headerRef.current?.trigger(0);
      }));
    }, isMobile ? '0px 0px -15% 0px' : '0px'));

    if (card && items.length) {
      if (isMobile) {
        cleanups.push(observe(card, 0, () => { card.style.transition = 'none'; card.style.opacity = '1'; }));
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
        cleanups.push(observe(card, 0.1, () => {
          card.style.transition = 'none';
          card.style.opacity = '1';
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
