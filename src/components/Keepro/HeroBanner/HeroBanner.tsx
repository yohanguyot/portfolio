import ProjectHeroBanner from "@/components/Project/HeroBanner/HeroBanner";

export default function HeroBanner() {
  return (
    <ProjectHeroBanner
      gradientSrc="/images/projects/keepro/gradient.svg"
      logoSrc="/images/projects/keepro/logo.svg"
      logoAlt="Keepro"
      logoHeight={88}
      logoHeightMobile={64}
    />
  );
}
