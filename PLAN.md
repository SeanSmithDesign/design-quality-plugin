# Comprehensive Plugin Plan

## Overview

This plan covers the **entire** design-quality plugin — every file, every source, every principle. Not just new additions, but a full audit of what exists, what needs to change, and why.

---

## Sources

Everything we're pulling from:

### 1. Web Design Mastery Ebook (Parts 1-4)
- **Part 2**: Psychology — Fitts' Law, Hick's Law, Zeigarnik Effect
- **Part 3**: Web Design SOP — Visual Direction process, ICP research, Discovery, Storytelling & Copywriting (Features → Benefits → Headlines), Website Structure
- **Part 4**: Design Essentials — Color theory/schemes/psychology/60-30-10/gradients, Typography (typescale ratios, line-height, weight hierarchy, responsive), Grids & Layout, High-converting Landing Page Structure, Zoom-In Method

### 2. Anti-Vibe Coding Philosophy
The concept that "vibe coding" — letting AI generate UI with no aesthetic constraints — produces generic, tasteless, samey interfaces. This plugin is the antidote: intentional design decisions captured before coding begins, enforced during coding, and verified after. Anti-vibe coding means every UI choice is deliberate, not default.

### 3. Golden Ratio (1.618)
The mathematical proportion found throughout nature and classical design. Applications:
- **Typescale**: 1.618 as a ratio option (more dramatic than 1.333 Perfect Fourth)
- **Layout proportions**: Sidebar:content at ~38:62, image:text areas, hero split ratios
- **Spacing relationships**: Section padding ratios, content block proportions
- **Composition**: Focal point placement using golden spiral/grid

### 4. Best Practices on Length & Structure
Content and copy guidelines:
- **Headlines**: 6-12 words, front-load the value
- **Subheadlines**: 15-25 words, expand on the headline
- **Body paragraphs**: 2-4 sentences per block, scannable
- **CTAs**: 2-5 words, action-oriented verb first ("Start building", not "Click here")
- **Section depth**: Each page section should have one clear purpose — don't overload
- **Information density**: Match density to project type (dashboards = high density, marketing = low density)

### 5. Discussion Context
- The plugin exists to solve the "taste bottleneck" in AI-assisted UI development
- Workflow: direction → brief → build → review → fix → re-review
- Token budget awareness (SKILL.md < 500 lines, references need TOCs over 100 lines)
- Consistent file structure across all plugin components
- Ecosystem positioning (complementary to rams, baseline-ui, deslop, web-interface-guidelines)

---

## File-by-File Audit and Changes

### Root Files

#### `.claude-plugin/plugin.json` (root)
**Current state**: v1.0.0, author URL points to `DT-Funding-Solutions`
**Change**: Sync version to 1.2.0, update author URL to `SeanSmithDesign` to match `plugins/design-quality/.claude-plugin/plugin.json`

#### `.claude-plugin/marketplace.json`
**Current state**: Says "2 commands" and v1.0.0
**Change**: Update to "3 commands" and v1.2.0

#### `README.md` (330 lines)
**Current state**: Already updated with 3 commands, direction usage section, updated workflows, 20 guard checks
**Changes needed**:
- **Add Anti-Vibe Coding to Philosophy section** — Reframe the philosophy around this concept. The current quote "AI amplified the one skill which I ignored: developing taste" is good but needs the anti-vibe coding framing: the plugin is the antidote to vibe-coded UIs
- **Add Golden Ratio mention** — In the preset details or a design principles section, mention golden ratio applications (layout proportions, typescale option)
- **Add content length best practices** — Brief mention in the "What's Checked" or a new section about what the plugin covers beyond just visual styling
- **Fix**: Philosophy section could be stronger and more distinctive

#### `PLAN.md`
**Current state**: The plan you're reading now. Will be removed after implementation is complete.

#### `Design skill resources.zip`
**Current state**: Exists in repo root
**Change**: None — source material archive

#### Ebook PDFs (4 files)
**Current state**: Exist in repo root
**Change**: None — source material

---

### Plugin Core: `plugins/design-quality/`

#### `.claude-plugin/plugin.json`
**Current state**: v1.2.0, description says "3 commands, 1 skill, and 3 aesthetic presets", author is SeanSmithDesign
**Change**: None — already correct

#### `LICENSE`
**Current state**: MIT, copyright "DT Funding Solutions"
**Change**: Update copyright to "Sean Smith" to match the plugin author everywhere else

---

### Commands: `plugins/design-quality/commands/`

#### `design-direction.md` (112 lines) — NEW in this iteration
**Current state**: Already created. Walks through Project Type → Target Audience → Emotional Tone → Reference Sites → Recommendation with Hick's Law, Fitts' Law, color psychology, color scheme types.
**Changes needed**:
- **Add Anti-Vibe Coding framing** — The opening should frame why direction matters: "This is the anti-vibe coding step. Instead of letting AI pick defaults, you're making intentional aesthetic choices." The recommendation should reinforce this: "This preset replaces generic AI defaults with [specific aesthetic philosophy]."
- **Add Golden Ratio** — In the Recommendation section, when relevant, mention golden ratio as a layout principle. For `stripe-vercel` (marketing): "Hero section uses ~62:38 golden ratio split for text:visual." For `apple-notion` (consumer): "Content areas use golden ratio proportions for reading comfort."
- **Add content structure guidance** — After recommending a preset, include a note about content density expectations: "Dashboard UIs are information-dense. Marketing pages are scannable with short copy blocks."

#### `design-brief.md` (113 lines) — EXPANDED in this iteration
**Current state**: Already expanded with typescale ratios, color psychology, 60-30-10 distribution, layout grid, responsive notes, page structure, Zeigarnik Effect.
**Changes needed**:
- **Add Golden Ratio section** — New section (between Layout and Elevation, or as part of Layout):
  - Layout proportions: sidebar:content ~38:62
  - Hero split: text:visual at golden ratio
  - Available as typescale option: ~1.618 (Golden Section)
- **Add Content Length & Copy Structure section** — New section (after Page Structure):
  - Headlines: 6-12 words
  - Subheadlines: 15-25 words
  - Body paragraphs: 2-4 sentences, scannable
  - CTAs: 2-5 words, verb-first
  - Section principle: one purpose per section
  - Density note per preset (dashboard = dense, marketing = airy, consumer = moderate)
- **Add Anti-Vibe Coding opening** — Brief note at the top: "This brief replaces AI defaults with intentional constraints. Every rule below is a deliberate choice, not a fallback."

#### `design-review.md` (91 lines) — MINOR UPDATE in this iteration
**Current state**: Already updated suggestions line to include Hick's Law and responsive headings.
**Changes needed**:
- **Add content/copy checks to Phase 2 scoring** — Under Hierarchy category, mention narrative structure and copy length as part of the score. "Does copy follow headline → subheadline → body → CTA structure?"
- **Add golden ratio mention** — In Phase 2 Hierarchy scoring: "Layout proportions feel balanced (golden ratio or intentional deviation)"

---

### Skill: `plugins/design-quality/skills/design-quality/`

#### `SKILL.md` (149 lines)
**Current state**: Already updated with 3 commands in Related Skills, 2 new proactive triggers for `/design-direction`, updated workflow integration.
**Changes needed**:
- **Anti-Vibe Coding philosophy** — Replace or expand the opening line "Taste is the bottleneck, not execution" with anti-vibe coding framing. Something like: "Taste is the bottleneck, not execution. Vibe-coded UIs default to generic aesthetics. This skill captures intentional design decisions so every AI-generated component inherits them automatically — the antidote to vibe coding."
- **Fix stale path** — Step 1 still references `~/.claude/skills/design/design-quality/presets/<name>.md`. This is the old standalone skill path. Should reference the plugin path or be generic: "Load the preset from the plugin's `presets/<name>.md`."
- **Fix version in frontmatter** — Still says `version: 1.1.0`, should be `1.2.0`
- **Golden Ratio in preset system** — Add a note in the Custom Presets section that presets can specify golden ratio proportions for layout

---

### Presets: `plugins/design-quality/skills/design-quality/presets/`

All 3 presets already have typescale ratios added from this iteration.

#### `linear-mercury.md` (176 lines)
**Current state**: Complete preset with TOC, typescale ~1.25.
**Changes needed**:
- **Golden Ratio note** — In Spacing or a new Layout section: "Sidebar:content layouts follow ~38:62 golden ratio proportion."
- **Content density note** — Brief note: "This preset supports high information density. Copy is concise: labels over sentences, data over descriptions."

#### `stripe-vercel.md` (161 lines)
**Current state**: Complete preset with TOC, typescale ~1.333.
**Changes needed**:
- **Golden Ratio as typescale option** — Note that 1.618 (Golden Section) is available for dramatic hero typography: "For impactful hero sections, the golden ratio typescale (~1.618) can replace the default 1.333."
- **Golden Ratio in layout** — "Hero sections use ~62:38 golden ratio split for text:visual composition."
- **Content length guidance** — "Headlines: 6-12 words, front-load value. Subheadlines: 15-25 words. CTAs: 2-5 words, verb-first. Body: short paragraphs (2-4 sentences), scannable."

#### `apple-notion.md` (178 lines)
**Current state**: Complete preset with TOC, typescale ~1.25.
**Changes needed**:
- **Golden Ratio in content area** — "Content areas use golden ratio proportions for optimal reading comfort. Max-width containers at ~65ch (the golden ratio of a standard line length)."
- **Content length guidance** — "Copy is minimal. Headlines are statements, not descriptions. Body text earns every word. If a sentence doesn't serve the user, delete it."

---

### References: `plugins/design-quality/skills/design-quality/references/`

#### `guard-checks.md` (211 lines, 20 checks)
**Current state**: Already updated with #19 (Hick's Law choice overload) and #20 (responsive heading sizes), TOC updated, decision tree updated.
**Changes needed**:
- **Add content/copy check** — New Suggestion #21: "AI-default copy patterns" — Look for: generic marketing copy ("Unlock the power of...", "Revolutionize your..."), em dashes (already #7 but this is broader), excessively long headlines, missing CTAs. This is the anti-vibe coding check for content.
- **Add golden ratio layout check** — New Suggestion #22: "Layout proportion balance" — Look for: Hero sections with no clear text:visual ratio. Sidebar layouts with equal-width columns instead of ~38:62 proportion. This is a judgment check.
- **Update TOC and decision tree** for #21 and #22

#### `review-rubric.md` (228 lines, 6 categories)
**Current state**: Already updated with Fitts' Law in Hierarchy, Hick's Law in Hierarchy violations, Zeigarnik Effect in Polish.
**Changes needed**:
- **Add content quality to Hierarchy** — New pass criteria: "Copy follows appropriate length conventions (headlines 6-12 words, CTAs 2-5 words, body scannable)"
- **Add golden ratio to Hierarchy** — New pass criteria: "Layout proportions are intentional (golden ratio or deliberate deviation)"
- **Add anti-vibe coding check to Typography** — New violation: "Generic AI copy patterns" | Suggestion | "Unlock the power of..." headline with no specificity
- **Potentially add a 7th category: Content/Copy** — OR fold content quality into Hierarchy. Need to decide: adding a 7th category changes the scoring math (6 x ~17 = ~100 vs 7 x ~14 = ~100). Keeping at 6 categories and folding into Hierarchy is simpler.

---

### Test Project: `test-project/`

#### `CLAUDE.md`
**Current state**: Updated to reference `/design-direction` flow.
**Change**: None needed

#### `REVIEW.md` (165 lines)
**Current state**: Already rebuilt with full direction → brief → build → review → fix → re-review flow. Shows 41→94 score improvement.
**Changes needed**:
- **Update guard check count** — Currently says "Phase 1: Guard (20 checks)" — will need to say 22 if we add #21 and #22
- **Add examples of new checks** — Show #21 (AI-default copy) and #22 (golden ratio layout) in the before/after

#### `components/weather-dashboard-before.tsx`
**Current state**: Intentional violations version (hardcoded colors, off-grid, no aria-labels, etc.)
**Changes needed**:
- **Add AI-default copy violation** — Use generic copy like "Unlock your weather insights" or em-dash-heavy descriptions
- **Add layout proportion violation** — Equal-width columns instead of golden ratio proportion

#### `components/weather-dashboard.tsx` (230 lines)
**Current state**: Clean version passing all checks at 94/100.
**Changes needed**:
- **Fix copy to demonstrate good content** — Short, specific labels. No generic phrases.
- **Add golden ratio proportion** — If applicable to the dashboard layout

#### `app/` (empty directory)
**Current state**: Empty
**Change**: None — placeholder for Next.js app dir

---

## New Concepts: Detail

### Anti-Vibe Coding (thread throughout)

This isn't a single file change — it's a philosophical thread woven through:

| File | How It Appears |
|------|---------------|
| `SKILL.md` opening | "The antidote to vibe coding" framing |
| `design-direction.md` | Why choosing direction matters vs. accepting defaults |
| `design-brief.md` | "These are intentional constraints, not AI fallbacks" |
| `guard-checks.md` #21 | Catch AI-default copy patterns |
| `review-rubric.md` | Content quality as part of scoring |
| `README.md` Philosophy | Position the plugin as anti-vibe coding tool |

### Golden Ratio (targeted additions)

| File | How It Appears |
|------|---------------|
| `design-direction.md` | Mention in recommendation for layout-heavy projects |
| `design-brief.md` | New layout proportions section + typescale option |
| `stripe-vercel.md` | Hero split ratio, optional 1.618 typescale |
| `apple-notion.md` | Content area proportions, ~65ch line length |
| `linear-mercury.md` | Sidebar:content ratio |
| `guard-checks.md` #22 | Layout proportion balance check |
| `review-rubric.md` | Hierarchy pass criteria |

### Content Length & Structure (new dimension)

| File | How It Appears |
|------|---------------|
| `design-brief.md` | New "Content & Copy" section with length rules per preset |
| `design-direction.md` | Content density note in recommendation |
| `stripe-vercel.md` | Marketing copy best practices |
| `apple-notion.md` | Minimal copy philosophy |
| `linear-mercury.md` | Data-first, labels over sentences |
| `guard-checks.md` #21 | AI-default copy pattern detection |
| `review-rubric.md` | Copy quality folded into Hierarchy scoring |

---

## Implementation Order

1. Update `SKILL.md` — anti-vibe coding philosophy, fix stale path, fix version
2. Update `design-direction.md` — anti-vibe framing, golden ratio, content density
3. Update `design-brief.md` — golden ratio section, content/copy section, anti-vibe opening
4. Update all 3 presets — golden ratio notes, content length guidance per preset
5. Update `guard-checks.md` — add #21 (AI-default copy) and #22 (golden ratio layout)
6. Update `review-rubric.md` — content quality and golden ratio in Hierarchy
7. Update `design-review.md` — content/copy and golden ratio mentions in scoring
8. Update `README.md` — anti-vibe coding philosophy, golden ratio, content mentions
9. Fix root `.claude-plugin/plugin.json` — sync version, fix author URL
10. Fix `.claude-plugin/marketplace.json` — sync version, fix description
11. Fix `LICENSE` — update copyright holder name
12. Update test project — new checks in before/after, updated REVIEW.md
13. Commit and push

---

## Token Budget Check

| File | Current Lines | After Changes | Status |
|------|--------------|---------------|--------|
| `SKILL.md` | 149 | ~155 | Safe (limit 500) |
| `design-direction.md` | 112 | ~125 | Safe |
| `design-brief.md` | 113 | ~135 | Safe |
| `design-review.md` | 91 | ~95 | Safe |
| `guard-checks.md` | 211 | ~235 | Has TOC (good) |
| `review-rubric.md` | 228 | ~240 | Has TOC (good) |
| `linear-mercury.md` | 176 | ~185 | Has TOC (good) |
| `stripe-vercel.md` | 161 | ~175 | Has TOC (good) |
| `apple-notion.md` | 178 | ~190 | Has TOC (good) |
| `README.md` | 330 | ~350 | Documentation file |

---

## Summary of Changes by Type

**Anti-Vibe Coding:** 6 files (SKILL.md, direction, brief, guard-checks, rubric, README)
**Golden Ratio:** 7 files (direction, brief, 3 presets, guard-checks, rubric)
**Content Length & Structure:** 7 files (direction, brief, 3 presets, guard-checks, rubric)
**Bug Fixes:** 4 files (root plugin.json, marketplace.json, LICENSE, SKILL.md path/version)
**Test Project Updates:** 3 files (before.tsx, dashboard.tsx, REVIEW.md)

**Total files changed:** 16 of 20 files in the project
**No changes:** design-review.md (minor only), ebook PDFs, Design skill resources.zip, test-project/CLAUDE.md
