# Design Quality Plugin

A Claude Code plugin that enforces project-specific aesthetic standards across the AI design workflow. Works with Web, iOS, macOS, Android, and cross-platform projects. Capture your taste once, apply it everywhere.

## Install

```bash
claude plugin add https://github.com/SeanSmithDesign/design-quality-plugin
```

## What's Included

### Commands (3)

| Command | Description |
|---------|-------------|
| `/design-brief` | Generate a style brief from the active preset before coding |
| `/design-guard` | Quick guard check on files — flags violations before committing |
| `/design-review` | Full pipeline: guard + score + fix. Catches violations, rates 6 categories (0-100), and offers to auto-fix |

### Skill (1)

| Skill | Description |
|-------|-------------|
| `design-quality` | Auto-activates on design keywords. Enforces preset rules during UI work. |

### Presets (3)

| Preset | Aesthetic | Best For |
|--------|-----------|----------|
| `linear-mercury` | Clean, functional, minimal | SaaS dashboards, dev tools, productivity apps |
| `stripe-vercel` | Premium, polished, depth | Marketing sites, fintech, developer platforms |
| `apple-notion` | Refined simplicity | Consumer apps, content tools, native Mac/iOS apps |

## Supported Platforms

| Platform | Tech | What's Checked |
|----------|------|---------------|
| **Web** | React, Next.js, Tailwind, CSS | Semantic tokens, CSS variables, Tailwind classes |
| **iOS/macOS** | SwiftUI, UIKit, AppKit | Asset catalog colors, `.font()` modifiers, spacing |
| **Android** | Jetpack Compose | MaterialTheme tokens, `dp` spacing, elevation |
| **Cross-platform** | Flutter | ThemeData tokens, `EdgeInsets`, widget styling |

Presets define aesthetic principles (typography, color, spacing, elevation, motion) — the guard and review adapt checks to your project's platform automatically.

## Setup

After installing, add a `## Design Quality` section to your project's `CLAUDE.md`:

```markdown
## Design Quality

**Active Preset:** `linear-mercury`

**Reference URLs:**
- https://linear.app
- https://mercury.com

**Project Overrides:**
- Accent color: Blue (not default neutral)
```

## Usage

### Before coding: Generate a style brief

```
/design-brief
```

Outputs typography, color, spacing, elevation, and motion constraints from your active preset.

### During coding: Guard checks

```
/design-guard src/components/Hero.tsx
```

Flags errors (hardcoded colors, wrong fonts), warnings (off-grid spacing), and suggestions (missing hover states).

### After coding: Review, score, and fix

```
/design-review src/components/
```

Runs the full pipeline — guard checks, quality scoring, and auto-fix:

1. **Guard** — Catches violations (hardcoded colors, wrong fonts, off-grid spacing)
2. **Score** — Rates quality across 6 categories:

| Category | What's Checked |
|----------|---------------|
| Hierarchy | Visual weight, semantic HTML, heading order |
| Typography | Font compliance, weight consistency |
| Color | Semantic tokens, contrast ratios, dark mode |
| Spacing | Grid adherence, touch targets |
| Accessibility | ARIA labels, focus indicators |
| Polish | Elevation, hover states, transitions |

3. **Fix** — Offers to auto-fix errors and warnings, then re-scores to show improvement

> `/design-guard` is available as a lightweight alternative when you just want a quick check without scoring.

### Custom presets

Create a `.md` file following the preset format in `skills/design-quality/presets/` and reference it in your `CLAUDE.md`.

## Philosophy

> "AI amplified the one skill which I ignored: developing taste."

This plugin doesn't replace taste — it captures and enforces taste decisions so every AI-generated component inherits them automatically.

## Workflow Integration

Designed to complement the [Compound Engineering Plugin](https://github.com/EveryInc/compound-engineering-plugin).

### Full Pipeline

```
/workflows:brainstorm     ← explore what to build
       ↓
/workflows:plan           ← plan implementation
       ↓
/design-brief             ← style constraints before coding
       ↓
/workflows:work           ← implement (skill auto-activates for inline guidance)
       ↓
/design-review            ← guard + score + fix
       ↓
/workflows:review         ← code review (design is already polished)
       ↓
/workflows:compound       ← document learnings
```

### Minimal Pipeline

For smaller tasks, the essentials:

```
/design-brief → code → /design-review
```

## License

MIT
