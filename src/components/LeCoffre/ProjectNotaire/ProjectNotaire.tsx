import ShowcaseSection from "@/components/Project/ShowcaseSection/ShowcaseSection";
import styles from "./ProjectNotaire.module.css";

export default function ProjectNotaire() {
  return (
    <ShowcaseSection
      label="Espace notaire"
      heading="Centraliser le pilotage du dossier."
      description={
        <>
          <p className={styles.paragraph}>
            L&apos;espace du notaire centralise l&apos;intégralité du cycle de
            vie du dossier, de la demande de pièces à la certification finale.
            C&apos;est l&apos;environnement le plus dense de la plateforme,
            conçu pour valider chaque document et déclencher l&apos;ancrage
            blockchain en un clic.
          </p>
          <p className={styles.paragraph}>
            Le pilotage s&apos;appuie sur un système de statuts dynamiques
            (vide, en cours, complété, action requise, validé, ancré) qui
            reflète l&apos;état d&apos;avancement exact du dossier en temps
            réel.
          </p>
        </>
      }
      imageSrc="/images/projects/lecoffre/notaire.png"
      imageAlt="Interface espace notaire LeCoffre"
    />
  );
}
