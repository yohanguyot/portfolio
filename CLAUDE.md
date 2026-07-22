@AGENTS.md

## Tooling gotchas

- **Never run `npm audit fix --force`** without reviewing the `package.json` diff first — in this repo it has downgraded `next` from `^16.2.9` to `^9.3.3` (a 7-major-version regression, pre-App-Router) instead of actually fixing vulnerabilities.
- **`vercel env pull` only fetches the `development` environment by default.** If a var (e.g. `RESEND_API_KEY`) is only configured for Production/Preview on Vercel, it won't be pulled — use `vercel env add <VAR> development` or `vercel env pull --environment=preview`.

# Design System — Portfolio Yohan Guyot

> Source: Figma `oHYVpjn1wHgjILebrGibTw`, pages « 🧩 Design System » and « 🖥️ Screens ».

---

## Colors

### Primitive palette

The entire palette is **dark-mode only** (no light mode visible in the file).

#### Neutrals
| Figma token | Hex | Typical usage |
|---|---|---|
| `color/neutral/950` | `#09090B` | Canvas / darkest background |
| `color/neutral/900` | `#121214` | Dark overlay |
| `color/neutral/800` | `#27272A` | Surface-2 |
| `color/neutral/700` | `#3F3F46` | Secondary gradient (top) / Surface-3 |
| `color/neutral/600` | `#52525B` | — |
| `color/neutral/500` | `#71717A` | Muted text |
| `color/neutral/400` | `#A1A1AA` | Secondary text |
| `color/neutral/300` | `#D4D4D8` | — |
| `color/neutral/200` | `#E4E4E7` | Primary text |
| `color/neutral/100` | `#F4F4F5` | Base for semi-transparent overlays |
| `color/neutral/50`  | `#FAFAFA` | Text on button |

> **Opacity convention**: the `*-a80`, `*-a6`, etc. variables exist in Figma only because Figma can't apply opacity to a variable. In code, use the base primitive directly with CSS opacity — don't create a dedicated variable.

#### Brand
| Figma token | Hex |
|---|---|
| `color/brand/950` | `#3A1510` |
| `color/brand/900` | `#6C2E22` |
| `color/brand/800` | `#853527` |
| `color/brand/700` | `#A64028` |
| `color/brand/600` | `#C6532E` |
| `color/brand/500` | `#D66A39` |
| `color/brand/400` | `#DD885A` |
| `color/brand/300` | `#E8B089` |
| `color/brand/200` | `#F1D0B7` |
| `color/brand/100` | `#F8E9DC` |
| `color/brand/50`  | `#FCF5F0` |

> Same convention: `brand/600-a60` and `brand/600-a6` are Figma artifacts. In code, use `#C6532E` with the corresponding opacity.

#### Status
| Token | Hex |
|---|---|
| `color/success/500` | `#34D399` |
| `color/error/500` | `#F87171` |

---

### Semantic tokens (`core` collection, `Dark` mode)

These tokens are the only ones to use in code. Never reference the primitive palette directly.

For semi-transparent tokens: use `color-mix()` — see the **Opacity on CSS variables** section below.

#### Backgrounds
| Token | Base primitive | Opacity | Final CSS value |
|---|---|---|---|
| `color/bg/canvas` | `neutral/950` `#09090B` | 100% | `#09090B` |
| `color/bg/surface` | `neutral/100` `#F4F4F5` | 2% | `rgba(244,244,245,0.02)` |
| `color/bg/surface-2` | `neutral/100` `#F4F4F5` | 4% | `rgba(244,244,245,0.04)` |
| `color/bg/surface-3` | `neutral/100` `#F4F4F5` | 6% | `rgba(244,244,245,0.06)` |
| `color/bg/overlay` | `neutral/900` `#121214` | 80% | `rgba(18,18,20,0.80)` |
| `color/bg/active` | `brand/600` `#C6532E` | 6% | `rgba(198,83,46,0.06)` |

#### Text
| Token | Resolved value | Hex |
|---|---|---|
| `color/text/primary` | `neutral/200` | `#E4E4E7` |
| `color/text/secondary` | `neutral/400` | `#A1A1AA` |
| `color/text/muted` | `neutral/500` | `#71717A` |
| `color/text/accent` | `brand/500` | `#D66A39` |
| `color/text/hero` | Vertical gradient | `linear-gradient(180deg, var(--color-neutral-50, #FAFAFA) 0%, var(--color-neutral-300, #D4D4D8) 60%, var(--color-neutral-500, #71717A) 100%)` |

#### Borders
| Token | Base primitive | Opacity | Final CSS value |
|---|---|---|---|
| `color/border/subtle` | `neutral/100` `#F4F4F5` | 2% | `rgba(244,244,245,0.02)` |
| `color/border/strong` | `neutral/100` `#F4F4F5` | 6% | `rgba(244,244,245,0.06)` |
| `color/border/active` | `brand/600` `#C6532E` | 60% | `rgba(198,83,46,0.60)` |

#### Buttons
| Token | Resolved value | Value |
|---|---|---|
| `color/btn/primary/text` | `neutral/50` | `#FAFAFA` |
| `color/btn/secondary/text` | `neutral/50` | `#FAFAFA` |
| `color/btn/primary/bg` | Gradient | `var(--btn-primary-bg, linear-gradient(180deg, var(--color-brand-600, #C6532E) 0%, var(--color-brand-800, #853527) 100%))` |
| `color/btn/secondary/bg` | Gradient | `var(--btn-secondary-bg, linear-gradient(180deg, var(--color-neutral-700, #3F3F46) 0%, var(--color-neutral-900, #121214) 100%))` |

#### Status
| Token | Value |
|---|---|
| `color/status/success` | `#34D399` |
| `color/status/error` | `#F87171` |

---

## Typography

### Font families

| Figma token | Family | Usage context |
|---|---|---|
| `font/family/display` | `Cabinet Grotesk Variable` | Titles, headings |
| `font/family/body` | `Geist` | Body text |
| `font/family/label` | `JetBrains Mono` | Labels, captions, technical UI |

### Weights
| Token | CSS value |
|---|---|
| `font/weight/regular` | `400` |
| `font/weight/medium` | `500` |
| `font/weight/bold` | `700` |

### Type scale

All `letter-spacing` values are in `em` (Figma % divided by 100).

| Token | Family | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| `display` | Cabinet Grotesk Variable | `112px` | Bold (700) | `0.92` | `-0.03em` |
| `heading-lg` | Cabinet Grotesk Variable | `48px` | Bold (700) | `1.08` | `-0.01em` |
| `heading-md` | Cabinet Grotesk Variable | `32px` | Bold (700) | `1.25` | `-0.01em` |
| `heading-sm` | Cabinet Grotesk Variable | `24px` | Bold (700) | `1.35` | `-0.01em` |
| `heading-xs` | Cabinet Grotesk Variable | `18px` | Bold (700) | `1.35` | `-0.01em` |
| `body-lead` | Geist | `18px` | Regular (400) | `1.35` | `+0.01em` |
| `body-md` | Geist | `16px` | Regular (400) | `1.50` | `0` |
| `body-sm` | Geist | `15px` | Regular (400) | `1.60` | `0` |
| `body-xs` | Geist | `14px` | Regular (400) | `1.50` | `0` |
| `label-md` | JetBrains Mono | `13px` | Medium (500) | `1.55` | `+0.05em` (≈ 0.65px) |
| `label-sm` | JetBrains Mono | `12px` | Medium (500) | `1.65` | `+0.05em` |

> Rule: `label-md` and `label-sm` are always **`text-transform: uppercase`**.

---

## Spacing

### Semantic tokens (`core`)

| Token | Primitive value | px |
|---|---|---|
| `space/2xs` | `space/4` | `4px` |
| `space/xs` | `space/8` | `8px` |
| `space/sm` | `space/12` | `12px` |
| `space/md` | `space/16` | `16px` |
| `space/lg` | `space/24` | `24px` |
| `space/xl` | `space/32` | `32px` |
| `space/2xl` | `space/48` | `48px` |
| `space/3xl` | `space/64` | `64px` |
| `space/4xl` | `space/120` | `120px` |

### Layout grid

- Full-width sections: `width: 100%`
- Centered content: `max-width: 1200px; margin-inline: auto;`
- Section vertical padding: `padding-block: 120px` (`space/4xl`)

### Section padding — pattern à respecter partout

Toutes les sections (homepage et pages projet) suivent le même pattern de padding :

```css
.section {
  padding-block: var(--space-4xl); /* 120px */
  padding-inline: var(--space-xl);    /* 32px — le centrage est géré par le container max-width */
}

@media (max-width: 768px) {
  .section {
    padding-block: var(--space-3xl); /* 64px */
    padding-inline: var(--space-md); /* 16px */
  }
}
```

Ne jamais utiliser `padding-inline: var(--space-4xl)` sur une section — c'est le container interne (`max-width: 1200px; margin-inline: auto`) qui centre le contenu, pas le padding de la section.

---

## Border Radius

| Semantic token | Primitive value | px |
|---|---|---|
| `radius/sm` | `radius/4` | `4px` |
| `radius/md` | `radius/6` | `6px` |
| `radius/lg` | `radius/12` | `12px` |
| `radius/xl` | `radius/24` | `24px` |
| `radius/2xl` | `radius/64`  | `64px`  |
| `radius/3xl` | `radius/120` | `120px` |
| `radius/full` | `radius/full` | `9999px` |

---

## Effects & Animations

### Shadows / visual effects

- **Overlay blur**: `backdrop-filter: blur(24px)` — token `overlay-blur`
- **Button inner highlight**: `box-shadow: inset 0px 1px 0px 0px rgba(255,255,255,0.30)` — applied on all primary and secondary buttons (default and hover)
- **Primary button shadow**: `box-shadow: 0 0 0 1px #6C2E22, 0 3px 4px -1px #3A1510`
- **Secondary button shadow**: `box-shadow: 0 0 0 1px #09090B, 0 3px 4px -1px #09090B`


### Transitions

Two durations for micro-interactions, one for entrance animations:
- **Fast**: `200ms cubic-bezier(0.2, 0, 0, 1)` — hover, color, icon
- **Slow**: `300ms cubic-bezier(0.2, 0, 0, 1)` — layout shifts
- **Entrance**: `600ms cubic-bezier(0.16, 1, 0.3, 1)` — expo-out, all scroll/page-load reveals

---

## Components

### `button` — 3 types, 2 states

**Common properties:**
- Label: `label-md` (JetBrains Mono 13px Medium, uppercase, `color/btn/primary/text` or `secondary/text`)
- Vertical padding: `space/md` (16px)
- Horizontal padding: `space/lg` (24px)

**type=primary**
- `default`: `color/btn/primary/bg`, `border-radius: radius/full`, primary shadows, inset highlight
- `hover`: `filter: brightness(1.15)` — lightens without desaturating the orange gradient

**type=secondary**
- `default`: `color/btn/secondary/bg`, `border-radius: radius/full`, secondary shadows, inset highlight
- `hover`: `filter: brightness(1.22)` — slightly higher value to match perceived lightening on dark gray

**type=text**
- `default`: no background, `padding: space/xs`, `border-radius: radius/sm`, text `color/text/primary`
- `hover`: text switches to `color/text/accent` (`#D66A39`)

Buttons can have arrow-left / arrow-right icons (`16px` for text, `20px` for primary/secondary).

---

### `input` — 6 states

Dimensions: `width: 280px`, total height `76px` (label + field + caption).

- Label above: `body-xs` (14px), `color/text/secondary`
- Caption below: `label-sm` (12px JetBrains Mono Medium uppercase), `color/text/muted`

**Field — common properties:**
- `border-radius: radius/lg` (12px)
- `padding: space/xs space/md` (8px 16px)
- `overflow: hidden`

| State | Background | Border | Placeholder text |
|---|---|---|---|
| `default` | `color/bg/surface` | `color/border/strong` | `color/text/muted` |
| `hover` | `color/bg/surface-2` | `color/border/strong` | `color/text/muted` |
| `focused` | `color/bg/surface-2` | `color/border/active` | `color/text/muted` |
| `filled` | `color/bg/surface` | `color/border/strong` | `color/text/primary` |
| `error` | `color/bg/surface` | `color/status/error` | `color/text/primary` |
| `disabled` | `color/bg/surface` | `color/border/strong` | `color/text/muted` + `opacity: 0.40` |

Text inside the field: `body-sm` (Geist 15px Regular).
Caption in error state: `color/status/error` instead of muted.

---

### `text-area` — 6 states, identical to `input`

Same rules as `input`, field height: `96px` instead of `48px`.

---

### `navigation`

- Height: `60px`
- Width: full-width (the Figma component is 806px on the Design System canvas, but it's a responsive container — don't hardcode a fixed width)
- `link` component: 3 states (`state=default`, `state=hover`, `state=active`), props `label` (text) and `show-icon` (boolean)
- `status/dot` component: 2 states (`state=default`, `state=expanded`)
- `language-dropdown` component: 3 states (`step=default`, `step=hover`, `step=active`)

---

### `project-card` — main component used across screens

- 2 sizes: `project-card` (400×466px) and `project-card/large` (1200×400px)
- 2 states: `state=default`, `state=hover`
- Text props: `title`, `description`
- The client visual is **not** a variant of the card itself, but a nested instance `project-image` with its own `project=` variant: `bloom`, `keepro`, `lecoffre`, `wenimmo`

> There is a second component named `bloom-card` (316×492px per variant, 2 states `state=default|hover`) with variants `client=bloom|erable|the-elements-nation|lqr-house|repetto|versity`. This is not a duplicate of `project-card`: it's used once on the « Bloom » screen (one of the portfolio projects, instance renamed `card` there) to display different versions of the component per Bloom project client. The `client=` values therefore list Bloom's clients, not portfolio projects.

---

### `chip`

- 3 states: `state=default`, `state=hover`, `state=selected`
- Height: `40px`, width: `70px` (Figma spec — desktop only)
- On mobile: `display: flex; flex-wrap: wrap` — chips are content-sized and wrap to next line

---

### `tab`

- 3 states: `state=default`, `state=hover`, `state=active`
- Height: `36px`, width: `74px`

---

### `square-icon`

- Size: `40×40px`
- Lucide icons: named `icon=<lucide-name>` (e.g. `icon=arrow-left-right`, `icon=shield`)

---

## Naming Conventions

### Figma variables
- Separator: `/` (e.g. `color/bg/canvas`, `space/lg`, `radius/md`)
- Always 3 levels for colors: `color/<category>/<role>`
- Always 2 levels for dimensions: `space/<size>`, `radius/<size>`, `font/family/<role>`

### Components & variants
- Component name: **kebab-case** (e.g. `project-card`, `contact-link`, `text-area`)
- Variant props: **`key=value`** comma-separated (e.g. `state=default, type=primary`)
- State always named `state=` (not `variant=` or `status=`)
- Button type always named `type=` (not `variant=` or `kind=`)
- Client variation: `project=` prop on the `project-image` component (not `client=` on the card itself)

### Layer names
- Strict kebab-case
- Design System thematic sections: `Navigation`, `Buttons & Inputs`, `Cards`, `Component viewer`
- Container layers: `Container` (generic), semantic name otherwise

### Icons
- Format: `icon=<lucide-name>` inside a `square-icon` frame
- Icon names follow Lucide convention (e.g. `icon=layout-panel-left`, `icon=briefcase-business`)

### Images / client tokens
- Naming: `project=<project-name>` on the `project-image` component (nested inside `project-card`)
- Portfolio projects (used by `project-image`): `bloom`, `keepro`, `lecoffre`, `wenimmo`
- Naming: `client=<client-name>` on the `bloom-card` component (instance renamed `card`, used on the « Bloom » screen only)
- Bloom project clients (used by `bloom-card`): `versity`, `the-elements-nation`, `lqr-house`, `repetto`, `erable` (+ `bloom` itself as a variant, likely a placeholder/example in the component)

---

## Implementation

### Reuse existing components

Before implementing any UI element, check `src/components/` for an existing component. **Always use it** — never recreate a button, input, or other component inline. If an existing component doesn't cover a need, extend it rather than duplicating its styles.

#### Project page building blocks — `src/components/Project/`

All project pages (Bloom, Keepro, Wenimmo, Le Coffre…) share these shells. Use them instead of writing one-off section layouts.

| Component | Props | Purpose |
|---|---|---|
| `Project/HeroBanner` | `gradientSrc`, `logoSrc`, `logoAlt`, `logoWidth?`, `logoHeight?` | Full-width banner with gradient background and project logo |
| `Project/Intro` | `tags[]`, `title`, `description`, `meta[]`, `stats[]?`, `backHref?` | Page intro: tags, display title, description, meta row, optional stats grid |
| `Project/Nav` | `prev?: { href, label }`, `next?: { href, label }` | Previous / next project links, drop inside the last section's container |
| `Project/SplitSection` | `imageSrc`, `imageAlt?`, `imagePosition?: 'left'\|'right'`, `children` | Two-column image + text section. Pass text content as `children`. |
| `Project/FeatureCard` | `direction?: 'vertical'\|'horizontal'`, `className?`, `children` | Card surface that holds `FeatureItem` children. Handles dividers automatically via `> *:not(:last-child)`. |
| `Project/FeatureItem` | `icon`, `title`, `description`, `label?` | Single feature row (icon beside text). Pass `label` to switch to column layout (icon above text, label below) — used for architecture layers. |
| `Project/CardSection` | `label`, `heading`, `children` | Section with a card surface (border + bg): label + heading above, content below. Use for problem/context blocks. |
| `Project/TextSection` | `label`, `heading`, `children` | Two-column section: label + heading on the left, `children` on the right. Use for solution/approach blocks. |
| `Project/ShowcaseSection` | `label`, `heading`, `description`, `imageSrc`, `imageAlt?` | Full-width section: header + description paragraph above, full-width image (aspect 1440/900) below. |
| `Project/ParcoursSection` | `label`, `heading`, `items: ParcoursItem[]` | Two-column grid of screenshots with title + description below each. `ParcoursItem = { imageSrc, imageAlt, title, description }`. |

**Usage pattern for a new project page:**

```tsx
// app/myproject/page.tsx
import ProjectHeroBanner  from "@/components/Project/HeroBanner/HeroBanner";
import ProjectIntro       from "@/components/Project/Intro/Intro";
import SplitSection       from "@/components/Project/SplitSection/SplitSection";
import CardSection        from "@/components/Project/CardSection/CardSection";
import TextSection        from "@/components/Project/TextSection/TextSection";
import FeatureCard        from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem        from "@/components/Project/FeatureItem/FeatureItem";
import ShowcaseSection    from "@/components/Project/ShowcaseSection/ShowcaseSection";
import ParcoursSection    from "@/components/Project/ParcoursSection/ParcoursSection";
import ProjectNav         from "@/components/Project/Nav/Nav";
```

Each project-specific section (`Keepro/ProjectContext`, etc.) is a thin wrapper that passes content to these shared shells — use the same pattern for new projects.

### Extract repeated patterns into components

When the same structure (JSX + CSS) appears in **2 or more places**, extract it into a shared component in `src/components/`. The threshold is duplication of both markup and styles — a single repeated class doesn't count.

Good candidates: a wrapper + label + heading block, an icon container, a card shell, a link row with icon. Bad candidates: a single utility class, a layout-specific wrapper that only makes sense in context.

When extracting:
1. Create the component in its own folder (`src/components/MyComponent/MyComponent.tsx` + `.module.css`).
2. Remove the duplicated CSS from every consuming module — don't leave dead styles behind.
3. Use `ReactNode` for content props that may contain JSX (not just strings).

### CSS custom properties

Figma token separator `/` → CSS separator `-`, prefixed with `--`.

```
color/bg/canvas  →  --color-bg-canvas
space/lg         →  --space-lg
radius/md        →  --radius-md
```

All tokens are defined in `src/app/globals.css` (Layer 1: primitives, Layer 2: semantic). **Only use semantic tokens in components** — never reference primitive variables directly.

### Typography

All Figma text styles are available as CSS Modules classes in `src/styles/typography.module.css`.
Use `composes` to apply them — never repeat font properties manually:

```css
.myClass {
  composes: labelMd from '@/styles/typography.module.css';
  color: var(--color-text-secondary);
}
```

Available classes: `display`, `headingLg`, `headingMd`, `headingSm`, `headingXs`, `bodyLead`, `bodyMd`, `bodySm`, `bodyXs`, `labelMd`, `labelSm`.

All font sizes are in `rem`. `labelMd` and `labelSm` include `text-transform: uppercase` — do not add it again.

### Paragraph max-width

Any body text element (`bodyLead`, `bodyMd`, `bodySm`, `bodyXs`) must have `max-width: 600px` whenever its container can exceed that width (full-width sections, wide columns, desktop layout). No effect needed when the container is already narrower. Apply it on the component class that composes the body style, not on the typography token itself.

### Transitions

```css
transition: color var(--duration-fast) var(--ease);
transition: opacity var(--duration-slow) var(--ease);
```

Use `--duration-fast` (200ms) for micro-interactions (hover, color change).
Use `--duration-slow` (300ms) for larger layout changes.
Never animate `background-image` (not animatable) — use a `::before` overlay with `opacity` transition instead.

### Entrance animations

All page-load and scroll-triggered reveals use the expo-out easing at 600ms:

```
cubic-bezier(0.16, 1, 0.3, 1) — 600ms
```

**Page-load (hero, nav):** CSS `@keyframes` with `animation-fill-mode: both` and staggered `animation-delay`.

**Scroll-triggered:** shared utilities in `src/lib/animation.ts` — always import from there, never rewrite inline.

```ts
import { EASE, DURATION, shouldReduceMotion, observe } from '@/lib/animation';
// EASE    = 'cubic-bezier(0.16, 1, 0.3, 1)'
// DURATION = 600  (ms)
```

#### `observe(el, threshold, onEnter, rootMargin?)` — fire-once IntersectionObserver

Default `rootMargin = '0px 0px -5% 0px'`. Pass `'0px'` to override for elements that should fire immediately on entry.

#### `SectionHeader` — CSS initial state + keyframe

`SectionHeader` sets `opacity: 0` in CSS (committed at SSR), then JS adds `.labelVisible` / `.headingVisible` classes to trigger `@keyframes`. Never set `SectionHeader`'s initial state in JS.

`SectionHeader` exposes a `SectionHeaderHandle` ref for external orchestration:

```tsx
import SectionHeader, { type SectionHeaderHandle } from '@/components/SectionHeader/SectionHeader';

const headerRef = useRef<SectionHeaderHandle>(null);
// headerRef.current.trigger(delay)   — starts the label/heading animation (label à delay, heading à delay+80ms)
// headerRef.current.element          — the wrapper DOM element (use as observer target)
```

---

#### Règle 1 — Ordre d'apparition

Hiérarchie universelle (du plus important au détail) :

| Priorité | Élément | Délai relatif |
|---|---|---|
| 1 | Label / surtitre | `0 ms` |
| 2 | Heading (titre) | `+80 ms` — via `SectionHeader.trigger()` |
| 3 | Description / texte corps | `+160 ms` |
| 4 | Image / média | Dépend du layout (voir ci-dessous) |
| 5 | Cards / items | Via observer propre — jamais attaché à la cascade texte |
| 6 | CTA / bouton | Avec le dernier texte, ou observer propre si hors-écran |

**Desktop `imageRight`** (texte gauche, image droite) :
```
label(0ms) → [image(80ms) + heading(80ms)] → body(160ms)
```
```ts
const headerDelay = 0;
const imgDelay    = 80;
const bodyDelay   = 160; // headerDelay + 160
```

**Desktop `imageLeft`** (image gauche, texte droite) :
```
image(0ms) → label(80ms) → heading(160ms) → body(240ms)
```
```ts
const headerDelay = 80;
const imgDelay    = 0;
const bodyDelay   = 240; // headerDelay + 160
```

**Mobile (1 colonne empilée)** — l'image descend toujours sous le texte (`order: 1`) :
```
label(0ms) → heading(80ms) → body(160ms) → image(240ms)
```
```ts
const headerDelay = 0;
const imgDelay    = 240; // image EN DERNIER, visuellement en bas
const bodyDelay   = 160;
```

---

#### Règle 2 — Stratégie d'observers

**Un seul observer orchestré** → quand les éléments sont **côte à côte** (même Y dans le viewport). Le stagger est explicite par délais.

**Observers individuels** → quand les éléments sont **empilés verticalement** (Y différents) : mobile layout, `ParcoursSection` mobile, `FeatureItems` mobile. La cascade est naturelle au scroll.

```ts
const isMobile = window.matchMedia('(max-width: 1024px)').matches;

if (isMobile) {
  // Empilé : observer sur chaque élément
  elements.forEach(el =>
    cleanups.push(observe(el, 0.2, () => rAF(() => revealEl(el, 0))))
  );
} else {
  // Côte à côte : observer unique + stagger orchestré
  cleanups.push(observe(container, 0.1, () => {
    rAF(() => elements.forEach((el, i) => revealEl(el, i * 80)));
  }));
}
```

**Toujours séparer la surface card (FeatureCard) de la section parente** — elle a son propre observer, indépendant. Sinon la carte vide apparaît trop tôt ou trop tard.

**ContactSection — deux observers** (card + texte) :
```ts
// Observer 1 : section-card entière dès qu'elle entre
observe(section, 0.05, () => revealEl(section, 0), '0px');

// Observer 2 : cascade texte quand le SectionHeader est lisible
observe(headerRef.current?.element ?? section, 0.1, () => {
  headerRef.current?.trigger(0);
  revealEl(desc, 160);
  // links via stagger...
});
```

**Opacité compound — piège SSR** : si un parent a `opacity: 0` en CSS, ses enfants sont invisibles même si leur opacity JS est à 1. Toujours `parent.style.opacity = '1'` en `useIsomorphicLayoutEffect` avant de masquer les enfants individuellement.

```ts
// layoutEffect — overrider le CSS SSR, masquer les enfants en JS
col.style.opacity = '1';        // ← neutralise le CSS opacity:0
child.style.opacity = '0';      // ← les enfants gèrent leur propre état
void col.offsetHeight;          // force reflow
```

**Never query elements by CSS Module class inside `useEffect`** — toujours utiliser un `ref` ou `el.children` / `el.firstElementChild`.

---

#### Règle 3 — Durées, distances & easing

| Élément | translateY | scale | duration | rootMargin | threshold |
|---|---|---|---|---|---|
| Section-card entière (ContactSection) | `24px` | `0.97` | `600ms` | `'0px'` | `0.05` |
| Texte (label, heading, desc) | `12px` | `0.98` | `600ms` | `'-15% bottom'` | `0.1` |
| Image / média | `12px` | `0.98` | `600ms` | `'-5% bottom'` | `0.2` |
| FeatureCard container (surface) | — | — | `none` | `'0px'` | `0.1` |
| FeatureItems dans card | `12px` | `0.98` | `600ms` | hérité du card | — |
| Hero (page load, CSS) | `16px` | `0.97` | `600ms` | — | — |

Helper `revealEl` exporté depuis `src/lib/animation.ts`. Utilise `@keyframes revealEl` (défini dans `globals.css`) avec `animation-fill-mode: forwards`. Retourne un cancel handle `() => void` :

```ts
// The @keyframes revealEl 'from' state must match HIDDEN_TRANSFORM — both are scale(0.98) translateY(12px)
export function revealEl(el: HTMLElement, delay = 0): () => void {
  el.style.transition = '';
  el.style.animation = `revealEl ${DURATION}ms ${EASE} ${delay}ms forwards`;
  const id = setTimeout(() => {
    el.style.opacity = '1';
    el.style.transform = '';
    el.style.animation = '';
  }, DURATION + delay + 50);
  return () => {
    clearTimeout(id);
    el.style.opacity = '1';
    el.style.transform = '';
    el.style.animation = '';
  };
}
```

---

#### Règle 4 — Stagger

`STAGGER = 80ms`. Maximum 4 étapes visibles (délai max = `3 × 80 = 240ms`). Au-delà, plafonner.

```ts
const STAGGER = 80;
const MAX_STEPS = 4;

items.forEach((item, i) => {
  const delay = Math.min(i, MAX_STEPS - 1) * STAGGER;
  revealEl(item, delay);
});
```

**Cascade texte canonique** :
```ts
headerRef.current?.trigger(0);   // label à 0ms, heading à 80ms
revealEl(desc, 160);             // heading + 80ms
revealEl(meta, 240);             // desc + 80ms
```

**ParcoursSection** — image d'abord, texte 80ms après dans chaque colonne :
```ts
cols.forEach((col, i) => {
  const imgDelay  = i * 80;       // col0: 0ms, col1: 80ms
  const textDelay = i * 80 + 80;  // col0: 80ms, col1: 160ms
  revealEl(col.firstElementChild as HTMLElement, imgDelay);
  revealEl(col.lastElementChild as HTMLElement,  textDelay);
});
```

---

#### Règle 5 — Adaptation écrans

**Sections très hautes sur mobile** : utiliser `threshold: 0` uniquement pour les **wrappers de section** dont la hauteur dépasse ~1.5× le viewport (Intro, ParcoursSection 3+ items, SplitSection avec stats). Pour les éléments de contenu à l'intérieur (form, texte, liens), toujours utiliser au minimum `threshold: 0.1` — même sur mobile — afin d'éviter une apparition dès le premier pixel.

```ts
const isMobile    = window.matchMedia('(max-width: 1024px)').matches;
const shortScreen = window.innerHeight < 700;
const triggerNow  = isMobile || shortScreen;

// Wrapper de section très haute
const threshold  = triggerNow ? 0    : 0.1;
const rootMargin = triggerNow ? '0px' : '0px 0px -15% 0px';

// Élément de contenu (form, texte, liens) — même sur mobile, pas de threshold: 0
const threshold  = 0.1;
const rootMargin = isMobile ? '0px' : '0px 0px -5% 0px';
```

**CSS `order` vs DOM order** : sur mobile, `order: 1` déplace l'image visuellement en bas mais elle reste en premier dans le DOM. Toujours faire un split `isMobile` pour les sections dont l'ordre CSS diffère de l'ordre DOM (ex. `ProjectMiddleOffice`).

| Section | Desktop threshold | Mobile threshold | Mobile rootMargin |
|---|---|---|---|
| SplitSection | `0.1` | `0` | `'0px 0px -15% 0px'` |
| Intro (ProjectIntro) | `0.05` | `0` | `'0px'` |
| CardSection (card wrapper) | `0.1` | `0` | `'0px'` |
| ContactSection (section card) | `0.05` | `0.05` | `'0px'` |
| ContactSection (form) | `0.1` | `0.1` | `'0px'` |
| ContactSection (liens mobile) | n/a | `0.1` | default |
| ParcoursSection cols | `0.1` (container) | par-element `0.2` | par-element |
| FeatureCard items mobile | n/a | `0.2` each | default |

---

#### Surface card pattern (FeatureCard, stats grid)

A "surface card" est un élément avec background/border visible contenant des items discrets.

**Règle : container révélé instantanément, items en stagger.**

1. **Container** (`opacity: 0` seulement — pas de transform) : révélé avec `transition: none` dès qu'il entre dans le viewport.
2. **Items** (`opacity: 0, scale(0.98) translateY(12px)`) : stagger à 80ms chacun, 600ms expo-out.
3. **Observer split** :
   - Desktop : `observe(container, 0.1, ...)` → révélation instantanée → items stagger `i * 80ms`
   - Mobile : `observe(container, 0, ...)` → révélation instantanée + `observe(item, 0.2, ...)` par item

```ts
// Desktop
observe(card, 0.1, () => {
  card.style.transition = 'none';
  card.style.opacity = '1';
  rAF(() => items.forEach((item, i) => revealEl(item, i * 80)));
});

// Mobile
observe(card, 0, () => { card.style.transition = 'none'; card.style.opacity = '1'; });
items.forEach(item => observe(item, 0.2, () => rAF(() => revealEl(item, 0))));
```

En pratique, utiliser le helper `observeFeatureCard` de `src/lib/animation.ts` plutôt que de réimplémenter ce pattern manuellement. Il prend le **premier enfant** du wrapper `FeatureCard` et l'`isMobile` pré-calculé :

```ts
import { observeFeatureCard, isMobileViewport } from '@/lib/animation';

// Dans useEffect :
const isMobile = isMobileViewport();
const cleanup = observeFeatureCard(
  featureRef.current?.firstElementChild as HTMLElement | null,
  isMobile
);
return cleanup;
```

### Press (`:active`) feedback

Every interactive element gives tactile feedback on press via a scale-down transform:

- **Nav links, logo, dropdowns, language options**: `transform: scale(0.95)`
- **Buttons text**: `transform: scale(0.95)`
- **Buttons primary / secondary**: `transform: scale(0.97)`
- **Large card**: `transform: scale(0.99)` on the card wrapper itself
- **Small cards**: `transform: scale(0.98)` scoped to inner content (`.cardBody`, `.cardCta`) — not the card wrapper, to avoid clipping the border

Pair with `transition: transform var(--duration-fast) var(--ease)` so the release snaps back. Unlike `:hover`, `:active` does **not** need a `@media (hover: hover)` guard — it is safe on touch.

```css
.navLink {
  transition: transform var(--duration-fast) var(--ease);
}
.navLink:active {
  transform: scale(0.95);
}
```

**`:active` source order — must follow `@media (hover: hover)`**: at equal specificity, last rule in source wins. If an element has both a hover transform and an active transform, place the `:active` rule **after** the hover media query, otherwise hover overrides active on pointer devices.

```css
/* ✓ — active wins at equal specificity */
@media (hover: hover) {
  .card:hover .screen { transform: scale(1.04); }
}
.card:active .screen { transform: scale(1.01); }

/* ✗ — hover overwrites active on pointer devices */
.card:active .screen { transform: scale(1.01); }
@media (hover: hover) {
  .card:hover .screen { transform: scale(1.04); }
}
```

**`:active` scale — hover vs touch baseline**: on pointer devices, the element may already be at a hover scale when clicked. On touchscreens it starts from rest. Use both media queries when the values differ:

```css
/* Pointer: reduce from hover scale */
@media (hover: hover) {
  .card:active .screen { transform: scale(1.01); }
}
/* Touch: reduce from rest */
@media (hover: none) {
  .card:active .screen { transform: scale(0.98); }
}
```

### Hover states — touchscreen guard

**Every `:hover` rule must be wrapped in `@media (hover: hover)`** — without it, hover styles fire on tap on touchscreens and stay stuck until the user taps elsewhere.

```css
/* ✓ */
@media (hover: hover) {
  .link:hover {
    color: var(--color-text-accent);
  }
}

/* ✗ — activates on tap on mobile */
.link:hover {
  color: var(--color-text-accent);
}
```

This applies to every element: links, buttons, cards, chips, inputs, icons. No exception.

### Focus ring in clipped containers

Browser `outline` is clipped by ancestor `clip-path` and `overflow: hidden`. When a focusable element lives inside such a container, use a `::after` pseudo-element instead:

```css
.card:focus-visible {
  outline: none;
}
.card:focus-visible::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 2px solid var(--color-border-active);
  border-radius: var(--radius-lg); /* match the card's own radius */
  pointer-events: none;
  z-index: 100; /* above ProjectImage and any GPU-composited children */
}
```

The `::after` fills the element (`inset: 0`), its border is inside the element's own bounds (never clipped), and `z-index: 100` ensures it renders above all content including GPU-promoted layers.

A global `:focus-visible` outline in `globals.css` handles all other elements that are not in clipped containers:

```css
:focus-visible {
  outline: 2px solid var(--color-border-active);
  outline-offset: 3px;
}
```

### SVG `feGaussianBlur` — Safari performance

Safari re-rasterizes inline SVG elements with `feGaussianBlur` on CPU every time a sibling enters a new state (hover, active). This causes inter-card lag on hover.

**Fix**: load SVG gradient files via `<img src=".svg">` instead of inline JSX. The browser rasterizes the SVG once as a bitmap on load and caches it — no re-rasterization on state changes.

- Store SVG files in `public/images/projects/` (cards in `cards/`, banners in `banners/`)
- Render with `<img src="/path/gradient.svg" width="100%" height="100%" alt="" aria-hidden />`
- Filter IDs inside each file can be simplified to `id="blur"` since they're isolated per resource

This applies to both `ProjectImage` (card gradient) and `HeroBanner` (project page banner).

### Canvas DPR cap — blur performance

For canvas elements with CSS `filter: blur()`, cap `devicePixelRatio` at 1.5. At DPR=2 (Retina Mac), the canvas is 4× larger but the blur absorbs all the extra resolution — the visual result is identical while the render cost is 4× higher.

```ts
const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
```

Apply this wherever multiple canvases stack with blur filters (e.g. `HeroSection`). Going beyond 1.5 on blur-heavy canvases makes mouse tracking and animations sluggish on high-DPR screens.

### Image preloading for interactive components

When a component switches between multiple images (tabs, client selector, carousel), the first display of each image has network latency. Preload all images on mount:

```ts
useEffect(() => {
  ITEMS.forEach(item => {
    const img = new window.Image();
    img.src = item.imageSrc;
  });
}, []);
```

The browser fetches and caches all images immediately on mount, so every subsequent switch is instant from cache.

### Font scoping — avoid global preload warnings

If a font is only used by one component (e.g. a brand-showcase demo), load it via `next/font/google` inside that component's own file — not in the root `layout.tsx`. Apply the returned `.variable` class to that component's root element, not `<html>`. Loading fonts globally when they're only rendered on one page triggers "preloaded but not used" console warnings on every other route. Also: never leave an unused font weight in a `@font-face` rule or preload link — check `--font-weight-*` usage in `typography.module.css` before preloading a weight.

### Mobile line-wrap testing — devtools emulation is not ground truth

Chrome DevTools viewport emulation does **not** reliably reproduce real-device (Safari/WebKit) font rendering — the same text can wrap differently at an "identical" viewport width. Use devtools to explore candidate wordings quickly, but always confirm the final line-break result against a real screenshot from the actual device before considering a copy change done.

### French typography — non-breaking space before `: ; ! ?`

French copy needs a non-breaking space (U+00A0) before `:`, `;`, `!`, `?` to prevent the punctuation mark from wrapping alone onto the next line. Not needed in EN/ES.

### Internationalisation — ajouter une nouvelle langue

Le système i18n repose sur 5 points d'entrée. Pour ajouter une locale (ex. `pt` pour le portugais brésilien) :

1. **`src/dictionaries/<locale>.json`** — copier `fr.json`, traduire toutes les valeurs, garder les clés identiques.

2. **`src/lib/getDictionary.ts`** — ajouter la locale au type `Locale` et au map `dictionaries` :
   ```ts
   export type Locale = "fr" | "en" | "es" | "pt";
   const dictionaries = {
     ...
     pt: () => import("../dictionaries/pt.json").then((m) => m.default),
   };
   ```

3. **`src/app/[lang]/layout.tsx`** — ajouter la locale au tableau `LOCALES` :
   ```ts
   const LOCALES: Locale[] = ["fr", "en", "es", "pt"];
   ```

4. **`src/components/Navigation/Navigation.tsx`** — ajouter l'entrée dans `LANGUAGES` :
   ```ts
   const LANGUAGES = [
     { code: "FR", label: "Français" },
     { code: "EN", label: "English" },
     { code: "ES", label: "Español" },
     { code: "PT", label: "Português" },
   ];
   ```

5. **`src/proxy.ts`** — vérifier que la locale est incluse dans la liste de redirection initiale (si présente).

> Le segment `[lang]` dans l'URL gère le routage automatiquement. Chaque page sous `src/app/[lang]/` est déjà locale-agnostique — aucune modification des pages elles-mêmes n'est nécessaire.

### Apostrophe convention

`fr.json` and `en.json` consistently use the curly apostrophe (`'`, U+2019) throughout the file — never the straight apostrophe (`'`). `es.json` doesn't need this (no elision in Spanish). Follow this style for any new text added.

### Editing JSON dictionaries — indentation and invisible-character pitfall

Nested arrays (`features`, `items`, `layers`, `stats`) don't always share the same indentation from one block to another within the same file. If `Edit` fails with "String to replace not found" on a string that looks visually correct, re-read the exact region with `Read` (precise offset) instead of guessing the indentation — the mismatch is often 2 extra/missing spaces, or an invisible Unicode character (non-breaking space, curly apostrophe) that looks identical on screen but doesn't match byte-for-byte.

### Check consistency across languages, not just within each language

After successive edits to `fr.json`/`en.json`/`es.json`, the 3 versions of the same text can drift apart in meaning even if each one stays grammatically correct on its own (e.g. a term translated differently per language, a verb tense that changes). Re-read the 3 values of a given key side by side, not just each file in isolation.

### Metadata localisée — `generateMetadata`

Toutes les pages sous `src/app/[lang]/` utilisent `generateMetadata` (fonction async) plutôt que `export const metadata` (constante statique), afin de retourner une description dans la bonne langue.

Les descriptions sont stockées dans `dict.meta.*` dans chaque fichier de dictionnaire (`fr.json`, `en.json`, `es.json`).

```tsx
export async function generateMetadata({ params }: PageProps<"/[lang]/monprojet">): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return {
    title: "Mon Projet · Yohan Guyot",
    description: dict.meta.monprojet,
  };
}
```

Pour toute nouvelle page, ajouter la clé correspondante dans les trois dictionnaires sous `"meta": { ... }`.

> Ne jamais utiliser `export const metadata` sur une page `[lang]` — la description serait toujours en français quelle que soit la locale.

### SEO — metadata par page

Chaque page sous `src/app/[lang]/` doit inclure `alternates` (canonical + hreflang) et `openGraph` dans son `generateMetadata`.

Toujours importer `BASE_URL` et `LOCALES` depuis `@/lib/config` — ne jamais les redéclarer localement.

```tsx
import { BASE_URL, LOCALES } from "@/lib/config";

export async function generateMetadata({ params }: PageProps<"/[lang]/mapage">): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return {
    title: "Ma Page · Yohan Guyot",
    description: dict.meta.mapage,
    alternates: {
      canonical: `${BASE_URL}/${lang}/mapage`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE_URL}/${l}/mapage`])),
    },
    openGraph: {
      title: "Ma Page · Yohan Guyot",
      description: dict.meta.mapage,
      url: `${BASE_URL}/${lang}/mapage`,
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
  };
}
```

### `lang` attribute — `LangSetter`

Next.js ne permet pas de définir l'attribut `lang` sur `<html>` depuis un layout imbriqué. Le composant client `LangSetter` le fait dynamiquement :

```tsx
// src/components/LangSetter/LangSetter.tsx
"use client";
import { useEffect } from "react";
export default function LangSetter({ lang }: { lang: string }) {
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return null;
}
```

Il est monté dans `src/app/[lang]/layout.tsx` à côté des enfants de la page.

### `src/lib/config.ts` — constantes partagées

Source unique de vérité pour `BASE_URL` et `LOCALES`. À importer dans tout fichier qui en a besoin (pages, sitemap, robots, proxy) — ne jamais redéclarer ces valeurs localement.

```ts
export const BASE_URL = "https://yohanguyot.com";
export const LOCALES = ["fr", "en", "es"] as const;
```

### Dropdowns / floating UI

The `<nav>` has `transform: translateX(-50%)` for centering, which creates a new containing block and breaks `position: fixed` for descendants. Any floating panel that needs true viewport-relative positioning must use `ReactDOM.createPortal(panel, document.body)`.

Position pattern:
1. Render the panel via `createPortal` into `document.body`
2. Use `useLayoutEffect` to measure `panelRef.current.offsetWidth` and `triggerRef.current.getBoundingClientRect()` after the panel is in the DOM (before paint — no flash)
3. Re-measure after `document.fonts.ready` to handle the case where webfonts weren't loaded yet on first open
4. Re-measure on `window resize` for responsive correctness

### Opacity on CSS variables

Use `color-mix()` to apply opacity to a CSS custom property — never hardcode the raw hex + rgba:

```css
/* ✓ */
background: color-mix(in srgb, var(--color-brand-600) 40%, transparent);

/* ✗ — hardcodes the primitive, breaks if the token changes */
background: rgba(198, 83, 46, 0.40);
```

### User selection

`button`, `a`, and `[role="button"]` have `user-select: none` applied globally in `globals.css` — prevents accidental text selection on click or double-click:

```css
button, a, [role="button"] {
  -webkit-user-select: none;
  user-select: none;
}
```

Do not add it again per-component for standard elements. **Exception**: custom interactive elements rendered as `<div>` or other non-interactive tags (e.g. a card button rendered as `<div>`) must declare `user-select: none` themselves since they are not covered by the global rule.

### Text selection

Global brand selection color defined in `globals.css`:
```css
::selection {
  background: color-mix(in srgb, var(--color-brand-600) 40%, transparent);
  color: var(--color-neutral-50);
}
```

### Responsive navigation — dynamic breakpoint

**Never use a fixed `@media` width for the nav breakpoint.** The nav switches to mobile layout exactly when its natural content width would touch the viewport edges, measured via JS:

```tsx
// On mount (useLayoutEffect), measure the desktop nav's scrollWidth.
// Cache it as the threshold. On every resize, compare window.innerWidth < threshold.
// Apply a .navMobile CSS class to the <nav> element when mobile.
```

Key points:
- `scrollWidth` is measured **only when `isMobile === false`** (desktop mode); re-measuring in mobile mode gives wrong results because `.right` is hidden.
- Re-measure after `document.fonts.ready` to account for JetBrains Mono not yet loaded on first render.
- Close the mobile menu when switching back to desktop (`if (!mobile) setMobileOpen(false)`).

CSS uses descendant selectors inside the same CSS Module — both class names get the same hash scope:

```css
.navMobile { width: calc(100% - 48px); ... }
.navMobile .container { justify-content: space-between; ... }
.navMobile .right { display: none; }
.navMobile .hamburger { display: flex; }
```

### SVG icon morphing

For animated icon transitions (e.g. hamburger → X), use a custom inline SVG with CSS transforms — do **not** swap two separate Lucide icon components:

```css
.burgerLine {
  transition: transform var(--duration-fast) var(--ease), opacity var(--duration-fast) var(--ease);
  transform-box: fill-box;   /* required: origin relative to the element, not the SVG viewport */
  transform-origin: center;
}
.burgerLine1Open { transform: translateY(5px) rotate(45deg); }
.burgerLine2Open { opacity: 0; transform: scaleX(0.2); }
.burgerLine3Open { transform: translateY(-5px) rotate(-45deg); }
```

`transform-box: fill-box` is critical for SVG — without it `transform-origin: center` refers to the SVG viewport center, not the element's own bounding box.


### Responsive typography

Never modify `src/styles/typography.module.css` token sizes for responsive. Override `font-size` with `clamp()` in the component's own CSS Module:

```css
/* local override, token untouched */
.displayTitle {
  composes: display from '@/styles/typography.module.css';
  font-size: clamp(2.75rem, 12vw, 7rem);
}
```

Formula: `clamp(<min>, <fluid-vw>, <max>)`. Fluid value reaches max at ~1200px, min at ~320px.

### Text wrapping

All heading classes (`display`, `headingLg` to `headingXs`) include `text-wrap: balance`.
All body classes (`bodyLead`, `bodyMd`, `bodySm`, `bodyXs`) include `text-wrap: pretty`.
Global fallback in `globals.css` covers semantic `h1-h6` and `p` elements.
Do not add `text-wrap` again in component CSS.

### Full-screen sections

Use `min-height: 100dvh` for viewport-filling sections. `dvh` handles mobile browser chrome correctly. Never use `100vh` (ignores mobile UI chrome).

### Analytics — `trackEvent`

```ts
import { trackEvent } from "@/lib/analytics";
trackEvent("event_name", { key: "value" });
```

Wraps `window.gtag` — no-ops silently if GA isn't loaded (dev, ad-blocker). Call it on meaningful user interactions only:

| Event | Where |
|---|---|
| `project_click` | Clic sur une card projet → `{ project: "bloom" }` |
| `contact_submit` | Envoi du formulaire contact |
| `cta_click` | Clic sur un CTA principal → `{ label: "..." }` |

Don't track navigation, scroll, or hover — too noisy.

### API contact — `/api/contact`

Route POST qui envoie un email via Resend. Trois protections en place :

- **Rate limiting** — 3 requêtes par IP sur 10 minutes. Réponse `429` avec header `Retry-After` (secondes restantes). In-memory → se réinitialise sur cold start, suffisant pour un portfolio.
- **Validation** — email format + brief non vide, taille max sur chaque champ (nom/email/besoin : 200 chars, brief : 5 000 chars). Réponse `400` si invalide.
- **Échappement HTML** — tous les champs sont passés par `esc()` avant injection dans le template email (`&`, `<`, `>`, `"` échappés).

Côté front (`ContactSection`), trois états d'erreur distincts :

| État | Condition | Message |
|---|---|---|
| `errors.email` / `errors.brief` | Validation locale | Inline sous le champ |
| `rateLimited` | `res.status === 429` | `contact.form.rateLimited` (clé i18n) |
| `sendError` | Toute autre erreur serveur | `contact.form.sendError` + lien mailto |

### Traductions — `useDict`

Dans tout composant client, accéder au dictionnaire via le hook :

```tsx
import { useDict } from "@/lib/dict-context";

export default function MySection() {
  const dict = useDict();
  return <h2>{dict.mySection.heading}</h2>;
}
```

Le `DictProvider` est monté dans `src/app/[lang]/layout.tsx` — `useDict` est disponible partout sous `[lang]`. Le fallback est `fr.json` si le contexte est absent (ex. Storybook, tests).

Toute nouvelle clé ajoutée dans `fr.json` doit être traduite dans `en.json` et `es.json` (et toute autre locale active) avec la même structure.

### `forceHover` sur `<Button>`

Le composant `Button` accepte un prop `forceHover` pour synchroniser visuellement son état hover avec celui de son parent (ex. une card) :

```tsx
<a
  onMouseEnter={() => setHoveredSlug(proj.slug)}
  onMouseLeave={() => setHoveredSlug(null)}
>
  {/* ... */}
  <Button
    label={p.cta}
    type="text"
    showArrowRight
    forceHover={hoveredSlug === proj.slug}
  />
</a>
```

Utiliser ce pattern chaque fois qu'un bouton est imbriqué dans une card ou un lien cliquable — sans ça, le bouton ne réagit pas au hover de son parent.

---

## Tests

### Stack

- **Vitest** + **jsdom** — unit tests for browser animation utilities
- Config: `vitest.config.ts` at the repo root
- Setup file: `src/lib/__tests__/setup.ts` — stubs for `matchMedia`, `requestAnimationFrame`, and `IntersectionObserver`

```bash
npm run test        # single run
npm run test:watch  # watch mode
```

### Writing tests for animation utilities

All exports from `src/lib/animation.ts` are covered in `src/lib/__tests__/animation.test.ts`.

**Key patterns:**

**Fake timers** — use `vi.useFakeTimers()` / `vi.useRealTimers()` in `beforeEach`/`afterEach` for tests involving `setTimeout` (e.g. `revealEl` cleanup timer). Do **not** use fake timers in `observeFeatureCard` tests — they conflict with the Promise-based rAF stub.

**Flushing rAF** — the `requestAnimationFrame` stub resolves via `Promise.resolve()`. To flush two frames (as `afterLayout` requires):
```ts
await new Promise<void>(resolve =>
  requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
);
```

**Triggering IntersectionObserver** — the stub attaches itself to observed elements as `el.__io__`. Call `el.__io__.trigger(true)` to simulate intersection:
```ts
const io = (el as HTMLElement & { __io__: { trigger: (v: boolean) => void } }).__io__;
io.trigger(true);
```

**Disconnect tracking** — `MockIntersectionObserver` tracks `disconnected` state. `trigger()` is a no-op after `disconnect()`, which is how fire-once behavior is tested.
