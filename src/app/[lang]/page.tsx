import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/getDictionary";

import { BASE_URL, LOCALES } from "@/lib/config";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return {
    title: "Yohan Guyot · Product Designer",
    description: dict.meta.home,
    alternates: {
      canonical: `${BASE_URL}/${lang}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE_URL}/${l}`])),
    },
    openGraph: {
      title: "Yohan Guyot · Product Designer",
      description: dict.meta.home,
      url: `${BASE_URL}/${lang}`,
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Yohan Guyot",
      url: BASE_URL,
      jobTitle: "Product Designer",
      description: "Product designer with dual design and front-end expertise. Figma files ready to implement, no loss in production.",
      sameAs: [
        "https://www.linkedin.com/in/yohan-guyot/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Yohan Guyot",
      publisher: { "@id": `${BASE_URL}/#person` },
    },
  ],
};

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <main>
        <HeroSection />
        <ProjectsSection />
        <AboutSection dict={dict.about} lang={lang} />
        <ProcessSection dict={dict.process} />
        <ContactSection />
      </main>
      <Footer dict={dict.footer} />
    </>
  );
}
