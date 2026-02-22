---
name: design-direction
description: "Choose your project's aesthetic direction. Walks through project type, audience, and goals to recommend the right preset."
argument-hint: "[optional: project type or reference URL]"
---

# Design Direction

Guide the user to the right aesthetic preset. This is the Visual Direction step — gather context, identify patterns, recommend an aesthetic.

## Setup

1. Read the project's `CLAUDE.md` for a `## Design Quality` section
2. Load the preset system overview from the design-quality skill

## Argument

<direction_input> #$ARGUMENTS </direction_input>

**If argument provided:** Treat as project type or reference URL and skip to Recommendation.

## Execution

### If `## Design Quality` already exists:

Show the current preset, its philosophy (one line), and ask:
- "You're using **[preset]**. Want to keep it or explore other options?"
- If they want to change, proceed to the walkthrough below.

### If no config exists (or user wants to change):

Walk through these questions. Keep it conversational — one question at a time.

**1. Project Type**

| Answer | Leans Toward | Why |
|--------|-------------|-----|
| SaaS dashboard, admin panel, dev tool | `linear-mercury` | Information density needs clean hierarchy. Hick's Law — reduce decision fatigue. |
| Marketing site, landing page, portfolio | `stripe-vercel` | First impressions need visual confidence. Proven structure: Hero → Proof → CTA. |
| Consumer app, content tool, note-taking | `apple-notion` | Daily-use tools need to disappear. Simplicity builds habit. |

**2. Target Audience (ICP)**

| Answer | Leans Toward | Why |
|--------|-------------|-----|
| Technical users who value efficiency | `linear-mercury` | They notice unnecessary elements. Respect their time. |
| Prospects who need to trust the brand | `stripe-vercel` | Polish signals investment. Premium aesthetic builds credibility. |
| Everyday users who want calm | `apple-notion` | Cognitive load is the enemy. Whitespace is a feature. |

**3. Emotional Tone**

| Answer | Leans Toward | Why |
|--------|-------------|-----|
| Clean, fast, no-nonsense | `linear-mercury` | Functional minimalism. |
| Premium, polished, confident | `stripe-vercel` | Craft as communication. |
| Simple, calm, invisible | `apple-notion` | The best interface is forgotten. |

**4. Reference Sites** (optional)

If the user provides URLs or CLAUDE.md has Reference URLs, analyze for:
- Color density — minimal palette vs. rich palette
- Typography confidence — subtle sizing vs. bold hero text
- Elevation approach — flat/borders vs. layered shadows
- Motion style — functional vs. choreographed

Map observations to the closest preset.

### Recommendation

Based on answers, present:

1. **Recommended preset** with 1-2 sentence rationale linking project type + audience + tone to the preset's philosophy
2. **Color scheme type:**
   - `linear-mercury` → Monochromatic (neutral + single accent)
   - `stripe-vercel` → Complementary (dark canvas + vibrant accent)
   - `apple-notion` → Monochromatic (near-monochrome + muted accent)
3. **Color psychology note** — Why the accent approach fits (e.g., "Blue signals trust for financial products" or "Copper adds warmth to technical tools")
4. **Key design principle** — One relevant insight:
   - Dashboard → "Hick's Law: fewer choices, faster decisions. This preset keeps the UI quiet."
   - Marketing → "Proven conversion flow: Hero → Social Proof → Features → Testimonials → CTA."
   - Consumer → "The interface should be invisible. Whitespace is the primary design element."

If the scores are close between two presets, show a comparison table:

| Dimension | Preset A | Preset B |
|-----------|----------|----------|
| Typography | ... | ... |
| Color | ... | ... |
| Elevation | ... | ... |
| Motion | ... | ... |
| Best for | ... | ... |

If no built-in preset fits, offer to help define a custom preset.

## Output

After the user confirms a preset:

1. Offer to update `CLAUDE.md` with:
   ```markdown
   ## Design Quality

   **Active Preset:** `[chosen-preset]`

   **Reference URLs:**
   - [any URLs discussed]

   **Project Overrides:**
   - [any customizations mentioned]
   ```
2. Suggest next step: "Run `/design-brief` to generate detailed style constraints before coding."
