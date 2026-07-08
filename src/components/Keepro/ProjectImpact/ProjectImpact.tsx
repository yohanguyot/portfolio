import { CircleCheck, SquareTerminal } from "lucide-react";
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
              heading="Optimiser l'efficacité opérationnelle."
            />
            <p className={styles.description}>
              En élimant les frictions liées à la lecture des données techniques,
              l&apos;interface supprime la perte de temps historique de la
              certification. L&apos;information s&apos;adapte au profil de
              l&apos;utilisateur pour lui délivrer le niveau de lecture exact dont
              il a besoin, garantissant l&apos;autonomie des équipes métiers comme
              des développeurs.
            </p>
          </div>
          <FeatureCard direction="horizontal">
            <FeatureItem
              icon={CircleCheck}
              title="Équipes métier"
              description="Plus besoin de solliciter un expert pour valider un dépôt. Les statuts sont lisibles sans culture blockchain, la progression s'affiche en temps réel et le support reste accessible directement dans l'interface."
            />
            <FeatureItem
              icon={SquareTerminal}
              title="Équipes techniques"
              description="Plus besoin de chercher un hash : tout est centralisé dans le détail du dépôt. L'export CSV couvre les besoins d'audit, renforçant l'autonomie des utilisateurs pour réduire drastiquement les tickets."
            />
          </FeatureCard>
        </div>
        <ProjectNav
          prev={{ href: "/bloom", label: "Bloom" }}
          next={{ href: "/lecoffre", label: "LeCoffre" }}
        />
      </div>
    </section>
  );
}
