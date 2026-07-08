import SplitSection from "@/components/Project/SplitSection/SplitSection";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./ProjectDashboard.module.css";

export default function ProjectDashboard() {
  return (
    <SplitSection
      imageSrc="/images/projects/keepro/dashboard.png"
      imageAlt="Dashboard Keepro — vue des indicateurs et de l'historique des dépôts"
      imagePosition="left"
    >
      <SectionHeader
        label="Dashboard"
        heading="Simplifier la lecture des données complexes."
      />
      <p className={styles.description}>
        Le dashboard centralise les indicateurs de volume et l&apos;état des
        flux pour isoler immédiatement les anomalies de certification. Pensé
        pour le pilotage opérationnel plutôt que pour la simple consultation,
        cet espace fait émerger les actions urgentes et les échecs
        d&apos;ancrage. L&apos;interface protège l&apos;utilisateur de la
        surcharge cognitive, tout en laissant l&apos;historique complet
        disponible au second niveau de lecture.
      </p>
    </SplitSection>
  );
}
