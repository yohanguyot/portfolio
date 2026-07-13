import ShowcaseSection from "@/components/Project/ShowcaseSection/ShowcaseSection";
import type { Dictionary } from "@/lib/getDictionary";
import styles from "./ProjectNotaire.module.css";

type Props = { dict: Dictionary["lecoffre"]["notaire"] };

export default function ProjectNotaire({ dict }: Props) {
  return (
    <ShowcaseSection
      label={dict.label}
      heading={dict.heading}
      description={
        <>
          <p className={styles.paragraph}>{dict.p1}</p>
          <p className={styles.paragraph}>{dict.p2}</p>
        </>
      }
      imageSrc="/images/projects/lecoffre/notaire.png"
      imageAlt="Interface espace notaire LeCoffre"
      dimImage
    />
  );
}
