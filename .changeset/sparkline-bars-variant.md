---
'@stalk-ui/components': minor
'@stalk-ui/preset': minor
---

Sparkline `variant="bars"` — a zero-anchored micro bar chart for discrete per-bucket counts (deploys per day, events per bucket), staying inside the Sparkline tenet: tiny, inline, no axes.

Bars encode magnitude by length, so unlike the line variant the domain always includes zero; negative values hang below the baseline, and zero-adjacent buckets keep a 1px hairline tick. New props: `gap` (px between bars, default 1), `radius` (bar corner radius, default 1), and `highlightLast` (fade all but the final bar). `reference` lines/bands and `tone` work unchanged; `area`, `series`, and `showLastPoint` remain line-only.

**Preset.** New `bar` and `barMuted` slots on the sparkline slot recipe, both on `colorPalette.solid`, so tones and dark mode work with no new tokens. Sparkline also gains a `component: sparkline` size-limit budget (2 KB).
