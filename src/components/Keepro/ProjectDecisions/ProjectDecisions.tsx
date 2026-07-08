import { EyeOff, Group, Layers2 } from "lucide-react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import styles from "./ProjectDecisions.module.css";

export default function ProjectDecisions() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <SectionHeader
            label="Décisions"
            heading="Hiérarchiser l'interface par priorités."
          />
          <p className={styles.description}>
            Chaque choix d&apos;affichage a été dicté par une hiérarchie stricte
            de l&apos;information. L&apos;expérience repose sur trois arbitrages
            majeurs, conçus pour guider le regard du profil métier sans jamais
            surcharger l&apos;interface.
          </p>
        </div>
        <FeatureCard direction="horizontal">
          <FeatureItem
            icon={EyeOff}
            title="Masquer la complexité"
            description="Les données cryptographiques brutes sont retirées de la vue principale. L'interface se concentre sur l'intention première de l'utilisateur : savoir si le dépôt a bien abouti."
          />
          <FeatureItem
            icon={Group}
            title="Grouper par lot et par espace"
            description="Plusieurs fichiers déposés ensemble ne forment qu'une seule entrée dans l'historique. Les espaces prennent le relais pour segmenter ces dépôts par contexte métier."
          />
          <FeatureItem
            icon={Layers2}
            title="Deux niveaux de lecture"
            description="Les équipes opérationnelles suivent le flux principal en plein écran. Les profils techniques accèdent aux données brutes via un drawer, préservant la clarté de la vue générale."
          />
        </FeatureCard>
      </div>
    </section>
  );
}
