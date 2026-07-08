import TextSection from "@/components/Project/TextSection/TextSection";
import styles from "./ProjectSolution.module.css";

export default function ProjectSolution() {
  return (
    <TextSection
      label="Solution"
      heading="Trois espaces distincts pour un seul dossier."
    >
      <p className={styles.paragraph}>
        Trois espaces distincts s&apos;appuient sur une source de données unique
        pour permettre au notaire de piloter, au client de déposer et à
        l&apos;administration de superviser les accès.
      </p>
      <p className={styles.paragraph}>
        Cette séparation garantit une étanchéité fonctionnelle stricte. En
        éliminant tout compromis global, chaque environnement est calibré pour
        les priorités de son utilisateur, sans jamais dégrader l&apos;expérience
        des autres acteurs.
      </p>
    </TextSection>
  );
}
