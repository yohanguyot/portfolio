"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import SectionHeader, { type SectionHeaderHandle } from "@/components/SectionHeader/SectionHeader";
import type { Dictionary } from "@/lib/getDictionary";
import { shouldReduceMotion, observe, EASE, DURATION } from "@/lib/animation";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import styles from "./ProjectIdentities.module.css";

type Props = { dict: Dictionary["bloom"]["identities"] };

export default function ProjectIdentities({ dict }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<SectionHeaderHandle>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (shouldReduceMotion()) return;
    const bodyEl = bodyRef.current;
    const imagesEl = imagesRef.current;
    const bodyPs = bodyEl ? Array.from(bodyEl.children as HTMLCollectionOf<HTMLElement>) : [];
    const imageWraps = imagesEl ? Array.from(imagesEl.children as HTMLCollectionOf<HTMLElement>) : [];
    bodyPs.forEach(p => { p.style.opacity = '0'; p.style.transform = 'scale(0.98) translateY(12px)'; });
    imageWraps.forEach(img => { img.style.opacity = '0'; img.style.transform = 'scale(0.98) translateY(12px)'; });
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;

    const bodyEl = bodyRef.current;
    const imagesEl = imagesRef.current;
    const bodyPs = bodyEl ? Array.from(bodyEl.children as HTMLCollectionOf<HTMLElement>) : [];
    const imageWraps = imagesEl ? Array.from(imagesEl.children as HTMLCollectionOf<HTMLElement>) : [];

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

    if (imagesEl && imageWraps.length) {
      if (isMobile) {
        imageWraps.forEach((img) => {
          cleanups.push(observe(img, 0.2, () => {
            requestAnimationFrame(() => requestAnimationFrame(() => {
              img.style.transition = `opacity ${DURATION}ms ${EASE}, transform ${DURATION}ms ${EASE}`;
              img.style.opacity = '1';
              img.style.transform = 'scale(1) translateY(0)';
              setTimeout(() => { img.style.transform = ''; img.style.transition = ''; }, DURATION);
            }));
          }));
        });
      } else {
        cleanups.push(observe(imagesEl, 0.1, () => {
          requestAnimationFrame(() => requestAnimationFrame(() => {
            imageWraps.forEach((img, i) => {
              const delay = i * 80;
              img.style.transition = `opacity ${DURATION}ms ${EASE} ${delay}ms, transform ${DURATION}ms ${EASE} ${delay}ms`;
              img.style.opacity = '1';
              img.style.transform = 'scale(1) translateY(0)';
              setTimeout(() => { img.style.transform = ''; img.style.transition = ''; }, DURATION + delay);
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
          <div ref={bodyRef} className={styles.body}>
            <p className={styles.paragraph}>{dict.p1}</p>
            <p className={styles.paragraph}>{dict.p2}</p>
          </div>
        </div>

        <div ref={imagesRef} className={styles.images}>
          <div className={styles.imageWrap}>
            <Image
              src="/images/projects/bloom/erable-theme.png"
              alt="Interface Bloom avec le thème Erable"
              width={1440}
              height={900}
              className={`${styles.image} ${styles.imageDim}`}
            />
          </div>
          <div className={styles.imageWrap}>
            <Image
              src="/images/projects/bloom/lqr-house-theme.png"
              alt="Interface Bloom avec le thème LQR House"
              width={1440}
              height={900}
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
