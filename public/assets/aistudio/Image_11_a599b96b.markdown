---
name: Editorial Obsidian
colors:
  surface: '#121316'
  surface-dim: '#121316'
  surface-bright: '#38393c'
  surface-container-lowest: '#0d0e11'
  surface-container-low: '#1b1b1f'
  surface-container: '#1f1f23'
  surface-container-high: '#292a2d'
  surface-container-highest: '#343538'
  on-surface: '#e3e2e6'
  on-surface-variant: '#d8c3ad'
  inverse-surface: '#e3e2e6'
  inverse-on-surface: '#2f3034'
  outline: '#a18d7a'
  outline-variant: '#534434'
  surface-tint: '#ffb961'
  primary: '#ffbe70'
  on-primary: '#472a00'
  primary-container: '#f39c12'
  on-primary-container: '#603a00'
  inverse-primary: '#865300'
  secondary: '#c0c1ff'
  on-secondary: '#1000a9'
  secondary-container: '#3131c0'
  on-secondary-container: '#b0b2ff'
  tertiary: '#fac082'
  on-tertiary: '#482900'
  tertiary-container: '#dba569'
  on-tertiary-container: '#603a06'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffddb9'
  primary-fixed-dim: '#ffb961'
  on-primary-fixed: '#2b1700'
  on-primary-fixed-variant: '#663e00'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2f2ebe'
  tertiary-fixed: '#ffddbb'
  tertiary-fixed-dim: '#f5bc7e'
  on-tertiary-fixed: '#2b1700'
  on-tertiary-fixed-variant: '#653e0b'
  background: '#121316'
  on-background: '#e3e2e6'
  surface-variant: '#343538'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '600'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '500'
    lineHeight: 48px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
    letterSpacing: 0em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 2rem
  margin-sm: 1rem
  margin-lg: 4rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system balances the tactile prestige of high-end literary bookbinding with the fluid utility of a high-performance modern digital marketplace. Built for discerning readers, independent authors, and boutique publishers, the platform evokes quiet sophistication, intellectual focus, and effortless craftsmanship.

The visual direction merges **Minimalist Modernism** with **Contemporary Editorial Luxury**:
- Expansive, rhythmic whitespace that mirrors physical broadsheet margins and luxury print layouts.
- Dynamic interplay between classical editorial serif display weights and razor-sharp, functional grotesque sans-serifs for interface utilities.
- Restrained tactile cues: velvet matte surfaces, micro-delicate borders, and focused ambient glows rather than aggressive drop shadows.

## Colors
The palette bridges classic hot-metal typesetting tones with a sleek digital dark mode.

- **Primary (`#F39C12` - Literary Amber):** Evokes aged gold foil, reading lamps, and warm highlights. Used selectively for critical CTAs, active reading progress states, premium badges, and subtle edge lighting.
- **Secondary (`#6366F1` - Midnight Indigo):** Serves as an atmospheric accent for digital metadata, file parsing indicators, and deep ambient vignettes.
- **Tertiary (`#E0A96D` - Parchment Ochre):** Applied to secondary highlights, author notes, and tactile annotation states.
- **Neutral (`#121316` - Deep Obsidian):** A calibrated black-slate base that prevents pure `#000000` eye strain while delivering velvety contrast for typography.

### Light Mode Harmony (Cream & Alabaster)
When switched to light mode, surfaces resolve into warm archival parchment (`#FDFBF7`) with soft ivory containers (`#F4EFE6`), contrasting against warm sumi-ink typography (`#1A1816`) to maintain the tactile sensation of heavy-stock vellum paper.

## Typography
The system employs an authoritative editorial pairing:
- **Playfair Display** provides literary gravity, expressive ligatures, and artisanal distinction across all hero banners, collection headers, document titles, and pull quotes.
- **Plus Jakarta Sans** grounds the reading experience with clarity, wide apertures, and geometric precision across body copy, price tables, filters, checkout workflows, and navigation.

All titles scale down smoothly on mobile devices via dedicated tokens to ensure title line wraps remain balanced without harsh breaks.

## Layout & Spacing
The layout model employs a 12-column responsive fluid grid anchored by strict editorial proportions.

- **Breakpoints:**
  - `Mobile (320px – 639px)`: 4 columns, `margin-sm` (1rem), `gutter-sm` (1rem). Single-column book feeds, full-bleed preview sheets.
  - `Tablet (640px – 1023px)`: 8 columns, `margin` (2rem), `gutter` (1.5rem). 2-to-3 column publication grids; split modal overlays.
  - `Desktop (1024px+)`: 12 columns, `margin-lg` (4rem), `gutter-lg` (2rem). Maximum content bounding container of 1440px for comfortable panoramic browsing.

## Elevation & Depth
Depth is constructed through subtle tonal transitions, tinted ambient lights, and micro-delicate borders rather than opaque structural drop shadows.

- **Level 0 (Canvas):** Pure `#121316` deep neutral base.
- **Level 1 (Surface Cards & Shelves):** `#181A1F` with a `1px` translucent border (`rgba(255, 255, 255, 0.07)` in dark; `rgba(0, 0, 0, 0.05)` in light).
- **Level 2 (Floating Sheets & Drawers):** `#1F2229` backed by a `backdrop-filter: blur(16px)` and a diffused ambient amber/indigo glow (`box-shadow: 0 16px 40px -8px rgba(0, 0, 0, 0.6), 0 0 24px -4px rgba(243, 156, 18, 0.06)`).
- **Level 3 (Modals & Focus Overlays):** `#242830` layered over a deep smoked scrim (`rgba(10, 10, 12, 0.75)`).
- **Interactive 3D Hover Tilt:** Book jacket cards utilize a subtle perspective tilt (`perspective: 1000px`, `rotateX(2deg) rotateY(-2deg) translateY(-4px)`) paired with an amplified rim highlight along the spine edge.

## Shapes
The shape system applies a soft, tailored geometry (`roundedness: 1`). 

- Standard inputs, buttons, and book cards utilize `0.25rem` (4px) radii, echoing the crisp, precision-cut corners of bound book blocks and linen boards.
- Floating drawers, checkout modals, and contextual menus scale to `rounded-lg` (0.5rem / 8px).
- Status tags and author avatars use controlled full-radius pills only when denoting dynamic state or personal identity.

## Components

### Buttons
- **Primary:** Filled Literary Amber (`#F39C12`) with contrasting deep charcoal text (`#121316`), bold weight, with an instantaneous subtle warm perimeter bloom on hover.
- **Secondary / Ghost:** Transparent background enclosed by a 1px border (`rgba(255, 255, 255, 0.15)`), shifting to an amber border and translucent fill on hover.
- **Micro-Action:** Monospaced icon triggers styled without outlines until focused.

### Book Cards & Marketplace Tiles
- Minimal vertical ratio frames (3:4 or 1:1.414 aspect ratios matching standard trade paperbacks).
- Spine effect: 1px left inner gradient mimicking a physical spine crease.
- Hover state: 3D perspective tilt with an expanded soft ambient indigo halo behind the book cover art.

### Drag-and-Drop File Uploaders (Manuscript Ingestion)
- Subtle dashed borders (`1.5px dashed rgba(243, 156, 18, 0.3)`).
- Interior area features a gentle radial gradient indicating drop targets (EPUB, PDF, Markdown).
- Active drag-over state shifts border to solid amber with an animated indeterminate breathing pulse.

### Preview & Checkout Drawers
- Smooth slide-over sheets anchored to the right viewport margin (480px width on desktop; 100vw on mobile).
- Backdrop blur glass morphism styling (`blur(20px)`), with section separators rendered as 1px hairline rules.
- Fast, accessible chapter preview toggles with instant font-size adjustment and theme overrides.

### Inputs & Search Bars
- Understated architectural inputs featuring an inset dark field (`#16181D`) with subtle inner borders.
- Active focus state transitions the lower border to a glowing amber underline with zero jarring layout shifts.

### Chips & Filter Tags
- Compact editorial tags using `label-md` typography.
- Inactive: Frosted translucent surface with muted ivory text.
- Selected: Solid parchment or dark slate fill accented with a primary amber pip indicator.