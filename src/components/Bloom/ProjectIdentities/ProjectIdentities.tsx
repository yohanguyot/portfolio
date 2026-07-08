import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./ProjectIdentities.module.css";

export default function ProjectIdentities() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.top}>
          <SectionHeader label="Identités" heading="Une structure, plusieurs identités" />
          <div className={styles.body}>
            <p className={styles.paragraph}>
              L&apos;architecture des composants et des tokens est identique pour tous. Pour déployer un nouveau client, il suffit d&apos;injecter ses primitives (couleurs, typographies, arrondis) via un fichier de configuration.
            </p>
            <p className={styles.paragraph}>
              L&apos;identité se propage instantanément à toute la plateforme. Côté code, le développeur applique le thème en une ligne, sans toucher aux composants.
            </p>
          </div>
        </div>

        <div className={styles.images}>
          <div className={styles.imageWrap}>
            <img
              src="/images/projects/bloom/erable-theme.png"
              alt="Interface Bloom avec le thème Erable"
              className={`${styles.image} ${styles.imageDim}`}
            />
          </div>
          <div className={styles.imageWrap}>
            <img
              src="/images/projects/bloom/lqr-house-theme.png"
              alt="Interface Bloom avec le thème LQR House"
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
