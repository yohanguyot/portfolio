import ParcoursSection from "@/components/Project/ParcoursSection/ParcoursSection";

const ITEMS = [
  {
    imageSrc: "/images/projects/keepro/deposit-flow.png",
    imageAlt: "Tunnel de dépôt Keepro — upload de documents avec estimation du temps",
    title: "Sécuriser la mise en certification",
    description:
      "Le tunnel de dépôt traite plusieurs fichiers simultanément. L'interface affiche une estimation du temps d'attente en temps réel et génère un ticket de support pré-rempli en cas de blocage.",
  },
  {
    imageSrc: "/images/projects/keepro/verify-flow.png",
    imageAlt: "Résultats de vérification Keepro — statut visuel d'authenticité des documents",
    title: "Rendre la vérification instantanée",
    description:
      "Ce parcours simplifie l'accès aux données de la blockchain. L'application analyse le document instantanément pour livrer un statut visuel clair, permettant de vérifier son authenticité en un coup d'œil sans subir la complexité technique.",
  },
];

export default function ProjectParcours() {
  return (
    <ParcoursSection
      label="Parcours utilisateurs"
      heading="Fluidifier les parcours clés."
      items={ITEMS}
      dimImage
    />
  );
}
