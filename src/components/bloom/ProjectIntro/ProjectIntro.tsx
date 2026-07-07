import Button from "@/components/Button/Button";
import styles from "./ProjectIntro.module.css";

const TAGS = ["Design system", "White-label"];

const META = [
  { label: "Période", value: "2022–2025" },
  { label: "Rôle", value: "Lead Product Designer" },
  { label: "Contexte", value: "Smart-Chain · Projet interne" },
];

const STATS = [
  { value: "1", suffix: "", label: "Seul système à maintenir" },
  { value: "65", suffix: "+", label: "Composants maintenus" },
  { value: "7", suffix: "+", label: "Identités déployées" },
  { value: "3", suffix: "×", label: "Plus rapide à déployer" },
];

export default function ProjectIntro() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Button type="text" label="Retour" showArrowLeft as="a" href="/#projets" className={styles.backButton} />

        <div className={styles.introBlock}>
          <div className={styles.introTop}>
            <div className={styles.tags}>
              {TAGS.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
            <h1 className={styles.title}>Bloom</h1>
          </div>
          <p className={styles.description}>
            Une marketplace Web3 en white-label à l&apos;architecture modulaire.
            Pensée pour s&apos;adapter à chaque client, l&apos;interface se
            reconfigure instantanément sans toucher au code.
          </p>
        </div>

        <div className={styles.meta}>
          {META.map((item) => (
            <div key={item.label} className={styles.metaItem}>
              <span className={styles.metaLabel}>{item.label}</span>
              <span className={styles.metaValue}>{item.value}</span>
            </div>
          ))}
        </div>

        <div className={styles.stats}>
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`${styles.statItem} ${i < STATS.length - 1 ? styles.statDivider : ""}`}
            >
              <p className={styles.statNumber}>
                {stat.value}
                {stat.suffix && (
                  <span className={styles.statSuffix}>{stat.suffix}</span>
                )}
              </p>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
