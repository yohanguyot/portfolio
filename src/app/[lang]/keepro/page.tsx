import type { Metadata } from "next";
import Navigation from "@/components/Navigation/Navigation";

export async function generateMetadata({ params }: PageProps<"/[lang]/keepro">): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return {
    title: "Keepro · Yohan Guyot",
    description: dict.meta.keepro,
  };
}
import HeroBanner from "@/components/Keepro/HeroBanner/HeroBanner";
import ProjectIntro from "@/components/Keepro/ProjectIntro/ProjectIntro";
import ProjectContext from "@/components/Keepro/ProjectContext/ProjectContext";
import ProjectProblem from "@/components/Keepro/ProjectProblem/ProjectProblem";
import ProjectSolution from "@/components/Keepro/ProjectSolution/ProjectSolution";
import ProjectDecisions from "@/components/Keepro/ProjectDecisions/ProjectDecisions";
import ProjectDashboard from "@/components/Keepro/ProjectDashboard/ProjectDashboard";
import ProjectDeposits from "@/components/Keepro/ProjectDeposits/ProjectDeposits";
import ProjectParcours from "@/components/Keepro/ProjectParcours/ProjectParcours";
import ProjectImpact from "@/components/Keepro/ProjectImpact/ProjectImpact";
import ContactSection from "@/components/ContactSection/ContactSection";
import Footer from "@/components/Footer/Footer";
import { getDictionary, type Locale } from "@/lib/getDictionary";

export default async function KeeproPage({ params }: PageProps<"/[lang]/keepro">) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Navigation />
      <HeroBanner />
      <ProjectIntro tags={dict.tags.keepro} dict={dict.keepro.intro} />
      <ProjectContext dict={dict.keepro.context} />
      <ProjectProblem dict={dict.keepro.problem} />
      <ProjectSolution dict={dict.keepro.solution} />
      <ProjectDecisions dict={dict.keepro.decisions} />
      <ProjectDashboard dict={dict.keepro.dashboard} />
      <ProjectDeposits dict={dict.keepro.deposits} />
      <ProjectParcours dict={dict.keepro.parcours} />
      <ProjectImpact dict={dict.keepro.impact} />
      <ContactSection noMarginTop />
      <Footer dict={dict.footer} />
    </>
  );
}
