"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";
import Button from "@/components/Button/Button";
import ProjectImage from "@/components/ProjectImage/ProjectImage";
import SectionHeader, { type SectionHeaderHandle } from "@/components/SectionHeader/SectionHeader";
import { trackEvent } from "@/lib/analytics";
import { useDict } from "@/lib/dict-context";
import { shouldReduceMotion, observe, STAGGER, afterLayout, isMobileViewport } from "@/lib/animation";
import styles from "./ProjectsSection.module.css";

type Project = {
  slug: "bloom" | "keepro" | "lecoffre" | "wenimmo";
  title: string;
  description: string;
  tags: string[];
};

const GRID_PROJECTS = [
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
  const projects = dict.projects;
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const router = useTransitionRouter();

  function navigate(e: React.MouseEvent, href: string) {
    e.preventDefault();
    router.push(href);
  }

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<SectionHeaderHandle>(null);
  const bloomRef = useRef<HTMLAnchorElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (shouldReduceMotion()) return;

    const isMobile = isMobileViewport();

    const section = sectionRef.current;
    const bloom = bloomRef.current;
    const grid = gridRef.current;

    function revealCard(el: HTMLElement, delay = 0) {
      const overlay = el.firstElementChild as HTMLElement | null;
      if (!overlay) return;
      if (delay > 0) overlay.style.animationDelay = `${delay}ms`;
      overlay.classList.add(styles.cardOverlayAnimate);
      setTimeout(() => {
        overlay.classList.remove(styles.cardOverlayAnimate);
        overlay.classList.add(styles.cardOverlayDone);
        overlay.style.animationDelay = '';
      }, delay + 650);
    }

    // Back-navigation: section already in viewport → fire cascade immediately
    if (section && section.getBoundingClientRect().top < window.innerHeight) {
      afterLayout(() => {
        headerRef.current?.trigger(0);
        if (bloom) revealCard(bloom, 0);
        if (grid) {
          const cards = Array.from(grid.querySelectorAll<HTMLElement>(':scope > a'));
          cards.forEach((c, i) => revealCard(c, i * STAGGER));
          setTimeout(() => { grid.dataset.ready = 'true'; }, (cards.length - 1) * 120);
        }
      });
      return;
    }

    const cleanups = [watchHeader(), watchBloom(), watchGrid()];
    return () => cleanups.forEach(fn => fn());

    function watchHeader(): () => void {
      if (!section) return () => {};
      return observe(section, isMobile ? 0 : 0.1, () => {
        afterLayout(() => {
          headerRef.current?.trigger(0);
        });
      }, isMobile ? '0px 0px -15% 0px' : '0px');
    }

    function watchBloom(): () => void {
      if (!bloom) return () => {};
      return observe(bloom, isMobile ? 0 : 0.2, () => {
        afterLayout(() => revealCard(bloom, 0));
      });
    }

    function watchGrid(): () => void {
      if (!grid) return () => {};
      const cards = Array.from(grid.querySelectorAll<HTMLElement>(':scope > a'));
      if (isMobile) {
        const cardCleanups = cards.map((c, i) =>
          observe(c, 0.2, () => {
            afterLayout(() => {
              revealCard(c, 0);
              if (i === 0) grid!.dataset.ready = 'true';
            });
          })
        );
        return () => cardCleanups.forEach(fn => fn());
      }
      return observe(grid, 0.1, () => {
        afterLayout(() => {
          cards.forEach((c, i) => revealCard(c, i * STAGGER));
          setTimeout(() => { grid!.dataset.ready = 'true'; }, (cards.length - 1) * 120);
        });
      });
    }
  }, []);

  const lang = pathname.split("/")[1] ?? "fr";
  const tags = dict.tags;

  const FEATURED: Project = {
    slug: "bloom",
    title: "Bloom",
    description: projects.featured.description,
    tags: tags.bloom,
  };

  const PROJECTS: Project[] = GRID_PROJECTS.map((item, i) => ({
    ...item,
    description: projects.items[i]?.description ?? "",
    tags: tags[item.slug],
  }));

  return (
    <section ref={sectionRef} className={styles.section} id="projets">
      <div className={styles.container}>
        <SectionHeader ref={headerRef} label={projects.label} heading={projects.heading} className={styles.sectionHeader} skipObserver />

        <div className={styles.projectItems}>
          <a
            ref={bloomRef}
            href={`/${lang}/bloom`}
            className={styles.cardLarge}
            onMouseEnter={() => setHoveredSlug(FEATURED.slug)}
            onMouseLeave={() => setHoveredSlug(null)}
            onClick={(e) => { navigate(e, `/${lang}/bloom`); trackEvent("project_click", { project: FEATURED.slug }); }}
          >
            <span className={styles.cardOverlay} aria-hidden="true" />
            <div className={styles.cardLargeImageWrap}>
              <ProjectImage
                project={FEATURED.slug}
                hovered={hoveredSlug === FEATURED.slug}
                noActiveEffect
                eager
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
                label={projects.cta}
                type="text"
                showArrowRight
                as="span"
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
                onClick={(e) => { navigate(e, `/${lang}/${proj.slug}`); trackEvent("project_click", { project: proj.slug }); }}
              >
                <span className={styles.cardOverlay} aria-hidden="true" />
                <div className={styles.cardInner}>
                  <div className={styles.cardImageWrap}>
                    <ProjectImage
                      project={proj.slug}
                      hovered={hoveredSlug === proj.slug}
                      eager
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
                      label={projects.cta}
                      type="text"
                      showArrowRight
                      as="span"
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
