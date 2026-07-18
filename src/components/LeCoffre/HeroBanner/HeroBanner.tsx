import ProjectHeroBanner from "@/components/Project/HeroBanner/HeroBanner";

/* eslint-disable-next-line @next/next/no-img-element */
const gradient = <img src="/images/projects/banners/lecoffre-gradient.svg" width="100%" height="100%" alt="" aria-hidden style={{ display: "block" }} />;

export default function HeroBanner() {
  return (
    <ProjectHeroBanner
      gradientNode={gradient}
      logoSrc="/images/projects/lecoffre/logo.svg"
      logoAlt="LeCoffre.io"
      logoHeight={72}
      logoHeightMobile={52}
    />
  );
}
