"use client";

import { useRef, useEffect } from "react";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";
import Button from "@/components/Button/Button";
import ProjectImage from "@/components/ProjectImage/ProjectImage";
import SectionHeader, { type SectionHeaderHandle } from "@/components/SectionHeader/SectionHeader";
import { trackEvent } from "@/lib/analytics";
import { useDict } from "@/lib/dict-context";
import { shouldReduceMotion, observe, STAGGER, afterLayout, isMobileViewport, hideEl, revealEl } from "@/lib/animation";
import styles from "./ProjectsSection.module.css";

// Extra buffer after last card animates in before enabling hover interactions
const GRID_READY_DELAY_MS = 120;

function watchHeader(
  section: HTMLElement,
  isMobile: boolean,
  onEnter: () => void,
): () => void {
  return observe(section, isMobile ? 0 : 0.1, () => {
    afterLayout(onEnter);
  }, isMobile ? '0px 0px -15% 0px' : '0px');
}

function watchBloom(bloom: HTMLElement, isMobile: boolean): () => void {
  return observe(bloom, isMobile ? 0 : 0.2, () => {
    afterLayout(() => revealEl(bloom, 0));
  });
}

function watchGrid(grid: HTMLElement, isMobile: boolean): () => void {
  const cards = Array.from(grid.querySelectorAll<HTMLElement>(':scope > a'));
  if (isMobile) {
    const cardCleanups = cards.map((c, i) =>
      observe(c, 0.2, () => {
        afterLayout(() => {
          revealEl(c, 0);
          if (i === 0) grid.dataset.ready = 'true';
        });
      })
    );
    return () => cardCleanups.forEach(fn => fn());
  }
  return observe(grid, 0.1, () => {
    afterLayout(() => {
      cards.forEach((c, i) => revealEl(c, i * STAGGER));
      setTimeout(() => { grid.dataset.ready = 'true'; }, (cards.length - 1) * GRID_READY_DELAY_MS);
    });
  });
}

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

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<SectionHeaderHandle>(null);
  const bloomRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useIsomorphicLayoutEffect(() => {
    if (shouldReduceMotion()) return;
    const bloom = bloomRef.current;
    const grid = gridRef.current;
    if (bloom) hideEl(bloom);
    if (grid) Array.from(grid.querySelectorAll<HTMLElement>(':scope > a')).forEach(c => hideEl(c));
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;

    const isMobile = isMobileViewport();
    const section = sectionRef.current;
    const bloom = bloomRef.current;
    const grid = gridRef.current;

    // Back-navigation: section already in viewport → fire cascade immediately
    if (section && section.getBoundingClientRect().top < window.innerHeight) {
      afterLayout(() => {
        headerRef.current?.trigger(0);
        if (bloom) revealEl(bloom, 0);
        if (grid) {
          const cards = Array.from(grid.querySelectorAll<HTMLElement>(':scope > a'));
          cards.forEach((c, i) => revealEl(c, i * STAGGER));
          setTimeout(() => { grid.dataset.ready = 'true'; }, (cards.length - 1) * GRID_READY_DELAY_MS);
        }
      });
      return;
    }

    const cleanups = [
      section ? watchHeader(section, isMobile, () => headerRef.current?.trigger(0)) : () => {},
      bloom   ? watchBloom(bloom, isMobile)  : () => {},
      grid    ? watchGrid(grid, isMobile)    : () => {},
    ];
    return () => cleanups.forEach(fn => fn());
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
          <div ref={bloomRef}>
            <Link
              href={`/${lang}/bloom`}
              className={styles.cardLarge}
              onClick={() => trackEvent("project_click", { project: FEATURED.slug })}
            >
              <div className={styles.cardLargeImageWrap}>
                <ProjectImage
                  project={FEATURED.slug}
                  eager
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
                  label={projects.cta}
                  type="text"
                  showArrowRight
                  as="span"
                  className={styles.cardCta}
                />
              </div>
            </Link>
          </div>

          <div ref={gridRef} className={styles.cardsGrid}>
            {PROJECTS.map((proj) => (
              <Link
                key={proj.slug}
                href={`/${lang}/${proj.slug}`}
                className={styles.card}
                onClick={() => trackEvent("project_click", { project: proj.slug })}
              >
                <div className={styles.cardInner}>
                  <div className={styles.cardImageWrap}>
                    <ProjectImage
                      project={proj.slug}
                      activeScreenScale
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
                      className={styles.cardCta}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
