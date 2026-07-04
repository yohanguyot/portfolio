import Navigation from "@/components/Navigation/Navigation";
import HeroSection from "@/components/HeroSection/HeroSection";
import ProjectsSection from "@/components/ProjectsSection/ProjectsSection";
import AboutSection from "@/components/AboutSection/AboutSection";
import ProcessSection from "@/components/ProcessSection/ProcessSection";
import ContactSection from "@/components/ContactSection/ContactSection";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <ProcessSection />
      <ContactSection />
      <Footer />
    </>
  );
}
