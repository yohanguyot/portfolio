import TextSection from "@/components/Project/TextSection/TextSection";
import type { Dictionary } from "@/lib/getDictionary";
import styles from "./ProjectSolution.module.css";

type Props = { dict: Dictionary["lecoffre"]["solution"] };

export default function ProjectSolution({ dict }: Props) {
  return (
    <TextSection label={dict.label} heading={dict.heading}>
      <p className={styles.paragraph}>{dict.p1}</p>
      <p className={styles.paragraph}>{dict.p2}</p>
    </TextSection>
  );
}
