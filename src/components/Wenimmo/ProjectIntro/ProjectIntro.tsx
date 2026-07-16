import ProjectIntro from "@/components/Project/Intro/Intro";
import type { Dictionary } from "@/lib/getDictionary";

const DEFAULT_TAGS = ["Fintech", "Patrimoine"];

type Props = {
  tags?: string[];
  dict: Dictionary["wenimmo"]["intro"];
};

export default function WenimmoIntro({ tags = DEFAULT_TAGS, dict }: Props) {
  return (
    <ProjectIntro
      tags={tags}
      title="Wenimmo"
      description={dict.description}
      meta={dict.meta}
      stats={dict.stats}
    />
  );
}
