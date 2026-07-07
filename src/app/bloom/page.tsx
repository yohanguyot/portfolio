import Navigation from "@/components/Navigation/Navigation";
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
import ContactSection from "@/components/ContactSection/ContactSection";
import Footer from "@/components/Footer/Footer";

export default function BloomPage() {
  return (
    <>
      <Navigation />
      <HeroBanner />
      <ProjectIntro />
      <ProjectContext />
      <ProjectProblem />
      <ProjectSolution />
      <ProjectMethod />
      <ProjectDecision />
      <ProjectArchitecture />
      <ProjectAlignment />
      <ProjectIdentities />
      <ProjectParcours />
      <ContactSection />
      <Footer />
    </>
  );
}
