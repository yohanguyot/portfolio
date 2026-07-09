import { LayoutPanelLeft, ListChecks, ShieldCheck } from "lucide-react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import type { Dictionary } from "@/lib/getDictionary";
import styles from "./ProjectDecisions.module.css";

const ICONS = [LayoutPanelLeft, ListChecks, ShieldCheck];

type Props = { dict: Dictionary["lecoffre"]["decisions"] };

export default function ProjectDecisions({ dict }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeader label={dict.label} heading={dict.heading} />
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
