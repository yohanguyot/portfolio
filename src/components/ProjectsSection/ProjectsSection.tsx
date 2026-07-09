"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Button from "@/components/Button/Button";
import ProjectImage from "@/components/ProjectImage/ProjectImage";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { trackEvent } from "@/lib/analytics";
import { useDict } from "@/lib/dict-context";
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
  const pathname = usePathname();
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
        <SectionHeader label={p.label} heading={p.heading} />

        <div className={styles.projectItems}>
          {/* Large featured card */}
          <a
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

          {/* Small cards grid */}
          <div className={styles.cardsGrid}>
            {PROJECTS.map((proj) => (
              <a
                key={proj.slug}
                href={`/${lang}/${proj.slug}`}
                className={styles.card}
                onMouseEnter={() => setHoveredSlug(proj.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                onClick={() => trackEvent("project_click", { project: proj.slug })}
              >
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
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
