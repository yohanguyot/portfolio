import ProjectIntro from "@/components/Project/Intro/Intro";

const TAGS = ["Fintech", "Patrimoine"];

const META = [
  { label: "Période",  value: "2023–2024" },
  { label: "Rôle",    value: "Product Designer" },
  { label: "Contexte", value: "Smart-Chain • Projet client" },
];

export default function WenimmoIntro() {
  return (
    <ProjectIntro
      tags={TAGS}
      title="Wenimmo"
      description="Un SaaS B2B de distribution financière conçu pour deux métiers aux besoins divergents. Son interface unique adapte les flux des CGP et du Middle Office tout en unifiant le suivi des souscriptions."
      meta={META}
    />
  );
}
