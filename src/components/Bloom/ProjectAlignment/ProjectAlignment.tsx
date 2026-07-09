import SplitSection from "@/components/Project/SplitSection/SplitSection";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import type { Dictionary } from "@/lib/getDictionary";
import styles from "./ProjectAlignment.module.css";

type Props = { dict: Dictionary["bloom"]["alignment"] };

export default function ProjectAlignment({ dict }: Props) {
  return (
    <SplitSection
      imageSrc="/images/projects/bloom/file-reading.png"
      imageAlt="Fichier Figma montrant la structure des tokens alignée sur le code"
      imagePosition="left"
    >
      <SectionHeader label={dict.label} heading={dict.heading} />
      <div className={styles.body}>
        <p className={styles.paragraph}>{dict.p1}</p>
        <p className={styles.paragraph}>{dict.p2}</p>
      </div>
    </SplitSection>
  );
}
