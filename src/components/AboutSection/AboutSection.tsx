import { Component, Route, CodeXml } from "lucide-react";
import styles from "./AboutSection.module.css";

const SKILLS = [
  {
    icon: Component,
    title: "Design Systems",
    description:
      "Un système structuré et documenté qui permet de scaler, itérer et maintenir une cohérence totale à chaque nouvelle feature.",
  },
  {
    icon: Route,
    title: "Product & UX",
    description:
      "Des interfaces conçues de bout en bout, qui anticipent les cas complexes et les erreurs qui font la différence en production.",
  },
  {
    icon: CodeXml,
    title: "Design to Code",
    description:
      "Des maquettes pensées avec les contraintes techniques en tête, pour que les décisions prises dans Figma tiennent jusqu'en prod.",
  },
] as const;

export default function AboutSection() {
  return (
    <section className={styles.section} id="a-propos">
      <div className={styles.container}>
        {/* Left — text */}
        <div className={styles.info}>
          <div className={styles.titleBlock}>
            <p className={styles.sectionLabel}>À propos</p>
            <h2 className={styles.sectionHeading}>
              Designer avec une{" "}
              <br className={styles.headingBreak} />
              <span className={styles.accent}>culture technique</span>.
            </h2>
          </div>

          <div className={styles.body}>
            <p className={styles.bodyText}>
              Depuis plusieurs années, je crée des interfaces pour des{" "}
              <span className={styles.highlight}>produits complexes</span> aux
              enjeux critiques : fintech, gestion de patrimoine et sécurité
              documentaire.
            </p>
            <p className={styles.bodyText}>
              Grâce à ma{" "}
              <span className={styles.highlight}>
                double compétence design &amp; front-end
              </span>
              , j'intègre les contraintes techniques dès la conception pour
              livrer des{" "}
              <span className={styles.highlight}>fichiers Figma rigoureux</span>
              , directement exploitables par les développeurs, et garantir une{" "}
              <span className={styles.highlight}>transition fluide en prod</span>{" "}
              sans perte de qualité.
            </p>
          </div>
        </div>

        {/* Right — skill card */}
        <div className={styles.card}>
          {SKILLS.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className={`${styles.skillBlock} ${i < SKILLS.length - 1 ? styles.skillBlockBorder : ""}`}
            >
              <div className={styles.iconWrap}>
                <Icon size={20} strokeWidth={1.5} className={styles.icon} />
              </div>
              <div className={styles.skillContent}>
                <h3 className={styles.skillTitle}>{title}</h3>
                <p className={styles.skillDesc}>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}