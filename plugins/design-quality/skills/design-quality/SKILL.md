---
name: design-quality
description: Core design quality engine. Loads project aesthetic presets, enforces style rules during UI work, and proactively recommends /design-brief and /design-review at the right time.
license: MIT
metadata:
  version: 1.2.0
  category: design
  domain: design-quality
  platforms: Web, iOS, macOS, Android, Cross-platform
  techStack: React, Tailwind CSS, Next.js, SwiftUI, UIKit, AppKit, Jetpack Compose, Flutter
keywords:
  - design quality
  - aesthetic
  - taste
  - polish
  - style guide
  - visual consistency
  - UI
  - component
  - design system
---

# Design Quality

Taste is the bottleneck, not execution. Vibe-coded UIs default to generic aesthetics. This skill captures intentional design decisions so every AI-generated component inherits real taste, not AI defaults. The antidote to vibe coding.

## Related Skills

This is the core engine. Three commands handle explicit actions:

| Command | When | Invoke With |
|---------|------|-------------|
| `design-direction` | Before choosing a preset | `/design-direction` or "what style should I use?" |
| `design-brief` | Before coding | `/design-brief` or "generate a style brief" |
| `design-review` | After coding | `/design-review` or "review the design quality" |

`/design-direction` walks through project type, audience, and tone to recommend a preset. `/design-review` combines guard checks + scoring + auto-fix in one pass.

## Step 1: Load Project Config

Read the project's `CLAUDE.md` for a `## Design Quality` section. Extract:

- **Active Preset** — Which preset to load (e.g., `clean-functional`)
- **Reference URLs** — Sites to study for aesthetic reference
- **Project Overrides** — Any preset values to customize

Load the preset from the plugin's `presets/<name>.md`. See `presets/index.md` for available presets.

If no config exists, default to `clean-functional` preset.

## Step 2: Skill Precedence

**When this skill is active with a project preset, its rules take precedence over the generic `frontend-design` skill.** The `frontend-design` skill's generic aesthetic guidance ("avoid Inter," "make unexpected choices") does NOT apply when a preset is configured. The preset defines the project's aesthetic — follow it.

Other design skills (`interface-design`, `accessibility-a11y`, `ui-design-system`) remain complementary.

## Ecosystem

Complementary skills (not competitors):

| Skill | Their Focus | Our Focus |
|-------|------------|-----------|
| `rams` | WCAG compliance | Aesthetic taste |
| `baseline-ui` | Animation/typography minimums | Specific preset enforcement |
| `web-interface-guidelines` | Interaction/performance | Visual identity |
| `deslop` | Code style cleanup | Design style enforcement |

## Step 3: Inline Guard During Coding

When writing UI code, silently apply the active preset's rules:

1. Before writing a component, check the code against the preset rules
2. If violations found, flag them in your response BEFORE writing the code
3. Write the corrected code (not the violating version)
4. If unsure, check the Do/Don't examples in the preset file

This is automatic — no user action needed. Use `/design-review` for the explicit version on existing files.

### Platform Detection

| Platform | File Types | Token System |
|----------|-----------|--------------|
| **Web** (React, Next.js) | `.tsx`, `.css`, `.module.css` | Tailwind/CSS variables |
| **iOS/macOS** (SwiftUI) | `.swift` | Asset catalogs, `Color()` |
| **iOS/macOS** (UIKit/AppKit) | `.swift`, `.xib`, `.storyboard` | Asset catalogs, `UIColor`/`NSColor` |
| **Android** (Compose) | `.kt` | Material Theme tokens |
| **Flutter** | `.dart` | ThemeData tokens |

## Proactive Recommendations

**Proactively suggest the right command at the right time.** Don't wait for the user to remember — guide them through the workflow.

| You Detect | Recommend | How to Say It |
|------------|-----------|---------------|
| New project with no `## Design Quality` in CLAUDE.md | `/design-direction` | "No design preset configured. Run `/design-direction` to choose an aesthetic direction." |
| User asks "what style should I use?" or discusses aesthetic options | `/design-direction` | "Run `/design-direction` to explore preset options for your project." |
| User is planning a UI feature or starting `/workflows:plan` for UI | `/design-brief` | "Before we start coding, run `/design-brief` to lock in style constraints from the [preset] preset." |
| User asks to build or modify a UI component | Apply preset rules inline | Don't interrupt — guard silently and flag violations naturally. |
| User finishes implementing UI changes, wraps up `/workflows:work`, or is about to commit UI files | `/design-review` | "Run `/design-review [path]` to catch violations, score quality, and auto-fix before committing." |
| User asks for code review or runs `/workflows:review` with UI in diff | Include design scoring | Run design-review scoring as part of the code review — don't make them ask separately. |
| User's score comes back < 70 | Offer to fix | "Score is XX/100 — want me to auto-fix the N errors and warnings?" |
| Session starts with `## Design Quality` in CLAUDE.md | Acknowledge | Brief one-liner: "Design quality active — using [preset] preset." |

### Recommendation Rules

1. **Suggest once, don't nag.** If the user skips a suggestion, don't repeat it.
2. **Be brief.** One sentence max.
3. **Context-sensitive.** Only suggest during UI work, not backend work.
4. **Natural flow.** Feel like a teammate's suggestion, not a popup.
5. **Never block.** Recommendations are always optional.

## Preset System

### Built-in Presets

See `presets/index.md` for the full catalog. Current presets:

| Preset | Category | Aesthetic | Best For |
|--------|----------|-----------|----------|
| `clean-functional` | minimal | Clean, functional, minimal | SaaS dashboards, dev tools, productivity apps |
| `premium-depth` | premium | Premium, polished, depth | Marketing sites, developer platforms, fintech |
| `refined-minimal` | minimal | Refined simplicity | Consumer apps, content tools, note-taking |

### Custom Presets

Copy `presets/_template.md` to create a new preset. The template defines all required sections (Philosophy, Typography, Color, Spacing, Layout, Elevation, Motion, Content, Component Patterns, Do/Don't). Add a row to `presets/index.md` and reference it in CLAUDE.md:

```markdown
## Design Quality
**Active Preset:** `my-custom-preset`
```

Presets can specify golden ratio proportions for layout (sidebar:content at ~38:62, hero splits at ~62:38).

### Per-Session Override

> "Use the premium-depth preset for this session"

Overrides the project default until the session ends.

## Workflow Integration

| Workflow Stage | Design Quality Role |
|----------------|---------------------|
| `/workflows:brainstorm` | Recommend `/design-direction` to choose aesthetic |
| `/workflows:plan` | Recommend `/design-brief` for UI tasks |
| `/workflows:work` | Inline guard active — self-check before writing UI code |
| `/workflows:review` | Include design scoring when UI files in diff |
| `design-iterator` agent | Use after review for iterative screenshot-based refinement |
| `RAMS` | Complementary: RAMS = accessibility, this = holistic aesthetics |
