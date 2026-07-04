import type { LucideProps } from "lucide-react";
import styles from "./SquareIcon.module.css";

type SquareIconProps = {
  icon: React.ComponentType<LucideProps>;
};

export default function SquareIcon({ icon: Icon }: SquareIconProps) {
  return (
    <div className={styles.wrap}>
      <Icon size={20} strokeWidth={1.5} className={styles.icon} />
    </div>
  );
}
