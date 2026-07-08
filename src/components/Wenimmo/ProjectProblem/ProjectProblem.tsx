import CardSection from "@/components/Project/CardSection/CardSection";
import styles from "./ProjectProblem.module.css";

export default function ProjectProblem() {
  return (
    <CardSection
      label="Problème"
      heading="Concilier la vitesse et la rigueur."
    >
      <p className={styles.paragraph}>
        Le CGP travaille en mobilité, entre deux rendez-vous. Son enjeu est
        l&apos;immédiateté&nbsp;: piloter ses dossiers et initier une
        souscription en quelques clics. À l&apos;inverse, le Middle Office
        traite des volumes et exige de la densité&nbsp;: filtres avancés,
        pipeline granulaire et suivi administratif complet.
      </p>
      <p className={styles.paragraph}>
        Tout l&apos;enjeu est de concevoir un système unique capable de faire
        pivoter ses priorités UI selon le profil connecté, sans développer deux
        produits distincts.
      </p>
    </CardSection>
  );
}
