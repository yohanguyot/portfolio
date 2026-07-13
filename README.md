# Portfolio · Yohan Guyot

Personal portfolio built with Next.js 16 (App Router), CSS Modules, and a fully custom design system. No UI framework, no Tailwind — design tokens defined as CSS custom properties, animations hand-rolled.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16, React 19, TypeScript 5 |
| Styling | CSS Modules + CSS custom properties |
| Icons | Lucide React |
| Email | Resend |
| Analytics | Vercel Analytics + Speed Insights |
| Transitions | next-view-transitions |

## Getting started

```bash
npm install
cp .env.example .env.local  # then fill in your keys
npm run dev
```

### Environment variables

Copy `.env.example` to `.env.local` and fill in your values:

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | API key for the contact form ([resend.com](https://resend.com)) |

## Project structure

```
src/
├── app/
│   ├── [lang]/               # All pages — locale-aware
│   │   ├── page.tsx          # Home
│   │   ├── bloom/            # Case study: Bloom
│   │   ├── keepro/           # Case study: Keepro
│   │   ├── lecoffre/         # Case study: Le Coffre
│   │   └── wenimmo/          # Case study: Wenimmo
│   └── api/contact/          # Contact form endpoint (Resend)
├── components/               # One folder per component
│   └── Project/              # Shared shells for all case study pages
├── dictionaries/             # Translation files (fr.json, en.json, es.json)
├── lib/
│   ├── animation.ts          # Scroll animation utilities (observe, revealEl…)
│   ├── getDictionary.ts      # Locale → JSON loader
│   └── dict-context.tsx      # Dictionary React context
├── styles/
│   └── typography.module.css # Typography scale (composes-ready classes)
└── proxy.ts                  # Middleware: locale detection + redirect
```

## i18n

Three locales: `fr` (default), `en`, `es`. No third-party library.

- Middleware (`src/proxy.ts`) reads `Accept-Language` and redirects bare paths to `/{locale}/`
- All pages live under `src/app/[lang]/` — the `lang` segment drives the locale
- Dictionaries are loaded server-side via `getDictionary(lang)` and passed to components through `DictProvider`

### Adding a locale

1. Create `src/dictionaries/<locale>.json` (copy `fr.json`, translate all values)
2. Add the locale to `getDictionary.ts` → `Locale` type + `dictionaries` map
3. Add it to the `LOCALES` array in `src/app/[lang]/layout.tsx`
4. Add an entry to `LANGUAGES` in `src/components/Navigation/Navigation.tsx`
5. Verify `src/proxy.ts` includes the new locale in its redirect list

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint
```

## Design system

Documented in [CLAUDE.md](./CLAUDE.md) — color tokens, typography scale, spacing, components, animation rules.
