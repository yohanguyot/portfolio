import { GitFork, ListChecks, Tag, Lock } from "lucide-react";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import type { Dictionary } from "@/lib/getDictionary";
import styles from "./ProjectCGP.module.css";

const ICONS = [GitFork, ListChecks, Tag, Lock];

type Props = { dict: Dictionary["wenimmo"]["cgp"] };

export default function ProjectCGP({ dict }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.split}>
          <div className={styles.textCol}>
            <SectionHeader label={dict.label} heading={dict.heading} />
            <p className={styles.paragraph}>{dict.description}</p>
          </div>
          <div className={styles.imageWrap}>
            <Image
              src="/images/projects/wenimmo/cgp.png"
              alt="Interface Wenimmo — tunnel de souscription CGP"
              width={1440}
              height={900}
              className={styles.image}
            />
          </div>
        </div>

        <FeatureCard direction="horizontal" wrap>
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
