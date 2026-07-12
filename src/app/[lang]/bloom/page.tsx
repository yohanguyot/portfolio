import type { Metadata } from "next";
import Navigation from "@/components/Navigation/Navigation";

export async function generateMetadata({ params }: PageProps<"/[lang]/bloom">): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return {
    title: "Bloom · Yohan Guyot",
    description: dict.meta.bloom,
  };
}
import HeroBanner from "@/components/Bloom/HeroBanner/HeroBanner";
import ProjectIntro from "@/components/Bloom/ProjectIntro/ProjectIntro";
import ProjectContext from "@/components/Bloom/ProjectContext/ProjectContext";
import ProjectProblem from "@/components/Bloom/ProjectProblem/ProjectProblem";
import ProjectSolution from "@/components/Bloom/ProjectSolution/ProjectSolution";
import ProjectMethod from "@/components/Bloom/ProjectMethod/ProjectMethod";
import ProjectDecision from "@/components/Bloom/ProjectDecision/ProjectDecision";
import ProjectArchitecture from "@/components/Bloom/ProjectArchitecture/ProjectArchitecture";
import ProjectAlignment from "@/components/Bloom/ProjectAlignment/ProjectAlignment";
import ProjectIdentities from "@/components/Bloom/ProjectIdentities/ProjectIdentities";
import ProjectParcours from "@/components/Bloom/ProjectParcours/ProjectParcours";
import ProjectPlayground from "@/components/Bloom/ProjectPlayground/ProjectPlayground";
import ContactSection from "@/components/ContactSection/ContactSection";
import Footer from "@/components/Footer/Footer";
import { getDictionary, type Locale } from "@/lib/getDictionary";

export default async function BloomPage({ params }: PageProps<"/[lang]/bloom">) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Navigation />
      <HeroBanner />
      <ProjectIntro tags={dict.tags.bloom} dict={dict.bloom.intro} />
      <ProjectContext dict={dict.bloom.context} />
      <ProjectProblem dict={dict.bloom.problem} />
      <ProjectSolution dict={dict.bloom.solution} />
      <ProjectMethod dict={dict.bloom.method} />
      <ProjectDecision dict={dict.bloom.decision} />
      <ProjectArchitecture dict={dict.bloom.architecture} />
      <ProjectAlignment dict={dict.bloom.alignment} />
      <ProjectIdentities dict={dict.bloom.identities} />
      <ProjectParcours dict={dict.bloom.parcours} />
      <ProjectPlayground dict={dict.bloom.playground} />
      <ContactSection noMarginTop />
      <Footer dict={dict.footer} />
    </>
  );
}
