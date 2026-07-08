import { ReactNode } from "react";
import Button from "@/components/Button/Button";
import styles from "./Intro.module.css";

export type IntroMetaItem = { label: string; value: string };
export type IntroStatItem = { value: string; suffix?: string; label: string };

type Props = {
  tags: string[];
  title: string;
  description: ReactNode;
  meta: IntroMetaItem[];
  stats: IntroStatItem[];
  backHref?: string;
};

export default function ProjectIntro({
  tags,
  title,
  description,
  meta,
  stats,
  backHref = "/#projets",
}: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Button
          type="text"
          label="Retour"
          showArrowLeft
          as="a"
          href={backHref}
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
      </div>
    </section>
  );
}
