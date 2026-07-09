import SplitSection from "@/components/Project/SplitSection/SplitSection";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import type { Dictionary } from "@/lib/getDictionary";
import styles from "./ProjectAdmin.module.css";

type Props = { dict: Dictionary["lecoffre"]["admin"] };

export default function ProjectAdmin({ dict }: Props) {
  return (
    <SplitSection
      imageSrc="/images/projects/lecoffre/admin.png"
      imageAlt="Interface espace admin LeCoffre — gestion des permissions et système de vote"
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
