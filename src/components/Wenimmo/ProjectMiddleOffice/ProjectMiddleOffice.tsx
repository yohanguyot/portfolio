import { LayoutDashboard, MousePointerClick, Funnel, Archive } from "lucide-react";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import type { Dictionary } from "@/lib/getDictionary";
import styles from "./ProjectMiddleOffice.module.css";

const ICONS = [LayoutDashboard, MousePointerClick, Funnel, Archive];

type Props = { dict: Dictionary["wenimmo"]["middleOffice"] };

export default function ProjectMiddleOffice({ dict }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.split}>
          <div className={styles.imageWrap}>
            <Image
              src="/images/projects/wenimmo/middle-office.png"
              alt="Interface Wenimmo — vue dossier Middle Office"
              width={1440}
              height={900}
              className={styles.image}
            />
          </div>
          <div className={styles.textCol}>
            <SectionHeader label={dict.label} heading={dict.heading} />
            <p className={styles.paragraph}>{dict.description}</p>
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
