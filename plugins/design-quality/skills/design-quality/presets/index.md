# Preset Library

Available design presets for the design-quality plugin. `/design-direction` reads this index to recommend presets dynamically.

## Available Presets

| Preset | Category | Aesthetic | Best For |
|--------|----------|-----------|----------|
| `clean-functional` | minimal | Clean, functional, minimal | SaaS dashboards, dev tools, productivity apps |
| `premium-depth` | premium | Premium, polished, depth | Marketing sites, fintech, developer platforms |
| `refined-minimal` | minimal | Refined simplicity | Consumer apps, content tools, native Mac/iOS apps |

## Categories

| Category | Description | Characteristics |
|----------|-------------|-----------------|
| `minimal` | Restrained, functional, content-first | Flat elevation, tight color palette, weight-based hierarchy |
| `premium` | Polished, layered, confidence-driven | Deep shadows, gradients, bold typography, dark themes |
| `editorial` | Typography-forward, content-rich, magazine-like | Serif accents, generous line-height, columnar layouts |
| `playful` | Colorful, animated, personality-driven | Rounded shapes, saturated palette, spring animations |
| `enterprise` | Conservative, trustworthy, data-dense | Neutral palette, dense grids, subtle borders, system fonts |

## Adding a New Preset

1. Copy `_template.md` to a new file named after the aesthetic (e.g., `editorial-magazine.md`)
2. Fill in all sections following the template structure
3. Add a row to the Available Presets table above
4. The preset is immediately available via `/design-direction` and `/design-brief`
