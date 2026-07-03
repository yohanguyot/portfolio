import { Search, Layers, RefreshCw, PackageCheck } from "lucide-react";
import styles from "./ProcessSection.module.css";

const STEPS = [
  {
    icon: Search,
    title: "Découverte",
    description:
      "Avant d'ouvrir Figma, je prends le temps de comprendre le contexte, les contraintes et les utilisateurs réels. Ce qui se clarifie ici ne sera pas à corriger plus tard.",
    label: "//Étape 01",
  },
  {
    icon: Layers,
    title: "Architecture",
    description:
      "Je définis le système avant les premiers écrans. Tokens, composants, nomenclature : tout est pensé pour que design et dev parlent le même langage.",
    label: "//Étape 02",
  },
  {
    icon: RefreshCw,
    title: "Itération",
    description:
      "Je travaille par cycles courts avec l'équipe, en explorant les directions, en tranchant et en affinant jusqu'à ce que chaque décision soit justifiée et validée.",
    label: "//Étape 03",
  },
  {
    icon: PackageCheck,
    title: "Livraison",
    description:
      "Je livre des fichiers prêts à implémenter, avec des propriétés nommées, des variantes documentées et tous les états couverts, sans ambiguïté.",
    label: "//Étape 04",
  },
] as const;

export default function ProcessSection() {
  return (
    <section className={styles.section} id="process">
      <div className={styles.container}>
        <div className={styles.intro}>
          <div className={styles.titleBlock}>
            <p className={styles.sectionLabel}>Process</p>
            <h2 className={styles.sectionHeading}>Comment je travaille.</h2>
          </div>
          <p className={styles.description}>
            Chaque projet commence par les mêmes questions : qu'est-ce qui doit vraiment tenir, et qu'est-ce qui peut attendre ?
          </p>
        </div>

        <div className={styles.stepsGrid}>
          {STEPS.map(({ icon: Icon, title, description, label }) => (
            <div key={label} className={styles.step}>
              <div className={styles.stepContent}>
                <div className={styles.iconWrap}>
                  <Icon size={20} strokeWidth={1.5} className={styles.icon} />
                </div>
                <div className={styles.body}>
                  <h3 className={styles.stepTitle}>{title}</h3>
                  <p className={styles.stepDesc}>{description}</p>
                </div>
              </div>
              <p className={styles.stepLabel}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
