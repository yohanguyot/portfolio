import Image from "next/image";
import styles from "./ProjectImage.module.css";

type ProjectSlug = "bloom" | "keepro" | "lecoffre" | "wenimmo";

// Same path data for all projects — shape comes from original Figma SVG
const P1 = "M928.5 296C638.117 297.361 200 200 200 200V492H1640V200C1640 200 1212.38 294.67 928.5 296Z";
const P2 = "M928.5 336C638.117 336.957 200 257 200 257V492H1640V257C1640 257 1212.38 335.065 928.5 336Z";
const P3 = "M928.5 368C638.117 368.475 200 325 200 325V492H1640V325C1640 325 1212.38 367.536 928.5 368Z";

type PathColor = { fill: string; fillOpacity?: number };
type BgColors = [PathColor, PathColor, PathColor];

const BG_COLORS: Record<ProjectSlug, BgColors> = {
  bloom:    [{ fill: "#972802" }, { fill: "#FC4203" }, { fill: "#FEB39A" }],
  keepro:   [{ fill: "#153F84" }, { fill: "#4C84E2", fillOpacity: 0.5 }, { fill: "#A7C3F1" }],
  lecoffre: [{ fill: "#004599" }, { fill: "#0072FF" }, { fill: "#99C7FF" }],
  wenimmo:  [{ fill: "#0B0B8E" }, { fill: "#1313EC" }, { fill: "#A1A1F7" }],
};

// Three stacked SVG layers with CSS blur — same technique as HeroArcCanvas.
// CSS filter on the SVG element is GPU-composited; no re-rasterization on hover (unlike feGaussianBlur).
function BgSvg({ colors, className }: { colors: BgColors; className: string }) {
  return (
    <svg
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      overflow="visible"
      viewBox="0 0 1840 592"
      fill="none"
      className={className}
      aria-hidden
    >
      <path d={P1} fill={colors[0].fill} fillOpacity={colors[0].fillOpacity} />
      <path d={P2} fill={colors[1].fill} fillOpacity={colors[1].fillOpacity} />
      <path d={P3} fill={colors[2].fill} fillOpacity={colors[2].fillOpacity} />
    </svg>
  );
}

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
  const colors = BG_COLORS[project];

  return (
    <div className={`${styles.wrap} ${active ? styles.active : ""} ${className ?? ""}`.trim()}>
      <div className={styles.bgGradient}>
        <BgSvg colors={colors} className={styles.bgDeep} />
        <BgSvg colors={colors} className={styles.bgBody} />
        <BgSvg colors={colors} className={styles.bgEdge} />
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
