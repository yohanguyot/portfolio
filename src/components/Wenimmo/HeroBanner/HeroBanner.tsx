import ProjectHeroBanner from "@/components/Project/HeroBanner/HeroBanner";

export default function HeroBanner() {
  return (
    <ProjectHeroBanner
      gradientSrc="/images/projects/wenimmo/gradient.svg"
      logoSrc="/images/projects/wenimmo/logo.svg"
      logoAlt="Wenimmo"
      logoHeight={64}
      logoHeightMobile={44}
    />
  );
}
