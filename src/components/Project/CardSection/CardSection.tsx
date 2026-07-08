import { ReactNode } from "react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./CardSection.module.css";

type Props = {
  label: string;
  heading: string;
  children: ReactNode;
};

export default function CardSection({ label, heading, children }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <SectionHeader label={label} heading={heading} />
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </section>
  );
}
