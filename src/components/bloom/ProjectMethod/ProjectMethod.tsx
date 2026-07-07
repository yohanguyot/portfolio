import { FileCheck, Variable } from "lucide-react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import SquareIcon from "@/components/SquareIcon/SquareIcon";
import styles from "./ProjectMethod.module.css";

const FEATURES = [
  {
    icon: FileCheck,
    title: "Un livrable autonome",
    description:
      "Le livrable n'a pas besoin d'être expliqué en réunion. Les annotations intégrées pendant la conception capturent l'intention réelle, éliminant les corrections après coup.",
    divider: true,
  },
  {
    icon: Variable,
    title: "Un nommage calqué sur le code",
    description:
      "Design system et code partagent les mêmes conventions de nommage. Le développeur retrouve immédiatement ses repères, transformant le handoff en une simple synchronisation.",
    divider: false,
  },
];

export default function ProjectMethod() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <SectionHeader
            label="Méthode"
            heading="Conçu en autonomie. Pensé pour être repris."
          />
          <div className={styles.body}>
            <p className={styles.paragraph}>
              Travailler seul impose une rigueur absolue dans la documentation :
              nommer, justifier et annoter la moindre décision pour fluidifier
              la mise en production par le développeur qui intégrera
              l&apos;interface.
            </p>
            <p className={styles.paragraph}>
              Le système doit pouvoir se comprendre sans ouvrir Figma. Les
              composants sont structurés par état d&apos;usage et les tokens
              portent un nom sémantique plutôt qu&apos;une valeur brute.
            </p>
          </div>
        </div>

        <div className={styles.card}>
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className={`${styles.feature} ${feature.divider ? styles.featureDivider : ""}`}
            >
              <SquareIcon icon={feature.icon} />
              <div className={styles.featureText}>
                <p className={styles.featureTitle}>{feature.title}</p>
                <p className={styles.featureDesc}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
