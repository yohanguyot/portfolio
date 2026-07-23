import type { Metadata } from "next";
import Navigation from "@/components/Navigation/Navigation";

import { BASE_URL, LOCALES } from "@/lib/config";

export async function generateMetadata({ params }: PageProps<"/[lang]/wenimmo">): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return {
    title: "Wenimmo · Yohan Guyot",
    description: dict.meta.wenimmo,
    alternates: {
      canonical: `${BASE_URL}/${lang}/wenimmo`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE_URL}/${l}/wenimmo`])),
    },
    openGraph: {
      title: "Wenimmo · Yohan Guyot",
      description: dict.meta.wenimmo,
      url: `${BASE_URL}/${lang}/wenimmo`,
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
  };
}
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
import { getDictionary, type Locale } from "@/lib/getDictionary";

export default async function WenimmoPage({ params }: PageProps<"/[lang]/wenimmo">) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Navigation />
      <main>
        <HeroBanner />
        <ProjectIntro tags={dict.tags.wenimmo} dict={dict.wenimmo.intro} />
        <ProjectContext dict={dict.wenimmo.context} />
        <ProjectProblem dict={dict.wenimmo.problem} />
        <ProjectSolution dict={dict.wenimmo.solution} />
        <ProjectDecisions dict={dict.wenimmo.decisions} />
        <ProjectCGP dict={dict.wenimmo.cgp} />
        <ProjectMiddleOffice dict={dict.wenimmo.middleOffice} />
        <ProjectImpact dict={dict.wenimmo.impact} />
        <ContactSection noMarginTop />
      </main>
      <Footer dict={dict.footer} />
    </>
  );
}
