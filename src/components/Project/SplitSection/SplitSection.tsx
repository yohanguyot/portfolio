import { ReactNode } from "react";
import styles from "./SplitSection.module.css";

type Props = {
  imageSrc: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  children: ReactNode;
};

export default function SplitSection({
  imageSrc,
  imageAlt = "",
  imagePosition = "right",
  children,
}: Props) {
  return (
    <section
      className={`${styles.section} ${imagePosition === "left" ? styles.imageLeft : ""}`}
    >
      <div className={styles.container}>
        <div className={styles.textCol}>{children}</div>
        <div className={styles.imageWrap}>
          <img src={imageSrc} alt={imageAlt} className={styles.image} />
        </div>
      </div>
    </section>
  );
}
