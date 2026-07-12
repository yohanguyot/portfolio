"use client";

import { useRef, useEffect } from "react";
import { CircleCheck, SquareTerminal } from "lucide-react";
import SectionHeader, { type SectionHeaderHandle } from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import ProjectNav from "@/components/Project/Nav/Nav";
import { shouldReduceMotion, observe, EASE, DURATION } from "@/lib/animation";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import type { Dictionary } from "@/lib/getDictionary";
import styles from "./ProjectImpact.module.css";

const ICONS = [CircleCheck, SquareTerminal];

type Props = { dict: Dictionary["keepro"]["impact"] };

export default function ProjectImpact({ dict }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<SectionHeaderHandle>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (shouldReduceMotion()) return;
    const descEl = descRef.current;
    const featureEl = featureRef.current;
    if (descEl) { descEl.style.opacity = '0'; descEl.style.transform = 'scale(0.98) translateY(12px)'; }
    if (featureEl) {
      const card = featureEl.firstElementChild as HTMLElement | null;
      if (card) {
        card.style.opacity = '0';
        Array.from(card.children as HTMLCollectionOf<HTMLElement>).forEach(item => {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.98) translateY(12px)';
        });
      }
    }
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;
    const section = sectionRef.current;
    if (!section) return;

    const cleanups: (() => void)[] = [];
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;
    const featureEl = featureRef.current;
    const card = featureEl?.firstElementChild as HTMLElement | null;
    const items = card ? Array.from(card.children as HTMLCollectionOf<HTMLElement>) : [];

    // Section observer : header + desc uniquement
    cleanups.push(observe(section, isMobile ? 0 : 0.1, () => {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        headerRef.current?.trigger(0);
        const descEl = descRef.current;
        if (descEl) {
          descEl.style.transition = `opacity ${DURATION}ms ${EASE} 160ms, transform ${DURATION}ms ${EASE} 160ms`;
          descEl.style.opacity = '1';
          descEl.style.transform = 'scale(1) translateY(0)';
          setTimeout(() => { descEl.style.transform = ''; descEl.style.transition = ''; }, DURATION + 160);
        }
      }));
    }, isMobile ? '0px 0px -15% 0px' : '0px'));

    // FeatureCard : observer propre, déclenché quand la card entre dans le viewport
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
    <>
      <section ref={sectionRef} className={styles.section}>
        <div className={styles.container}>
          <div className={styles.impact}>
            <div className={styles.header}>
              <SectionHeader ref={headerRef} label={dict.label} heading={dict.heading} skipObserver />
              <p ref={descRef} className={styles.description}>{dict.description}</p>
            </div>
            <div ref={featureRef}>
              <FeatureCard direction="horizontal">
                {dict.features.map((f, i) => (
                  <FeatureItem
                    key={i}
                    icon={ICONS[i]}
                    title={f.title}
                    description={f.description}
                  />
                ))}
              </FeatureCard>
            </div>
          </div>
        </div>
      </section>
      <ProjectNav
        prev={{ href: "/bloom", label: "Bloom" }}
        next={{ href: "/lecoffre", label: "LeCoffre" }}
      />
    </>
  );
}
