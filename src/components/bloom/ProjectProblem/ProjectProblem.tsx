import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./ProjectProblem.module.css";

export default function ProjectProblem() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.content}>
            <SectionHeader
              label="Problème"
              heading="Le coût technique du sur-mesure."
            />
            <div className={styles.body}>
              <p className={styles.paragraph}>
                Ce qui varie d&apos;un client à l&apos;autre se limite aux
                valeurs de surface : couleurs, typographies, arrondis ou
                espacements. Les comportements, la hiérarchie et
                l&apos;accessibilité restent strictement inchangés.
              </p>
              <p className={styles.paragraph}>
                Isoler ces deux couches permet de décliner des dizaines
                d&apos;identités sans impacter la structure des composants.
                Plus qu&apos;une optimisation visuelle, c&apos;est le choix
                technique fondamental qui rend le white-label viable à
                l&apos;échelle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
