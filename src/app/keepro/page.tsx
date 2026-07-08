import Navigation from "@/components/Navigation/Navigation";
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

export default function KeeproPage() {
  return (
    <>
      <Navigation />
      <HeroBanner />
      <ProjectIntro />
      <ProjectContext />
      <ProjectProblem />
      <ProjectSolution />
      <ProjectDecisions />
      <ProjectDashboard />
      <ProjectDeposits />
      <ProjectParcours />
      <ProjectImpact />
      <ContactSection noMarginTop />
      <Footer />
    </>
  );
}
