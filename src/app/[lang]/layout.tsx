import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/getDictionary";
import { DictProvider } from "@/lib/dict-context";
import { notFound } from "next/navigation";

const LOCALES: Locale[] = ["fr", "en", "es"];

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
    other: { lang },
  };
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  if (!LOCALES.includes(lang as Locale)) notFound();

  const dict = await getDictionary(lang as Locale);

  return <DictProvider dict={dict}>{children}</DictProvider>;
}
