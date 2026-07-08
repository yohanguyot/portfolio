import TextSection from "@/components/Project/TextSection/TextSection";
import styles from "./ProjectSolution.module.css";

export default function ProjectSolution() {
  return (
    <TextSection label="Solution" heading="Traduire la technique en langage métier.">
      <p className={styles.paragraph}>
        La solution articule cette double lecture autour de quatre flux clés :
        le pilotage via le dashboard, la traçabilité via l&apos;historique,
        l&apos;action via le dépôt et la levée du doute via la vérification.
      </p>
      <p className={styles.paragraph}>
        Cette approche hiérarchise l&apos;information pour afficher d&apos;office
        l&apos;essentiel et rend la donnée technique accessible à la demande.
        Les statuts de l&apos;interface sont ainsi nommés pour répondre à une
        question concrète de l&apos;utilisateur, et non pour décrire un état
        système.
      </p>
    </TextSection>
  );
}
