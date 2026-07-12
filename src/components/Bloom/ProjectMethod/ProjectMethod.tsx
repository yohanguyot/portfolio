"use client";

import { useRef, useEffect } from "react";
import { FileCheck, Variable } from "lucide-react";
import SectionHeader, { type SectionHeaderHandle } from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import type { Dictionary } from "@/lib/getDictionary";
import { shouldReduceMotion, observe, EASE, DURATION } from "@/lib/animation";
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
    const featureCard = cardWrapRef.current?.firstElementChild as HTMLElement | null;
    const items = featureCard ? Array.from(featureCard.children as HTMLCollectionOf<HTMLElement>) : [];
    const bodyPs = bodyEl ? Array.from(bodyEl.children as HTMLCollectionOf<HTMLElement>) : [];
    bodyPs.forEach(p => { p.style.opacity = '0'; p.style.transform = 'scale(0.98) translateY(12px)'; });
    if (featureCard) featureCard.style.opacity = '0';
    items.forEach(item => { item.style.opacity = '0'; item.style.transform = 'scale(0.98) translateY(12px)'; });
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;

    const bodyEl = bodyRef.current;
    const featureCard = cardWrapRef.current?.firstElementChild as HTMLElement | null;
    const items = featureCard ? Array.from(featureCard.children as HTMLCollectionOf<HTMLElement>) : [];
    const bodyPs = bodyEl ? Array.from(bodyEl.children as HTMLCollectionOf<HTMLElement>) : [];

    const section = sectionRef.current;
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;
    const cleanups: (() => void)[] = [];

    // Cascade coordonnée : label(0) → heading(80ms) → bodyPs(160ms, 240ms)
    if (section) {
      cleanups.push(observe(section, isMobile ? 0 : 0.1, () => {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          headerRef.current?.trigger(0);
          bodyPs.forEach((p, i) => {
            const delay = 160 + i * 80;
            p.style.transition = `opacity ${DURATION}ms ${EASE} ${delay}ms, transform ${DURATION}ms ${EASE} ${delay}ms`;
            p.style.opacity = '1';
            p.style.transform = 'scale(1) translateY(0)';
            setTimeout(() => { p.style.transform = ''; p.style.transition = ''; }, DURATION + delay);
          });
        }));
      }, isMobile ? '0px 0px -15% 0px' : '0px'));
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
