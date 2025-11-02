# Casino Theme Design System

This document describes the design tokens and UI components for the casino/poker-themed portfolio site.

## Table of Contents

1. [Design Tokens](#design-tokens)
2. [Theme Configuration](#theme-configuration)
3. [Base Styles](#base-styles)
4. [UI Components](#ui-components)
5. [Usage Guidelines](#usage-guidelines)
6. [Accessibility](#accessibility)

---

## Design Tokens

Design tokens are defined in `/src/styles/tokens.css` and provide a consistent foundation for the entire design system.

### Color Palette

#### Felt Colors
- `--color-felt-green-*`: Green poker table felt (light, mid, dark, darkest)
- `--color-felt-burgundy-*`: Burgundy VIP table felt (light, mid, dark, darkest)

#### Brand Colors
- `--color-gold-50` through `--color-gold-700`: Gold gradient scale (primary brand color)
- `--color-gold-300`: Primary gold (#ffd700) - main accent color
- `--color-gold-400`: Secondary gold (#fdb931)

#### Neutrals
- `--color-charcoal-50` through `--color-charcoal-900`: Charcoal gray scale
- `--color-charcoal-900`: Deep charcoal (#1a1a1a) - primary dark surface

#### Semantic Colors
- `--color-success`: #4caf50
- `--color-warning`: #ff9800
- `--color-error`: #dc2626
- `--color-info`: #2196f3

#### Text Colors
- `--color-text-primary`: #ffffff (white)
- `--color-text-secondary`: #d4af37 (soft gold)
- `--color-text-tertiary`: #9e9e9e (gray)
- `--color-text-inverse`: #1a1a1a (dark for light backgrounds)

### Spacing Scale

Uses a consistent 4px base unit:
- `--space-0`: 0
- `--space-1`: 0.25rem (4px)
- `--space-2`: 0.5rem (8px)
- `--space-3`: 0.75rem (12px)
- `--space-4`: 1rem (16px)
- `--space-6`: 1.5rem (24px)
- `--space-8`: 2rem (32px)
- `--space-12`: 3rem (48px)
- ...up to `--space-32`: 8rem (128px)

### Typography Scale

#### Font Families
- `--font-primary`: "Roboto", sans-serif (body text)
- `--font-display`: "Rowdies", sans-serif (headings)

#### Font Sizes
- `--font-size-xs`: 0.75rem (12px)
- `--font-size-sm`: 0.875rem (14px)
- `--font-size-base`: 1rem (16px)
- `--font-size-lg`: 1.125rem (18px)
- `--font-size-xl`: 1.25rem (20px)
- `--font-size-2xl`: 1.5rem (24px)
- `--font-size-3xl`: 1.875rem (30px)
- `--font-size-4xl`: 2.25rem (36px)
- `--font-size-5xl`: 3rem (48px)
- `--font-size-6xl`: 3.75rem (60px)

#### Font Weights
- `--font-weight-light`: 300
- `--font-weight-normal`: 400
- `--font-weight-medium`: 500
- `--font-weight-semibold`: 600
- `--font-weight-bold`: 700
- `--font-weight-black`: 900

### Border Radius

- `--radius-none`: 0
- `--radius-sm`: 0.125rem (2px)
- `--radius-base`: 0.25rem (4px)
- `--radius-md`: 0.375rem (6px)
- `--radius-lg`: 0.5rem (8px)
- `--radius-xl`: 0.75rem (12px)
- `--radius-2xl`: 1rem (16px)
- `--radius-full`: 9999px (fully rounded)

### Shadows

#### Standard Shadows
- `--shadow-sm`: Subtle shadow
- `--shadow-base`: Default shadow
- `--shadow-md`: Medium shadow
- `--shadow-lg`: Large shadow
- `--shadow-xl`: Extra large shadow

#### Gold Glow Effects
- `--shadow-gold-sm`: Small gold glow
- `--shadow-gold-md`: Medium gold glow
- `--shadow-gold-lg`: Large gold glow
- `--shadow-gold-xl`: Extra large gold glow

#### Special Shadows
- `--shadow-chip`: Chip-style shadow with gold glow
- `--shadow-chip-hover`: Enhanced chip shadow for hover
- `--shadow-card`: Card container shadow

### Z-Index Scale

- `--z-index-base`: 0
- `--z-index-dropdown`: 1000
- `--z-index-sticky`: 1020
- `--z-index-fixed`: 1030
- `--z-index-modal-backdrop`: 1040
- `--z-index-modal`: 1050
- `--z-index-popover`: 1060
- `--z-index-tooltip`: 1070

### Timing & Easing

#### Durations
- `--dur-50`: 50ms
- `--dur-100`: 100ms
- `--dur-200`: 200ms
- `--dur-300`: 300ms
- `--dur-500`: 500ms
- `--dur-1000`: 1000ms

#### Easing Functions
- `--ease-linear`: linear
- `--ease-in`: cubic-bezier(0.4, 0, 1, 1)
- `--ease-out`: cubic-bezier(0, 0, 0.2, 1)
- `--ease-in-out`: cubic-bezier(0.4, 0, 0.2, 1)
- `--ease-bounce`: cubic-bezier(0.68, -0.55, 0.265, 1.55)

### Texture Variables

- `--texture-felt-opacity`: 0.15 (opacity of texture overlay)
- `--texture-felt-size`: 256px (tile size)
- `--texture-felt-blend`: multiply (blend mode)
- `--texture-felt-url`: URL to texture image (defaults to `/textures/felt-texture.svg`)

### Focus Ring

- `--focus-ring-width`: 3px
- `--focus-ring-offset`: 2px
- `--focus-ring-color`: var(--color-gold-300)
- `--focus-ring`: Combined focus ring styles

---

## Theme Configuration

The theme system (`/src/styles/theme.css`) maps design tokens to semantic variable names and supports:

- **Default Theme**: Applied via `:root`
- **Dark Theme**: Applied via `[data-theme="dark"]` on html/body
- **High Contrast Mode**: Enhanced via `@media (prefers-contrast: high)`

### Usage

```css
/* Import tokens and theme */
@import "../styles/tokens.css";
@import "../styles/theme.css";

.my-component {
  color: var(--color-text-primary);
  background: var(--color-bg-surface);
  padding: var(--spacing-md);
}
```

---

## Base Styles

Base styles (`/src/styles/base.css`) provide:

1. **CSS Reset**: Normalize browser defaults
2. **Typography**: Base heading and text styles
3. **Links**: Hover policy and focus styles
4. **Focus Management**: Visible focus rings for keyboard navigation
5. **Reduced Motion**: Respects `prefers-reduced-motion`
6. **Texture Application**: Felt texture overlay on body
7. **Utility Classes**: Common utility classes (`.text-center`, `.sr-only`, etc.)

---

## UI Components

All components are located in `/src/components/ui/` and follow these patterns:

- **Scoped Styles**: Each component uses scoped `<style>` blocks
- **Accessibility**: ARIA labels, roles, and keyboard support
- **Props Interface**: TypeScript interfaces for type safety
- **Default Values**: Sensible defaults for all props

### Button

Casino-themed button with poker chip aesthetic.

**Props:**
- `variant`: "primary" | "secondary" | "outline" | "ghost" (default: "primary")
- `size`: "sm" | "md" | "lg" (default: "md")
- `disabled`: boolean (default: false)
- `type`: "button" | "submit" | "reset" (default: "button")
- `ariaLabel`: string (optional)
- `class`: string (optional)

**Usage:**
```astro
<Button variant="primary" size="lg">Place Bet</Button>
<Button variant="outline" disabled>Disabled</Button>
```

**Accessibility:**
- Full keyboard support (Enter/Space)
- Focus-visible ring
- ARIA disabled state
- Optional aria-label for icon-only buttons

---

### Card

Container component with subtle shadows and felt-inspired styling.

**Props:**
- `variant`: "default" | "elevated" | "outline" (default: "default")
- `padding`: "sm" | "md" | "lg" | "none" (default: "md")
- `class`: string (optional)

**Usage:**
```astro
<Card variant="elevated" padding="lg">
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

---

### Badge

Small status indicator with casino styling.

**Props:**
- `variant`: "default" | "success" | "warning" | "error" | "info" | "gold" (default: "default")
- `size`: "sm" | "md" (default: "md")
- `class`: string (optional)

**Usage:**
```astro
<Badge variant="gold">New</Badge>
<Badge variant="error" size="sm">Error</Badge>
```

**Accessibility:**
- Uses `role="status"` for live regions

---

### Icon

SVG icon wrapper with consistent sizing and styling.

**Props:**
- `size`: "xs" | "sm" | "md" | "lg" | "xl" (default: "md")
- `color`: "currentColor" | "primary" | "secondary" (default: "currentColor")
- `ariaLabel`: string (optional, sets aria-hidden to false)
- `ariaHidden`: boolean (default: !ariaLabel)
- `class`: string (optional)

**Usage:**
```astro
<Icon size="lg" color="primary" ariaLabel="Close">
  <!-- SVG path content -->
  <path d="M18 6L6 18M6 6l12 12" />
</Icon>
```

**Accessibility:**
- Properly sets `aria-hidden` or provides `aria-label`
- Uses `role="img"` when labeled

---

### Callout

Attention-grabbing callout box for important information.

**Props:**
- `variant`: "info" | "success" | "warning" | "error" (default: "info")
- `title`: string (optional)
- `class`: string (optional)

**Usage:**
```astro
<Callout variant="warning" title="Warning">
  This is important information.
</Callout>
```

**Accessibility:**
- Uses `role="region"`
- Optional `aria-labelledby` when title is provided

---

### Chip

Poker chip-style component with casino aesthetics.

**Props:**
- `value`: string | number (optional, displayed in center)
- `color`: "red" | "blue" | "green" | "black" | "gold" | "white" (default: "gold")
- `size`: "sm" | "md" | "lg" (default: "md")
- `class`: string (optional)

**Usage:**
```astro
<Chip value="$100" color="gold" size="lg" />
<Chip color="red" size="sm">25</Chip>
```

**Accessibility:**
- Uses `role="img"`
- Provides `aria-label` with value if provided

---

### Modal

Accessible modal dialog with casino styling.

**Props:**
- `id`: string (required, unique identifier)
- `title`: string (required)
- `closeLabel`: string (default: "Close modal")
- `class`: string (optional)

**Usage:**
```astro
<Modal id="example-modal" title="Example Modal">
  <p>Modal content goes here.</p>
</Modal>

<!-- To open the modal, call the global function: -->
<script>
  window.openModal_modal-example();
</script>
```

**Accessibility:**
- Full keyboard support (ESC to close, Tab trapping)
- Focus management (focuses first element on open)
- ARIA modal attributes
- Click outside to close

**Opening a Modal:**
The modal component automatically initializes on page load. To open a modal programmatically, use:
```javascript
window[`openModal_${modalId}`]();
```

---

### PlayingCard

Playing card component with casino styling.

**Props:**
- `suit`: "hearts" | "diamonds" | "clubs" | "spades" (optional)
- `rank`: string | number (optional)
- `face`: "front" | "back" (default: "front" if rank/suit provided, else "back")
- `backDesign`: "blue" | "red" | "grey" (default: "blue")
- `size`: "sm" | "md" | "lg" (default: "md")
- `class`: string (optional)

**Usage:**
```astro
<PlayingCard suit="hearts" rank="A" size="lg" />
<PlayingCard face="back" backDesign="red" />
```

**Accessibility:**
- Uses `role="img"`
- Provides descriptive `aria-label`

---

### DealerButton

Decorative dealer button component for poker table UI.

**Props:**
- `label`: string (default: "DEALER")
- `animated`: boolean (default: false, enables pulse animation)
- `size`: "sm" | "md" | "lg" (default: "md")
- `class`: string (optional)

**Usage:**
```astro
<DealerButton label="DEALER" animated size="lg" />
```

**Accessibility:**
- Uses `role="img"`
- Provides `aria-label`

---

## Usage Guidelines

### Importing Components

In Astro components:

```astro
---
import Button from '../components/ui/Button.astro';
import Card from '../components/ui/Card.astro';
---

<Card>
  <Button variant="primary">Click Me</Button>
</Card>
```

### Importing Styles

In your layout or page:

```astro
---
import '../styles/tokens.css';
import '../styles/theme.css';
import '../styles/base.css';
---
```

### Customization

All components use CSS custom properties and can be customized by overriding token values or component-specific variables in your own stylesheets.

**Example:**
```css
:root {
  --color-primary: #custom-gold;
}

/* Or override component styles */
.my-button {
  --color-gold-300: #custom-color;
}
```

---

## Accessibility

### WCAG Compliance

The design system is built with accessibility in mind:

- **Color Contrast**: All color combinations meet WCAG AA standards (4.5:1 for text, 3:1 for UI components)
- **Focus Management**: Visible focus indicators for keyboard navigation
- **ARIA Support**: Proper roles, labels, and states
- **Keyboard Navigation**: Full keyboard support for interactive components
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **High Contrast**: Enhanced styles for `prefers-contrast: high`

### Testing

To verify accessibility:

1. **Automated Testing**: Use axe DevTools or Pa11y
2. **Keyboard Testing**: Navigate all interactive elements with Tab, Enter, Space, ESC
3. **Screen Reader Testing**: Test with NVDA, JAWS, or VoiceOver
4. **Lighthouse**: Run Lighthouse accessibility audit (target: ?95)

### Best Practices

1. Always provide `aria-label` for icon-only buttons
2. Use semantic HTML where possible
3. Ensure focus order is logical
4. Test with keyboard-only navigation
5. Provide text alternatives for decorative images
6. Use sufficient color contrast (verify with contrast checker)

---

## Constraints

### File Size Budget

- Texture files: Keep under 100KB
- Component styles: Optimize and minimize duplication

### Browser Support

Targets modern browsers with CSS custom properties support:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

### Performance

- Use GPU-friendly transforms (`transform`, `opacity`)
- Guard animations with `prefers-reduced-motion`
- Minimize layout shifts

---

## Design Tokens Map

### Quick Reference

| Category | Token Prefix | Example |
|----------|-------------|---------|
| Colors | `--color-` | `--color-gold-300` |
| Spacing | `--space-` | `--space-4` |
| Typography | `--font-` | `--font-size-base` |
| Radius | `--radius-` | `--radius-lg` |
| Shadows | `--shadow-` | `--shadow-chip` |
| Z-Index | `--z-index-` | `--z-index-modal` |
| Timing | `--dur-` | `--dur-200` |
| Easing | `--ease-` | `--ease-in-out` |

For a complete list, see `/src/styles/tokens.css`.

---

## Support

For questions or issues with the design system, refer to:
- Component source code: `/src/components/ui/`
- Token definitions: `/src/styles/tokens.css`
- Theme configuration: `/src/styles/theme.css`
- Base styles: `/src/styles/base.css`
