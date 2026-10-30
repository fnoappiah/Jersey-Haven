---
name: Jersey Haven
description: A Ghana-focused shop for national team, club team, and retro football shirts.
colors:
  paper: "#edf2db"
  paper-deep: "#dfe7cc"
  ink: "#17221b"
  green: "#12382b"
  green-light: "#214f3e"
  orange: "#ff6840"
  yellow: "#f4c944"
  line: "rgba(23, 34, 27, .2)"
  muted: "#526157"
  error: "#9f321c"
typography:
  display:
    fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif"
    fontWeight: 800
    letterSpacing: "-.048em"
  body:
    fontFamily: "'Public Sans', Arial, sans-serif"
    fontWeight: 400
rounded:
  circle: "50%"
  square: "0"
spacing:
  4: "4px"
  6: "6px"
  8: "8px"
  12: "12px"
  18: "18px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.paper}"
    rounded: "{rounded.square}"
    padding: "0 18px"
    height: "52px"
  button-accent:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "0 18px"
    height: "52px"
  input:
    backgroundColor: "#fbf8ef"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "0 11px"
    height: "43px"
---

# Design System: Jersey Haven

## Overview

**Creative North Star: “The Matchday Archive” (source-derived interpretation).**

The implemented storefront combines oversized condensed headlines, a pale green paper-like canvas, deep green surfaces, and orange and yellow accents. Its editorial hero, numbered collection navigation, and catalog labels give the page a match-programme and archive character. This is a reading of the source composition, not a user-confirmed visual brief; no browser capture was available for visual verification.

The system serves three collections: National teams, Club teams, and Retro. Product names, imagery, prices, inventory, merchant details, and shipping rules are illustrative or require shop-owner configuration. Checkout creates a local order reference for manual Mobile Money or cash on delivery; the shop reviews the entered area and confirms delivery coverage. The page does not process or automatically verify payments.

**Key Characteristics:**
- Condensed uppercase display type paired with Public Sans.
- Pale paper, deep green, and bright orange/yellow accents.
- Thin dividers and square-edged catalog and form elements, with circular accents.
- Responsive product catalog with category, team, size, price, sort, and text search controls.

## Colors

The CSS custom properties define an earthy pale-green and deep-green base, with orange and yellow accents; additional literal colors appear in component states and image placeholders.

### Primary
- **Pitch Green** (`#12382b`): Primary dark surface and selected-state color, including the archive callout and checkout button.
- **Signal Orange** (`#ff6840`): Brand mark, focus outline, category accents, and interactive highlights.
- **Match Yellow** (`#f4c944`): Hero action, retro key, selection highlight, and small success accents.

### Neutral
- **Paper** (`#edf2db`): Page background and foreground text on green surfaces.
- **Deep Paper** (`#dfe7cc`): Scrollbar track.
- **Ink** (`#17221b`): Main text and dark button surface.
- **Green Light** (`#214f3e`): Hover state for green buttons.
- **Muted** (`#526157`): Secondary copy and explanatory text.
- **Divider** (`rgba(23, 34, 27, .2)`): Borders and rules.
- **Error** (`#9f321c`): Validation messages.

## Typography

**Display Font:** Barlow Condensed (with Arial Narrow, sans-serif fallbacks)
**Body Font:** Public Sans (with Arial, sans-serif fallbacks)

**Character:** Display text is dense, heavy, and frequently uppercase; supporting copy and controls use compact, practical sans-serif text. These are source-based observations; no rendered typography capture was available.

### Hierarchy
- **Display** (800, `clamp(4.2rem, 8.3vw, 8.2rem)`, line-height `.77`, letter-spacing `-.048em`): Hero headline; scales at narrower and wider breakpoints.
- **Headline** (800, `clamp(3rem, 5.8vw, 5.25rem)`, line-height `.9`): Catalog heading.
- **Title** (700, `21px`, line-height `1.02`): Product names; collection navigation uses 700 at `21px`.
- **Body** (400, `13px`, line-height `1.65`): Hero description. Supporting and control text commonly uses `11px`–`12px`.
- **Label** (800, `11px`, letter-spacing `.08em`, uppercase where shown): Section indexes and product team labels.

## Layout

The page uses a centered `.site-shell` with a `1680px` maximum width and horizontal padding of `4.8vw`. The desktop catalog is a four-column grid with `18px` column gaps and `45px` row gaps. At `1050px` it becomes three columns; at `760px` it becomes two columns and the main navigation is hidden. At `760px`, the collection index becomes two columns and filters stack; at `380px`, shell padding reduces to `15px`. The CSS also defines a `1500px` large-screen adjustment. The catalog filters wrap, and the search remains in the header.

Spacing is implemented as repeated CSS literals rather than a named spacing scale. Common observed values include `4px`, `6px`, `8px`, `12px`, and `18px`; use the actual component rules as the reference rather than treating those as a complete scale.

## Elevation & Depth

Depth is mostly conveyed through flat color blocks, image overlap, borders, and motion. Native dialogs have a shadow (`0 20px 70px rgba(10,22,15,.25)`) and blurred dark backdrop; the cart uses a darkened shade and a sliding paper sheet. Product image zoom, CTA movement, and card entrance animation provide state feedback. Reduced-motion preferences shorten transitions and animation.

### Shadow Vocabulary
- **Dialog shadow** (`0 20px 70px rgba(10,22,15,.25)`): Native size, checkout, and success dialogs.

## Shapes

Most catalog, form, and CTA surfaces are square-cornered; checkout inputs explicitly use `border-radius: 0`. Circles appear on the hero action, bag count, quick-add control, icon buttons, and payment swatches. Thin rules define boundaries. Product images are clipped by an overflow-hidden rectangular frame; no general card radius token is present.

## Components

### Buttons
The main CTA is a full-width, square-cornered block with a small upward hover shift.
- **Primary:** Green background, paper text; `52px` minimum height and `0 18px` padding.
- **Accent:** Orange background and ink text; shared `.button` dimensions.
- **Dark:** Ink background and paper text; shared `.button` dimensions.
- **Hover:** Background changes by variant and the button translates upward `2px`.
- **Focus:** Visible controls use a `3px` orange outline offset by `3px`.

### Chips
- **Collection tabs:** Text-led, transparent controls with divider borders; selected and hover states use green text and a subtle green wash.
- **Catalog keys:** Flat category labels: green/paper for national teams, orange/ink for club teams, and yellow/ink for retro.
- **Product badges:** Category-colored rectangular labels over image corners.

### Cards / Containers
- **Product card:** Square image frame at `.88` aspect ratio, clipped overflow, category badge, product number, circular quick-add control, then team, name, price, and available-size labels.
- **Cart sheet:** Paper-colored panel up to `490px` wide, sliding from the right with dividers between cart rows.
- **Borders:** Cards have no enclosing border or shadow in the source; image frames use neutral placeholder colors.

### Inputs / Fields
Search is visually reduced to a bottom rule. Checkout text fields use a pale `#fbf8ef` background, `1px` divider border, square corners, `43px` minimum height, and `0 11px` padding. Selects are transparent and draw a small CSS chevron. Focus uses the shared orange outline; payment choices use a green inset bar when selected.

### Navigation
The desktop masthead is a three-column grid with brand, centered navigation, and right-aligned search/bag actions; it has a bottom divider and `92px` minimum height. At `760px`, the main navigation is hidden and the masthead rearranges to brand plus actions. Collection tabs provide a second, category-focused navigation row.

### Checkout payment option
Payment methods are stacked bordered rows with a circular swatch, method name and description, and a radio mark. Manual Mobile Money displays the configured merchant name and number; the customer enters the generated order reference when making a transfer. Cash on delivery is always available as a choice; the customer enters their area, and the shop confirms delivery coverage. The success dialog requires the customer to open the prefilled WhatsApp order message and confirm sending before they can finish the request. The site warns on attempted page exit while the message is pending, but cannot verify the WhatsApp send itself. WhatsApp configuration is required to create an order request. Payment verification, order storage, and fulfillment remain manual.

## Do's and Don'ts

### Do:
- **Do** preserve the two implemented type families and the CSS custom-property palette when extending this page.
- **Do** retain the national/club/retro color mapping where category keys and product badges are used.
- **Do** keep catalog imagery, product facts, stock, and delivery terms clearly identified as demo content until verified.
- **Do** preserve the observed responsive grid changes at `1050px`, `760px`, and `380px`.

### Don't:
- **Don't** present demo products, prices, stock, delivery terms, or checkout completion as verified commercial facts.
- **Don't** treat the generated order reference as proof of payment or an accepted order.
