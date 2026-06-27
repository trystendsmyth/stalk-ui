---
"@stalk-ui/preset": minor
"@stalk-ui/cli": minor
"@stalk-ui/i18n": minor
"@stalk-ui/components": minor
"@stalk-ui/tsconfig": minor
"@stalk-ui/utils": minor
---

data-table-advanced: headless `useDataTable` hook + batteries-included component

A new `data-table-advanced` item exporting both `useDataTable` (TanStack core +
sorting + pagination, statically imported and tree-shakeable, with a column-pinning
helper and detail-panel expansion) and `DataTableAdvanced`, which adds expandable
detail rows, frozen columns (via the WS-1 `data-pinned` recipe), a sticky header,
and pagination. The basic `data-table` stays lightweight; consumers opt into the
advanced surface only when they `add` it.
