---
name: design-quality
description: Core design quality engine. Loads project aesthetic presets, enforces style rules during UI work, and proactively recommends /design-brief, /design-guard, and /design-review at the right time.
license: MIT
metadata:
  version: 1.1.0
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

Taste is the bottleneck, not execution. This skill captures project-specific aesthetic decisions so every AI-generated component inherits them automatically.

## Related Skills

This is the core engine. Two standalone skills handle explicit actions:

| Skill | When | Invoke With |
|-------|------|-------------|
| `design-brief` | Before coding | `/design-brief` or "generate a style brief" |
| `design-review` | After coding | `/design-review` or "review the design quality" |

`/design-review` combines guard checks + scoring + auto-fix in one pass.

## Step 1: Load Project Config

Read the project's `CLAUDE.md` for a `## Design Quality` section. Extract:

- **Active Preset** — Which preset to load (e.g., `linear-mercury`)
- **Reference URLs** — Sites to study for aesthetic reference
- **Project Overrides** — Any preset values to customize

Load the preset from `~/.claude/skills/design/design-quality/presets/<name>.md`.

If no config exists, default to `linear-mercury` preset.

## Step 2: Skill Precedence

**When this skill is active with a project preset, its rules take precedence over the generic `frontend-design` skill.** The `frontend-design` skill's generic aesthetic guidance ("avoid Inter," "make unexpected choices") does NOT apply when a preset is configured. The preset defines the project's aesthetic — follow it.

Other design skills (`interface-design`, `accessibility-a11y`, `ui-design-system`) remain complementary.

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

| Preset | Aesthetic | Best For |
|--------|-----------|----------|
| `linear-mercury` | Clean, functional, minimal | SaaS dashboards, dev tools, productivity apps |
| `stripe-vercel` | Premium, polished, depth | Marketing sites, developer platforms, fintech |
| `apple-notion` | Refined simplicity | Consumer apps, content tools, note-taking |

Presets are at `~/.claude/skills/design/design-quality/presets/`.

### Custom Presets

Create a new `.md` file in `presets/` following the same structure. Reference it in CLAUDE.md:

```markdown
## Design Quality
**Active Preset:** `my-custom-preset`
```

### Per-Session Override

> "Use the stripe-vercel preset for this session"

Overrides the project default until the session ends.

## Workflow Integration

| Workflow Stage | Design Quality Role |
|----------------|---------------------|
| `/workflows:brainstorm` | Suggest aesthetic direction based on project type |
| `/workflows:plan` | Recommend `/design-brief` for UI tasks |
| `/workflows:work` | Inline guard active — self-check before writing UI code |
| `/workflows:review` | Include design scoring when UI files in diff |
| `design-iterator` agent | Use after review for iterative screenshot-based refinement |
| `RAMS` | Complementary: RAMS = accessibility, this = holistic aesthetics |
