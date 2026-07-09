export type Locale = "fr" | "en" | "es";

export type Dictionary = typeof import("../dictionaries/fr.json");

const dictionaries = {
  fr: () => import("../dictionaries/fr.json").then((m) => m.default),
  en: () => import("../dictionaries/en.json").then((m) => m.default),
  es: () => import("../dictionaries/es.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]?.() ?? dictionaries.fr();
}
