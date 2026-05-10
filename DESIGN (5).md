# Design System Inspired by Sprrrint

## 1. Visual Theme & Atmosphere

Sprrrint embodies a modern, efficiency-focused design language that balances minimalist clarity with vibrant energy. The system prioritizes speed and accessibility for creative professionals, featuring a predominantly neutral foundation anchored by bold blacks and whites, with strategic bursts of electric blue to highlight primary actions and draw attention. The atmosphere is contemporary and professional yet playful—designed to inspire creativity while maintaining functional precision. Clean typography, generous whitespace, and purposeful color restraint create a premium feel that doesn't overwhelm users navigating a library of templates and components.

**Key Characteristics**
- **Minimalist-first approach** with high contrast for clarity
- **Electric blue accents** for CTAs and interactive highlights
- **Bold, confident typography** using geometric sans-serif fonts
- **Ample whitespace** supporting visual hierarchy and focus
- **Fast, purposeful interactions** with subtle feedback
- **Premium aesthetic** paired with accessibility and speed

## 2. Color Palette & Roles

### Primary
- **Primary Blue** (`#0000EE`): Primary call-to-action buttons, links, and interactive emphasis; most frequently used accent throughout the interface
- **Deep Ink** (`#1B1C1E`): Primary text, headlines, and high-contrast foreground elements; near-black for maximum readability

### Accent Colors
- **Sky Blue** (`#0099FF`): Secondary interactive states, hover effects, and supporting visual cues
- **Cobalt** (`#0057FF`): Tertiary accent and alternative interaction states

### Interactive
- **Charcoal Button** (`#333333`): Secondary button backgrounds; mid-tone interactive surfaces
- **Medium Gray** (`#666666`): Disabled states, secondary text, and de-emphasized content

### Neutral Scale
- **Pure Black** (`#000000`): Primary text color and borders; dominant UI element
- **Pure White** (`#FFFFFF`): Primary backgrounds and surface containers
- **Off-White** (`#FAFAFA`): Subtle background differentiation and card surfaces
- **Light Gray** (`#F5F5F5`): Secondary backgrounds and section dividers
- **Pale Gray** (`#F2F2F2`): Tertiary background surfaces

### Surface & Borders
- **Light Border** (`#A6A6A6`): Subtle dividers and secondary borders

## 3. Typography Rules

### Font Family
**Primary:** Euclid Circular B (SemiBold, Medium weights)
- Fallback stack: `'Euclid Circular B', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

**Secondary:** Sans-serif system stack
- Fallback stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / H1 | Euclid Circular B | 59px | 400 | 59px | 0px | Hero headlines and page titles |
| Heading / H2 | Euclid Circular B | 29px | 400 | 34.8px | 0px | Section headings and major divisions |
| Subheading / H5 | Euclid Circular B Medium | 14px | 400 | 21px | 0px | Subsection labels and emphasis |
| Body Text | Euclid Circular B Medium | 16px | 400 | 16px | 0px | Paragraph content and descriptions |
| Link Text | Euclid Circular B Medium | 16px | 400 | 16px | 0px | Navigation links and inline actions |
| Secondary Link | Sans-serif | 12px | 400 | normal | 0px | Footer links and supplementary navigation |
| Button Label | Sans-serif | 12px | 400 | normal | 0px | All button text |
| Caption / Meta | Euclid Circular B Medium | 14px | 400 | 21px | 0px | Supporting text and metadata |

### Principles
- **Geometric clarity:** Euclid Circular B's rounded proportions balance modern tech aesthetics with human warmth
- **Weight restraint:** Predominantly 400 (regular) weight maintains legibility without heaviness
- **Line height generosity:** Spacing between lines ensures comfortable reading and visual breathing room
- **Size progression:** Hierarchy jumps ensure clear visual differentiation without overwhelming variation
- **Contrast-driven:** Black text on white backgrounds and white text on dark backgrounds maximize readability

## 4. Component Stylings

### Buttons

**Primary Button (Solid Dark)**
- Background: `#1B1C1E`
- Text Color: `#000000`
- Font: `sans-serif`, `12px`, weight `400`
- Padding: `0px 20px`
- Height: `51px`
- Width: `290px`
- Border Radius: `14px`
- Border: `none`
- Box Shadow: `none`
- Line Height: `normal`
- Hover State: Darken background to `#0A0A0B`, increase text contrast

**Secondary Button (Rounded Icon)**
- Background: `transparent`
- Text Color: `#000000`
- Font: `sans-serif`, `12px`, weight `400`
- Padding: `0px`
- Height: `48px`
- Width: `48px`
- Border Radius: `24px 24px 44px 74px`
- Border: `none`
- Box Shadow: `none`
- Line Height: `normal`
- Hover State: Add background overlay `rgba(0, 0, 0, 0.1)`

**Tertiary Button (Medium Charcoal)**
- Background: `#333333`
- Text Color: `#000000`
- Font: `sans-serif`, `12px`, weight `400`
- Padding: `0px`
- Height: `53px`
- Width: `149px`
- Border Radius: `10px`
- Border: `none`
- Box Shadow: `none`
- Line Height: `normal`
- Hover State: Lighten background to `#4A4A4A`

### Cards & Containers

**Default Card**
- Background: `#FFFFFF`
- Border: `1px solid #F5F5F5`
- Border Radius: `8px`
- Padding: `24px`
- Box Shadow: `none`
- Hover State: Background shifts to `#FAFAFA`, subtle lift effect with `0px 4px 16px rgba(0, 0, 0, 0.08)`

**Featured Container**
- Background: `#F5F5F5`
- Border: `none`
- Border Radius: `8px`
- Padding: `40px`
- Box Shadow: `none`

### Inputs & Forms

**Text Input (Standard)**
- Background: `transparent`
- Text Color: `#1B1C1E`
- Font: `Euclid Circular B Medium`, `14px`, weight `400`
- Padding: `12px`
- Height: `51px`
- Width: `290px`
- Border: `none`
- Border Radius: `0px`
- Box Shadow: `none`
- Line Height: `16.8px`
- Focus State: Add bottom border `2px solid #0000EE`, shadow `0px 2px 8px rgba(0, 0, 238, 0.12)`
- Placeholder Text: `#A6A6A6`

**Textarea (Expanded Input)**
- Background: `transparent`
- Text Color: `#1B1C1E`
- Font: `Euclid Circular B Medium`, `14px`, weight `400`
- Padding: `12px`
- Height: `110px`
- Width: `290px`
- Border: `none`
- Border Radius: `0px`
- Box Shadow: `none`
- Line Height: `16.8px`
- Focus State: Add bottom border `2px solid #0000EE`, shadow `0px 2px 8px rgba(0, 0, 238, 0.12)`

### Navigation

**Header Navigation**
- Background: `#FFFFFF`
- Text Color: `#000000`
- Font: `sans-serif`, `12px`, weight `400`
- Padding: `0px 24px`
- Height: `75px`
- Border: `none`
- Border Radius: `0px`
- Box Shadow: `none`
- Line Height: `normal`
- Active Link: Text color shifts to `#0000EE`, bottom border `2px solid #0000EE`
- Hover State: Text color lightens to `#666666`

### Links

**Primary Link (Body)**
- Background: `transparent`
- Text Color: `#000000`
- Font: `Euclid Circular B Medium`, `16px`, weight `400`
- Padding: `0px`
- Height: `auto`
- Border: `none`
- Border Radius: `0px`
- Box Shadow: `none`
- Line Height: `16px`
- Hover State: Text color shifts to `#0000EE`, text-decoration underline
- Visited State: Text color shifts to `#666666`

**Secondary Link (Navigation)**
- Background: `transparent`
- Text Color: `#000000`
- Font: `sans-serif`, `12px`, weight `400`
- Padding: `0px`
- Height: `28px`
- Width: `78px`
- Border: `none`
- Border Radius: `0px`
- Box Shadow: `none`
- Line Height: `normal`
- Hover State: Text color shifts to `#0099FF`

**Tertiary Link (Caption)**
- Background: `transparent`
- Text Color: `#000000`
- Font: `Euclid Circular B Medium`, `14px`, weight `400`
- Padding: `0px`
- Height: `auto`
- Border: `none`
- Border Radius: `0px`
- Box Shadow: `none`
- Line Height: `21px`
- Hover State: Text color shifts to `#0000EE`, opacity increases to `0.8`

## 5. Layout Principles

### Spacing System

**Base Unit:** `8px`

**Scale:**
- `4px` — micro padding for tight internal spacing in small components
- `8px` — gap between closely related elements, compact component padding
- `12px` — standard gap for form inputs and small card padding
- `16px` — default gap for general content separation and rhythm
- `20px` — medium padding for buttons and moderate component spacing
- `24px` — standard padding for cards and section spacing
- `28px` — large gap for visual breaks between sections
- `32px` — extra-large padding for major section containers
- `36px` — prominent padding for featured content areas
- `40px` — hero section and large container padding
- `52px` — spacing between major page sections
- `60px` — top-level section separation and page-level spacing

**Usage Context:**
- Form inputs: `12px` internal padding
- Buttons: `20px` horizontal, `0px` vertical (height managed separately)
- Cards: `24px` standard, `40px` featured sections
- Section gaps: `28px`–`60px` based on importance

### Grid & Container

**Max Width:** `1440px` (full viewport width at desktop)

**Column Strategy:** Flexible responsive grid adapting from single column (mobile) to multi-column (tablet/desktop). Primary content container uses centered alignment with symmetric side padding.

**Section Patterns:**
- Full-width hero: `100%` width, `40px`–`60px` vertical padding
- Content container: max-width `1200px`, centered with `24px` side margins on tablet, `40px` on desktop
- Feature sections: Two-column layout on desktop (50% + 50%), stacked on mobile

### Whitespace Philosophy

Sprrrint prioritizes generous whitespace to reduce cognitive load and elevate the perception of premium quality. Spacing between major sections (`52px`–`60px`) creates breathing room and allows users to process information in digestible chunks. Content padding (`24px`–`40px`) ensures internal elements don't feel cramped. This approach supports both readability and the system's minimalist aesthetic.

### Border Radius Scale

- `0px` — form inputs and structural elements requiring sharp edges
- `8px` — standard radius for cards, images, and containers
- `10px` — medium radius for secondary buttons and moderately rounded surfaces
- `13px` — image styling with subtle rounding
- `14px` — primary buttons and interactive elements
- `17px` — image styling with increased prominence
- `24px 24px 44px 74px` — organic, irregular radius for icon buttons and playful surfaces

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | No shadow, `box-shadow: none` | Default text, flat buttons, borders-only components |
| Hover (Subtle) | `0px 2px 8px rgba(0, 0, 0, 0.08)` | Card hover states, interactive surfaces on interaction |
| Elevated | `0px 4px 16px rgba(0, 0, 0, 0.1)` | Modals, dropdowns, floating elements |
| High Elevation | `0px 8px 32px rgba(0, 0, 0, 0.15)` | Featured overlays, stacked modals, maximum prominence |

**Shadow Philosophy:** Sprrrint uses restraint with shadows, preferring flat design and color contrast over depth perception. Shadows emerge subtly on interaction to signal state change rather than establish permanent hierarchy. This maintains the system's clean, contemporary aesthetic while providing tactile feedback when needed.

## 7. Do's and Don'ts

### Do
- **Prioritize contrast:** Use `#000000` on `#FFFFFF` and vice versa for maximum legibility
- **Apply electric blue (`#0000EE`) strategically:** Reserve for primary CTAs and essential interactive states to maintain emphasis
- **Maintain consistent spacing:** Use the `8px` scale grid rigidly—every spacing value should be a multiple of `8px`
- **Leverage typography hierarchy:** Respect the established sizes and weights; don't create intermediate sizes
- **Provide clear hover states:** Always indicate interactivity with color shift, underline, or shadow addition
- **Use geometric borders:** Apply `14px` radius to buttons, `8px` to cards, maintaining visual consistency
- **Stack whitespace intentionally:** Build content rhythm with `28px`–`60px` gaps between sections
- **Test readability on small screens:** Form inputs and buttons must maintain `48px` minimum touch target height

### Don't
- **Mix Euclid Circular B with other typefaces** in the same content block—maintain font consistency or clearly segment by role
- **Apply shadows to flat elements** without interaction—use color and position instead
- **Exceed `#0000EE` opacity:** Reduce to `0.8` for secondary states, never increase
- **Reduce button padding below `12px`:** Maintain minimum `48px` height for touch accessibility
- **Use more than two font weights** (400 regular and optional bold) in standard UI
- **Place text directly on color backgrounds** without sufficient contrast ratio (minimum 4.5:1 WCAG AA)
- **Add gradients or textures** that conflict with the minimalist aesthetic
- **Nest too many z-index levels:** Keep modal/dropdown hierarchy to three levels maximum
- **Override border-radius values:** Use only the specified scale (0, 8, 10, 13, 14, 17, organic custom)

## 8. Responsive Behavior

### Breakpoints

| Breakpoint Name | Width | Key Changes |
|-----------------|-------|-------------|
| Mobile | `< 640px` | Single-column layout, full-width buttons (`290px` constrained to container), `12px` section padding, touch-friendly `48px` minimum button height |
| Tablet | `640px`–`1024px` | Two-column grids, button width shifts to `200px`–`240px`, `20px` section padding, increased card size |
| Desktop | `> 1024px` | Multi-column layouts, button width `290px`, `40px` section padding, full feature richness enabled |

### Touch Targets

- **Minimum touch size:** `48px × 48px` for all interactive elements (buttons, links, inputs)
- **Comfortable spacing:** `16px` minimum gap between adjacent touch targets
- **Form input height:** `51px` maintained across all breakpoints for easy interaction
- **Button width on mobile:** Constrained to `90%` of viewport minus `20px` padding (typically `290px` container)

### Collapsing Strategy

- **Typography:** Font sizes remain constant across breakpoints; line-height compression only when necessary below `640px`
- **Navigation:** Horizontal menu collapses to hamburger (three-line icon) below `640px`; navigation items stack vertically in overlay menu
- **Cards:** Two-column grid on desktop collapses to single column on tablet (`640px`), maintains single column on mobile
- **Spacing:** Vertical padding reduces by `33%` below `768px` (e.g., `40px` → `24px`, `28px` → `16px`)
- **Images:** Featured images scale to `100%` width with max-width cap to maintain aspect ratio
- **Feature sections:** Hero text centers and scales down; button width becomes full-width below `640px`

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA:** Primary Blue (`#0000EE`)
- **Primary Text:** Deep Ink (`#1B1C1E`)
- **Button (Secondary):** Charcoal (`#333333`)
- **Background:** Pure White (`#FFFFFF`)
- **Accent Hover:** Sky Blue (`#0099FF`)
- **Disabled/Secondary Text:** Medium Gray (`#666666`)
- **Card Backgrounds:** Off-White (`#FAFAFA`) or Light Gray (`#F5F5F5`)
- **Borders:** Light Border (`#A6A6A6`) or Pure Black (`#000000`) for contrast
- **Heading Text:** Pure Black (`#000000`) or Deep Ink (`#1B1C1E`)

### Iteration Guide

1. **Start with pure black (`#000000`) text on pure white (`#FFFFFF`) backgrounds** — this is the default; override only for interactive states or de-emphasized content.

2. **Reserve electric blue (`#0000EE`) exclusively for primary CTAs, active navigation states, and focus indicators** — every instance of this color signals "interact here."

3. **Apply the `8px` spacing scale rigidly** — measure all gaps, padding, and margins in multiples of `8px` (4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 52, 60).

4. **Use Euclid Circular B Medium (400 weight) for body text, links, and metadata** — maintain this font family as the primary typographic voice; fall back to system sans-serif only for button labels and secondary UI text.

5. **Set all buttons to minimum `48px` height with at least `20px` horizontal padding** — maintain accessibility and touch-friendliness regardless of button classification.

6. **Apply border-radius from the specified scale only** (0, 8, 10, 13, 14, 17, or organic `24px 24px 44px 74px` for icon buttons) — do not invent intermediate values.

7. **Indicate hover states with color shift, shadow addition, or opacity change** — never apply only position or scale transformation; provide visual feedback confirming interactivity.

8. **Keep form inputs borderless with a bottom-border focus indicator** — maintain the clean aesthetic while providing clear focus states via `2px solid #0000EE` underline and shadow.

9. **Establish section hierarchy through spacing and color, not shadow depth** — use `52px`–`60px` gaps between major sections and background color shifts (`#FAFAFA`, `#F5F5F5`) to create visual breaks.

10. **Validate all text contrast ratios** — ensure minimum 4.5:1 WCAG AA compliance; pure black on pure white exceeds this; verify custom color combinations before deployment.