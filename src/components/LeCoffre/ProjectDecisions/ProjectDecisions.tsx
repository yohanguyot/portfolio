import { LayoutPanelLeft, ListChecks, ShieldCheck } from "lucide-react";
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
          heading="Simplifier l'outil par des choix."
        />
        <FeatureCard direction="horizontal">
          <FeatureItem
            direction="column"
            icon={LayoutPanelLeft}
            title="Espaces séparés"
            description="Chaque profil trouve son compte : le notaire dispose d'une vue dense pour son expertise, tandis que le client bénéficie d'un parcours épuré et sans distraction."
          />
          <FeatureItem
            direction="column"
            icon={ListChecks}
            title="Statuts progressifs"
            description="Un pipeline visuel remplace les états flous par des étapes claires. L'utilisateur sait précisément où en est son dossier, ce qui réduit drastiquement les relances."
          />
          <FeatureItem
            direction="column"
            icon={ShieldCheck}
            title="Blockchain intégrée"
            description="L'ancrage blockchain s'intègre directement dans le flux de travail du notaire. La certification devient une action transparente avec un retour visuel instantané, sans aucun outil tiers."
          />
        </FeatureCard>
      </div>
    </section>
  );
}
