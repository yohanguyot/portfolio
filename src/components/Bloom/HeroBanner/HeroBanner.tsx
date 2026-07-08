import ProjectHeroBanner from "@/components/Project/HeroBanner/HeroBanner";

export default function HeroBanner() {
  return (
    <ProjectHeroBanner
      gradientSrc="/images/projects/bloom/gradient.svg"
      logoSrc="/images/projects/cards/bloom-logo.svg"
      logoAlt="Bloom"
      logoHeight={96}
      logoHeightMobile={64}
    />
  );
}
