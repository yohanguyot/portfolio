import SplitSection from "@/components/Project/SplitSection/SplitSection";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./ProjectSolution.module.css";

export default function ProjectSolution() {
  return (
    <SplitSection
      imageSrc="/images/projects/bloom/theme-comparison.png"
      imageAlt="Bloom — comparaison des thèmes Bloom et Érable"
      imagePosition="left"
    >
      <SectionHeader
        label="Solution"
        heading="Un seul système pour toutes les marques."
      />
      <div className={styles.body}>
        <p className={styles.paragraph}>
          Pour industrialiser le produit à partir d&apos;une base unique,
          la solution s&apos;appuie sur une architecture à trois niveaux :
          des valeurs primitives fixes, des tokens sémantiques configurables
          par client, et des composants agnostiques.
        </p>
        <p className={styles.paragraph}>
          L&apos;intégration technique ne se fait qu&apos;une fois pour que
          la UI s&apos;adapte dynamiquement. Ce qui demandait des mois de
          recherche et de développement s&apos;intègre désormais chez un
          nouveau client en une semaine.
        </p>
      </div>
    </SplitSection>
  );
}
