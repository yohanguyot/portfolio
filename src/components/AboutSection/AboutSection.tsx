import { Component, Route, CodeXml } from "lucide-react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
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
          <SectionHeader
            label="À propos"
            heading={
              <>
                Designer avec une{" "}
                <br className={styles.headingBreak} />
                <span className={styles.accent}>culture technique</span>.
              </>
            }
          />

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
        <FeatureCard className={styles.card}>
          {SKILLS.map(({ icon, title, description }) => (
            <FeatureItem key={title} icon={icon} title={title} description={description} />
          ))}
        </FeatureCard>
      </div>
    </section>
  );
}
