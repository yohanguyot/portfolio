import ProjectIntro from "@/components/Project/Intro/Intro";

const TAGS = ["Legaltech", "Notariat"];

const META = [
  { label: "Période",  value: "2023–2024" },
  { label: "Rôle",    value: "Product Designer" },
  { label: "Contexte", value: "Smart-Chain · Projet client" },
];

export default function LeCoffreIntro() {
  return (
    <ProjectIntro
      tags={TAGS}
      title="LeCoffre"
      description="Un SaaS B2B2C de certification notariale conçu pour des échanges documentaires sensibles. Son interface aligne les exigences de rigueur des notaires et le besoin de clarté de leurs clients."
      meta={META}
    />
  );
}
