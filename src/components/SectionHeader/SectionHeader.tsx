import styles from "./SectionHeader.module.css";

type SectionHeaderProps = {
  label: string;
  heading: React.ReactNode;
  className?: string;
};

export default function SectionHeader({ label, heading, className }: SectionHeaderProps) {
  return (
    <div className={[styles.titleBlock, className].filter(Boolean).join(" ")}>
      <p className={styles.label}>{label}</p>
      <h2 className={styles.heading}>{heading}</h2>
    </div>
  );
}
