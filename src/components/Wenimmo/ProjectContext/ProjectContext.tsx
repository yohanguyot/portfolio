import SplitSection from "@/components/Project/SplitSection/SplitSection";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import type { Dictionary } from "@/lib/getDictionary";
import styles from "./ProjectContext.module.css";

type Props = { dict: Dictionary["wenimmo"]["context"] };

export default function ProjectContext({ dict }: Props) {
  return (
    <SplitSection
      imageSrc="/images/projects/wenimmo/context.png"
      imageAlt="Interface Wenimmo — liste des clients CGP"
      dimImage
    >
      <SectionHeader label={dict.label} heading={dict.heading} />
      <div className={styles.body}>
        <p className={styles.paragraph}>{dict.p1}</p>
        <p className={styles.paragraph}>{dict.p2}</p>
      </div>
    </SplitSection>
  );
}
