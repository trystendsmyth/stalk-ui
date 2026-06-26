---
"@stalk-ui/preset": minor
"@stalk-ui/cli": minor
"@stalk-ui/i18n": minor
"@stalk-ui/components": minor
"@stalk-ui/tsconfig": minor
"@stalk-ui/utils": minor
---

heatmap: new dependency-free HeatMap primitive

A labeled matrix of color-coded cells built on a real `<table>` (row/column
headers give screen readers the full grid for free). Sequential and diverging
ramps drive cell color via `data-*` attributes mapped to the new `scale.*`
tokens, so it themes and inverts with color mode automatically. Zero runtime
dependencies; optional keyboard-inspectable cells and a ramp legend.
