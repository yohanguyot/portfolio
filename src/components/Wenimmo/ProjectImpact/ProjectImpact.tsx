import { BriefcaseBusiness, User } from "lucide-react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import ProjectNav from "@/components/Project/Nav/Nav";
import styles from "./ProjectImpact.module.css";

export default function ProjectImpact() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.impact}>
          <div className={styles.header}>
            <SectionHeader
              label="Impact"
              heading="Une productivité décuplée."
            />
            <p className={styles.description}>
              L&apos;unification du parcours supprime la frontière entre le
              front et le back-office. Une seule interface orchestre désormais
              deux profils aux objectifs opposés, garantissant une fluidité
              opérationnelle totale.
            </p>
          </div>
          <FeatureCard direction="horizontal">
            <FeatureItem
              icon={BriefcaseBusiness}
              title="Pour les CGP"
              description="Les interruptions de parcours ne coupent plus le flux de travail. Le suivi visuel permet de reprendre n'importe quel dossier en cours, éliminant définitivement les frictions de saisie."
            />
            <FeatureItem
              icon={User}
              title="Pour le Middle Office"
              description="Sécurité et fluidité guident le traitement de masse. Les actions contextuelles et la traçabilité intégrée suppriment les erreurs de saisie et fluidifient drastiquement les validations."
            />
          </FeatureCard>
        </div>
        <ProjectNav
          prev={{ href: "/lecoffre", label: "LeCoffre" }}
          next={{ href: "/bloom", label: "Bloom" }}
        />
      </div>
    </section>
  );
}
