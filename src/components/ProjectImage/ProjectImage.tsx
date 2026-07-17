import Image from "next/image";
import styles from "./ProjectImage.module.css";

type ProjectSlug = "bloom" | "keepro" | "lecoffre" | "wenimmo";

// Approximation of the original SVG feGaussianBlur(80) blobs.
// The .bgGradient div is 178% of .wrap height (top:-28%, bottom:-50%).
// Visible window = bgGradient y≈16% to 72%.
// The original blur filled the ENTIRE visible height — linear-gradient handles
// the vertical spread, radial-gradient adds the concentrated glow at the bottom.
const BG_GRADIENTS: Record<ProjectSlug, string> = {
  bloom: [
    "linear-gradient(to top, rgba(151,40,2,0.50) 0%, transparent 75%)",
    "radial-gradient(ellipse 180% 80% at 50% 100%, rgba(252,66,3,0.75)    0%, transparent 100%)",
    "radial-gradient(ellipse 110% 60% at 50% 88%,  rgba(254,179,154,0.40) 0%, transparent 100%)",
  ].join(", "),
  keepro: [
    "linear-gradient(to top, rgba(21,63,132,0.50) 0%, transparent 75%)",
    "radial-gradient(ellipse 180% 80% at 50% 100%, rgba(76,132,226,0.70)  0%, transparent 100%)",
    "radial-gradient(ellipse 110% 55% at 50% 88%,  rgba(167,195,241,0.35) 0%, transparent 100%)",
  ].join(", "),
  lecoffre: [
    "linear-gradient(to top, rgba(0,69,153,0.50) 0%, transparent 75%)",
    "radial-gradient(ellipse 180% 80% at 50% 100%, rgba(0,114,255,0.80)   0%, transparent 100%)",
    "radial-gradient(ellipse 110% 55% at 50% 88%,  rgba(153,199,255,0.35) 0%, transparent 100%)",
  ].join(", "),
  wenimmo: [
    "linear-gradient(to top, rgba(11,11,142,0.50) 0%, transparent 75%)",
    "radial-gradient(ellipse 180% 80% at 50% 100%, rgba(19,19,236,0.80)   0%, transparent 100%)",
    "radial-gradient(ellipse 110% 55% at 50% 88%,  rgba(161,161,247,0.35) 0%, transparent 100%)",
  ].join(", "),
};

const ASSETS: Record<ProjectSlug, { logo: string; screen: string }> = {
  bloom: {
    logo: "/images/projects/cards/bloom-logo.svg",
    screen: "/images/projects/cards/bloom-screen.png",
  },
  keepro: {
    logo: "/images/projects/cards/keepro-logo.svg",
    screen: "/images/projects/cards/keepro-screen.png",
  },
  lecoffre: {
    logo: "/images/projects/cards/lecoffre-logo.svg",
    screen: "/images/projects/cards/lecoffre-screen.png",
  },
  wenimmo: {
    logo: "/images/projects/cards/wenimmo-logo.svg",
    screen: "/images/projects/cards/wenimmo-screen.png",
  },
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
    <div
      className={`${styles.wrap} ${active ? styles.active : ""} ${className ?? ""}`.trim()}
    >
      <div className={styles.bgGradient} style={{ background: BG_GRADIENTS[project] }} />

      <div className={`${styles.screen} ${noActiveEffect ? styles.screenFixed : ""}`}>
        <Image src={assets.screen} alt="" width={800} height={500} loading={eager ? "eager" : "lazy"} className={styles.screenImg} aria-hidden />
      </div>

      <div className={`${styles.logo} ${noActiveEffect ? styles.logoFixed : ""}`}>
        <Image src={assets.logo} alt={project} width={200} height={60} className={styles.logoImg} />
      </div>
    </div>
  );
}
