# Guard Checks (22)

Quick-reference checklist for Guard mode. Before writing any UI code, self-check against these rules. Ordered by detection ease (static/obvious first, judgment calls last).

**Platform key:** Examples show Web (React/Tailwind) by default. Apply equivalent checks for Swift (`Color()` literals, `.font()` modifiers), Compose (`Color(0xFF...)`, `MaterialTheme`), and Flutter (`Color()`, `ThemeData`).

## Contents
- [Static Checks](#static-checks) — #1-7
- [Pattern Checks](#pattern-checks) — #8-13
- [Judgment Checks](#judgment-checks) — #14-22
- [Quick Decision Tree](#quick-decision-tree)

---

## Static Checks

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

### 7. No Em Dashes in Copy
**Severity:** Warning
**Look for:** Em dashes (`—`) or en dashes (`–`) in string literals and JSX text content
**Why:** Em dashes are an AI-generated copy hallmark. They feel robotic and break conversational tone.
**Fix:** Replace with comma, period, or restructure the sentence
```tsx
// Bad:  "Our platform — built for developers — ships faster."
// Good: "Our platform is built for developers. Ship faster."
```

---

## Pattern Checks

### 8. Spacing Grid Alignment
**Severity:** Warning
**Look for:** Padding/margin/gap values off the 8px grid (e.g., `p-5`, `gap-3.5`, `m-7`)
**Fix:** Snap to nearest 4px/8px increment
```tsx
// Bad:  p-5 (20px), gap-3.5 (14px)
// Good: p-4 (16px) or p-6 (24px), gap-4 (16px)
```
**Note:** `p-3` (12px) is acceptable for fine adjustments on the 4px sub-grid.

### 9. Elevation Hierarchy
**Severity:** Warning
**Look for:** Shadow usage that doesn't match preset levels. Mixing borders and shadows on cards.
**Fix:** Follow preset's elevation system
```tsx
// Bad (clean-functional): border border-gray-200 shadow-lg
// Good (clean-functional): shadow-xs hover:shadow-sm
```

### 10. Typography Weight Consistency
**Severity:** Warning
**Look for:** More than 3 font weights in a single component. Headings with inconsistent weight.
**Fix:** Stick to the preset's weight hierarchy
```tsx
// Bad:  h2 font-bold, another h2 font-semibold, body font-thin
// Good: h2 always font-semibold, body always font-normal
```

### 11. Transition on Interactive States
**Severity:** Warning
**Look for:** Hover/focus states that change without `transition-*`
**Fix:** Add appropriate transition class
```tsx
// Bad:  hover:shadow-md (no transition)
// Good: hover:shadow-md transition-shadow duration-150
```

### 12. Line-Height Ranges
**Severity:** Warning
**Look for:** Body text with `leading-tight`/`leading-none`. Headings (32px+) with `leading-loose`/`leading-relaxed`.
**Fix:** Body: `leading-normal` to `leading-relaxed` (1.4-1.6x). Headings: `leading-tight` to `leading-snug` (1.1-1.2x).
```tsx
// Bad:  <p className="text-base leading-tight">Body</p>
// Bad:  <h1 className="text-4xl leading-loose">Heading</h1>
// Good: <p className="text-base leading-normal">Body</p>
// Good: <h1 className="text-4xl leading-tight">Heading</h1>
```

### 13. Dark Background Text Hierarchy
**Severity:** Warning
**Look for:** On dark backgrounds (`bg-gray-900`, `bg-black`, `bg-background` in dark mode), all text using identical foreground color/opacity
**Fix:** Vary opacity for hierarchy — primary at 100%, secondary at 70%, tertiary at 50%
```tsx
// Bad:  all children use text-white
// Good: primary text-white, secondary text-white/70, tertiary text-white/50
```

---

## Judgment Checks

### 14. Visual Hierarchy Clarity
**Severity:** Warning
**Look for:** Multiple elements competing for attention at the same visual level
**Fix:** Differentiate via size, weight, or color. One clear focal point per section.

### 15. Color Accent Restraint
**Severity:** Suggestion
**Look for:** More accent-colored elements than the preset recommends (e.g., >2 copper elements for clean-functional)
**Fix:** Reduce accent usage. Use neutral colors for secondary elements.

### 16. Hover State Presence
**Severity:** Suggestion
**Look for:** Interactive elements (cards, buttons, links) without visible hover feedback
**Fix:** Add hover state (background shift, shadow lift, or color change)

### 17. Empty/Loading/Error States
**Severity:** Suggestion
**Look for:** Components that display data without handling no-data, loading, or error conditions
**Fix:** Add appropriate states (skeleton, spinner, empty message, error message)

### 18. Semantic HTML
**Severity:** Suggestion
**Look for:** `<div>` used where semantic elements would be more appropriate
**Fix:** Use `<section>`, `<nav>`, `<main>`, `<article>`, `<header>`, `<footer>` as appropriate

### 19. Choice Overload (Hick's Law)
**Severity:** Suggestion
**Look for:** More than 7 ungrouped equal-weight options (buttons, cards, nav items, list choices) in a single section with identical visual treatment
**Why:** Hick's Law — more choices = longer decision time. Ungrouped options create cognitive overload.
**Fix:** Group into categories with visual separators, use hierarchy to differentiate primary from secondary options, or paginate

### 20. Responsive Heading Sizes
**Severity:** Suggestion
**Look for:** Large headings (`text-3xl` or above) with no responsive variants (no `sm:text-*`, `md:text-*`, or `lg:text-*`)
**Fix:** Add responsive sizing so headings scale down on mobile
```tsx
// Bad:  <h1 className="text-5xl font-bold">Hero</h1>
// Good: <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Hero</h1>
```

### 21. AI-Default Copy Patterns
**Severity:** Suggestion
**Look for:** Generic marketing copy that signals AI-generated content with no human editing:
- Phrases: "Unlock the power of...", "Revolutionize your...", "Seamlessly integrate...", "Leverage the potential..."
- Vague value props: "Take your workflow to the next level"
- Excessive em dashes (also #7 but this is the broader content check)
- Headlines over 15 words
- CTAs that say "Learn more" or "Click here" instead of specific actions
**Why:** This is the anti-vibe coding check for content. Generic copy is the text equivalent of generic UI.
**Fix:** Rewrite with specifics. "Unlock the power of collaboration" becomes "Ship 2x faster with shared workspaces."

### 22. Layout Proportion Balance
**Severity:** Suggestion
**Look for:** Layout proportions that feel arbitrary or unintentional:
- Hero sections with no clear text:visual ratio (50:50 split when content is asymmetric)
- Sidebar layouts with equal-width columns instead of ~38:62 proportion
- Content areas with no max-width constraint (text runs edge to edge)
- Card grids with inconsistent aspect ratios
**Why:** Golden ratio (~1.618) and intentional proportions create visual harmony. Equal splits feel static.
**Fix:** Apply golden ratio where appropriate: sidebar:content at ~38:62, hero text:visual at ~62:38. Set `max-w-prose` or `max-w-2xl` on text-heavy content.

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
├─ Contains em dash in copy? → WARNING. Rewrite without dash.
├─ Spacing off 8px grid? → WARNING. Snap to grid.
├─ Body leading-tight or heading leading-loose? → WARNING. Fix line-height.
├─ Dark bg with uniform text color? → WARNING. Vary opacity.
├─ No transition on hover? → WARNING. Add transition.
├─ Missing hover state? → SUGGESTION.
├─ 7+ ungrouped equal-weight options? → SUGGESTION. Group or reduce (Hick's Law).
├─ Large heading with no responsive variants? → SUGGESTION. Add breakpoint sizes.
├─ Generic AI copy ("Unlock the power of...")? → SUGGESTION. Rewrite with specifics.
├─ 50:50 layout where content is asymmetric? → SUGGESTION. Try ~38:62 golden ratio.
└─ All clear? → Write the code.
```
