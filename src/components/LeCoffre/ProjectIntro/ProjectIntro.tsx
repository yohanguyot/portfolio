import ProjectIntro from "@/components/Project/Intro/Intro";
import type { Dictionary } from "@/lib/getDictionary";

const DEFAULT_TAGS = ["Legaltech", "Notariat"];

type Props = {
  tags?: string[];
  dict: Dictionary["lecoffre"]["intro"];
};

export default function LeCoffreIntro({ tags = DEFAULT_TAGS, dict }: Props) {
  return (
    <ProjectIntro
      tags={tags}
      title="LeCoffre"
      description={dict.description}
      meta={dict.meta}
    />
  );
}
