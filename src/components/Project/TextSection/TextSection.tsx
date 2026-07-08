import { ReactNode } from "react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
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
        <SectionHeader label={label} heading={heading} />
        <div className={styles.body}>{children}</div>
      </div>
    </section>
  );
}
