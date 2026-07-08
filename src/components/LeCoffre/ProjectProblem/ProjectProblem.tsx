import CardSection from "@/components/Project/CardSection/CardSection";
import styles from "./ProjectProblem.module.css";

export default function ProjectProblem() {
  return (
    <CardSection
      label="Problème"
      heading="Alléger le client sans brider le notaire."
    >
      <p className={styles.paragraph}>
        La collecte de pièces notariales souffre traditionnellement de relances
        manuelles, de dispersion des fichiers et d&apos;un manque de suivi
        formel. Face à cette complexité, concevoir un portail unique aurait
        imposé trop de compromis.
      </p>
      <p className={styles.paragraph}>
        Le notaire exige une forte densité de données et un contrôle total,
        tandis que le client requiert une clarté absolue. Fusionner ces attentes
        asymétriques aurait inévitablement dégradé l&apos;expérience de l&apos;un
        ou de l&apos;autre.
      </p>
    </CardSection>
  );
}
