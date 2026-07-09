import SplitSection from "@/components/Project/SplitSection/SplitSection";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import type { Dictionary } from "@/lib/getDictionary";
import styles from "./ProjectClient.module.css";

type Props = { dict: Dictionary["lecoffre"]["client"] };

export default function ProjectClient({ dict }: Props) {
  return (
    <SplitSection
      imageSrc="/images/projects/lecoffre/client.png"
      imageAlt="Interface espace client LeCoffre — parcours de dépôt de documents"
      imagePosition="left"
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
