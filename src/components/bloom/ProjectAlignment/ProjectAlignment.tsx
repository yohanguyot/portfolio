import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./ProjectAlignment.module.css";

export default function ProjectAlignment() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.imageWrap}>
          <img
            src="/images/projects/bloom/file-reading.png"
            alt="Fichier Figma montrant la structure des tokens alignée sur le code"
            className={styles.image}
          />
        </div>

        <div className={styles.right}>
          <SectionHeader label="Alignement tech" heading="Designer pour la prod." />
          <div className={styles.body}>
            <p className={styles.paragraph}>
              Les états des composants suivent les pseudo-classes CSS : la structure d&apos;un token comme btn-primary-bg-default correspond exactement au code.
            </p>
            <p className={styles.paragraph}>
              La spec technique étant intégrée dans Figma, le développeur implémente la maquette sans aucune interprétation. Aucun composant n&apos;est réécrit de zéro : l&apos;architecture est autonome.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
