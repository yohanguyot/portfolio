import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/getDictionary";
import { DictProvider } from "@/lib/dict-context";
import { notFound } from "next/navigation";
import LangSetter from "@/components/LangSetter/LangSetter";

import { BASE_URL, LOCALES } from "@/lib/config";

const OG_LOCALE: Record<string, string> = {
  fr: "fr_FR",
  en: "en_US",
  es: "es_ES",
};

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    metadataBase: new URL(BASE_URL),
    icons: {
      icon: [
        { url: "/favicon.ico", type: "image/x-icon", sizes: "32x32 48x48 64x64" },
        { url: "/icon.png", type: "image/png", sizes: "512x512" },
      ],
    },
    openGraph: {
      siteName: "Yohan Guyot",
      locale: OG_LOCALE[lang] ?? "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  if (!LOCALES.includes(lang as Locale)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <DictProvider dict={dict}>
      <LangSetter lang={lang} />
      {children}
    </DictProvider>
  );
}
