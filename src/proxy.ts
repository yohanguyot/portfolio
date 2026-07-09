import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["fr", "en", "es"] as const;
const DEFAULT_LOCALE = "fr";

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const preferred = acceptLanguage.split(",")[0].split("-")[0].toLowerCase();
  return LOCALES.includes(preferred as (typeof LOCALES)[number])
    ? preferred
    : DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = LOCALES.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|images|fonts|favicon.ico).*)"],
};
