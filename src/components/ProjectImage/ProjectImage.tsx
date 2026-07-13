import type { ReactElement } from "react";
import Image from "next/image";
import styles from "./ProjectImage.module.css";

type ProjectSlug = "bloom" | "keepro" | "lecoffre" | "wenimmo";

const BG_GRADIENTS: Record<ProjectSlug, ReactElement> = {
  bloom: (
    <svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" style={{ display: "block" }} viewBox="0 0 1840 592" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g opacity={1} filter="url(#bloom-card-grad)">
        <path d="M928.5 296C638.117 297.361 200 200 200 200V492H1640V200C1640 200 1212.38 294.67 928.5 296Z" fill="#972802"/>
        <path d="M928.5 336C638.117 336.957 200 257 200 257V492H1640V257C1640 257 1212.38 335.065 928.5 336Z" fill="#FC4203"/>
        <path d="M928.5 368C638.117 368.475 200 325 200 325V492H1640V325C1640 325 1212.38 367.536 928.5 368Z" fill="#FEB39A"/>
      </g>
      <defs>
        <filter id="bloom-card-grad" x="0" y="0" width="1840" height="592" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity={0} result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation={80} result="effect1_foregroundBlur"/>
          <feColorMatrix type="saturate" values="1.2" in="effect1_foregroundBlur" result="saturated"/>
        </filter>
      </defs>
    </svg>
  ),
  keepro: (
    <svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" style={{ display: "block" }} viewBox="0 0 1840 592" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g opacity={1} filter="url(#keepro-card-grad)">
        <path d="M928.5 296C638.117 297.361 200 200 200 200V492H1640V200C1640 200 1212.38 294.67 928.5 296Z" fill="#153F84"/>
        <path d="M928.5 336C638.117 336.957 200 257 200 257V492H1640V257C1640 257 1212.38 335.065 928.5 336Z" fill="#4C84E2" fillOpacity={0.5}/>
        <path d="M928.5 368C638.117 368.475 200 325 200 325V492H1640V325C1640 325 1212.38 367.536 928.5 368Z" fill="#A7C3F1"/>
      </g>
      <defs>
        <filter id="keepro-card-grad" x="0" y="0" width="1840" height="592" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity={0} result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation={80} result="effect1_foregroundBlur"/>
          <feColorMatrix type="saturate" values="1.2" in="effect1_foregroundBlur" result="saturated"/>
        </filter>
      </defs>
    </svg>
  ),
  lecoffre: (
    <svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" style={{ display: "block" }} viewBox="0 0 1840 592" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g opacity={1} filter="url(#lecoffre-card-grad)">
        <path d="M928.5 296C638.117 297.361 200 200 200 200V492H1640V200C1640 200 1212.38 294.67 928.5 296Z" fill="#004599"/>
        <path d="M928.5 336C638.117 336.957 200 257 200 257V492H1640V257C1640 257 1212.38 335.065 928.5 336Z" fill="#0072FF"/>
        <path d="M928.5 368C638.117 368.475 200 325 200 325V492H1640V325C1640 325 1212.38 367.536 928.5 368Z" fill="#99C7FF"/>
      </g>
      <defs>
        <filter id="lecoffre-card-grad" x="0" y="0" width="1840" height="592" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity={0} result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation={80} result="effect1_foregroundBlur"/>
          <feColorMatrix type="saturate" values="1.2" in="effect1_foregroundBlur" result="saturated"/>
        </filter>
      </defs>
    </svg>
  ),
  wenimmo: (
    <svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" style={{ display: "block" }} viewBox="0 0 1840 592" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g opacity={1} filter="url(#wenimmo-card-grad)">
        <path d="M928.5 296C638.117 297.361 200 200 200 200V492H1640V200C1640 200 1212.38 294.67 928.5 296Z" fill="#0B0B8E"/>
        <path d="M928.5 336C638.117 336.957 200 257 200 257V492H1640V257C1640 257 1212.38 335.065 928.5 336Z" fill="#1313EC"/>
        <path d="M928.5 368C638.117 368.475 200 325 200 325V492H1640V325C1640 325 1212.38 367.536 928.5 368Z" fill="#A1A1F7"/>
      </g>
      <defs>
        <filter id="wenimmo-card-grad" x="0" y="0" width="1840" height="592" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity={0} result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation={80} result="effect1_foregroundBlur"/>
          <feColorMatrix type="saturate" values="1.2" in="effect1_foregroundBlur" result="saturated"/>
        </filter>
      </defs>
    </svg>
  ),
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
  hovered?: boolean;
  active?: boolean;
  noActiveEffect?: boolean;
  className?: string;
  eager?: boolean;
};

export default function ProjectImage({ project, hovered = false, active = false, noActiveEffect = false, className, eager = false }: Props) {
  const assets = ASSETS[project];

  return (
    <div
      className={`${styles.wrap} ${hovered ? styles.hovered : ""} ${active ? styles.active : ""} ${className ?? ""}`}
    >
      <div className={styles.bgGradient}>
        {BG_GRADIENTS[project]}
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
