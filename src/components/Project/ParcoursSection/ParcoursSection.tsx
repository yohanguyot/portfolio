import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./ParcoursSection.module.css";

export type ParcoursItem = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
};

type Props = {
  label: string;
  heading: string;
  items: ParcoursItem[];
  dimImage?: boolean;
};

export default function ParcoursSection({ label, heading, items, dimImage }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeader label={label} heading={heading} />
        <div className={styles.cols}>
          {items.map((item) => (
            <div key={item.title} className={styles.col}>
              <div className={styles.imageWrap}>
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  className={`${styles.image}${dimImage ? ` ${styles.dim}` : ""}`}
                />
              </div>
              <div className={styles.text}>
                <p className={styles.title}>{item.title}</p>
                <p className={styles.desc}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
