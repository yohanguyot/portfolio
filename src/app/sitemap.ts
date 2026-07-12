import type { MetadataRoute } from "next";

const BASE_URL = "https://yohanguyot.com";
const LOCALES = ["fr", "en", "es"];
const PROJECTS = ["bloom", "keepro", "lecoffre", "wenimmo"];

export default function sitemap(): MetadataRoute.Sitemap {
  const homepages = LOCALES.map((lang) => ({
    url: `${BASE_URL}/${lang}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
  }));

  const projects = LOCALES.flatMap((lang) =>
    PROJECTS.map((project) => ({
      url: `${BASE_URL}/${lang}/${project}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );

  return [...homepages, ...projects];
}
