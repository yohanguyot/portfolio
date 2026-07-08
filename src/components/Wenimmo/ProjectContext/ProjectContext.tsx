import SplitSection from "@/components/Project/SplitSection/SplitSection";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./ProjectContext.module.css";

export default function ProjectContext() {
  return (
    <SplitSection
      imageSrc="/images/projects/wenimmo/context.png"
      imageAlt="Interface Wenimmo — liste des clients CGP"
      dimImage
    >
      <SectionHeader
        label="Contexte"
        heading={"Une donnée partagée,\ndeux usages différents."}
      />
      <div className={styles.body}>
        <p className={styles.paragraph}>
          Wenimmo est un SaaS B2B de distribution financière. Les CGP y initient
          les souscriptions et gèrent la relation client, tandis que le Middle
          Office pilote la conformité et la validation des dossiers.
        </p>
        <p className={styles.paragraph}>
          Le défi&nbsp;: faire cohabiter ces parcours divergents au sein
          d&apos;un outil unique sans alourdir l&apos;expérience.
        </p>
      </div>
    </SplitSection>
  );
}
