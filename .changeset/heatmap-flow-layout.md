---
"@stalk-ui/components": minor
---

HeatMap: add a `layout` prop to the composable `HeatMap.*` parts —
`matrix` (default, unchanged native-table layout) or `flow`. In `flow`
mode each group's cells render as a responsive CSS-grid auto-fill wrap
(`repeat(auto-fill, minmax(var(--heatmap-cell-min, 76px), 1fr))`) instead
of aligned table columns, for ragged "device grid" data (e.g. inverters
per production meter) that isn't a rows×columns matrix. Semantic
`<table>` markup and the `data-*` color engine are unchanged; the mode is
threaded Root → Group/Row via context. Additive and backward-compatible.
