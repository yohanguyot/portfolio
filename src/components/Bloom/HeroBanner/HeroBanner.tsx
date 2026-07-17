import ProjectHeroBanner from "@/components/Project/HeroBanner/HeroBanner";

/* eslint-disable-next-line @next/next/no-img-element */
const gradient = <img src="/images/projects/banners/bloom-gradient.svg" width="100%" height="100%" alt="" aria-hidden style={{ display: "block" }} />;

export default function HeroBanner() {
  return (
    <ProjectHeroBanner
      gradientNode={gradient}
      logoSrc="/images/projects/cards/bloom-logo.svg"
      logoAlt="Bloom"
      logoHeight={96}
      logoHeightMobile={64}
    />
  );
}
