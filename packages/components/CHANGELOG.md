# @stalk-ui/components

## 2.0.0

### Patch Changes

- Updated dependencies [[`329a3b2`](https://github.com/trystendsmyth/stalk-ui/commit/329a3b2a75e22efee0945a7ee05aba40f1ed18cd), [`329a3b2`](https://github.com/trystendsmyth/stalk-ui/commit/329a3b2a75e22efee0945a7ee05aba40f1ed18cd), [`329a3b2`](https://github.com/trystendsmyth/stalk-ui/commit/329a3b2a75e22efee0945a7ee05aba40f1ed18cd), [`329a3b2`](https://github.com/trystendsmyth/stalk-ui/commit/329a3b2a75e22efee0945a7ee05aba40f1ed18cd), [`329a3b2`](https://github.com/trystendsmyth/stalk-ui/commit/329a3b2a75e22efee0945a7ee05aba40f1ed18cd)]:
  - @stalk-ui/preset@1.4.0

## 2.0.0

### Minor Changes

- [#92](https://github.com/trystendsmyth/stalk-ui/pull/92) [`4541385`](https://github.com/trystendsmyth/stalk-ui/commit/4541385c0fe79662c0734b8fa5c039010ef9b28f) Thanks [@trystendsmyth](https://github.com/trystendsmyth)! - Distribution, heat-map close-out, and a major component-surface expansion.

  **CLI (D2/D3).** `add`/`diff` now rewrite `styled-system/*` imports to the consumer's alias, read from `stalk.config.json` or the Panda `importMap` (string or object form); `init` records a detected alias. `add` records installs under `.stalk-ui/` (lock + pristine base snapshots), `upgrade [names...]` three-way merges base × local edits × registry per file with git-style conflict markers, and the new `drift` command (plus the `actions/drift` GitHub Action) fails CI only when the registry has moved past your recorded base. `--no-install` skips package installs.

  **HeatMap (H2).** `columnsSticky` pins the column axis (CSS-only sticky header) on both the simple HeatMap and `HeatMap.Root`. The composable `HeatMap.*` parts also gain a `layout` prop — `matrix` (default, unchanged native-table layout) or `flow`, where each group's cells render as a responsive auto-fill CSS grid (`repeat(auto-fill, minmax(var(--heatmap-cell-min, 76px), 1fr))`) for ragged non-matrix data (e.g. hosts per rack); semantic `<table>` markup and the `data-*` color engine are unchanged, with the mode threaded Root → Group/Row via context. Ships alongside data-table per-column `meta.width`.

  **Component upgrades (U1–U6).** Combobox `multiple` with trigger summarization; DatePicker `mode="range"` with quick-range presets and a two-month calendar; Progress `shape="circular"` gauge with a centered `showValue` read-out; DataTableAdvanced column-visibility menu, pointer column resizing, and CSV export (`tableToCsv`); Card `lg` size. **Breaking:** Badge sizes renamed to the `micro | sm | md | lg` ladder (old `sm`→`md`, old `md`→`lg`; the default renders unchanged) — codemod in `scripts/codemods/badge-size-1-2-to-1-3.ts` — plus a new `neutral` Badge tone backed by a `neutral` tone group in the preset.

  **New components (P1–P10).** `stat`, `tree` (single/multiple selection, typeahead, `*` sibling expansion, indent guides — collapsed branches never mount, so large trees stay cheap), `timeline` (with a horizontal orientation), `empty-state`, `drawer` (Vaul gesture sheet — any edge via `direction`, snap points; Sheet remains the pointer-agnostic side panel), `steps`, `file-upload`, `tour` (spotlight steps with an optional pointer arrow), `editable`, `rating`, and `copy-button` — each with recipe, tests, axe, stories, and docs. Plus `swap` — a presentational two-state swapper (fade/rotate/flip/scale) for icon toggles.

### Patch Changes

- Updated dependencies [[`4541385`](https://github.com/trystendsmyth/stalk-ui/commit/4541385c0fe79662c0734b8fa5c039010ef9b28f)]:
  - @stalk-ui/i18n@1.3.0
  - @stalk-ui/preset@1.3.0
  - @stalk-ui/utils@1.3.0

## 2.0.0

### Minor Changes

- [#88](https://github.com/trystendsmyth/stalk-ui/pull/88) [`17b3597`](https://github.com/trystendsmyth/stalk-ui/commit/17b35977c00b394633c1272998bd4b7c9b5bf4ea) Thanks [@trystendsmyth](https://github.com/trystendsmyth)! - Data-density & dark-surface gap-closing pass (all additive / backward-compatible):

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
  - **Accessibility:** `Slider` gains `thumbLabels` for per-thumb names on range
    sliders; `ScrollArea` viewport and `Table` scroll container are keyboard-focusable
    scroll regions; `Command.Separator` is hidden from the listbox a11y tree.

### Patch Changes

- Updated dependencies [[`17b3597`](https://github.com/trystendsmyth/stalk-ui/commit/17b35977c00b394633c1272998bd4b7c9b5bf4ea)]:
  - @stalk-ui/preset@1.2.0
  - @stalk-ui/i18n@1.2.0
  - @stalk-ui/utils@1.2.0

## 2.0.0

### Minor Changes

- [#80](https://github.com/trystendsmyth/stalk-ui/pull/80) [`b83e93a`](https://github.com/trystendsmyth/stalk-ui/commit/b83e93a26d27a6207a2c51c2fde73f88cc1ce32d) Thanks [@trystendsmyth](https://github.com/trystendsmyth)! - data-table-advanced: headless `useDataTable` hook + batteries-included component

  A new `data-table-advanced` item exporting both `useDataTable` (TanStack core +
  sorting + pagination, statically imported and tree-shakeable, with a column-pinning
  helper and detail-panel expansion) and `DataTableAdvanced`, which adds expandable
  detail rows, frozen columns (via the WS-1 `data-pinned` recipe), a sticky header,
  and pagination. The basic `data-table` stays lightweight; consumers opt into the
  advanced surface only when they `add` it.

- [#80](https://github.com/trystendsmyth/stalk-ui/pull/80) [`b83e93a`](https://github.com/trystendsmyth/stalk-ui/commit/b83e93a26d27a6207a2c51c2fde73f88cc1ce32d) Thanks [@trystendsmyth](https://github.com/trystendsmyth)! - dialog: support non-modal dialogs via an optional overlay

  `Dialog.Content` gains an `overlay` prop (default `true`). Setting `overlay={false}`
  alongside `Dialog.Root`'s already-forwarded `modal={false}` renders a non-blocking,
  click-through panel (the page behind stays interactive) — for live side panels that
  shouldn't trap focus or dim the app.

- [#80](https://github.com/trystendsmyth/stalk-ui/pull/80) [`b83e93a`](https://github.com/trystendsmyth/stalk-ui/commit/b83e93a26d27a6207a2c51c2fde73f88cc1ce32d) Thanks [@trystendsmyth](https://github.com/trystendsmyth)! - heatmap: new dependency-free HeatMap primitive

  A labeled matrix of color-coded cells built on a real `<table>` (row/column
  headers give screen readers the full grid for free). Sequential and diverging
  ramps drive cell color via `data-*` attributes mapped to the new `scale.*`
  tokens, so it themes and inverts with color mode automatically. Zero runtime
  dependencies; optional keyboard-inspectable cells and a ramp legend.

- [#80](https://github.com/trystendsmyth/stalk-ui/pull/80) [`b83e93a`](https://github.com/trystendsmyth/stalk-ui/commit/b83e93a26d27a6207a2c51c2fde73f88cc1ce32d) Thanks [@trystendsmyth](https://github.com/trystendsmyth)! - sparkline: new dependency-free Sparkline component

  A compact inline-SVG trend line with no charting dependency (no recharts). Color
  flows through `colorPalette` so `tone` retints it and it inverts with color mode;
  optional area fill and last-point marker. Decorative by default, accessible
  (`role="img"`) when given an `aria-label`.

- [#80](https://github.com/trystendsmyth/stalk-ui/pull/80) [`b83e93a`](https://github.com/trystendsmyth/stalk-ui/commit/b83e93a26d27a6207a2c51c2fde73f88cc1ce32d) Thanks [@trystendsmyth](https://github.com/trystendsmyth)! - table: sticky header + frozen columns (CSS-only, shared by every table)

  `Table.Root` gains a `stickyHeader` prop, and any `Table.Head` / `Table.Cell`
  can be frozen with `data-pinned="start" | "end"` (logical insets → RTL-correct).
  Pure recipe CSS, so it benefits `DataTable` and any custom table at zero JS cost.

- [#80](https://github.com/trystendsmyth/stalk-ui/pull/80) [`b83e93a`](https://github.com/trystendsmyth/stalk-ui/commit/b83e93a26d27a6207a2c51c2fde73f88cc1ce32d) Thanks [@trystendsmyth](https://github.com/trystendsmyth)! - preset: add data-viz scale tokens and `defineTheme` `scales`/`tones` options

  Adds mode-aware `scale.sequential.*` and `scale.diverging.*` semantic ramps
  (derived from existing Radix scales, no new raw colors) plus `defineTheme({ scales })`
  to re-hue them and `defineTheme({ tones })` to register extra `colorPalette` tone
  groups. Foundation for the HeatMap primitive and dependency-free Sparklines.

### Patch Changes

- Updated dependencies [[`b83e93a`](https://github.com/trystendsmyth/stalk-ui/commit/b83e93a26d27a6207a2c51c2fde73f88cc1ce32d), [`b83e93a`](https://github.com/trystendsmyth/stalk-ui/commit/b83e93a26d27a6207a2c51c2fde73f88cc1ce32d), [`b83e93a`](https://github.com/trystendsmyth/stalk-ui/commit/b83e93a26d27a6207a2c51c2fde73f88cc1ce32d), [`b83e93a`](https://github.com/trystendsmyth/stalk-ui/commit/b83e93a26d27a6207a2c51c2fde73f88cc1ce32d), [`b83e93a`](https://github.com/trystendsmyth/stalk-ui/commit/b83e93a26d27a6207a2c51c2fde73f88cc1ce32d), [`b83e93a`](https://github.com/trystendsmyth/stalk-ui/commit/b83e93a26d27a6207a2c51c2fde73f88cc1ce32d)]:
  - @stalk-ui/preset@1.1.0
  - @stalk-ui/i18n@1.1.0
  - @stalk-ui/utils@1.1.0

## 1.0.0

### Major Changes

- [#77](https://github.com/trystendsmyth/stalk-ui/pull/77) [`f836782`](https://github.com/trystendsmyth/stalk-ui/commit/f836782d58dfa21e4e5543f4cd673a67480fa856) Thanks [@trystendsmyth](https://github.com/trystendsmyth)! - Stalk UI 1.0: production-ready components and theming

### Patch Changes

- Updated dependencies [[`f836782`](https://github.com/trystendsmyth/stalk-ui/commit/f836782d58dfa21e4e5543f4cd673a67480fa856)]:
  - @stalk-ui/preset@1.0.0
  - @stalk-ui/i18n@1.0.0
  - @stalk-ui/utils@1.0.0

## 1.0.0

### Minor Changes

- [#66](https://github.com/trystendsmyth/stalk-ui/pull/66) [`6933dfc`](https://github.com/trystendsmyth/stalk-ui/commit/6933dfcbeacc18fa7fdfac5179ede5498c7500a4) Thanks [@trystendsmyth](https://github.com/trystendsmyth)! - Add twelve new components.
  - **Calendar / Date Picker** — month-grid date selection (react-day-picker) and a typed field paired with a calendar popover.
  - **Datetime Input** — a segmented, locale-aware date / time / datetime field with always-visible separators, auto-advance, range clamping, and full keyboard navigation.
  - **Time Picker** — hour / minute / period selects.
  - **Combobox / Command** — a searchable popover select and a cmdk-backed command palette.
  - **Form** — react-hook-form field scaffolding (item, label, control, description, message) with accessible id/aria wiring.
  - **Data List / Data Table** — aligned label/value pairs (labels accept a semantic tone) and a sortable, paginated TanStack Table built on the existing `Table`.
  - **OTP Input / Phone Input / QR Code** — one-time-passcode entry, an international phone field with a country selector, and QR rendering.

  Also: `SelectItem` gains an `endContent` prop for trailing, inline-end option metadata, and the Select dropdown viewport now scrolls for long option lists.

### Patch Changes

- Updated dependencies [[`6933dfc`](https://github.com/trystendsmyth/stalk-ui/commit/6933dfcbeacc18fa7fdfac5179ede5498c7500a4)]:
  - @stalk-ui/preset@0.5.0
  - @stalk-ui/i18n@0.5.0
  - @stalk-ui/utils@0.5.0

## 1.0.0

### Minor Changes

- [#50](https://github.com/trystendsmyth/stalk-ui/pull/50) [`a910520`](https://github.com/trystendsmyth/stalk-ui/commit/a9105202f22985206944a751dadabcefb7aa1892) Thanks [@trystendsmyth](https://github.com/trystendsmyth)! - Add 13 new components and button tones, introduce a registry-distributed createStyleContext helper, and migrate to pnpm 11.

### Patch Changes

- Updated dependencies [[`a910520`](https://github.com/trystendsmyth/stalk-ui/commit/a9105202f22985206944a751dadabcefb7aa1892)]:
  - @stalk-ui/preset@0.4.0
  - @stalk-ui/utils@0.4.0
  - @stalk-ui/i18n@0.4.0

## 1.0.0

### Minor Changes

- [#29](https://github.com/trystendsmyth/stalk-ui/pull/29) [`df5516f`](https://github.com/trystendsmyth/stalk-ui/commit/df5516f004616dbc443d7ddb06a5ec6353a52229) Thanks [@trystendsmyth](https://github.com/trystendsmyth)! - add variant plumbing, update theming

### Patch Changes

- Updated dependencies [[`df5516f`](https://github.com/trystendsmyth/stalk-ui/commit/df5516f004616dbc443d7ddb06a5ec6353a52229)]:
  - @stalk-ui/i18n@0.3.0
  - @stalk-ui/preset@0.3.0

## 1.0.0

### Minor Changes

- [#22](https://github.com/trystendsmyth/stalk-ui/pull/22) [`c691911`](https://github.com/trystendsmyth/stalk-ui/commit/c691911d6f43b4ca7bdf3297e6fef98299d589c7) Thanks [@trystendsmyth](https://github.com/trystendsmyth)! - Component, Storybook, and docs cleanup pass.

  **Components**
  - Add `Spinner` primitive and rebuild `Button` to consume it for the `loading` state.
  - Add `radius` prop to `Badge` (`none` | `sm` | `md` | `lg` | `full`) and a `tone` prop covering accent, success, warning, danger, and info palettes.
  - Expand the `DropdownMenu` API: `Sub`/`SubTrigger`/`SubContent` slots, default `Check`/`Circle` indicators on checkbox/radio items, automatic `ChevronRight` on submenu triggers, an `inset` variant for aligned padding, and a `container` prop on `Content` for portal targeting. Default `modal={false}` to prevent body scroll-lock layout shifts.
  - Rebuild `Input` as a compound component (`Input.Root`/`Field`/`Slot`/`Prefix`/`Suffix`) with size and `align` variants and a focus ring matched to `Button`. Migrate `Label` to `@radix-ui/react-label` so nested controls focus without `htmlFor`.
  - Tighten input/select/button sizing so `sm`/`md`/`lg` align across the form primitives.

  **Preset**
  - Expand the semantic color system (success/warning/danger/info palettes) and refresh the rainbow theme tokens.
  - Add `html { scrollbar-gutter: stable }` to `globalCss` to reserve scrollbar space for scroll-locking primitives.
  - Add a `fonts` token group and migrate `input` from a flat recipe to a slot recipe.

  **Storybook**
  - New theme, manager, docs container, welcome story, and semantic-tokens MDX page.
  - Stories cover variants, states, RTL, and color mode through Storybook globals rather than per-story dark wrappers.
  - Add `useSelection` story helper for controlled examples and resolve `no-confusing-void-expression` lint patterns across stories.

  **Docs**
  - Live-editable component previews via `react-live` with a Stalk component scope, syntax-highlighted via `prism-react-renderer`.
  - Replace toolbar native controls with Stalk `Select` and `Button`; add a terminal-styled `InstallCommand` chip with copy-to-clipboard.
  - Wrap component sections (Install/Examples/Props/Variants/Registry) and getting-started pages in styled `DocsSection` cards with eyebrow headers, hint copy, and empty-state pills.
  - Tighten card/code/table radii from 16px to 8px and represent every shipped component in the docs (including `Spinner`).
  - Make example sets meaningful: full `Root` trees for `Dialog`, `DropdownMenu`, `Popover`, and `Tooltip`; distinct variations for `Button`, `Badge`, `Radio`, and `Select`.

### Patch Changes

- Updated dependencies [[`c691911`](https://github.com/trystendsmyth/stalk-ui/commit/c691911d6f43b4ca7bdf3297e6fef98299d589c7)]:
  - @stalk-ui/i18n@0.2.0
  - @stalk-ui/preset@0.2.0

## 1.0.0

### Minor Changes

- [`03dab1f`](https://github.com/trystendsmyth/stalk-ui/commit/03dab1ff13ad1678a3b2f4d046444a419e4c0d27) Thanks [@trystendsmyth](https://github.com/trystendsmyth)! - finalize first phase of components

### Patch Changes

- Updated dependencies [[`03dab1f`](https://github.com/trystendsmyth/stalk-ui/commit/03dab1ff13ad1678a3b2f4d046444a419e4c0d27)]:
  - @stalk-ui/preset@0.1.0
  - @stalk-ui/i18n@0.1.0
