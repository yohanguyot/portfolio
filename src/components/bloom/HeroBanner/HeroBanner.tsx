import styles from "./HeroBanner.module.css";

export default function HeroBanner() {
  return (
    <section className={styles.banner}>
      <div className={styles.gradientContainer}>
        <div className={styles.gradientInner}>
          <img
            src="/images/projects/bloom/gradient.svg"
            alt=""
            aria-hidden
            className={styles.gradientImg}
          />
        </div>
      </div>
      <img
        src="/images/projects/cards/bloom-logo.svg"
        alt="Bloom"
        className={styles.logo}
        width={374}
        height={120}
      />
    </section>
  );
}
