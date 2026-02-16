# Design Quality Plugin

A Claude Code plugin that enforces project-specific aesthetic standards across the AI design workflow. Capture your taste once, apply it everywhere.

## Install

```bash
claude plugin add https://github.com/DT-Funding-Solutions/design-quality-plugin
```

## What's Included

### Commands (3)

| Command | Description |
|---------|-------------|
| `/design-brief` | Generate a style brief from the active preset before coding |
| `/design-guard` | Run guard checks on files to catch violations before committing |
| `/design-review` | Score UI quality (0-100) across 6 categories with actionable fixes |

### Skill (1)

| Skill | Description |
|-------|-------------|
| `design-quality` | Auto-activates on design keywords. Enforces preset rules during UI work. |

### Presets (3)

| Preset | Aesthetic | Best For |
|--------|-----------|----------|
| `linear-mercury` | Clean, functional, minimal | SaaS dashboards, dev tools |
| `stripe-vercel` | Premium, polished, depth | Marketing sites, fintech |
| `apple-notion` | Refined simplicity | Consumer apps, content tools |

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

### After coding: Quality review

```
/design-review src/components/
```

Scores UI across 6 categories:

| Category | What's Checked |
|----------|---------------|
| Hierarchy | Visual weight, semantic HTML, heading order |
| Typography | Font compliance, weight consistency |
| Color | Semantic tokens, contrast ratios, dark mode |
| Spacing | Grid adherence, touch targets |
| Accessibility | ARIA labels, focus indicators |
| Polish | Elevation, hover states, transitions |

### Custom presets

Create a `.md` file following the preset format in `skills/design-quality/presets/` and reference it in your `CLAUDE.md`.

## Philosophy

> "AI amplified the one skill which I ignored: developing taste."

This plugin doesn't replace taste — it captures and enforces taste decisions so every AI-generated component inherits them automatically.

## Workflow Integration

Designed to complement the [Compound Engineering Plugin](https://github.com/EveryInc/compound-engineering-plugin):

| Workflow Stage | Design Quality Role |
|----------------|---------------------|
| `/workflows:plan` | Brief mode generates style constraints |
| `/workflows:work` | Guard mode self-checks during coding |
| `/workflows:review` | Review mode scores UI quality |

## License

MIT
