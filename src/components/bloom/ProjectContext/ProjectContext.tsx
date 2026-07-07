import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./ProjectContext.module.css";

export default function ProjectContext() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <SectionHeader
            label="Contexte"
            heading="Aligner design et code."
          />
          <div className={styles.body}>
            <p className={styles.paragraph}>
              Déployer une architecture unique sous des identités radicalement
              différentes expose la plateforme à une dette technique constante.
              Sans une structure sémantique stricte, chaque personnalisation
              client fragilise la maintenance globale du produit.
            </p>
            <p className={styles.paragraph}>
              Pour absorber des univers opposés, du gaming à la finance, le
              système repose sur un thémage dynamique. Le design et le code
              partagent les mêmes variables, éliminant les allers-retours
              d&apos;ajustement et garantissant l&apos;intégrité de
              l&apos;interface à chaque déploiement.
            </p>
          </div>
        </div>

        <div className={styles.imageWrap}>
          <img
            src="/images/projects/bloom/spotlight.png"
            alt="Bloom Spotlight — interface de la marketplace"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
