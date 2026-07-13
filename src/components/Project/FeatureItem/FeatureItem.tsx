import type { LucideProps } from "lucide-react";
import SquareIcon from "@/components/SquareIcon/SquareIcon";
import styles from "./FeatureItem.module.css";

type Props = {
  icon: React.ComponentType<LucideProps>;
  title: string;
  description: string;
  label?: string;
  direction?: "row" | "column";
};

export default function FeatureItem({ icon, title, description, label, direction }: Props) {
  if (label || direction === "column") {
    return (
      <div className={styles.column}>
        <div className={styles.columnTop}>
          <SquareIcon icon={icon} />
          <div className={styles.text}>
            <p className={styles.title}>{title}</p>
            <p className={styles.desc}>{description}</p>
          </div>
        </div>
        {label && <p className={styles.label}>{label}</p>}
      </div>
    );
  }
  return (
    <div className={styles.row}>
      <SquareIcon icon={icon} />
      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
        <p className={styles.desc}>{description}</p>
      </div>
    </div>
  );
}
