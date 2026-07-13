import type { MetadataRoute } from "next";
import { BASE_URL, LOCALES } from "@/lib/config";
const PATHS = ["", "/bloom", "/keepro", "/lecoffre", "/wenimmo"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((lang) =>
    PATHS.map((path) => ({
      url: `${BASE_URL}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${BASE_URL}/${l}${path}`])
        ),
      },
    }))
  );
}
