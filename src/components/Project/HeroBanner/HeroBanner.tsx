import React from "react";
import styles from "./HeroBanner.module.css";

type Props = {
  gradientNode: React.ReactNode;
  logoSrc: string;
  logoAlt: string;
  logoWidth?: number;
  logoHeight?: number;
  logoHeightMobile?: number;
};

export default function ProjectHeroBanner({
  gradientNode,
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
          {gradientNode}
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoSrc}
        alt={logoAlt}
        className={styles.logo}
        fetchPriority="high"
        style={{
          "--logo-height": `${logoHeight}px`,
          "--logo-height-mobile": `${logoHeightMobile ?? Math.round(logoHeight * 0.7)}px`,
        } as React.CSSProperties}
      />
    </section>
  );
}
