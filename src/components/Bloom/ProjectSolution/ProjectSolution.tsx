import SplitSection from "@/components/Project/SplitSection/SplitSection";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import type { Dictionary } from "@/lib/getDictionary";
import styles from "./ProjectSolution.module.css";

type Props = { dict: Dictionary["bloom"]["solution"] };

export default function ProjectSolution({ dict }: Props) {
  return (
    <SplitSection
      imageSrc="/images/projects/bloom/theme-comparison.png"
      imageAlt="Bloom — comparaison des thèmes Bloom et Érable"
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
