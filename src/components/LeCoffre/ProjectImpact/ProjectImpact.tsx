import { FileCheck, User } from "lucide-react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import ProjectNav from "@/components/Project/Nav/Nav";
import type { Dictionary } from "@/lib/getDictionary";
import styles from "./ProjectImpact.module.css";

const ICONS = [FileCheck, User];

type Props = { dict: Dictionary["lecoffre"]["impact"] };

export default function ProjectImpact({ dict }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.impact}>
          <div className={styles.header}>
            <SectionHeader label={dict.label} heading={dict.heading} />
            <p className={styles.description}>{dict.description}</p>
          </div>
          <FeatureCard direction="horizontal">
            {dict.features.map((f, i) => (
              <FeatureItem
                key={i}
                icon={ICONS[i]}
                title={f.title}
                description={f.description}
              />
            ))}
          </FeatureCard>
        </div>
        <ProjectNav
          prev={{ href: "/keepro", label: "Keepro" }}
          next={{ href: "/wenimmo", label: "Wenimmo" }}
        />
      </div>
    </section>
  );
}
