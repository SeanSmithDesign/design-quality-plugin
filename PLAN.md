# Plugin Iteration Plan

## Context

Incorporating design principles from the "Web Design Mastery" ebook (Parts 1-4), ecosystem learnings from RAMS/ui-skills, and three user-requested additions into the existing design-quality plugin.

## Ecosystem Positioning

RAMS and ui-skills cover generic best-practices well (WCAG, performance, animation, code slop). Our plugin's unique value is **preset-driven taste enforcement** and **ebook-derived design principles**. This iteration leans into that differentiation rather than duplicating accessibility/performance checks.

---

## Changes

### 1. New Guard Check: No Em Dashes in Copy

**File:** `references/guard-checks.md`

Add as Static Check #16 (new):

- **Severity:** Warning
- **Look for:** Em dashes (`—`), en dashes (`–`), or patterns like ` — ` in string literals, JSX text content, and copy
- **Why:** Em dashes are an AI-generated copy hallmark. They feel robotic and break conversational tone. Use commas, periods, or semicolons instead.
- **Fix:** Replace `—` with a comma, period, or restructure the sentence

```tsx
// Bad:  "Our platform — built for developers — ships faster."
// Good: "Our platform is built for developers. Ship faster."
```

Also add to the Quick Decision Tree:
```
├─ Contains em dash in copy? → WARNING. Rewrite without dash.
```

---

### 2. When to Break the Rules (New Section)

**File:** `references/review-rubric.md`

Add a new `## When to Break the Rules` section after the scoring categories. This acknowledges that rigid rule-following produces generic design. Good design knows when to deviate.

Content:

#### Typography
- **Display type can break weight/size limits.** A 96px ultra-light heading that violates the "no font-light" rule might be exactly right for a hero. If it creates clear hierarchy and serves the composition, it's valid.
- **Mixing a serif accent into a sans-serif system.** The ebook and linear-mercury preset both endorse this: one italic serif phrase in a hero headline adds personality without breaking consistency.
- **Exceeding 3 font weights** is acceptable when building a rich typographic composition (e.g., a pricing page with display, heading, body, caption, and label all visible).

#### Color
- **Third-party brand colors are exempt.** A Google sign-in button using Google's blue, or a GitHub icon in black, shouldn't trigger "hardcoded color" errors. Flag but don't fail.
- **The 60-30-10 ratio is a guideline, not a law.** A dark-mode hero section might be 90% dark / 10% accent with zero secondary color. If the visual hierarchy works, the ratio is serving you.
- **Accent overuse for emphasis.** If a section's entire purpose is to draw attention (a CTA banner, a sale callout), saturating it with accent color is intentional, not a violation.

#### Spacing
- **Optical alignment over grid alignment.** A `-1px` nudge to make text visually align with an icon is better design than staying on-grid. The ebook calls this out explicitly.
- **Breaking the grid for dramatic effect.** A hero section with `py-40` in a system that caps at `py-32` might be exactly right for the visual weight needed.

#### General
- **Breaking one rule to strengthen another.** If violating the spacing grid creates significantly better visual hierarchy, that's a net positive. The rubric should weigh the tradeoff, not just count violations.
- **Context matters.** Marketing pages have different rules than dashboards. A SaaS settings page and a landing page hero shouldn't be scored the same way.

**Scoring impact:** When a reviewer identifies an intentional rule-break that serves the design, it should not count as a violation. The review output should note it as "Intentional deviation — [reason]" rather than penalizing.

---

### 3. Ebook Design Principles Integration

#### 3a. Update `references/review-rubric.md` — Typography Category

Add ebook-derived criteria:

- **Line-height validation:** Body text (16-18px) should use 1.4-1.6x line-height. Headings (32px+) should use 1.1-1.2x. Flag values outside these ranges.
- **Typography naming awareness:** When reviewing design token usage, expect semantic naming patterns like `{level}-{size}-{weight}` (e.g., `body-m-semibold`). Flag raw size-based naming.
- **Weight-based hierarchy over size-based:** The ebook emphasizes that a weight change (regular → medium) can create hierarchy without size change. Flag designs that rely solely on size jumps.

#### 3b. Update `references/review-rubric.md` — Color Category

Add ebook-derived criteria:

- **60-30-10 distribution check:** Dominant color (background) ~60%, secondary (text/icons) ~30%, accent (brand/CTA) ~10%. Flag pages where accent exceeds ~15% of visible elements.
- **Semantic token naming:** Expect `fg-primary`, `fg-secondary`, `bg-base`, `bg-elevated`, `brand-strong`, `brand-subtle`, `border-subtle`, `border-strong` patterns. Flag raw values.
- **Dark background hierarchy:** On dark backgrounds, flag when all text/elements use the same color/weight. Must vary color and opacity for hierarchy (ebook: "Everything stands out, so nothing stands out").

#### 3c. Update `references/review-rubric.md` — Hierarchy Category

Add ebook-derived criteria:

- **Storytelling structure:** Does the page follow a logical narrative flow? (Problem → Solution → Proof → CTA). Flag pages with no clear narrative arc.
- **Visual direction consistency:** Elements should follow a consistent visual mood. Flag components that feel like they belong to a different site.

#### 3d. Update `references/guard-checks.md` — New Checks

Add Pattern Check:

**#16. Line-Height Ranges**
- **Severity:** Warning
- **Look for:** Body text with `leading-tight` or `leading-none`. Headings with `leading-loose` or `leading-relaxed`.
- **Fix:** Body (16-18px): use `leading-normal` to `leading-relaxed` (1.4-1.6x). Headings (32px+): use `leading-tight` to `leading-snug` (1.1-1.2x).

**#17. No Em Dashes in Copy** (from item 1 above)

**#18. Dark Background Text Hierarchy**
- **Severity:** Warning
- **Look for:** On dark backgrounds (`bg-gray-900`, `bg-black`, `bg-background` in dark mode), all text using the same foreground color/opacity
- **Fix:** Use opacity or color variation: primary text at full opacity, secondary at 70%, tertiary at 50%

Update Quick Decision Tree to include new checks.

#### 3e. Update Presets with Ebook Principles

Each preset gets minor additions where the ebook principles apply:

**`linear-mercury.md`:**
- Add line-height spec: Body `leading-normal` (1.5x at 14px). Headings `leading-tight` (1.1-1.2x).
- Add note about weight-based hierarchy being preferred over size-based.

**`stripe-vercel.md`:**
- Add line-height spec: Body `leading-relaxed` (1.6x at 16px). Headings `leading-tight`.
- Add 60-30-10 note: Dark bg is the 60%, text is 30%, gradient/accent is 10%.
- Add dark background hierarchy guidance.

**`apple-notion.md`:**
- Line-height already covered (1.7x body). Add heading line-height: `leading-tight` (1.2x).
- Add note about weight-based hierarchy (this preset already emphasizes it, make it explicit).

---

### 4. Sharpen Ecosystem Differentiation

#### 4a. Update `SKILL.md`

In the "Related Skills" or a new "Ecosystem" section, add guidance on how this plugin works alongside other skills:

- **RAMS (`rams`)**: Covers WCAG accessibility. Complementary — RAMS checks compliance, we check taste.
- **ui-skills (`baseline-ui`)**: Covers animation/typography/a11y baselines. Complementary — they enforce minimums, we enforce a specific aesthetic.
- **`web-interface-guidelines`**: Vercel's interaction/performance rules. Complementary — they cover behavior, we cover visual identity.
- **`deslop`**: Removes AI code slop. Complementary — they clean code style, we enforce design style.

Our unique value: **Project-specific aesthetic presets + design principles derived from professional practice.**

---

## Implementation Order

1. `guard-checks.md` — Add checks #16 (line-height), #17 (em dashes), #18 (dark bg hierarchy), update decision tree
2. `review-rubric.md` — Add "When to Break the Rules" section, add ebook criteria to Typography/Color/Hierarchy categories
3. `linear-mercury.md` — Add line-height specs, weight-hierarchy note
4. `stripe-vercel.md` — Add line-height specs, 60-30-10 note, dark bg hierarchy
5. `apple-notion.md` — Add heading line-height, weight-hierarchy note
6. `SKILL.md` — Add ecosystem positioning section

## Files Changed

- `references/guard-checks.md`
- `references/review-rubric.md`
- `presets/linear-mercury.md`
- `presets/stripe-vercel.md`
- `presets/apple-notion.md`
- `SKILL.md`
