---
name: First Heritage Financial
colors:
  surface: '#fcf8ff'
  surface-dim: '#dad7f6'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f2ff'
  surface-container: '#efebff'
  surface-container-high: '#e9e5ff'
  surface-container-highest: '#e3dffe'
  on-surface: '#1a192f'
  on-surface-variant: '#594140'
  inverse-surface: '#2f2e45'
  inverse-on-surface: '#f2eeff'
  outline: '#8d706f'
  outline-variant: '#e0bfbd'
  surface-tint: '#b02c33'
  primary: '#7a0014'
  on-primary: '#ffffff'
  primary-container: '#9d1d27'
  on-primary-container: '#ffafac'
  inverse-primary: '#ffb3b0'
  secondary: '#994703'
  on-secondary: '#ffffff'
  secondary-container: '#fc934f'
  on-secondary-container: '#6d3000'
  tertiary: '#003e5d'
  on-tertiary: '#ffffff'
  tertiary-container: '#00567f'
  on-tertiary-container: '#86cbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad8'
  primary-fixed-dim: '#ffb3b0'
  on-primary-fixed: '#410006'
  on-primary-fixed-variant: '#8e101e'
  secondary-fixed: '#ffdbc9'
  secondary-fixed-dim: '#ffb68c'
  on-secondary-fixed: '#321200'
  on-secondary-fixed-variant: '#753400'
  tertiary-fixed: '#cae6ff'
  tertiary-fixed-dim: '#8ccdff'
  on-tertiary-fixed: '#001e30'
  on-tertiary-fixed-variant: '#004b70'
  background: '#fcf8ff'
  on-background: '#1a192f'
  surface-variant: '#e3dffe'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.005em
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.03em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system channels an authoritative, secure, and human-centric digital banking experience. Crafted for retail customers, wealth management clients, and modern commercial banking users, the interface projects trust, fiscal clarity, and premium accessibility.

The aesthetic philosophy balances **Corporate Modernism** with **Tailored Financial Polish**:
- **Structured Precision**: High typographic density balanced by generous whitespace prevents visual fatigue while accommodating dense transactional tables and account ledgers.
- **Subtle Warmth**: A foundation of deep burgundy anchored by radiant warm amber accents steers the interface away from cold corporate austerity into an inviting, high-touch relationship space.
- **Architectural Clarity**: Flat white surfaces layered with crisp, hairline borders and diffused ambient lighting create distinct physical cards that mirror physical cards, statements, and financial instruments.

## Colors

The palette is anchored by the heritage burgundy `#9D1D27`, delivering visual gravity and institutional credibility across primary actions, top-level navigation, and prominent branding moments. 

- **Primary (`#9D1D27`)**: Governs core interactive drivers—primary buttons, key indicator highlights, active tab states, and brand framing elements.
- **Secondary (`#D97736`)**: A rich, warm amber designed for secondary alerts, rewards tiers, interest rate callouts, and conversion nudges without triggering warning fatigue.
- **Tertiary (`#227BAE`)**: A calm, analytical blue used for informational banners, link navigation, data visualizations, and wealth-tracking metrics.
- **Neutral (`#25243B`)**: A deep slate-navy used for typography, icons, and base canvas backgrounds in dark variations, delivering superior contrast and legibility over standard charcoal blacks.

Surface layering utilizes crisp optical whites (`#FFFFFF`) with neutral off-white foundations (`#F8F9FB` and `#F1F3F6`) for background canvas segregation.

## Typography

The type system is powered entirely by **Inter**, leveraging its tall x-height, neutral geometric forms, and open apertures to ensure absolute legibility across micro-copy, tabular transaction values, and high-impact account summaries.

- **Numerics & Financials**: All account balances, interest rates, and financial metrics must use the `tnum` (tabular figures) OpenType feature to ensure columnar alignment in statements and data grids.
- **Headlines**: Weighted primarily in Bold (700) and Semi-Bold (600) with slight negative tracking to deliver presence and institutional structure.
- **Labels & Overlines**: Scaled down with medium or semi-bold weights and slight positive tracking to ensure readability on micro-surfaces, chip badges, and card status flags.

## Layout & Spacing

The architecture operates on an 8pt base grid with a 12-column responsive fluid grid framework:
- **Desktop (>=1200px)**: 12 columns, max-width `1280px` centered canvas, `gutter: 1.5rem`, `margin: 2rem`.
- **Tablet (768px - 1199px)**: 8 columns, `gutter: 1.25rem`, `margin: 1.5rem`.
- **Mobile (<768px)**: 4 columns, `gutter-mobile: 1rem`, `margin-mobile: 1rem`.

Component spacing enforces rigorous discipline:
- `space-xs` (4px) and `space-sm` (8px) govern tight pairings such as currency symbols to amounts, inline badges, and form label-to-input gaps.
- `space-md` (16px) establishes internal padding for smaller list items and standard component clusters.
- `space-lg` (24px) dictates default internal padding across content cards, account dashboard widgets, and form groups.
- `space-xl` (40px) demarcates vertical section rhythms and major functional blocks.

## Elevation & Depth

Visual hierarchy is engineered through **Tonal Layers** combined with **Ambient Shadows** and **Low-Contrast Hairline Outlines**, producing an impeccably clean, tactile environment without visual noise:

1. **Ground Canvas**: Solid neutral-tinted off-white (`#F8F9FB`) sets an architectural canvas behind foreground cards.
2. **Level 0 (Flat Container)**: Pure white (`#FFFFFF`) bound by a 1px structural stroke (`#E5E7EB` or `#25243B` at 8% opacity). Used for secondary data panels and static summaries.
3. **Level 1 (Card & Module Surface)**: Pure white (`#FFFFFF`) with a micro-border and an ambient diffused drop-shadow: `0 2px 8px -2px rgba(37, 36, 59, 0.05), 0 1px 3px 0 rgba(37, 36, 59, 0.03)`.
4. **Level 2 (Interactive Floating & Hover)**: Slightly raised state for actionable product cards and active ledger items: `0 10px 20px -5px rgba(37, 36, 59, 0.08), 0 4px 6px -2px rgba(37, 36, 59, 0.04)`.
5. **Level 3 (Overlays & Modals)**: Floating dialogs, transaction authentication prompts, and sliding trays: `0 20px 30px -10px rgba(37, 36, 59, 0.16), 0 8px 10px -4px rgba(37, 36, 59, 0.06)`. Backdrops use a 35% `#25243B` tint with an 8px blur.

## Shapes

The design system adopts a **Soft (`1`)** shape language, applying an intentional `0.25rem` (4px) to `0.5rem` (8px) radius to reflect institutional stability, geometric precision, and modern software ergonomics:

- **Inputs, Buttons, and Chips**: Standardized at `0.25rem` (4px) to `0.375rem` (6px) for a crisp, engineered edge.
- **Card Containers and Modals**: Set to `rounded-lg` (`0.5rem` / 8px) to soften larger surface areas while preserving structural lines.
- **Badges and Status Pills**: Pill-shaped (`rounded-full` / 9999px) strictly reserved for small contextual indicator tags (e.g., "Active", "Pending", "Verified", "Pre-approved").

## Components

### Buttons
- **Primary**: Deep burgundy (`#9D1D27`) solid background, pure white text, 40px height (`py-2.5 px-5`), font weight 600, radius `0.25rem`. Hover transitions to `#82151D`. Focused states include a 2px offset ring in `#9D1D27`.
- **Secondary**: Pure white container with a 1.5px border in `#9D1D27`, burgundy text. Hover initiates a 4% burgundy background wash.
- **Tertiary/Ghost**: Transparent background with neutral navy (`#25243B`) or primary burgundy text.
- **Accent/Promotional**: Solid amber (`#D97736`) with white text, deployed exclusively for conversion triggers and credit card rewards actions.

### Cards & Modules
- Pure white background, 1px border in `#E8EAED`, `rounded-lg` (8px), padding `space-lg` (24px).
- Balance cards feature an optional top accent line (3px height) colored in primary burgundy or accent amber to define account categories (e.g., Savings, Investment, Loan).

### Input Fields & Controls
- **Inputs**: Height 44px, background `#FFFFFF`, border 1px `#D1D5DB`, radius `0.25rem`, typography `body-md`. Focus state shifts the border to `#9D1D27` with a subtle `0 0 0 3px rgba(157, 29, 39, 0.12)` glow.
- **Checkboxes & Radios**: 18px size, 1.5px border `#9D1D27`. Checked state fills with `#9D1D27` with a white checkmark/dot.

### Chips & Badges
- **Status Badges**: Fully rounded (`rounded-full`), height 24px, horizontal padding `10px`, font size `label-md`. Backgrounds use subtle 10% opacity tints of the status color (e.g., green for completed, amber `#D97736` for pending, red `#9D1D27` for failed).
- **Filter Chips**: Light gray fill (`#F1F3F6`), 1px neutral border, text `#25243B`. Active state shifts to `#9D1D27` fill with white text.

### Lists & Ledger Rows
- High-density transaction rows with subtle border-bottom dividers (`1px solid #F1F3F6`).
- Hover shifts row background to `#FAFAFB`.
- Tabular figures utilized for dates and currency amounts, with negative amounts indicated in neutral text with minus symbols and incoming transfers signaled in muted forest green.