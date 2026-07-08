import ProjectIntro from "@/components/Project/Intro/Intro";

const TAGS = ["Certification", "Blockchain"];

const META = [
  { label: "Période",  value: "2023–2024" },
  { label: "Rôle",    value: "Product Designer" },
  { label: "Contexte", value: "Smart-Chain · Projet interne" },
];

export default function KeeproIntro() {
  return (
    <ProjectIntro
      tags={TAGS}
      title="Keepro"
      description="Un SaaS B2B de certification blockchain conçu pour les équipes non techniques. Son architecture à double lecture donne un accès direct aux preuves cryptographiques sans surcharger l'interface principale."
      meta={META}

    />
  );
}
