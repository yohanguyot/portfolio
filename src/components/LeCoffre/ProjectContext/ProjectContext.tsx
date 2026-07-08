import SplitSection from "@/components/Project/SplitSection/SplitSection";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./ProjectContext.module.css";

export default function ProjectContext() {
  return (
    <SplitSection
      imageSrc="/images/projects/lecoffre/context.png"
      imageAlt="Interface LeCoffre.io — collecte et vérification de documents notariaux"
    >
      <SectionHeader
        label="Contexte"
        heading={"Simplifier et sécuriser\nla collecte notariale."}
      />
      <div className={styles.body}>
        <p className={styles.paragraph}>
          La plateforme centralise et automatise la collecte de ces pièces
          sensibles. Depuis son espace, le notaire contrôle chaque document reçu
          avant de sécuriser le dossier final par un ancrage blockchain.
        </p>
        <p className={styles.paragraph}>
          En miroir, le client final dispose d&apos;un parcours guidé pour
          transmettre ses justificatifs et suivre l&apos;avancement de son
          dossier en toute autonomie.
        </p>
      </div>
    </SplitSection>
  );
}
