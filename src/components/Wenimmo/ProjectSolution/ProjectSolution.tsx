import TextSection from "@/components/Project/TextSection/TextSection";
import styles from "./ProjectSolution.module.css";

export default function ProjectSolution() {
  return (
    <TextSection
      label="Solution"
      heading={"Centraliser la donnée,\nadapter l'expérience."}
    >
      <p className={styles.paragraph}>
        La plateforme s&apos;appuie sur une base de données unique pour garantir
        une synchronisation totale. L&apos;interface s&apos;ajuste
        dynamiquement au profil en modifiant sa densité visuelle, ses priorités
        et ses actions.
      </p>
      <p className={styles.paragraph}>
        D&apos;un côté, un parcours linéaire guide le CGP jusqu&apos;à la
        signature. De l&apos;autre, un pipeline dense est optimisé pour le
        traitement de masse du Middle Office.
      </p>
    </TextSection>
  );
}
