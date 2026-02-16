# Guard Checks

Quick-reference checklist for Guard mode. Before writing any UI code, self-check against these rules. Ordered by detection ease (static/obvious first, judgment calls last).

**Platform key:** Examples show Web (React/Tailwind) by default. Apply equivalent checks for Swift (`Color()` literals, `.font()` modifiers), Compose (`Color(0xFF...)`, `MaterialTheme`), and Flutter (`Color()`, `ThemeData`).

---

## Static Checks (Can be verified by reading the code)

### 1. No Hardcoded Colors
**Severity:** Error
**Look for:** Hardcoded color values in any platform
**Fix:** Replace with project semantic tokens

| Platform | Bad | Good |
|----------|-----|------|
| Web | `text-[#B87333]` | `text-primary` |
| SwiftUI | `Color(red: 0.72, green: 0.45)` | `Color("primary")` |
| Compose | `Color(0xFFB87333)` | `MaterialTheme.colorScheme.primary` |
| Flutter | `Color(0xFFB87333)` | `Theme.of(context).colorScheme.primary` |

### 2. No Tailwind Palette Colors
**Severity:** Error
**Look for:** `bg-blue-500`, `text-red-400`, `border-green-300`, `text-emerald-*`, `bg-indigo-*`
**Fix:** Use semantic tokens: `bg-primary`, `text-destructive`, `text-success`, `border-border`
```tsx
// Bad:  text-green-500
// Good: text-success
```

### 3. No Hardcoded Light/Dark Values
**Severity:** Error
**Look for:** `bg-white`, `bg-black`, `text-white`, `text-black`, `dark:bg-*` overrides
**Fix:** Use CSS variable-backed tokens that auto-adapt: `bg-background`, `text-foreground`, `bg-card`
```tsx
// Bad:  bg-white dark:bg-gray-900
// Good: bg-background
```

### 4. Font Family Compliance
**Severity:** Error
**Look for:** Unauthorized `font-*` classes or font imports not in preset
**Fix:** Use only fonts specified in the active preset
```tsx
// Bad (if preset says Inter-only):  font-serif on a button label
// Good: font-sans (maps to Inter)
```

### 5. Touch Target Size
**Severity:** Error
**Look for:** Interactive elements (`button`, `a`, clickable `div`) with height < 44px
**Fix:** Add `min-h-11` (44px) or ensure `h-11`+ / `py-3`+ on buttons
```tsx
// Bad:  <button className="h-8 px-2">
// Good: <button className="min-h-11 px-4">
```

### 6. Accessible Names
**Severity:** Error
**Look for:** Icon-only buttons or links without `aria-label`
**Fix:** Add `aria-label="Description"` to any element with only an icon
```tsx
// Bad:  <button><X className="w-4 h-4" /></button>
// Good: <button aria-label="Close"><X className="w-4 h-4" /></button>
```

---

## Pattern Checks (Require matching against preset conventions)

### 7. Spacing Grid Alignment
**Severity:** Warning
**Look for:** Padding/margin/gap values off the 8px grid (e.g., `p-5`, `gap-3.5`, `m-7`)
**Fix:** Snap to nearest 4px/8px increment
```tsx
// Bad:  p-5 (20px), gap-3.5 (14px)
// Good: p-4 (16px) or p-6 (24px), gap-4 (16px)
```
**Note:** `p-3` (12px) is acceptable for fine adjustments on the 4px sub-grid.

### 8. Elevation Hierarchy
**Severity:** Warning
**Look for:** Shadow usage that doesn't match preset levels. Mixing borders and shadows on cards.
**Fix:** Follow preset's elevation system
```tsx
// Bad (linear-mercury): border border-gray-200 shadow-lg
// Good (linear-mercury): shadow-xs hover:shadow-sm
```

### 9. Typography Weight Consistency
**Severity:** Warning
**Look for:** More than 3 font weights in a single component. Headings with inconsistent weight.
**Fix:** Stick to the preset's weight hierarchy
```tsx
// Bad:  h2 font-bold, another h2 font-semibold, body font-thin
// Good: h2 always font-semibold, body always font-normal
```

### 10. Transition on Interactive States
**Severity:** Warning
**Look for:** Hover/focus states that change without `transition-*`
**Fix:** Add appropriate transition class
```tsx
// Bad:  hover:shadow-md (no transition)
// Good: hover:shadow-md transition-shadow duration-150
```

---

## Judgment Checks (Require visual/contextual assessment)

### 11. Visual Hierarchy Clarity
**Severity:** Warning
**Look for:** Multiple elements competing for attention at the same visual level
**Fix:** Differentiate via size, weight, or color. One clear focal point per section.

### 12. Color Accent Restraint
**Severity:** Suggestion
**Look for:** More accent-colored elements than the preset recommends (e.g., >2 copper elements for linear-mercury)
**Fix:** Reduce accent usage. Use neutral colors for secondary elements.

### 13. Hover State Presence
**Severity:** Suggestion
**Look for:** Interactive elements (cards, buttons, links) without visible hover feedback
**Fix:** Add hover state (background shift, shadow lift, or color change)

### 14. Empty/Loading/Error States
**Severity:** Suggestion
**Look for:** Components that display data without handling no-data, loading, or error conditions
**Fix:** Add appropriate states (skeleton, spinner, empty message, error message)

### 15. Semantic HTML
**Severity:** Suggestion
**Look for:** `<div>` used where semantic elements would be more appropriate
**Fix:** Use `<section>`, `<nav>`, `<main>`, `<article>`, `<header>`, `<footer>` as appropriate

---

## Quick Decision Tree

```
Writing a component?
│
├─ Contains hex color? → ERROR. Use semantic token.
├─ Contains bg-white/text-black? → ERROR. Use CSS variable.
├─ Button/link < 44px? → ERROR. Add min-h-11.
├─ Icon-only interactive? → ERROR. Add aria-label.
├─ Uses Tailwind palette color? → ERROR. Use semantic token.
├─ Spacing off 8px grid? → WARNING. Snap to grid.
├─ No transition on hover? → WARNING. Add transition.
├─ Missing hover state? → SUGGESTION.
└─ All clear? → Write the code.
```
