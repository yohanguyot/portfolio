import { EyeOff, Group, Layers2 } from "lucide-react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import type { Dictionary } from "@/lib/getDictionary";
import styles from "./ProjectDecisions.module.css";

const ICONS = [EyeOff, Group, Layers2];

type Props = { dict: Dictionary["keepro"]["decisions"] };

export default function ProjectDecisions({ dict }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <SectionHeader label={dict.label} heading={dict.heading} />
          <p className={styles.description}>{dict.description}</p>
        </div>
        <FeatureCard direction="horizontal">
          {dict.features.map((f, i) => (
            <FeatureItem
              key={i}
              direction="column"
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
