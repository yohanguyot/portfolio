@AGENTS.md

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

For semi-transparent tokens: write `#HEX` with CSS opacity (`rgba()` or equivalent), no dedicated variable.

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
| `space/layout` | `space/120` | `120px` |

### Layout grid

- Full-width sections: `width: 100%`
- Centered content: `max-width: 1200px; margin-inline: auto;`
- Section vertical padding: `padding-block: 120px` (`space/layout`)

---

## Border Radius

| Semantic token | Primitive value | px |
|---|---|---|
| `radius/sm` | `radius/4` | `4px` |
| `radius/md` | `radius/6` | `6px` |
| `radius/lg` | `radius/12` | `12px` |
| `radius/xl` | `radius/24` | `24px` |
| `radius/2xl` | `radius/120` | `120px` |
| `radius/full` | `radius/full` | `9999px` |

---

## Effects & Animations

### Shadows / visual effects

- **Overlay blur**: `backdrop-filter: blur(24px)` — token `overlay-blur`
- **Button inner highlight**: `box-shadow: inset 0px 1px 0px 0px rgba(255,255,255,0.30)` — applied on all primary and secondary buttons (default and hover)
- **Primary button shadow**: `box-shadow: 0 0 0 1px #6C2E22, 0 3px 4px -1px #3A1510`
- **Secondary button shadow**: `box-shadow: 0 0 0 1px #09090B, 0 3px 4px -1px #09090B`


### Transitions

Two durations, same easing curve for all transitions:
- **Fast**: `200ms cubic-bezier(0.2, 0, 0, 1)`
- **Slow**: `300ms cubic-bezier(0.2, 0, 0, 1)`

---

## Components

### `button` — 3 types, 2 states

**Common properties:**
- Label: `label-md` (JetBrains Mono 13px Medium, uppercase, `color/btn/primary/text` or `secondary/text`)
- Vertical padding: `space/md` (16px)
- Horizontal padding: `space/lg` (24px)

**type=primary**
- `default`: `color/btn/primary/bg`, `border-radius: radius/full`, primary shadows, inset highlight
- `hover`: add `linear-gradient(rgba(0,0,0,0.12), rgba(0,0,0,0.12))` as the first `background-image` layer

**type=secondary**
- `default`: `color/btn/secondary/bg`, `border-radius: radius/full`, secondary shadows, inset highlight
- `hover`: add `linear-gradient(rgba(0,0,0,0.12), rgba(0,0,0,0.12))` as the first `background-image` layer

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
- Height: `40px`, width: `70px`

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
