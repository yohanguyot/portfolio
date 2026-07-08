import SplitSection from "@/components/Project/SplitSection/SplitSection";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./ProjectContext.module.css";

export default function ProjectContext() {
  return (
    <SplitSection
      imageSrc="/images/projects/keepro/context.png"
      imageAlt="Keepro — vue liste des dépôts certifiés"
    >
      <SectionHeader label="Contexte" heading="Rendre la certification blockchain accessible." />
      <div className={styles.body}>
        <p className={styles.paragraph}>
          La plateforme génère l&apos;empreinte cryptographique des fichiers
          pour prouver leur existence et leur intégrité de façon immuable.
        </p>
        <p className={styles.paragraph}>
          Tout l&apos;enjeu de conception consistait à rendre cet ancrage
          technique transparent pour les équipes métiers (juridique, RH,
          conformité) qui déposent et vérifient quotidiennement ces documents
          sensibles.
        </p>
      </div>
    </SplitSection>
  );
}
