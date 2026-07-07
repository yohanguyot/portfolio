import Navigation from "@/components/Navigation/Navigation";
import HeroBanner from "@/components/Bloom/HeroBanner/HeroBanner";
import ProjectIntro from "@/components/Bloom/ProjectIntro/ProjectIntro";
import ContactSection from "@/components/ContactSection/ContactSection";
import Footer from "@/components/Footer/Footer";

export default function BloomPage() {
  return (
    <>
      <Navigation />
      <HeroBanner />
      <ProjectIntro />
      <ContactSection />
      <Footer />
    </>
  );
}
