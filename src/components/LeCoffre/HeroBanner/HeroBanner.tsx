import ProjectHeroBanner from "@/components/Project/HeroBanner/HeroBanner";

export default function HeroBanner() {
  return (
    <ProjectHeroBanner
      gradientSrc="/images/projects/lecoffre/gradient.svg"
      logoSrc="/images/projects/lecoffre/logo.svg"
      logoAlt="LeCoffre.io"
      logoHeight={72}
      logoHeightMobile={52}
    />
  );
}
