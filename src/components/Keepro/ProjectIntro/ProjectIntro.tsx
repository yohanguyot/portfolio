import ProjectIntro from "@/components/Project/Intro/Intro";
import type { Dictionary } from "@/lib/getDictionary";

const DEFAULT_TAGS = ["Certification", "Blockchain"];

type Props = {
  tags?: string[];
  dict: Dictionary["keepro"]["intro"];
};

export default function KeeproIntro({ tags = DEFAULT_TAGS, dict }: Props) {
  return (
    <ProjectIntro
      tags={tags}
      title="Keepro"
      description={dict.description}
      meta={dict.meta}
    />
  );
}
