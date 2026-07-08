import SplitSection from "@/components/Project/SplitSection/SplitSection";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./ProjectClient.module.css";

export default function ProjectClient() {
  return (
    <SplitSection
      imageSrc="/images/projects/lecoffre/client.png"
      imageAlt="Interface espace client LeCoffre — parcours de dépôt de documents"
      imagePosition="left"
      dimImage
    >
      <SectionHeader
        label="Espace client"
        heading="Épurer l'interface pour guider le dépôt."
      />
      <div className={styles.body}>
        <p className={styles.paragraph}>
          L&apos;environnement client élimine toute charge cognitive pour se
          concentrer exclusivement sur l&apos;action attendue : savoir quelle
          pièce déposer et à quel endroit, sans subir la complexité du système
          de gestion.
        </p>
        <p className={styles.paragraph}>
          Après une authentification sécurisée via FranceConnect, un parcours
          guidé prend le relais. L&apos;interface sépare distinctement les
          documents validés de ceux encore attendus par l&apos;office, offrant
          une visibilité immédiate sur les tâches restantes.
        </p>
      </div>
    </SplitSection>
  );
}
