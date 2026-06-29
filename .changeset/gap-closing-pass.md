---
"@stalk-ui/preset": minor
"@stalk-ui/components": minor
"@stalk-ui/cli": minor
"@stalk-ui/i18n": minor
"@stalk-ui/utils": minor
"@stalk-ui/tsconfig": minor
---

Data-density & dark-surface gap-closing pass (all additive / backward-compatible):

- **Tokens:** `vivid` / `vividContrast` on every tone (saturated, mode-stable Radix
  step 9 with per-accent text contrast); `createDivergingScaleTokens` accepts a
  configurable colored midpoint (`divergingMid` / `divergingMidStep`).
- **HeatMap:** composable `HeatMap.*` data grid (`Root/Group/Row/Cell` +
  `CellLabel/CellValue/CellMeta`) and `useHeatMapScale` hook, alongside the unchanged
  simple data-driven `HeatMap`.
- **Tabs:** `segmented` honors `tone`/`colorPalette` and is content-width by default.
- **Card:** `elevated` raises to `bg.canvas`; new `size="sm"` density.
- **Select:** content-width trigger with `fullWidth` opt-in; first-party `SelectField`
  with empty-value sentinel.
- **Button:** `fullWidth` variant.
- **Popover:** `scrollable` variant.
- **Sparkline:** `reference` line/band and multiple `series`.
