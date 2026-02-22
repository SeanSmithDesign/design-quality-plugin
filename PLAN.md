# Comprehensive Plugin Plan v2

## Current State

The plugin (v1.1.0) has all core pieces built:
- 2 commands (`/design-brief`, `/design-review`)
- 1 skill (`design-quality`)
- 3 presets (`linear-mercury`, `stripe-vercel`, `apple-notion`)
- 2 reference files (`guard-checks.md` with 18 checks, `review-rubric.md` with 6 categories)
- Plugin manifest, README, LICENSE

Previous iteration added: TOCs, per-phase loading, ebook principles (line-height, weight hierarchy, 60-30-10, dark bg hierarchy), 3 new guard checks (em dashes, line-height ranges, dark bg text), "When to Break the Rules" section, ecosystem positioning.

## Source Material: Ebook Principles to Embed

The "Web Design Mastery" ebook (Parts 1-4) contains specific principles that should be embedded across the plugin. Here's the full mapping:

### From Part 2: Essential Skills — Psychology

| Principle | What It Says | Where It Goes |
|-----------|-------------|---------------|
| **Fitts' Law** | Larger, closer targets are easier to hit. Primary actions should be the biggest interactive element. | Guard check #5 (touch targets) already covers minimums. **Add to `/design-direction`**: when recommending presets for dashboards, note Fitts' Law — primary actions need sizing dominance. **Add to review rubric** Hierarchy category: "Primary CTA is the largest interactive target in its section." |
| **Hick's Law** | More choices = longer decision time. Reduce options, group related items. | **Add to `/design-direction`**: inform preset choice — dashboards need Hick's Law reduction (linear-mercury's minimal aesthetic). Marketing pages can have more visual complexity. **Add to guard checks** as new Suggestion #19: "More than 5-7 ungrouped equal-weight choices in a section." |
| **Zeigarnik Effect** | People remember incomplete tasks. Progress indicators, breadcrumbs, and onboarding flows keep users engaged. | **Add to review rubric** Polish category: "Multi-step flows have progress indicators." **Add to `/design-brief`** component patterns section: mention progress indicators for multi-step flows. |

### From Part 3: Web Design SOP

| Principle | What It Says | Where It Goes |
|-----------|-------------|---------------|
| **ICP (Ideal Customer Profile)** | Design decisions should be informed by who the user is — demographics, psychographics, pain points, goals. | **`/design-direction` core input**: Ask about target audience before recommending a preset. A B2B SaaS for enterprise → linear-mercury. A consumer fintech → stripe-vercel. A personal productivity tool → apple-notion. |
| **Visual Direction Process** | Moodboard → style tiles → aesthetic exploration before committing to a direction. Gather references, identify patterns, narrow to a direction. | **`/design-direction` execution flow**: The command IS the visual direction step. Walk through: gather references → identify aesthetic patterns → map to preset → recommend. The ebook's moodboard process becomes the preset selection workflow. |
| **Storytelling & Copywriting** | Features → Benefits → Headlines. Core messaging hierarchy. Problem → Solution → Proof → CTA flow. | **`/design-brief`** should include a **Page Narrative** section for marketing presets (stripe-vercel): "Structure content as Problem → Solution → Proof → CTA." **Review rubric** Hierarchy category already has "narrative flow" — strengthen with specific patterns per preset. |
| **Website Structure** | Sitemap, hierarchy, navigation patterns should match content architecture. | **`/design-brief`** should reference page structure patterns from the preset. Linear-mercury: sidebar + content. Stripe-vercel: hero → sections. Apple-notion: content-first with minimal nav. |
| **Discovery Process** | Understand client goals, business objectives, and competitive landscape before designing. | **`/design-direction`**: Include "What are the project's primary goals?" as part of the questionnaire. Goals → aesthetic mapping (trust = stripe-vercel, efficiency = linear-mercury, simplicity = apple-notion). |

### From Part 4: Design Essentials — Colors

| Principle | What It Says | Where It Goes |
|-----------|-------------|---------------|
| **Color Schemes** | Monochromatic, analogous, complementary, triadic, split-complementary, tetradic. Each creates a different emotional effect. | **`/design-direction`**: When recommending presets, explain the color scheme type. Linear-mercury = monochromatic (neutral + one accent). Stripe-vercel = complementary/analogous (dark + vibrant accent). Apple-notion = monochromatic (near-monochrome). |
| **Color Psychology** | Red = energy/urgency, Blue = trust/stability, Green = growth/health, Purple = premium/creative, Orange = friendly/confident, Black = sophisticated/powerful. | **`/design-direction`**: After choosing a preset, recommend accent color based on psychology + project goals. "For a fintech dashboard, blue signals trust" → copper/blue for linear-mercury. **`/design-brief`**: Include color psychology note in the Color section. |
| **60-30-10 Rule** | 60% dominant (background), 30% secondary (text/icons), 10% accent. Creates balanced, professional color distribution. | Already in stripe-vercel preset and review rubric Color category. **Strengthen in `/design-brief`**: Make 60-30-10 distribution explicit in every brief's Color section with preset-specific ratios (linear-mercury: 90/8/2, stripe-vercel: 60/30/10, apple-notion: 85/12/3). |
| **Common Color Mistakes** | Using too many colors, poor contrast, ignoring color blindness, inconsistent palette. | Already covered in guard checks #1-3 and review rubric. No change needed. |
| **Gradient Theory** | Use 2-3 stops, follow the color wheel for harmonious gradients, avoid muddy combinations. | **Presets**: stripe-vercel already allows gradients. **`/design-brief`**: For stripe-vercel, include gradient guidance: "2-3 stops, harmonious direction (adjacent on color wheel)." |

### From Part 4: Design Essentials — Typography

| Principle | What It Says | Where It Goes |
|-----------|-------------|---------------|
| **Typographic Levels** | Display, Heading, Subheading, Body, Caption — a system of 5 levels creates clear hierarchy. | **`/design-brief`**: Output the 5-level type system from the active preset (already in preset files as H1-H4 + Body + Labels). Make the level names explicit: "Display (hero only) → Heading → Subheading → Body → Caption." |
| **Typescale Ratios** | 1.25 (Major Third), 1.333 (Perfect Fourth), 1.5 (Perfect Fifth). Each ratio creates different rhythm — tighter for dense UIs, wider for editorial. | **`/design-brief`**: Include the typescale ratio for the active preset. Linear-mercury: ~1.25 (compact). Stripe-vercel: ~1.333 (confident). Apple-notion: ~1.25 (subtle). **Presets**: Add explicit typescale ratio to each preset's Typography section. |
| **Line-Height Rules** | Body: 1.4-1.6x. Headings: 1.1-1.2x. Tighter line-height as font size increases. | Already in guard check #12 and all 3 presets. No change needed. |
| **Weight Hierarchy** | Use weight changes (regular → medium → semibold → bold) to create hierarchy without changing font size. | Already in presets (especially apple-notion). Already in review rubric Typography category. No change needed. |
| **Responsive Typography** | Type sizes should scale with viewport. Headings reduce more than body on mobile. | **`/design-brief`**: Add responsive note: "Headings scale down 1-2 steps on mobile. Body stays at text-base." **Guard checks**: New Suggestion #20: "Heading sizes don't adapt at mobile breakpoints." |
| **Kerning & Tracking** | Tight tracking for headings (tracking-tight), normal for body, wider for labels/caps. | Already in presets. No change needed. |

### From Part 4: Design Essentials — Grids & Layout

| Principle | What It Says | Where It Goes |
|-----------|-------------|---------------|
| **8px Grid System** | All spacing derives from 8px base. 4px sub-grid for fine adjustments. | Already in guard check #8 and all 3 presets. No change needed. |
| **12-Column Grid** | Standard responsive column grid with gutters. | **`/design-brief`**: For web projects, include layout grid guidance: "12-column grid, `gap-6` gutters, max-width container." |
| **Responsive Breakpoints** | sm (640px), md (768px), lg (1024px), xl (1280px). Content reflows at each. | **`/design-brief`**: Include breakpoint-aware notes: "Cards: 3-col on lg, 2-col on md, 1-col on sm." |

### From Part 4: High-Converting Landing Page Structure

| Principle | What It Says | Where It Goes |
|-----------|-------------|---------------|
| **Section Ordering** | Hero → Social Proof → Features/Benefits → Testimonials → CTA. Proven conversion pattern. | **`/design-brief`**: For stripe-vercel (marketing preset), include page structure: "Hero → Social proof → Features → Testimonials → CTA." **`/design-direction`**: When recommending stripe-vercel, mention this structure. |
| **Hero Best Practices** | Clear headline, supporting subhead, single CTA, relevant visual. Above the fold. | **`/design-brief`**: For marketing presets, include hero section spec from preset (font sizes, spacing, CTA styling). |

---

## What's Missing in the Plugin

### 1. No `/design-direction` Command

**The gap:** `/design-brief` generates constraints from an *already-chosen* preset. But there's no step for **choosing the right aesthetic direction** in the first place.

**Current flow:** User picks a preset (somehow) → `/design-brief` → code → `/design-review`

**Complete flow:** `/design-direction` (choose/define aesthetic) → `/design-brief` (generate constraints) → code → `/design-review` (score + fix)

**Ebook source:** This command IS the "Visual Direction" step from Part 3 of the ebook, combined with the ICP research and discovery process. The ebook says: gather references → identify patterns → narrow to a direction. The command translates that into: ask about project + audience → analyze references → map to preset → recommend.

**Psychology integration:** Fitts' Law and Hick's Law from Part 2 inform the preset recommendation. Dashboard UIs need Hick's Law reduction (fewer choices, cleaner layout → linear-mercury). Marketing pages can handle more visual drama (stripe-vercel). Consumer apps need effortless flow (apple-notion).

### 2. `/design-brief` Missing Ebook Depth

**Current state:** The brief outputs Typography, Color, Spacing, Elevation, Motion, and Component Patterns from the preset. This is correct but shallow — it's just reading the preset file.

**What's missing from the ebook:**
- **Typescale ratio** — Each preset should specify its ratio (1.25, 1.333, etc.) and the brief should include it
- **Color psychology** — Brief should note WHY the preset's accent color works for the project type
- **60-30-10 distribution** — Should be explicit with preset-specific ratios
- **Page narrative structure** — For marketing presets, include Problem → Solution → Proof → CTA
- **Layout grid** — 12-column grid, responsive breakpoints, container max-widths
- **Responsive typography** — How heading sizes scale down on mobile
- **Gradient guidance** — For stripe-vercel, include gradient rules (2-3 stops, color harmony)
- **Progress indicators** — For multi-step flows (Zeigarnik Effect)

### 3. Guard Checks Missing 2 Ebook Principles

Current: 18 checks. After: 20 checks.

| New Check | Source | Severity |
|-----------|--------|----------|
| **#19: Choice Overload** | Hick's Law (Part 2) | Suggestion — "More than 7 ungrouped equal-weight options in a section. Group into categories or reduce." |
| **#20: Non-Responsive Headings** | Responsive Typography (Part 4) | Suggestion — "Heading sizes don't change at mobile breakpoints (no `sm:`, `md:`, `lg:` responsive variants on headings)." |

### 4. Review Rubric Additions

| Category | Addition | Source |
|----------|----------|--------|
| **Hierarchy** | "Primary CTA is the largest interactive target in its section" (Fitts' Law) | Part 2 |
| **Hierarchy** | Strengthen narrative flow with preset-specific patterns | Part 3 storytelling |
| **Polish** | "Multi-step flows have progress indicators" (Zeigarnik Effect) | Part 2 |

### 5. Preset Enhancements

Each preset's Typography section should add an explicit **Typescale Ratio** line:
- `linear-mercury`: ~1.25 (Major Third) — compact, functional
- `stripe-vercel`: ~1.333 (Perfect Fourth) — confident, generous
- `apple-notion`: ~1.25 (Major Third) — subtle, understated

### 6. SKILL.md Missing `/design-direction`

- Add to Related Skills table
- Add 2 proactive triggers (no config detected, user asks about style)
- Update Workflow Integration table

### 7. README Missing `/design-direction`

- Add to command table (now 3 commands)
- Update workflow diagrams (Full Pipeline and Minimal Pipeline)
- Add usage section

### 8. Test Project Doesn't Prove the Flow

The test project needs a before/after demonstration of the complete direction → brief → build → review → fix → re-review flow.

### 9. plugin.json Version Bump

v1.1.0 → v1.2.0 (new command + ebook enhancements)

---

## Implementation Plan

### Step 1: Create `/design-direction` command

**File:** `plugins/design-quality/commands/design-direction.md`

Ebook principles embedded:
- **Visual Direction process** (Part 3) → the guided walkthrough
- **ICP research** (Part 3) → target audience questions
- **Discovery** (Part 3) → project goals → aesthetic mapping
- **Color psychology** (Part 4) → accent color recommendation
- **Color schemes** (Part 4) → explain scheme type per preset
- **Fitts' Law + Hick's Law** (Part 2) → inform preset recommendation rationale
- **Landing page structure** (Part 4) → mention for marketing presets

```markdown
---
name: design-direction
description: "Choose your project's aesthetic direction. Walks through project type, audience, and goals to recommend the right preset."
argument-hint: "[optional: project type or reference URL]"
---

# Design Direction

Guide the user to the right aesthetic preset using the Visual Direction process.

## Setup

1. Read CLAUDE.md for existing `## Design Quality` section
2. Load the preset system overview from the design-quality skill

## Execution

### If `## Design Quality` section already exists:
Show the current preset, its philosophy, and ask if they want to change it.

### If no config exists, walk through:

**1. Project Type**
Ask: "What are you building?"
- SaaS dashboard / admin panel / dev tool → leans linear-mercury
- Marketing site / landing page / portfolio → leans stripe-vercel
- Consumer app / content tool / note-taking → leans apple-notion

**2. Target Audience (ICP)**
Ask: "Who is the primary user?"
- Technical/professional users who value efficiency → linear-mercury
- Prospects/visitors who need to be impressed and trust the brand → stripe-vercel
- Everyday users who want simplicity and calm → apple-notion

**3. Emotional Tone**
Ask: "What should the interface feel like?"
- Clean, fast, no-nonsense → linear-mercury
- Premium, polished, confident → stripe-vercel
- Simple, calm, invisible → apple-notion

**4. Reference Sites** (optional)
If user provides URLs or CLAUDE.md has Reference URLs, analyze them for:
- Color density (minimal vs rich)
- Typography confidence (subtle vs bold)
- Elevation approach (flat vs layered)
- Motion style (functional vs choreographed)

**5. Recommend a Preset**
Based on answers, recommend a preset with:
- 1-2 sentence rationale linking project type + audience + tone to preset philosophy
- Color psychology note: why the preset's accent approach fits (e.g., "Copper signals warmth and trust for financial products")
- Color scheme type: monochromatic (linear-mercury, apple-notion) or complementary (stripe-vercel)
- Key Hick's Law or Fitts' Law note if relevant (e.g., "Dashboard UI benefits from Hick's Law reduction — linear-mercury's minimal aesthetic reduces decision fatigue")
- For marketing sites: mention the proven section structure (Hero → Social Proof → Features → Testimonials → CTA)

If close call between two presets, show side-by-side comparison table.

### If argument provided:
Treat as project type or URL reference and skip directly to recommendation.

## Output

- Preset recommendation with rationale
- Comparison table if close call
- Offer to update CLAUDE.md with chosen preset + any reference URLs
- Next step: "Run `/design-brief` to generate detailed style constraints."
```

### Step 2: Update `/design-brief` with ebook depth

**File:** `plugins/design-quality/commands/design-brief.md`

Changes:
- Fix setup step 2 (remove old standalone skill path)
- Add "If you haven't chosen a preset yet, run `/design-direction` first."
- Add **Typescale** section to output (ratio + 5 typographic levels)
- Add **Color Psychology** note to Color section
- Add **60-30-10 Distribution** with preset-specific ratios to Color section
- Add **Layout Grid** section (12-column, responsive breakpoints, container widths)
- Add **Page Narrative** section for marketing presets (Problem → Solution → Proof → CTA)
- Add **Responsive** notes (heading scaling on mobile)
- Add **Gradient Guidance** for stripe-vercel
- Add **Progress Indicators** note for multi-step flows (Zeigarnik Effect)

Updated output structure:
```markdown
## Style Brief (Preset: [name])

### Typography
[Preset rules]
**Typescale:** [ratio] (e.g., 1.25 Major Third)
**Levels:** Display → Heading → Subheading → Body → Caption
**Responsive:** Headings scale down 1-2 steps on mobile. Body stays text-base.

### Color
[Preset rules]
**Psychology:** [Why this accent works for the project]
**Distribution:** [60-30-10 with preset-specific ratios]
**Gradients:** [If stripe-vercel: 2-3 stops, adjacent on color wheel]

### Spacing
[Preset rules]

### Layout
**Grid:** 12-column, [gap] gutters, max-w-7xl container
**Responsive:** Cards 3→2→1 col at lg→md→sm
**Breakpoints:** sm:640 / md:768 / lg:1024 / xl:1280

### Elevation
[Preset rules]

### Motion
[Preset rules]

### Component Patterns
[Preset patterns]
**Multi-step flows:** Progress indicator (Zeigarnik Effect)

### Page Structure (marketing presets only)
Hero → Social Proof → Features/Benefits → Testimonials → CTA

### Do / Don't
[Code examples from preset]
```

### Step 3: Add 2 new guard checks

**File:** `plugins/design-quality/skills/design-quality/references/guard-checks.md`

Add to Judgment Checks section:

```markdown
### 19. Choice Overload (Hick's Law)
**Severity:** Suggestion
**Look for:** More than 7 ungrouped equal-weight options (buttons, cards, nav items) in a single section
**Fix:** Group into categories, use visual hierarchy to reduce cognitive load, or paginate
```

```markdown
### 20. Responsive Heading Sizes
**Severity:** Suggestion
**Look for:** Large headings (text-3xl+) with no responsive variants (no `md:text-*` or `lg:text-*`)
**Fix:** Add responsive sizing: `text-2xl md:text-3xl lg:text-4xl`
```

Update TOC and Quick Decision Tree to include #19 and #20.

### Step 4: Update review rubric

**File:** `plugins/design-quality/skills/design-quality/references/review-rubric.md`

Add to **Hierarchy** Pass Criteria:
- `[ ] Primary CTA is the largest interactive target in its section (Fitts' Law)`

Add to **Hierarchy** Common Violations:
| Too many equal-weight choices | Suggestion | 8 navigation items with identical styling (Hick's Law) |

Add to **Polish** Pass Criteria:
- `[ ] Multi-step flows have progress indicators (Zeigarnik Effect)`

Add to **Polish** Common Violations:
| Missing progress indicator | Suggestion | 4-step checkout with no visual progress |

### Step 5: Add typescale ratios to presets

**Files:** All 3 preset files

Add to each preset's Typography section, after the heading hierarchy:

- **linear-mercury:** `**Typescale:** ~1.25 (Major Third) — compact, functional rhythm`
- **stripe-vercel:** `**Typescale:** ~1.333 (Perfect Fourth) — confident, generous spacing between levels`
- **apple-notion:** `**Typescale:** ~1.25 (Major Third) — subtle, understated rhythm`

### Step 6: Update SKILL.md

**File:** `plugins/design-quality/skills/design-quality/SKILL.md`

Changes:
- Add `/design-direction` to Related Skills table
- Add 2 proactive triggers:

| You Detect | Recommend | How to Say It |
|------------|-----------|---------------|
| New project with no `## Design Quality` in CLAUDE.md | `/design-direction` | "No design preset configured. Run `/design-direction` to choose an aesthetic direction." |
| User asks "what style should I use?" or discusses aesthetic options | `/design-direction` | "Run `/design-direction` to explore preset options for your project." |

- Update Workflow Integration table to include `/design-direction` at brainstorm stage

### Step 7: Update README.md

- Command table: 2 → 3 commands, add `/design-direction`
- Add usage section for `/design-direction` (when to use, what it does)
- Update Full Pipeline diagram: add `/design-direction` before `/design-brief`
- Update Minimal Pipeline: `direction → brief → code → review`
- Update "Without Compound Engineering" section to show 3 commands

### Step 8: Bump version

- `plugin.json` → version `1.2.0`
- Update description: "3 commands, 1 skill, and 3 aesthetic presets"

### Step 9: Rebuild test project

Replace current test project with a real end-to-end flow:

1. **test-project/CLAUDE.md** — Start with no Design Quality section
2. Document `/design-direction` → choose linear-mercury for a weather dashboard
3. Document `/design-brief` → generate constraints
4. **test-project/components/weather-dashboard-before.tsx** — Intentional violations:
   - Hardcoded hex colors (`#3B82F6`, `text-white`)
   - Off-grid spacing (`p-5`, `gap-3.5`)
   - Missing aria-labels on icon buttons
   - No transitions on hover states
   - Em dashes in copy
   - Uniform `text-white` on dark backgrounds
   - No responsive heading sizes
   - 8+ ungrouped nav items
5. Document `/design-review` → guard findings + score (~45-55)
6. **test-project/components/weather-dashboard.tsx** — Fixed version (90+)
7. **test-project/REVIEW.md** — Full documented run with before/after

---

## Token Budget Check

| File | Current Lines | After Changes | Status |
|------|--------------|---------------|--------|
| `SKILL.md` | 146 | ~160 | Safe (limit 500) |
| `design-direction.md` (new) | 0 | ~80 | New command file |
| `design-brief.md` | 66 | ~90 | Expanded with ebook depth |
| `design-review.md` | 91 | 91 | No change |
| `guard-checks.md` | 193 | ~210 | +2 checks |
| `review-rubric.md` | 222 | ~230 | +4 criteria |
| `linear-mercury.md` | 174 | ~176 | +typescale line |
| `stripe-vercel.md` | 159 | ~161 | +typescale line |
| `apple-notion.md` | 176 | ~178 | +typescale line |
| `README.md` | 308 | ~350 | +direction command |
| `plugin.json` | 23 | 23 | Version bump only |

---

## Files Changed

| File | Change | Ebook Source |
|------|--------|-------------|
| `commands/design-direction.md` | **NEW** — Design direction command | Part 3 Visual Direction, ICP, Discovery; Part 2 psychology; Part 4 color psychology/schemes |
| `commands/design-brief.md` | Expand with typescale, color psychology, 60-30-10, layout grid, page narrative, responsive notes | Part 4 typography/colors/grids/landing page; Part 3 storytelling; Part 2 Zeigarnik |
| `skills/design-quality/SKILL.md` | Add direction to Related Skills + Proactive Recommendations | — |
| `references/guard-checks.md` | +2 checks: choice overload (Hick's Law), responsive headings | Part 2 Hick's Law; Part 4 responsive typography |
| `references/review-rubric.md` | +Fitts' Law in Hierarchy, +progress indicators in Polish | Part 2 Fitts' Law, Zeigarnik Effect |
| `presets/linear-mercury.md` | +typescale ratio | Part 4 typescale |
| `presets/stripe-vercel.md` | +typescale ratio | Part 4 typescale |
| `presets/apple-notion.md` | +typescale ratio | Part 4 typescale |
| `README.md` | Add direction command, update workflows | — |
| `.claude-plugin/plugin.json` | Version 1.2.0 | — |
| `test-project/*` | Full end-to-end flow rebuild | — |

## Implementation Order

1. Create `design-direction.md` command (ebook Visual Direction + ICP + psychology)
2. Expand `design-brief.md` (ebook typography/color/layout depth)
3. Add 2 guard checks (Hick's Law + responsive headings)
4. Update review rubric (Fitts' Law + Zeigarnik Effect criteria)
5. Add typescale ratios to all 3 presets
6. Update `SKILL.md` (direction triggers + workflow)
7. Update `README.md` (3 commands + updated workflows)
8. Bump `plugin.json` to v1.2.0
9. Rebuild test project with full end-to-end flow
10. Commit and push
