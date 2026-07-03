import Navigation from "@/components/Navigation/Navigation";
import HeroSection from "@/components/HeroSection/HeroSection";
import ProjectsSection from "@/components/ProjectsSection/ProjectsSection";
import AboutSection from "@/components/AboutSection/AboutSection";
import ProcessSection from "@/components/ProcessSection/ProcessSection";

export default function Home() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <ProcessSection />
    </>
  );
}
