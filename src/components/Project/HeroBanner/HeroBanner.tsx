import styles from "./HeroBanner.module.css";

type Props = {
  gradientSrc: string;
  logoSrc: string;
  logoAlt: string;
  logoWidth?: number;
  logoHeight?: number;
  logoHeightMobile?: number;
};

export default function ProjectHeroBanner({
  gradientSrc,
  logoSrc,
  logoAlt,
  logoWidth,
  logoHeight = 96,
  logoHeightMobile,
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
        style={{
          height: logoHeight,
          width: "auto",
          "--logo-height-mobile": `${logoHeightMobile ?? Math.round(logoHeight * 0.7)}px`,
        } as React.CSSProperties}
      />
    </section>
  );
}
