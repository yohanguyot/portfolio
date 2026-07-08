import { FileCheck, User } from "lucide-react";
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
              heading="Zéro formation, zéro relance."
            />
            <p className={styles.description}>
              L&apos;interface supprime la complexité de prise en main pour des
              profils aux usages asymétriques. En cloisonnant les espaces,
              chaque acteur dispose d&apos;un environnement calibré pour ses
              objectifs opérationnels, sans bruit visuel inutile.
            </p>
          </div>
          <FeatureCard direction="horizontal">
            <FeatureItem
              icon={FileCheck}
              title="Pour les notaires"
              description="Zéro relance manuelle égarée dans les flux d'emails. L'interface centralise le suivi des dossiers en temps réel, offre une visibilité totale et permet de relancer ou de certifier en un clic."
            />
            <FeatureItem
              icon={User}
              title="Pour les clients"
              description="Une autonomie complète dès le départ. FranceConnect lève la friction de l'authentification, le parcours indique les pièces attendues et notifie le client à chaque étape."
            />
          </FeatureCard>
        </div>
        <ProjectNav
          prev={{ href: "/keepro", label: "Keepro" }}
          next={{ href: "/wenimmo", label: "Wenimmo" }}
        />
      </div>
    </section>
  );
}
