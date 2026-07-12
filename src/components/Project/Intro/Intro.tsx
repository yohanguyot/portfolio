"use client";

import { useRef, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Button from "@/components/Button/Button";
import { useDict } from "@/lib/dict-context";
import { shouldReduceMotion, observe, EASE, DURATION } from "@/lib/animation";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import styles from "./Intro.module.css";

export type IntroMetaItem = { label: string; value: string };
export type IntroStatItem = { value: string; suffix?: string; label: string };

type Props = {
  tags: string[];
  title: string;
  description: ReactNode;
  meta: IntroMetaItem[];
  stats?: IntroStatItem[];
};

export default function ProjectIntro({ tags, title, description, meta, stats }: Props) {
  const pathname = usePathname();
  const lang = pathname.split("/")[1] ?? "fr";
  const dict = useDict();

  const sectionRef = useRef<HTMLElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (shouldReduceMotion()) return;
    const section = sectionRef.current;
    if (!section) return;

    const backEl = backRef.current;
    const tagItems = tagsRef.current ? Array.from(tagsRef.current.children as HTMLCollectionOf<HTMLElement>) : [];
    const titleEl = titleRef.current;
    const descEl = descRef.current;
    const metaItems = metaRef.current ? Array.from(metaRef.current.children as HTMLCollectionOf<HTMLElement>) : [];
    const statsEl = statsRef.current;
    const statItems = statsEl ? Array.from(statsEl.children as HTMLCollectionOf<HTMLElement>) : [];

    if (backEl) { backEl.style.opacity = '0'; backEl.style.transform = 'scale(0.98) translateY(8px)'; }
    tagItems.forEach(t => { t.style.opacity = '0'; t.style.transform = 'scale(0.98) translateY(8px)'; });
    if (titleEl) { titleEl.style.opacity = '0'; titleEl.style.transform = 'scale(0.98) translateY(12px)'; }
    if (descEl) { descEl.style.opacity = '0'; descEl.style.transform = 'scale(0.98) translateY(12px)'; }
    metaItems.forEach(m => { m.style.opacity = '0'; m.style.transform = 'scale(0.98) translateY(12px)'; });
    if (statsEl) { statsEl.style.opacity = '0'; }
    statItems.forEach(s => { s.style.opacity = '0'; s.style.transform = 'scale(0.98) translateY(12px)'; });
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;
    const section = sectionRef.current;
    if (!section) return;

    const backEl = backRef.current;
    const tagItems = tagsRef.current ? Array.from(tagsRef.current.children as HTMLCollectionOf<HTMLElement>) : [];
    const titleEl = titleRef.current;
    const descEl = descRef.current;
    const metaItems = metaRef.current ? Array.from(metaRef.current.children as HTMLCollectionOf<HTMLElement>) : [];
    const statsEl = statsRef.current;
    const statItems = statsEl ? Array.from(statsEl.children as HTMLCollectionOf<HTMLElement>) : [];

    const cleanups: (() => void)[] = [];
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;

    function revealEl(el: HTMLElement, delay: number) {
      el.style.transition = `opacity ${DURATION}ms ${EASE} ${delay}ms, transform ${DURATION}ms ${EASE} ${delay}ms`;
      el.style.opacity = '1';
      el.style.transform = 'scale(1) translateY(0)';
      setTimeout(() => { el.style.transform = ''; el.style.transition = ''; }, DURATION + delay);
    }

    cleanups.push(observe(section, isMobile ? 0 : 0.05, () => {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const vh = window.innerHeight;
        let delay = 0;

        if (backEl) { revealEl(backEl, delay); delay += 40; }
        tagItems.forEach((t, i) => revealEl(t, delay + i * 40));
        delay += tagItems.length * 40;
        if (titleEl) { revealEl(titleEl, delay); delay += 40; }
        if (descEl) { revealEl(descEl, delay); delay += 40; }

        // Meta : cascade si déjà visible, sinon observer propre
        const metaEl = metaRef.current;
        if (metaEl && metaItems.length) {
          if (metaEl.getBoundingClientRect().top < vh) {
            metaItems.forEach((m, i) => revealEl(m, delay + i * 40));
            delay += metaItems.length * 40;
          } else {
            cleanups.push(observe(metaEl, 0, () => {
              requestAnimationFrame(() => requestAnimationFrame(() => {
                metaItems.forEach((m, i) => revealEl(m, i * 40));
              }));
            }));
            delay += metaItems.length * 40;
          }
        }

        // Stats : surface fade in + items en stagger depuis le même délai
        if (statsEl && statItems.length) {
          if (statsEl.getBoundingClientRect().top < vh) {
            revealEl(statsEl, delay);
            statItems.forEach((s, i) => revealEl(s, delay + i * 40));
          } else {
            cleanups.push(observe(statsEl, 0, () => {
              requestAnimationFrame(() => requestAnimationFrame(() => {
                revealEl(statsEl, 0);
                statItems.forEach((s, i) => revealEl(s, i * 40));
              }));
            }));
          }
        }
      }));
    }, '0px'));

    return () => cleanups.forEach(fn => fn());
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div ref={backRef} className={styles.backButton}>
          <Button
            type="text"
            label={dict.projectNav.back}
            showArrowLeft
            as="a"
            href={`/${lang}/#projets`}
          />
        </div>

        <div className={styles.introBlock}>
          <div className={styles.introTop}>
            <div ref={tagsRef} className={styles.tags}>
              {tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
            <h1 ref={titleRef} className={styles.title}>{title}</h1>
          </div>
          <p ref={descRef} className={styles.description}>{description}</p>
        </div>

        <div ref={metaRef} className={styles.meta}>
          {meta.map((item) => (
            <div key={item.label} className={styles.metaItem}>
              <span className={styles.metaLabel}>{item.label}</span>
              <span className={styles.metaValue}>{item.value}</span>
            </div>
          ))}
        </div>

        {stats && stats.length > 0 && (
          <div ref={statsRef} className={styles.stats}>
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`${styles.statItem} ${i < stats.length - 1 ? styles.statDivider : ""}`}
              >
                <p className={styles.statNumber}>
                  {stat.value}
                  {stat.suffix && <span className={styles.statSuffix}>{stat.suffix}</span>}
                </p>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
