import Button from "@/components/Button/Button";
import styles from "./HeroSection.module.css";

/*
 * Arc vectors: concentric curved lines at the bottom of the hero.
 * Recreated as SVG paths (mix-blend-mode: plus-lighter on a dark bg → glow effect).
 * arc-0 is flattest (control point nearest to the baseline),
 * arc-3 is most curved (control point furthest = most visible arc).
 */
const arcs = [
  { cy: 46, opacity: 0.25, width: 0.6 }, // arc-pass-0 — very flat
  { cy: 38, opacity: 0.4,  width: 0.7 }, // arc-pass-1
  { cy: 26, opacity: 0.55, width: 0.8 }, // arc-pass-2
  { cy: 10, opacity: 0.7,  width: 1.0 }, // arc-pass-3 — most curved
];

function HeroArcs() {
  return (
    <div className={styles.arcs}>
      {arcs.map((arc, i) => (
        <div key={i} className={styles.arc}>
          <svg
            className={styles.arcSvg}
            viewBox="0 0 1440 48"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d={`M-42,48 Q720,${arc.cy} 1482,48`}
              fill="none"
              stroke={`rgba(198, 83, 46, ${arc.opacity})`}
              strokeWidth={arc.width}
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className={styles.section} id="hero">
      <div className={styles.gradient} aria-hidden />

      <div className={styles.content}>
        <div className={styles.textContainer}>
          <div className={styles.titleContainer}>
            <p className={styles.eyebrow}>
              Yohan Guyot · Product Builder // Paris
            </p>
            <h1 className={styles.displayTitle}>
              Design to prod.
              <br />
              Sans friction.
            </h1>
          </div>

          <p className={styles.subtitle}>
            Je design pour les{" "}
            <span className={styles.subtitleHighlight}>utilisateurs</span>
            , je livre pour les{" "}
            <span className={styles.subtitleHighlight}>développeurs</span>.
          </p>
        </div>

        <div className={styles.buttons}>
          <Button label="Voir les projets" type="primary" />
          <Button label="Me contacter" type="secondary" />
        </div>
      </div>

      <div className={styles.scrollIndicator} aria-hidden>
        <span className={styles.scrollLabel}>Scroll</span>
        <div className={styles.scrollLine} />
      </div>

      <HeroArcs />
    </section>
  );
}
