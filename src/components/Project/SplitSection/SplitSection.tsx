import { ReactNode } from "react";
import Image from "next/image";
import styles from "./SplitSection.module.css";

type Props = {
  imageSrc: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  dimImage?: boolean;
  children: ReactNode;
};

export default function SplitSection({
  imageSrc,
  imageAlt = "",
  imagePosition = "right",
  dimImage,
  children,
}: Props) {
  return (
    <section
      className={`${styles.section} ${imagePosition === "left" ? styles.imageLeft : ""}`}
    >
      <div className={styles.container}>
        <div className={styles.textCol}>{children}</div>
        <div className={styles.imageWrap}>
          <Image src={imageSrc} alt={imageAlt} width={1440} height={900} className={`${styles.image}${dimImage ? ` ${styles.dim}` : ""}`} />
        </div>
      </div>
    </section>
  );
}
