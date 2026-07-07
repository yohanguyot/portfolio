import { Hash, Tag, Component } from "lucide-react";
import SquareIcon from "@/components/SquareIcon/SquareIcon";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./ProjectArchitecture.module.css";

const LAYERS = [
  {
    icon: Hash,
    title: "Valeurs brutes",
    description:
      "Chaque valeur brute est définie sans intention sémantique : la base technique est posée, mais elle reste déconnectée du produit.",
    label: "//couche 1",
    divider: true,
  },
  {
    icon: Tag,
    title: "Rôles sémantiques",
    description:
      "Chaque primitive reçoit un rôle fonctionnel. L'identité s'applique à ce niveau, sans impacter l'architecture des composants.",
    label: "//couche 2",
    divider: true,
  },
  {
    icon: Component,
    title: "Composants finaux",
    description:
      "Chaque composant consomme uniquement ces tokens sémantiques. La cohérence reste totale, quelle que soit l'identité du client.",
    label: "//couche 3",
    divider: false,
  },
];

export default function ProjectArchitecture() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.top}>
          <SectionHeader label="Architecture" heading="Des composants modulaires." />
          <p className={styles.description}>
            Certains clients imposent des contraintes imprévues. Un composant trop rigide force un fork&nbsp;; trop générique, il ne sert plus à rien. La réponse repose sur des composants fixes, déclinés en variantes capables d&apos;absorber ces spécificités.
          </p>
        </div>

        <div className={styles.card}>
          {LAYERS.map((layer) => (
            <div
              key={layer.title}
              className={`${styles.col} ${layer.divider ? styles.colDivider : ""}`}
            >
              <div className={styles.colTop}>
                <SquareIcon icon={layer.icon} />
                <div className={styles.text}>
                  <p className={styles.title}>{layer.title}</p>
                  <p className={styles.desc}>{layer.description}</p>
                </div>
              </div>
              <p className={styles.layerLabel}>{layer.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
