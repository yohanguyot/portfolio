import { FileCheck, Variable } from "lucide-react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import styles from "./ProjectMethod.module.css";

const FEATURES = [
  {
    icon: FileCheck,
    title: "Un livrable autonome",
    description:
      "Le livrable n'a pas besoin d'être expliqué en réunion. Les annotations intégrées pendant la conception capturent l'intention réelle, éliminant les corrections après coup.",
  },
  {
    icon: Variable,
    title: "Un nommage calqué sur le code",
    description:
      "Design system et code partagent les mêmes conventions de nommage. Le développeur retrouve immédiatement ses repères, transformant le handoff en une simple synchronisation.",
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

        <FeatureCard className={styles.featureCard}>
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
