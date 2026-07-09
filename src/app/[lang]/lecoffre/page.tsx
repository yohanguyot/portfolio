import Navigation from "@/components/Navigation/Navigation";
import HeroBanner from "@/components/LeCoffre/HeroBanner/HeroBanner";
import ProjectIntro from "@/components/LeCoffre/ProjectIntro/ProjectIntro";
import ProjectContext from "@/components/LeCoffre/ProjectContext/ProjectContext";
import ProjectProblem from "@/components/LeCoffre/ProjectProblem/ProjectProblem";
import ProjectSolution from "@/components/LeCoffre/ProjectSolution/ProjectSolution";
import ProjectDecisions from "@/components/LeCoffre/ProjectDecisions/ProjectDecisions";
import ProjectNotaire from "@/components/LeCoffre/ProjectNotaire/ProjectNotaire";
import ProjectClient from "@/components/LeCoffre/ProjectClient/ProjectClient";
import ProjectAdmin from "@/components/LeCoffre/ProjectAdmin/ProjectAdmin";
import ProjectImpact from "@/components/LeCoffre/ProjectImpact/ProjectImpact";
import ContactSection from "@/components/ContactSection/ContactSection";
import Footer from "@/components/Footer/Footer";
import { getDictionary, type Locale } from "@/lib/getDictionary";

export default async function LeCoffrePage({ params }: PageProps<"/[lang]/lecoffre">) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Navigation />
      <HeroBanner />
      <ProjectIntro tags={dict.tags.lecoffre} dict={dict.lecoffre.intro} />
      <ProjectContext dict={dict.lecoffre.context} />
      <ProjectProblem dict={dict.lecoffre.problem} />
      <ProjectSolution dict={dict.lecoffre.solution} />
      <ProjectDecisions dict={dict.lecoffre.decisions} />
      <ProjectNotaire dict={dict.lecoffre.notaire} />
      <ProjectClient dict={dict.lecoffre.client} />
      <ProjectAdmin dict={dict.lecoffre.admin} />
      <ProjectImpact dict={dict.lecoffre.impact} />
      <ContactSection noMarginTop />
      <Footer dict={dict.footer} />
    </>
  );
}
