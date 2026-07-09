import SplitSection from "@/components/Project/SplitSection/SplitSection";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import type { Dictionary } from "@/lib/getDictionary";
import styles from "./ProjectContext.module.css";

type Props = { dict: Dictionary["lecoffre"]["context"] };

export default function ProjectContext({ dict }: Props) {
  return (
    <SplitSection
      imageSrc="/images/projects/lecoffre/context.png"
      imageAlt="Interface LeCoffre.io — collecte et vérification de documents notariaux"
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
