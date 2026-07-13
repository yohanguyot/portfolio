import ProjectIntro from "@/components/Project/Intro/Intro";
import type { Dictionary } from "@/lib/getDictionary";

const DEFAULT_TAGS = ["Design system", "White-label"];

type Props = {
  tags?: string[];
  dict: Dictionary["bloom"]["intro"];
};

export default function BloomIntro({ tags = DEFAULT_TAGS, dict }: Props) {
  return (
    <ProjectIntro
      tags={tags}
      title="Bloom"
      description={dict.description}
      meta={dict.meta}
      stats={dict.stats}
    />
  );
}
