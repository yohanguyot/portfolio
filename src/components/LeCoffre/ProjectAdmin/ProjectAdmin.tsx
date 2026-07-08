import SplitSection from "@/components/Project/SplitSection/SplitSection";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./ProjectAdmin.module.css";

export default function ProjectAdmin() {
  return (
    <SplitSection
      imageSrc="/images/projects/lecoffre/admin.png"
      imageAlt="Interface espace admin LeCoffre — gestion des permissions et système de vote"
      dimImage
    >
      <SectionHeader
        label="Espace admin"
        heading="Sécuriser la gouvernance par le vote."
      />
      <div className={styles.body}>
        <p className={styles.paragraph}>
          L&apos;espace d&apos;administration centralise le contrôle des offices
          notariaux à travers trois niveaux de permissions distincts, conçus
          pour segmenter finement les responsabilités.
        </p>
        <p className={styles.paragraph}>
          Pour protéger les données sensibles, le rôle de Super-Admin intègre
          un système de vote obligatoire. Cette décision de conception garantit
          qu&apos;aucune modification critique des droits de l&apos;écosystème
          ne peut être validée unilatéralement par un seul utilisateur.
        </p>
      </div>
    </SplitSection>
  );
}
