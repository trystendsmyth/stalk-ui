---
'@stalk-ui/cli': minor
'@stalk-ui/components': minor
'@stalk-ui/i18n': minor
'@stalk-ui/preset': minor
'@stalk-ui/tsconfig': minor
'@stalk-ui/utils': minor
---

Distribution, heat-map close-out, and a major component-surface expansion.

**CLI (D2/D3).** `add`/`diff` now rewrite `styled-system/*` imports to the consumer's alias, read from `stalk.config.json` or the Panda `importMap` (string or object form); `init` records a detected alias. `add` records installs under `.stalk-ui/` (lock + pristine base snapshots), `upgrade [names...]` three-way merges base × local edits × registry per file with git-style conflict markers, and the new `drift` command (plus the `actions/drift` GitHub Action) fails CI only when the registry has moved past your recorded base. `--no-install` skips package installs.

**HeatMap (H2).** `columnsSticky` pins the column axis (CSS-only sticky header) on both the simple HeatMap and `HeatMap.Root`; ships alongside the `layout="flow"` auto-fill grid and data-table per-column `meta.width`.

**Component upgrades (U1–U6).** Combobox `multiple` with trigger summarization; DatePicker `mode="range"` with quick-range presets and a two-month calendar; Progress `shape="circular"` gauge with a centered `showValue` read-out; DataTableAdvanced column-visibility menu, pointer column resizing, and CSV export (`tableToCsv`); Card `lg` size. **Breaking:** Badge sizes renamed to the `micro | sm | md | lg` ladder (old `sm`→`md`, old `md`→`lg`; the default renders unchanged) — codemod in `scripts/codemods/badge-size-1-2-to-1-3.ts` — plus a new `neutral` Badge tone backed by a `neutral` tone group in the preset.

**New components (P1–P10).** `stat`, `tree-view`, `timeline`, `empty-state`, `drawer` (Vaul bottom sheet), `steps`, `file-upload`, `tour`, `editable`, `rating`, and `copy-button` — each with recipe, tests, axe, stories, and docs.
