import styles from "./HeroBanner.module.css";

type Props = {
  gradientSrc: string;
  logoSrc: string;
  logoAlt: string;
  logoWidth?: number;
  logoHeight?: number;
};

export default function ProjectHeroBanner({
  gradientSrc,
  logoSrc,
  logoAlt,
  logoWidth = 374,
  logoHeight = 120,
}: Props) {
  return (
    <section className={styles.banner}>
      <div className={styles.gradientContainer}>
        <div className={styles.gradientInner}>
          <img src={gradientSrc} alt="" aria-hidden className={styles.gradientImg} />
        </div>
      </div>
      <img
        src={logoSrc}
        alt={logoAlt}
        className={styles.logo}
        width={logoWidth}
        height={logoHeight}
      />
    </section>
  );
}
