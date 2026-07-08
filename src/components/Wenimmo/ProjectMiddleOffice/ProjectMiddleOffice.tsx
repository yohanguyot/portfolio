import { LayoutDashboard, MousePointerClick, Funnel, Archive } from "lucide-react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import styles from "./ProjectMiddleOffice.module.css";

export default function ProjectMiddleOffice() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.split}>
          <div className={styles.textCol}>
            <SectionHeader
              label="Profil Middle Office"
              heading={"Maîtriser le traitement de\ndossiers en masse"}
            />
            <p className={styles.paragraph}>
              Le Middle Office orchestre quotidiennement des dizaines de
              souscriptions complexes aux statuts constamment changeants. Face à
              cette volatilité, l&apos;interface s&apos;adapte en temps réel à
              chaque étape du cycle de vie du dossier pour rationaliser les flux
              de masse, automatiser les tâches répétitives et verrouiller
              définitivement les risques d&apos;erreur opérationnelle.
            </p>
          </div>
          <div className={styles.imageWrap}>
            <img
              src="/images/projects/wenimmo/middle-office.png"
              alt="Interface Wenimmo — vue dossier Middle Office"
              className={styles.image}
            />
          </div>
        </div>

        <FeatureCard direction="horizontal" wrap>
          <FeatureItem
            direction="column"
            icon={LayoutDashboard}
            title="Vue centralisée"
            description="Véritable tableau de bord opérationnel, la vue liste centralise tous les dossiers pour piloter l'ensemble des flux, quel que soit le CGP d'origine."
          />
          <FeatureItem
            direction="column"
            icon={MousePointerClick}
            title="Actions contextuelles"
            description="Qu'il s'agisse de relancer, signaler ou valider, les actions s'adaptent dynamiquement au statut du dossier pour éliminer toute manipulation impossible."
          />
          <FeatureItem
            direction="column"
            icon={Funnel}
            title="Contrôle du volume"
            description="Les filtres avancés et la sélection multiple accélèrent le traitement de masse, sans jamais sacrifier la traçabilité individuelle et l'audit de chaque dossier."
          />
          <FeatureItem
            direction="column"
            icon={Archive}
            title="Clôture confirmée"
            description="Une fois validé par l'opérateur, le dossier change radicalement d'état : ce statut final fige le visuel et verrouille définitivement l'historique de la souscription."
          />
        </FeatureCard>
      </div>
    </section>
  );
}
