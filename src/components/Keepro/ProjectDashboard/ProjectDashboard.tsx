import SplitSection from "@/components/Project/SplitSection/SplitSection";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import type { Dictionary } from "@/lib/getDictionary";
import styles from "./ProjectDashboard.module.css";

type Props = { dict: Dictionary["keepro"]["dashboard"] };

export default function ProjectDashboard({ dict }: Props) {
  return (
    <SplitSection
      imageSrc="/images/projects/keepro/dashboard.png"
      imageAlt="Dashboard Keepro — vue des indicateurs et de l'historique des dépôts"
      imagePosition="left"
      dimImage
    >
      <SectionHeader label={dict.label} heading={dict.heading} />
      <p className={styles.description}>{dict.description}</p>
    </SplitSection>
  );
}
