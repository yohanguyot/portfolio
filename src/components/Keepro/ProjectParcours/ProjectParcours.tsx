import ParcoursSection from "@/components/Project/ParcoursSection/ParcoursSection";
import type { Dictionary } from "@/lib/getDictionary";

const IMAGE_SRCS = [
  { src: "/images/projects/keepro/deposit-flow.png", alt: "Tunnel de dépôt Keepro — upload de documents avec estimation du temps" },
  { src: "/images/projects/keepro/verify-flow.png", alt: "Résultats de vérification Keepro — statut visuel d'authenticité des documents" },
];

type Props = { dict: Dictionary["keepro"]["parcours"] };

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
      dimImage
    />
  );
}
