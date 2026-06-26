---
"@stalk-ui/preset": minor
"@stalk-ui/cli": minor
"@stalk-ui/i18n": minor
"@stalk-ui/components": minor
"@stalk-ui/tsconfig": minor
"@stalk-ui/utils": minor
---

table: sticky header + frozen columns (CSS-only, shared by every table)

`Table.Root` gains a `stickyHeader` prop, and any `Table.Head` / `Table.Cell`
can be frozen with `data-pinned="start" | "end"` (logical insets → RTL-correct).
Pure recipe CSS, so it benefits `DataTable` and any custom table at zero JS cost.
