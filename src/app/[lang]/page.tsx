import { getDictionary, type Locale } from "@/lib/getDictionary";
import Navigation from "@/components/Navigation/Navigation";
import HeroSection from "@/components/HeroSection/HeroSection";
import ProjectsSection from "@/components/ProjectsSection/ProjectsSection";
import AboutSection from "@/components/AboutSection/AboutSection";
import ProcessSection from "@/components/ProcessSection/ProcessSection";
import ContactSection from "@/components/ContactSection/ContactSection";
import Footer from "@/components/Footer/Footer";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Navigation />
      <HeroSection />
      <ProjectsSection />
      <AboutSection dict={dict.about} lang={lang} />
      <ProcessSection dict={dict.process} />
      <ContactSection />
      <Footer dict={dict.footer} />
    </>
  );
}
