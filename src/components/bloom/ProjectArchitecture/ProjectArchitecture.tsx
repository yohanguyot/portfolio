import { Hash, Tag, Component } from "lucide-react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import styles from "./ProjectArchitecture.module.css";

const LAYERS = [
  {
    icon: Hash,
    title: "Valeurs brutes",
    description:
      "Chaque valeur brute est définie sans intention sémantique : la base technique est posée, mais elle reste déconnectée du produit.",
    label: "//couche 1",
  },
  {
    icon: Tag,
    title: "Rôles sémantiques",
    description:
      "Chaque primitive reçoit un rôle fonctionnel. L'identité s'applique à ce niveau, sans impacter l'architecture des composants.",
    label: "//couche 2",
  },
  {
    icon: Component,
    title: "Composants finaux",
    description:
      "Chaque composant consomme uniquement ces tokens sémantiques. La cohérence reste totale, quelle que soit l'identité du client.",
    label: "//couche 3",
  },
];

export default function ProjectArchitecture() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.top}>
          <SectionHeader label="Architecture" heading="Des composants modulaires." />
          <p className={styles.description}>
            Certains clients imposent des contraintes imprévues. Un composant trop rigide
            force un fork&nbsp;; trop générique, il ne sert plus à rien. La réponse repose
            sur des composants fixes, déclinés en variantes capables d&apos;absorber ces
            spécificités.
          </p>
        </div>

        <FeatureCard direction="horizontal">
          {LAYERS.map((layer) => (
            <FeatureItem
              key={layer.title}
              icon={layer.icon}
              title={layer.title}
              description={layer.description}
              label={layer.label}
            />
          ))}
        </FeatureCard>
      </div>
    </section>
  );
}
