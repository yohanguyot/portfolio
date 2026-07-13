import CardSection from "@/components/Project/CardSection/CardSection";
import type { Dictionary } from "@/lib/getDictionary";
import styles from "./ProjectProblem.module.css";

type Props = { dict: Dictionary["wenimmo"]["problem"] };

export default function ProjectProblem({ dict }: Props) {
  return (
    <CardSection label={dict.label} heading={dict.heading}>
      <p className={styles.paragraph}>{dict.p1}</p>
      <p className={styles.paragraph}>{dict.p2}</p>
    </CardSection>
  );
}
