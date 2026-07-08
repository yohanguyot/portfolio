import { LayoutTemplate, ArrowLeftRight, Shield } from "lucide-react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import styles from "./ProjectDecisions.module.css";

export default function ProjectDecisions() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeader
          label="Décisions"
          heading="Faire converger deux réalités métiers."
        />
        <FeatureCard direction="horizontal">
          <FeatureItem
            direction="column"
            icon={LayoutTemplate}
            title="Conception sur mesure"
            description="L'application charge un environnement dédié selon le compte (CGP ou Middle Office). L'interface s'adapte aux flux de chaque métier sans surcharge visuelle."
          />
          <FeatureItem
            direction="column"
            icon={ArrowLeftRight}
            title="Flux synchronisés"
            description="Chaque action se répercute instantanément d'un type de compte à l'autre pour éliminer les angles morts. Les statuts partagés offrent un repère commun et synchronisé aux deux métiers."
          />
          <FeatureItem
            direction="column"
            icon={Shield}
            title="Réglementation invisible"
            description="Le KYC et la signature électronique ont été fondus directement dans le tunnel. Ces étapes obligatoires s'exécutent en arrière-plan pour maintenir la fluidité du parcours."
          />
        </FeatureCard>
      </div>
    </section>
  );
}
