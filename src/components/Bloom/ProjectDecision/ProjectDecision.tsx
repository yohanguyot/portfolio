import { TriangleAlert, Layers } from "lucide-react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import styles from "./ProjectDecision.module.css";

const FEATURES = [
  {
    icon: TriangleAlert,
    title: "Limites du modèle brut",
    description:
      "Lier les composants aux valeurs brutes accélère le démarrage, mais accumule de la dette technique à chaque déclinaison client.",
  },
  {
    icon: Layers,
    title: "L'écosystème sémantique",
    description:
      "Une couche intermédiaire traduit les primitives selon leur contexte. Changer l'identité d'un client se résume à modifier quelques variables.",
  },
];

export default function ProjectDecision() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.top}>
          <SectionHeader label="Décision" heading="Industrialiser le multi-marque." />
          <p className={styles.description}>
            Bloom a démarré sans couche sémantique par pragmatisme. Avec la croissance du
            produit, cette dette technique a imposé trois semaines de refonte pour
            restructurer le système. Pour un produit scalable, cette couche intermédiaire
            est une fondation indispensable dès le départ, pas une optimisation tardive.
          </p>
        </div>

        <div className={styles.imageWrap}>
          <img
            src="/images/projects/bloom/tokens.png"
            alt="Diagramme des tokens Bloom : primitifs, sémantiques et composants"
            className={styles.image}
          />
        </div>

        <FeatureCard direction="horizontal">
          {FEATURES.map((f) => (
            <FeatureItem
              key={f.title}
              icon={f.icon}
              title={f.title}
              description={f.description}
            />
          ))}
        </FeatureCard>
      </div>
    </section>
  );
}
