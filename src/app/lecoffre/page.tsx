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

export default function LeCoffrePage() {
  return (
    <>
      <Navigation />
      <HeroBanner />
      <ProjectIntro />
      <ProjectContext />
      <ProjectProblem />
      <ProjectSolution />
      <ProjectDecisions />
      <ProjectNotaire />
      <ProjectClient />
      <ProjectAdmin />
      <ProjectImpact />
      <ContactSection noMarginTop />
      <Footer />
    </>
  );
}
