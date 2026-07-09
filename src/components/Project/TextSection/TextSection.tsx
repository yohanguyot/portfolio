import { ReactNode } from "react";
import styles from "./TextSection.module.css";

type Props = {
  label: string;
  heading: string;
  children: ReactNode;
};

export default function TextSection({ label, heading, children }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.label}>{label}</p>
        <div className={styles.row}>
          <h2 className={styles.heading}>{heading}</h2>
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </section>
  );
}
