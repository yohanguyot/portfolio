"use client";

import { useRef, useEffect } from "react";
import { LayoutDashboard, MousePointerClick, Funnel, Archive } from "lucide-react";
import Image from "next/image";
import SectionHeader, { type SectionHeaderHandle } from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import { shouldReduceMotion, observe, EASE, DURATION } from "@/lib/animation";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import type { Dictionary } from "@/lib/getDictionary";
import styles from "./ProjectMiddleOffice.module.css";

const ICONS = [LayoutDashboard, MousePointerClick, Funnel, Archive];

type Props = { dict: Dictionary["wenimmo"]["middleOffice"] };

export default function ProjectMiddleOffice({ dict }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<SectionHeaderHandle>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (shouldReduceMotion()) return;
    const imageWrap = imageWrapRef.current;
    const paragraphEl = paragraphRef.current;
    const card = featureRef.current?.firstElementChild as HTMLElement | null;
    if (imageWrap) { imageWrap.style.opacity = '0'; imageWrap.style.transform = 'scale(0.98) translateY(12px)'; }
    if (paragraphEl) { paragraphEl.style.opacity = '0'; paragraphEl.style.transform = 'scale(0.98) translateY(12px)'; }
    if (card) {
      card.style.opacity = '0';
      Array.from(card.children as HTMLCollectionOf<HTMLElement>).forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.98) translateY(12px)';
      });
    }
    void imageWrap?.offsetHeight;
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;
    const section = sectionRef.current;
    if (!section) return;

    const cleanups: (() => void)[] = [];
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;
    const imageWrap = imageWrapRef.current;
    const paragraphEl = paragraphRef.current;
    const card = featureRef.current?.firstElementChild as HTMLElement | null;
    const items = card ? Array.from(card.children as HTMLCollectionOf<HTMLElement>) : [];

    if (isMobile) {
      // Mobile : textCol en haut, image en bas (order:1 CSS).
      // Texte cascade depuis le trigger section, image avec son propre observer.
      cleanups.push(observe(section, 0.1, () => {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          headerRef.current?.trigger(0);
          if (paragraphEl) {
            paragraphEl.style.transition = `opacity ${DURATION}ms ${EASE} 160ms, transform ${DURATION}ms ${EASE} 160ms`;
            paragraphEl.style.opacity = '1';
            paragraphEl.style.transform = 'scale(1) translateY(0)';
            setTimeout(() => { paragraphEl.style.transform = ''; paragraphEl.style.transition = ''; }, DURATION + 160);
          }
        }));
      }, '0px 0px -15% 0px'));
      if (imageWrap) {
        cleanups.push(observe(imageWrap, 0.2, () => {
          requestAnimationFrame(() => requestAnimationFrame(() => {
            imageWrap.style.transition = `opacity ${DURATION}ms ${EASE}, transform ${DURATION}ms ${EASE}`;
            imageWrap.style.opacity = '1';
            imageWrap.style.transform = 'scale(1) translateY(0)';
            setTimeout(() => { imageWrap.style.transform = ''; imageWrap.style.transition = ''; }, DURATION);
          }));
        }));
      }
    } else {
      // Desktop : image gauche, texte droite → imageWrap(0) → label(80ms) → heading(160ms) → paragraph(240ms)
      cleanups.push(observe(section, 0.1, () => {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          if (imageWrap) {
            imageWrap.style.transition = `opacity ${DURATION}ms ${EASE}, transform ${DURATION}ms ${EASE}`;
            imageWrap.style.opacity = '1';
            imageWrap.style.transform = 'scale(1) translateY(0)';
            setTimeout(() => { imageWrap.style.transform = ''; imageWrap.style.transition = ''; }, DURATION);
          }
          headerRef.current?.trigger(80);
          if (paragraphEl) {
            paragraphEl.style.transition = `opacity ${DURATION}ms ${EASE} 240ms, transform ${DURATION}ms ${EASE} 240ms`;
            paragraphEl.style.opacity = '1';
            paragraphEl.style.transform = 'scale(1) translateY(0)';
            setTimeout(() => { paragraphEl.style.transform = ''; paragraphEl.style.transition = ''; }, DURATION + 240);
          }
        }));
      }, '0px 0px -15% 0px'));
    }

    // FeatureCard : observer propre
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
        <div className={styles.split}>
          <div ref={imageWrapRef} className={styles.imageWrap}>
            <Image
              src="/images/projects/wenimmo/middle-office.png"
              alt="Interface Wenimmo — vue dossier Middle Office"
              width={1440}
              height={900}
              className={styles.image}
            />
          </div>
          <div className={styles.textCol}>
            <SectionHeader ref={headerRef} label={dict.label} heading={dict.heading} skipObserver />
            <p ref={paragraphRef} className={styles.paragraph}>{dict.description}</p>
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
