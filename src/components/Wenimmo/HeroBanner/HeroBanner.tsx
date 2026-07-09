import ProjectHeroBanner from "@/components/Project/HeroBanner/HeroBanner";

const gradient = (
  <svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" style={{ display: "block" }} viewBox="0 0 1840 592" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <g opacity={0.8} filter="url(#wenimmo-grad)">
      <path d="M928.5 296C638.117 297.361 200 200 200 200V392H1640V200C1640 200 1212.38 294.67 928.5 296Z" fill="#0B0B8E"/>
      <path d="M928.5 336C638.117 336.957 200 257 200 257V392H1640V257C1640 257 1212.38 335.065 928.5 336Z" fill="#1313EC"/>
      <path d="M928.5 368C638.117 368.475 200 325 200 325V392H1640V325C1640 325 1212.38 367.536 928.5 368Z" fill="#A1A1F7"/>
    </g>
    <defs>
      <filter id="wenimmo-grad" x="0" y="0" width="1840" height="592" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity={0} result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation={100} result="effect1_foregroundBlur"/>
      </filter>
    </defs>
  </svg>
);

export default function HeroBanner() {
  return (
    <ProjectHeroBanner
      gradientNode={gradient}
      logoSrc="/images/projects/wenimmo/logo.svg"
      logoAlt="Wenimmo"
      logoHeight={64}
      logoHeightMobile={44}
    />
  );
}
