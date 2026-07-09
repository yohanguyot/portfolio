"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Button from "@/components/Button/Button";
import { useDict } from "@/lib/dict-context";
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

export default function ProjectIntro({
  tags,
  title,
  description,
  meta,
  stats,
}: Props) {
  const pathname = usePathname();
  const lang = pathname.split("/")[1] ?? "fr";
  const dict = useDict();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Button
          type="text"
          label={dict.projectNav.back}
          showArrowLeft
          as="a"
          href={`/${lang}/#projets`}
          className={styles.backButton}
        />

        <div className={styles.introBlock}>
          <div className={styles.introTop}>
            <div className={styles.tags}>
              {tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
            <h1 className={styles.title}>{title}</h1>
          </div>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.meta}>
          {meta.map((item) => (
            <div key={item.label} className={styles.metaItem}>
              <span className={styles.metaLabel}>{item.label}</span>
              <span className={styles.metaValue}>{item.value}</span>
            </div>
          ))}
        </div>

        {stats && stats.length > 0 && (
          <div className={styles.stats}>
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
