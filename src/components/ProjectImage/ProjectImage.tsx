import styles from "./ProjectImage.module.css";

type ProjectSlug = "bloom" | "keepro" | "lecoffre" | "wenimmo";

const ASSETS: Record<ProjectSlug, {
  bg: string;
  logo: string;
  screen: string;
}> = {
  bloom: {
    bg: "/images/projects/cards/bloom-bg.png",
    logo: "/images/projects/cards/bloom-logo.svg",
    screen: "/images/projects/cards/bloom-screen.png",
  },
  keepro: {
    bg: "/images/projects/cards/keepro-bg.png",
    logo: "/images/projects/cards/keepro-logo.svg",
    screen: "/images/projects/cards/keepro-screen.png",
  },
  lecoffre: {
    bg: "/images/projects/cards/lecoffre-bg.png",
    logo: "/images/projects/cards/lecoffre-logo.svg",
    screen: "/images/projects/cards/lecoffre-screen.png",
  },
  wenimmo: {
    bg: "/images/projects/cards/wenimmo-bg.png",
    logo: "/images/projects/cards/wenimmo-logo.svg",
    screen: "/images/projects/cards/wenimmo-screen.png",
  },
};

type Props = {
  project: ProjectSlug;
  hovered?: boolean;
  className?: string;
};

export default function ProjectImage({ project, hovered = false, className }: Props) {
  const assets = ASSETS[project];

  return (
    <div className={`${styles.wrap} ${hovered ? styles.hovered : ""} ${className ?? ""}`}>
      <div className={styles.bgGradient}>
        <img src={assets.bg} alt="" className={styles.bgGradientImg} aria-hidden />
      </div>

      <div className={styles.screen}>
        <img src={assets.screen} alt="" className={styles.screenImg} aria-hidden />
      </div>

      <div className={styles.logo}>
        <img src={assets.logo} alt={project} className={styles.logoImg} />
      </div>
    </div>
  );
}
