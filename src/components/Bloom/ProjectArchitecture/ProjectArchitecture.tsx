import { Hash, Tag, Component } from "lucide-react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import type { Dictionary } from "@/lib/getDictionary";
import styles from "./ProjectArchitecture.module.css";

const ICONS = [Hash, Tag, Component];

type Props = { dict: Dictionary["bloom"]["architecture"] };

export default function ProjectArchitecture({ dict }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.top}>
          <SectionHeader label={dict.label} heading={dict.heading} />
          <p className={styles.description}>{dict.description}</p>
        </div>

        <FeatureCard direction="horizontal">
          {dict.layers.map((layer, i) => (
            <FeatureItem
              key={layer.title}
              icon={ICONS[i]}
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
