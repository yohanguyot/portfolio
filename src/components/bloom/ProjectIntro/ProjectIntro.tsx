import ProjectIntro from "@/components/Project/Intro/Intro";

const TAGS = ["Design system", "White-label"];

const META = [
  { label: "Période", value: "2022–2025" },
  { label: "Rôle", value: "Lead Product Designer" },
  { label: "Contexte", value: "Smart-Chain · Projet interne" },
];

const STATS = [
  { value: "1", label: "Seul système à maintenir" },
  { value: "65", suffix: "+", label: "Composants maintenus" },
  { value: "7", suffix: "+", label: "Identités déployées" },
  { value: "3", suffix: "×", label: "Plus rapide à déployer" },
];

export default function BloomIntro() {
  return (
    <ProjectIntro
      tags={TAGS}
      title="Bloom"
      description="Une marketplace Web3 en white-label à l'architecture modulaire. Pensée pour s'adapter à chaque client, l'interface se reconfigure instantanément sans toucher au code."
      meta={META}
      stats={STATS}
    />
  );
}
