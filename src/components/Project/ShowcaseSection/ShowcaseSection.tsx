import { ReactNode } from "react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./ShowcaseSection.module.css";

type Props = {
  label: string;
  heading: string;
  description: ReactNode;
  imageSrc: string;
  imageAlt?: string;
  dimImage?: boolean;
};

export default function ShowcaseSection({
  label,
  heading,
  description,
  imageSrc,
  imageAlt = "",
  dimImage,
}: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <SectionHeader label={label} heading={heading} />
          <div className={styles.description}>{description}</div>
        </div>
        <div className={styles.imageWrap}>
          <img src={imageSrc} alt={imageAlt} className={`${styles.image}${dimImage ? ` ${styles.dim}` : ""}`} />
        </div>
      </div>
    </section>
  );
}
