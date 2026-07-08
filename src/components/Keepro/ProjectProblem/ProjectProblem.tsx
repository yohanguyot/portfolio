import CardSection from "@/components/Project/CardSection/CardSection";
import styles from "./ProjectProblem.module.css";

export default function ProjectProblem() {
  return (
    <CardSection label="Problème" heading="La blockchain est fiable mais illisible.">
      <p className={styles.paragraph}>
        Les données cryptographiques brutes restent indéchiffrables pour les
        équipes métiers, bien qu&apos;elles soient indispensables aux profils
        techniques.
      </p>
      <p className={styles.paragraph}>
        Le défi consistait à gérer cette asymétrie : comment confirmer
        l&apos;intégrité d&apos;un fichier à un utilisateur non technique sans
        pour autant masquer ou dénaturer la preuve brute requise par les
        développeurs&nbsp;?
      </p>
    </CardSection>
  );
}
