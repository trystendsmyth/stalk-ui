---
"@stalk-ui/preset": minor
"@stalk-ui/cli": minor
"@stalk-ui/i18n": minor
"@stalk-ui/components": minor
"@stalk-ui/tsconfig": minor
"@stalk-ui/utils": minor
---

preset: add data-viz scale tokens and `defineTheme` `scales`/`tones` options

Adds mode-aware `scale.sequential.*` and `scale.diverging.*` semantic ramps
(derived from existing Radix scales, no new raw colors) plus `defineTheme({ scales })`
to re-hue them and `defineTheme({ tones })` to register extra `colorPalette` tone
groups. Foundation for the HeatMap primitive and dependency-free Sparklines.
