import ShowcaseSection from "@/components/Project/ShowcaseSection/ShowcaseSection";
import type { Dictionary } from "@/lib/getDictionary";

type Props = { dict: Dictionary["keepro"]["deposits"] };

export default function ProjectDeposits({ dict }: Props) {
  return (
    <ShowcaseSection
      label={dict.label}
      heading={dict.heading}
      description={dict.description}
      imageSrc="/images/projects/keepro/deposits.png"
      imageAlt="Vue des dépôts Keepro — liste des certifications avec panneau de détail"
      dimImage
    />
  );
}
