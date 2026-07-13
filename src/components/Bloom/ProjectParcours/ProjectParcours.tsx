import ParcoursSection from "@/components/Project/ParcoursSection/ParcoursSection";
import type { Dictionary } from "@/lib/getDictionary";

const IMAGE_SRCS = [
  { src: "/images/projects/bloom/create-asset.png", alt: "Interface de création d'un actif numérique sur Bloom" },
  { src: "/images/projects/bloom/buy-asset.png", alt: "Interface d'achat d'un actif et transfert vers le wallet" },
];

type Props = { dict: Dictionary["bloom"]["parcours"] };

export default function ProjectParcours({ dict }: Props) {
  const items = dict.items.map((item, i) => ({
    imageSrc: IMAGE_SRCS[i].src,
    imageAlt: IMAGE_SRCS[i].alt,
    title: item.title,
    description: item.description,
  }));

  return (
    <ParcoursSection
      label={dict.label}
      heading={dict.heading}
      items={items}
    />
  );
}
