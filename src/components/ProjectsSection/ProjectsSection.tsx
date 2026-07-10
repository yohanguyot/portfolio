"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Button from "@/components/Button/Button";
import ProjectImage from "@/components/ProjectImage/ProjectImage";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { trackEvent } from "@/lib/analytics";
import { useDict } from "@/lib/dict-context";
import { shouldReduceMotion, reveal, observe, EASE, DURATION } from "@/lib/animation";
import styles from "./ProjectsSection.module.css";

type Project = {
  slug: "bloom" | "keepro" | "lecoffre" | "wenimmo";
  title: string;
  description: string;
  tags: string[];
};

const PROJECTS_DATA = [
  { slug: "keepro" as const, title: "Keepro" },
  { slug: "lecoffre" as const, title: "LeCoffre" },
  { slug: "wenimmo" as const, title: "Wenimmo" },
];

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className={styles.tags}>
      {tags.map((tag) => (
        <span key={tag} className={styles.tag}>
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function ProjectsSection() {
  const dict = useDict();
  const p = dict.projects;
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const bloomRef = useRef<HTMLAnchorElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (shouldReduceMotion()) return;

    const cleanups: (() => void)[] = [];

    // SectionHeader gère lui-même l'animation du label et du h2

    // ── Bloom card ──
    cleanups.push(observe(bloomRef.current, 0.35, reveal(bloomRef.current!, 0)));

    // ── Small cards grid ──
    const grid = gridRef.current;
    if (grid) {
      const cards = Array.from(grid.querySelectorAll<HTMLElement>(':scope > a'));
      const isMobile = window.matchMedia('(max-width: 768px)').matches;

      cards.forEach(c => {
        c.style.transition = 'none';
        c.style.opacity = '0';
        c.style.transform = 'translateY(12px)';
      });

      if (isMobile) {
        cards.forEach((c, i) => {
          const isFirst = i === 0;
          cleanups.push(observe(c, 0.2, () => {
            requestAnimationFrame(() => requestAnimationFrame(() => {
              c.style.transition = `opacity ${DURATION}ms ${EASE}, transform ${DURATION}ms ${EASE}`;
              c.style.opacity = '1';
              c.style.transform = 'translateY(0)';
              if (isFirst) grid.dataset.ready = 'true';
              setTimeout(() => { c.style.transform = ''; c.style.transition = ''; }, DURATION);
            }));
          }));
        });
      } else {
        cleanups.push(observe(grid, 0.1, () => {
          requestAnimationFrame(() => requestAnimationFrame(() => {
            cards.forEach((c, i) => {
              c.style.transition = `opacity ${DURATION}ms ${EASE} ${i * 120}ms, transform ${DURATION}ms ${EASE} ${i * 120}ms`;
              c.style.opacity = '1';
              c.style.transform = 'translateY(0)';
              setTimeout(() => { c.style.transform = ''; c.style.transition = ''; }, DURATION + i * 120);
            });
            setTimeout(() => { grid.dataset.ready = 'true'; }, (cards.length - 1) * 120);
          }));
        }));
      }
    }

    return () => cleanups.forEach(fn => fn());
  }, []);

  const lang = pathname.split("/")[1] ?? "fr";
  const t = dict.tags;

  const FEATURED: Project = {
    slug: "bloom",
    title: "Bloom",
    description: p.featured.description,
    tags: t.bloom,
  };

  const PROJECTS: Project[] = PROJECTS_DATA.map((item, i) => ({
    ...item,
    description: p.items[i]?.description ?? "",
    tags: t[item.slug],
  }));

  return (
    <section className={styles.section} id="projets">
      <div className={styles.container}>
        <SectionHeader label={p.label} heading={p.heading} className={styles.sectionHeader} animationThreshold={0.5} />

        <div className={styles.projectItems}>
          <a
            ref={bloomRef}
            href={`/${lang}/bloom`}
            className={styles.cardLarge}
            onMouseEnter={() => setHoveredSlug(FEATURED.slug)}
            onMouseLeave={() => setHoveredSlug(null)}
            onClick={() => trackEvent("project_click", { project: FEATURED.slug })}
          >
            <div className={styles.cardLargeImageWrap}>
              <ProjectImage
                project={FEATURED.slug}
                hovered={hoveredSlug === FEATURED.slug}
                noActiveEffect
              />
            </div>
            <div className={styles.cardLargeContent}>
              <div className={styles.cardLargeBody}>
                <Tags tags={FEATURED.tags} />
                <div className={styles.cardText}>
                  <h3 className={styles.cardTitleLg}>{FEATURED.title}</h3>
                  <p className={styles.cardDesc}>{FEATURED.description}</p>
                </div>
              </div>
              <Button
                label={p.cta}
                type="text"
                showArrowRight
                forceHover={hoveredSlug === FEATURED.slug}
                className={styles.cardCta}
              />
            </div>
          </a>

          <div ref={gridRef} className={styles.cardsGrid}>
            {PROJECTS.map((proj) => (
              <a
                key={proj.slug}
                href={`/${lang}/${proj.slug}`}
                className={styles.card}
                onMouseEnter={() => setHoveredSlug(proj.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                onClick={() => trackEvent("project_click", { project: proj.slug })}
              >
                <div className={styles.cardInner}>
                  <div className={styles.cardImageWrap}>
                    <ProjectImage
                      project={proj.slug}
                      hovered={hoveredSlug === proj.slug}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardBody}>
                      <Tags tags={proj.tags} />
                      <div className={styles.cardText}>
                        <h3 className={styles.cardTitleSm}>{proj.title}</h3>
                        <p className={styles.cardDescSm}>{proj.description}</p>
                      </div>
                    </div>
                    <Button
                      label={p.cta}
                      type="text"
                      showArrowRight
                      forceHover={hoveredSlug === proj.slug}
                      className={styles.cardCta}
                    />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
