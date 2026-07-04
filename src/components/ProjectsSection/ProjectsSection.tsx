"use client";

import { useState } from "react";
import Button from "@/components/Button/Button";
import ProjectImage from "@/components/ProjectImage/ProjectImage";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./ProjectsSection.module.css";

type Project = {
  slug: "bloom" | "keepro" | "lecoffre" | "wenimmo";
  title: string;
  description: string;
  tags: string[];
};

const FEATURED: Project = {
  slug: "bloom",
  title: "Bloom",
  description:
    "Moteur white-label pour marketplaces d'actifs numériques. Une architecture unique et scalable qui accélère le Time-to-Market, éprouvée en production par plus de sept clients sur des marchés radicalement différents.",
  tags: ["Design system", "White-label"],
};

const PROJECTS: Project[] = [
  {
    slug: "keepro",
    title: "Keepro",
    description:
      "Certification et traçabilité documentaire par ancrage blockchain, conçue pour une adoption réelle par des équipes non-techniques.",
    tags: ["Certification", "Blockchain"],
  },
  {
    slug: "lecoffre",
    title: "LeCoffre",
    description:
      "Gestion de dossiers sécurisée pour notaires, pensée pour des échanges sensibles sans alourdir le quotidien des utilisateurs.",
    tags: ["Legaltech", "Notariat"],
  },
  {
    slug: "wenimmo",
    title: "Wenimmo",
    description:
      "Gestion patrimoniale pour CGPs et Middle Office, taillée pour deux profils aux logiques métier complètement différentes.",
    tags: ["Fintech", "Patrimoine"],
  },
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
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <section className={styles.section} id="projets">
      <div className={styles.container}>
        <SectionHeader label="Projets sélectionnés" heading="Ce que j'ai construit." />

        <div className={styles.projectItems}>
          {/* Large featured card */}
          <a
            href={`/${FEATURED.slug}`}
            className={styles.cardLarge}
            onMouseEnter={() => setHoveredSlug(FEATURED.slug)}
            onMouseLeave={() => setHoveredSlug(null)}
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
                label="Voir le projet"
                type="text"
                showArrowRight
                forceHover={hoveredSlug === FEATURED.slug}
                className={styles.cardCta}
              />
            </div>
          </a>

          {/* Small cards grid */}
          <div className={styles.cardsGrid}>
            {PROJECTS.map((p) => (
              <a
                key={p.slug}
                href={`/${p.slug}`}
                className={styles.card}
                onMouseEnter={() => setHoveredSlug(p.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
              >
                <div className={styles.cardImageWrap}>
                  <ProjectImage
                    project={p.slug}
                    hovered={hoveredSlug === p.slug}
                  />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardBody}>
                    <Tags tags={p.tags} />
                    <div className={styles.cardText}>
                      <h3 className={styles.cardTitleSm}>{p.title}</h3>
                      <p className={styles.cardDescSm}>{p.description}</p>
                    </div>
                  </div>
                  <Button
                    label="Voir le projet"
                    type="text"
                    showArrowRight
                    forceHover={hoveredSlug === p.slug}
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
