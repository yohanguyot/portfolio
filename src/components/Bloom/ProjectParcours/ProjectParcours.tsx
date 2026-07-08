import ParcoursSection from "@/components/Project/ParcoursSection/ParcoursSection";

const ITEMS = [
  {
    imageSrc: "/images/projects/bloom/create-asset.png",
    imageAlt: "Interface de création d'un actif numérique sur Bloom",
    title: "Configurer l'émission d'un actif",
    description:
      "De la pièce unique à la collection complète, le créateur configure ses actifs digitaux en quelques clics. Il définit le volume, le prix et la rareté à travers un parcours fluide, qui masque toute la complexité technique de la blockchain.",
  },
  {
    imageSrc: "/images/projects/bloom/buy-asset.png",
    imageAlt: "Interface d'achat d'un actif et transfert vers le wallet",
    title: "Fluidifier l'achat vers le wallet",
    description:
      "Un tunnel d'achat en trois étapes : fiche produit, paiement et transfert sécurisé. Chaque interaction est pensée pour rassurer et éliminer la friction liée aux transactions numériques.",
  },
];

export default function ProjectParcours() {
  return (
    <ParcoursSection
      label="Parcours utilisateurs"
      heading="Du créateur à l'acheteur."
      items={ITEMS}
    />
  );
}
