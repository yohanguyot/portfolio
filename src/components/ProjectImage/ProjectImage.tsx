import Image from "next/image";
import styles from "./ProjectImage.module.css";

type ProjectSlug = "bloom" | "keepro" | "lecoffre" | "wenimmo";

// CSS radial-gradient approximation of the original SVG feGaussianBlur blobs.
// The .bgGradient div sits at top:-28% bottom:-50% of .wrap (178% tall total).
// The visible window inside .wrap spans bgGradient y≈16% to y≈72%.
// Gradient centers sit at y=72-85% so color rises from the bottom of the card.
const BG_GRADIENTS: Record<ProjectSlug, string> = {
  bloom: [
    "radial-gradient(ellipse 130% 55% at 50% 72%, rgba(252,66,3,0.85)   0%, transparent 100%)",
    "radial-gradient(ellipse 180% 75% at 50% 85%, rgba(151,40,2,0.70)   0%, transparent 100%)",
    "radial-gradient(ellipse 100% 38% at 50% 65%, rgba(254,179,154,0.50) 0%, transparent 100%)",
  ].join(", "),
  keepro: [
    "radial-gradient(ellipse 130% 55% at 50% 72%, rgba(76,132,226,0.65)  0%, transparent 100%)",
    "radial-gradient(ellipse 180% 75% at 50% 85%, rgba(21,63,132,0.75)   0%, transparent 100%)",
    "radial-gradient(ellipse 100% 38% at 50% 65%, rgba(167,195,241,0.50) 0%, transparent 100%)",
  ].join(", "),
  lecoffre: [
    "radial-gradient(ellipse 130% 55% at 50% 72%, rgba(0,114,255,0.85)   0%, transparent 100%)",
    "radial-gradient(ellipse 180% 75% at 50% 85%, rgba(0,69,153,0.70)    0%, transparent 100%)",
    "radial-gradient(ellipse 100% 38% at 50% 65%, rgba(153,199,255,0.50) 0%, transparent 100%)",
  ].join(", "),
  wenimmo: [
    "radial-gradient(ellipse 130% 55% at 50% 72%, rgba(19,19,236,0.85)   0%, transparent 100%)",
    "radial-gradient(ellipse 180% 75% at 50% 85%, rgba(11,11,142,0.70)   0%, transparent 100%)",
    "radial-gradient(ellipse 100% 38% at 50% 65%, rgba(161,161,247,0.50) 0%, transparent 100%)",
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
