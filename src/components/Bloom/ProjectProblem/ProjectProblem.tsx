import CardSection from "@/components/Project/CardSection/CardSection";
import styles from "./ProjectProblem.module.css";

export default function ProjectProblem() {
  return (
    <CardSection label="Problème" heading="Le coût technique du sur-mesure.">
      <p className={styles.paragraph}>
        Ce qui varie d&apos;un client à l&apos;autre se limite aux valeurs de
        surface : couleurs, typographies, arrondis ou espacements. Les
        comportements, la hiérarchie et l&apos;accessibilité restent strictement
        inchangés.
      </p>
      <p className={styles.paragraph}>
        Isoler ces deux couches permet de décliner des dizaines
        d&apos;identités sans impacter la structure des composants. Plus
        qu&apos;une optimisation visuelle, c&apos;est le choix technique
        fondamental qui rend le white-label viable à l&apos;échelle.
      </p>
    </CardSection>
  );
}
