import Navigation from "@/components/Navigation/Navigation";
import HeroBanner from "@/components/Wenimmo/HeroBanner/HeroBanner";
import ProjectIntro from "@/components/Wenimmo/ProjectIntro/ProjectIntro";
import ProjectContext from "@/components/Wenimmo/ProjectContext/ProjectContext";
import ProjectProblem from "@/components/Wenimmo/ProjectProblem/ProjectProblem";
import ProjectSolution from "@/components/Wenimmo/ProjectSolution/ProjectSolution";
import ProjectDecisions from "@/components/Wenimmo/ProjectDecisions/ProjectDecisions";
import ProjectCGP from "@/components/Wenimmo/ProjectCGP/ProjectCGP";
import ProjectMiddleOffice from "@/components/Wenimmo/ProjectMiddleOffice/ProjectMiddleOffice";
import ProjectImpact from "@/components/Wenimmo/ProjectImpact/ProjectImpact";
import ContactSection from "@/components/ContactSection/ContactSection";
import Footer from "@/components/Footer/Footer";

export default function WenimmoPage() {
  return (
    <>
      <Navigation />
      <HeroBanner />
      <ProjectIntro />
      <ProjectContext />
      <ProjectProblem />
      <ProjectSolution />
      <ProjectDecisions />
      <ProjectCGP />
      <ProjectMiddleOffice />
      <ProjectImpact />
      <ContactSection noMarginTop />
      <Footer />
    </>
  );
}
