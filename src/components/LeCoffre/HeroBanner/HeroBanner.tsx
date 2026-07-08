import ProjectHeroBanner from "@/components/Project/HeroBanner/HeroBanner";

export default function HeroBanner() {
  return (
    <ProjectHeroBanner
      gradientSrc="/images/projects/lecoffre/gradient.svg"
      logoSrc="/images/projects/lecoffre/logo.png"
      logoAlt="LeCoffre.io"
      logoWidth={580}
      logoHeight={88}
    />
  );
}
