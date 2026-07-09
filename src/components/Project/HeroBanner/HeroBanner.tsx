import Image from "next/image";
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
          <Image src={gradientSrc} alt="" aria-hidden width={1440} height={600} className={styles.gradientImg} />
        </div>
      </div>
      <Image
        src={logoSrc}
        alt={logoAlt}
        className={styles.logo}
        width={logoWidth ?? 400}
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
