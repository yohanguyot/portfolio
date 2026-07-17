import Image from "next/image";
import styles from "./ProjectImage.module.css";

type ProjectSlug = "bloom" | "keepro" | "lecoffre" | "wenimmo";

// SVG gradients referenced as <img> instead of inline SVG.
// When loaded via <img>, the browser rasterizes the SVG (feGaussianBlur included)
// once and caches the bitmap — Safari never re-rasterizes on hover, unlike inline SVG.
// The original feGaussianBlur(80) + preserveAspectRatio="none" anisotropic blur is preserved exactly.
const BG_SRCS: Record<ProjectSlug, string> = {
  bloom:    "/images/projects/cards/bloom-gradient.svg",
  keepro:   "/images/projects/cards/keepro-gradient.svg",
  lecoffre: "/images/projects/cards/lecoffre-gradient.svg",
  wenimmo:  "/images/projects/cards/wenimmo-gradient.svg",
};

const ASSETS: Record<ProjectSlug, { logo: string; screen: string }> = {
  bloom:    { logo: "/images/projects/cards/bloom-logo.svg",    screen: "/images/projects/cards/bloom-screen.png" },
  keepro:   { logo: "/images/projects/cards/keepro-logo.svg",   screen: "/images/projects/cards/keepro-screen.png" },
  lecoffre: { logo: "/images/projects/cards/lecoffre-logo.svg", screen: "/images/projects/cards/lecoffre-screen.png" },
  wenimmo:  { logo: "/images/projects/cards/wenimmo-logo.svg",  screen: "/images/projects/cards/wenimmo-screen.png" },
};

type Props = {
  project: ProjectSlug;
  active?: boolean;
  noActiveEffect?: boolean;
  className?: string;
  eager?: boolean;
};

export default function ProjectImage({ project, active = false, noActiveEffect = false, className, eager = false }: Props) {
  const assets = ASSETS[project];

  return (
    <div className={`${styles.wrap} ${active ? styles.active : ""} ${className ?? ""}`.trim()}>
      <div className={styles.bgGradient}>
        {/* Fixed base — stays in place on hover to prevent gap at card bottom */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={BG_SRCS[project]} className={styles.bgImgBase} width="100%" height="100%" alt="" aria-hidden />
        {/* Active layer — translates up on hover for the lift visual effect */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={BG_SRCS[project]} className={styles.bgImg} width="100%" height="100%" alt="" aria-hidden />
      </div>

      <div className={`${styles.screen} ${noActiveEffect ? styles.screenFixed : ""}`}>
        <Image src={assets.screen} alt="" width={800} height={500} loading={eager ? "eager" : "lazy"} className={styles.screenImg} aria-hidden />
      </div>

      <div className={`${styles.logo} ${noActiveEffect ? styles.logoFixed : ""}`}>
        <Image src={assets.logo} alt={project} width={200} height={60} className={styles.logoImg} />
      </div>
    </div>
  );
}
