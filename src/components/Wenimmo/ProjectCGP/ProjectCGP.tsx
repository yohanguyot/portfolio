import { GitFork, ListChecks, Tag, Lock } from "lucide-react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import styles from "./ProjectCGP.module.css";

export default function ProjectCGP() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.split}>
          <div className={styles.textCol}>
            <SectionHeader
              label="Profil CGP"
              heading={"En rendez-vous,\nentre deux clients."}
            />
            <p className={styles.paragraph}>
              Conçue pour un usage en mobilité, l&apos;interface permet au CGP
              de vérifier l&apos;état d&apos;un dossier instantanément,
              d&apos;engager une souscription ou de valider une pièce. Le
              système préserve le contexte entre deux sessions&nbsp;: reprendre
              un flux interrompu ne demande aucun effort de reconstruction.
            </p>
          </div>
          <div className={styles.imageWrap}>
            <img
              src="/images/projects/wenimmo/cgp.png"
              alt="Interface Wenimmo — tunnel de souscription CGP"
              className={styles.image}
            />
          </div>
        </div>

        <FeatureCard direction="horizontal" wrap>
          <FeatureItem
            direction="column"
            icon={GitFork}
            title="Séparation des flux"
            description="Déterminé dès le départ via un point d'entrée unique, le statut de l'investisseur (particulier/société) oriente le flux et élimine les erreurs de saisie."
          />
          <FeatureItem
            direction="column"
            icon={ListChecks}
            title="Visibilité de la progression"
            description="Le stepper rend la progression prévisible au sein d'un tunnel dense. Cette visibilité constante allège la charge cognitive et facilite la reprise du dossier."
          />
          <FeatureItem
            direction="column"
            icon={Tag}
            title="Statuts orientés métier"
            description="En remplaçant la nomenclature technique par le langage terrain, les statuts répondent aux besoins opérationnels des équipes plutôt qu'à l'état du serveur."
          />
          <FeatureItem
            direction="column"
            icon={Lock}
            title="Actions irréversibles"
            description="La convention RTO et l'envoi final engagent la responsabilité du CGP. L'interface isole ces actions critiques pour marquer leur importance réglementaire."
          />
        </FeatureCard>
      </div>
    </section>
  );
}
