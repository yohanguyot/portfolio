import Image from "next/image";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import type { Dictionary } from "@/lib/getDictionary";
import styles from "./ProjectIdentities.module.css";

type Props = { dict: Dictionary["bloom"]["identities"] };

export default function ProjectIdentities({ dict }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.top}>
          <SectionHeader label={dict.label} heading={dict.heading} />
          <div className={styles.body}>
            <p className={styles.paragraph}>{dict.p1}</p>
            <p className={styles.paragraph}>{dict.p2}</p>
          </div>
        </div>

        <div className={styles.images}>
          <div className={styles.imageWrap}>
            <Image
              src="/images/projects/bloom/erable-theme.png"
              alt="Interface Bloom avec le thème Erable"
              width={1440}
              height={900}
              className={`${styles.image} ${styles.imageDim}`}
            />
          </div>
          <div className={styles.imageWrap}>
            <Image
              src="/images/projects/bloom/lqr-house-theme.png"
              alt="Interface Bloom avec le thème LQR House"
              width={1440}
              height={900}
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
