import { FileCheck, Variable } from "lucide-react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import type { Dictionary } from "@/lib/getDictionary";
import styles from "./ProjectMethod.module.css";

const ICONS = [FileCheck, Variable];

type Props = { dict: Dictionary["bloom"]["method"] };

export default function ProjectMethod({ dict }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <SectionHeader
            label={dict.label}
            heading={dict.heading.split("\n").map((line, i, arr) => (
              <span key={i} style={{ display: "block" }}>{line}</span>
            ))}
          />
          <div className={styles.body}>
            <p className={styles.paragraph}>{dict.p1}</p>
            <p className={styles.paragraph}>{dict.p2}</p>
          </div>
        </div>

        <FeatureCard className={styles.featureCard}>
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
