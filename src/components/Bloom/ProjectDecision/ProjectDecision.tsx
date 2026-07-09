import { TriangleAlert, Layers } from "lucide-react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import type { Dictionary } from "@/lib/getDictionary";
import styles from "./ProjectDecision.module.css";

const ICONS = [TriangleAlert, Layers];

type Props = { dict: Dictionary["bloom"]["decision"] };

export default function ProjectDecision({ dict }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.top}>
          <SectionHeader label={dict.label} heading={dict.heading} />
          <p className={styles.description}>{dict.description}</p>
        </div>

        <div className={styles.imageWrap}>
          <img
            src="/images/projects/bloom/tokens.png"
            alt="Diagramme des tokens Bloom : primitifs, sémantiques et composants"
            className={styles.image}
          />
        </div>

        <FeatureCard direction="horizontal">
          {dict.features.map((f, i) => (
            <FeatureItem
              key={f.title}
              icon={ICONS[i]}
              title={f.title}
              description={f.description}
            />
          ))}
        </FeatureCard>
      </div>
    </section>
  );
}
