# Review Rubric

Scoring criteria for Design Quality Review mode. Each category is scored Pass / Needs Work / Fail.

## Scoring Scale

| Rating | Points | Meaning |
|--------|--------|---------|
| **Pass** | ~17/17 | Meets or exceeds preset standards. No errors, minor suggestions at most. |
| **Needs Work** | ~8-12/17 | Functional but has warnings. Specific improvements identified. |
| **Fail** | 0-7/17 | Errors present. Does not meet preset standards. Must fix before shipping. |

**Total: 6 categories x ~17 points = ~100 points.** The score is qualitative — treat as directional.

---

## Category 1: Hierarchy (~17 pts)

Does the interface guide the eye? Can you identify the most important element instantly?

### Pass Criteria
- [ ] Clear primary focal point on the page/section
- [ ] Heading sizes decrease logically (H1 > H2 > H3)
- [ ] Semantic HTML used (`h1`-`h6`, `main`, `nav`, `section`, `article`)
- [ ] Visual weight matches content importance
- [ ] No two elements compete for primary attention

### Common Violations
| Violation | Severity | Example |
|-----------|----------|---------|
| Multiple elements same visual weight | Warning | Two `text-2xl font-bold` headings side-by-side |
| Heading levels skipped | Warning | H1 followed directly by H4 |
| No clear CTA | Error | Page section with no primary action |
| Non-semantic HTML | Warning | `<div>` used instead of `<section>` or `<nav>` |

---

## Category 2: Typography (~17 pts)

Does text usage comply with the active preset?

### Pass Criteria
- [ ] Font family matches preset spec
- [ ] Weight hierarchy used correctly (bold → semibold → medium → regular)
- [ ] Tracking matches preset spec (tight for headings, normal for body)
- [ ] Line-height appropriate (1.5+ for body, tighter for headings)
- [ ] Maximum 3 font weights visible per screen
- [ ] No unauthorized font imports

### Common Violations
| Violation | Severity | Example |
|-----------|----------|---------|
| Wrong font family | Error | Using serif where preset says sans-only |
| Unauthorized font weight | Warning | `font-light` when preset says 400+ only |
| Inconsistent heading treatment | Warning | Some H2s semibold, others bold |
| Line-height too tight on body | Warning | `leading-tight` on paragraph text |
| Too many font sizes | Suggestion | 6+ different `text-*` sizes in one component |

---

## Category 3: Color (~17 pts)

Are colors used according to preset philosophy?

### Pass Criteria
- [ ] All colors via semantic tokens or CSS variables
- [ ] No hardcoded hex values
- [ ] No Tailwind palette colors (no `bg-blue-500`)
- [ ] Accent color usage within preset limits
- [ ] Text contrast ratios meet WCAG AA (4.5:1 normal, 3:1 large)
- [ ] Dark mode support via CSS variables (no `dark:` overrides needed)

### Common Violations
| Violation | Severity | Example |
|-----------|----------|---------|
| Hardcoded hex color | Error | `className="text-[#B87333]"` |
| Tailwind palette color | Error | `bg-green-500` instead of `text-success` |
| `bg-white` or `text-black` | Error | Breaks dark mode |
| Low contrast text | Error | `text-muted-foreground` on `bg-muted` (check ratio) |
| Accent overuse | Warning | 5+ copper-colored elements on screen |
| Missing status color semantic | Warning | Using `text-red-500` instead of `text-destructive` |

---

## Category 4: Spacing (~16 pts)

Is spacing consistent and on-grid?

### Pass Criteria
- [ ] All spacing values on the preset's grid (typically 4px/8px increments)
- [ ] Consistent padding within same component type
- [ ] Section spacing matches preset spec
- [ ] No cramped layouts (adequate breathing room)
- [ ] Responsive spacing (larger on desktop, tighter on mobile)

### Common Violations
| Violation | Severity | Example |
|-----------|----------|---------|
| Off-grid spacing | Warning | `p-5` (20px) when grid is 8px (should be `p-4` or `p-6`) |
| Inconsistent card padding | Warning | Some cards `p-4`, others `p-6` at same level |
| Missing section spacing | Warning | Two sections with only `py-4` between them |
| Cramped touch targets | Error | Button `h-8` (32px) — below 44px minimum |

---

## Category 5: Accessibility (~16 pts)

Can all users access the interface?

### Pass Criteria
- [ ] All interactive elements have accessible names (visible text or `aria-label`)
- [ ] Touch targets >= 44px minimum dimension
- [ ] Focus indicators visible on tab navigation
- [ ] `prefers-reduced-motion` respected on animations
- [ ] Color not the only way to convey information (icons/text backup)
- [ ] `aria-live` regions for dynamic content updates
- [ ] Skip-to-content link on pages with navigation

### Common Violations
| Violation | Severity | Example |
|-----------|----------|---------|
| Icon-only button without `aria-label` | Error | `<button><X /></button>` |
| Touch target too small | Error | `h-8 w-8` icon button (32px) |
| No focus indicator | Error | `focus:outline-none` without `focus-visible:ring-*` |
| Color-only status | Warning | Green dot for "active" with no text label |
| Missing aria-live on dynamic content | Warning | Toast notifications without `aria-live="polite"` |
| Animations ignore reduced-motion | Warning | No `prefers-reduced-motion: reduce` media query |

---

## Category 6: Polish (~17 pts)

Does the interface feel finished?

### Pass Criteria
- [ ] Elevation hierarchy matches preset (consistent shadow usage)
- [ ] Hover states on all interactive elements
- [ ] Transition on hover/active state changes
- [ ] Loading states for async actions
- [ ] Empty states for data-dependent components
- [ ] Error states for forms and data fetching
- [ ] Consistent border-radius across same-level elements

### Common Violations
| Violation | Severity | Example |
|-----------|----------|---------|
| Missing hover state | Warning | Card with no visual feedback on hover |
| No transition on state change | Warning | Shadow appears instantly (no `transition-shadow`) |
| Inconsistent border-radius | Suggestion | Mix of `rounded-md` and `rounded-lg` on same-level cards |
| Missing loading state | Warning | Button submits with no loading indicator |
| Missing empty state | Suggestion | "No data" shown as blank area |
| Missing error state | Warning | Form submission fails silently |

---

## Score Examples

### 90+ Score Component
- Semantic HTML throughout
- Typography matches preset perfectly
- All colors via semantic tokens, WCAG AA contrast verified
- 8px grid spacing, consistent padding
- Full keyboard navigation, aria labels on all interactions
- Hover states, transitions, loading states all present

### 70-80 Score Component
- Mostly semantic HTML (a few `div`s where `section` would be better)
- Typography correct but inconsistent (some headings slightly off-spec)
- Colors mostly semantic, one or two hardcoded values
- Spacing mostly on-grid, a couple off-grid values
- Most interactive elements accessible, a few missing labels
- Hover states present, some missing transitions

### Below 60 Score Component
- Non-semantic HTML (`div` soup)
- Multiple font families or weights not in preset
- Hardcoded colors, no dark mode consideration
- Inconsistent spacing, cramped in places
- Missing aria labels, small touch targets
- No hover states, no transitions, no loading/error states
