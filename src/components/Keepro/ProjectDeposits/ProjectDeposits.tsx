import ShowcaseSection from "@/components/Project/ShowcaseSection/ShowcaseSection";

export default function ProjectDeposits() {
  return (
    <ShowcaseSection
      label="Dépôts"
      heading="Structurer et clarifier le suivi des dépôts"
      description="Pour absorber d'importants volumes de documents, l'historique segmente
        l'activité par contextes thématiques. La vue principale privilégie une
        lecture rapide du statut des fichiers, tandis qu'un panneau latéral
        concentre le suivi technique et les preuves d'ancrage, accessibles à la
        demande."
      imageSrc="/images/projects/keepro/deposits.png"
      imageAlt="Vue des dépôts Keepro — liste des certifications avec panneau de détail"
      dimImage
    />
  );
}
