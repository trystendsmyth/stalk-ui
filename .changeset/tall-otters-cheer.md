---
"@stalk-ui/preset": minor
"@stalk-ui/cli": minor
---

Add VirtualList and Sortable primitives, plus opt-in virtualization for DataTableAdvanced

- **VirtualList** — a headless, windowed list built on TanStack Virtual for large backlogs. Only the visible window (plus overscan) is mounted; item heights may vary (self-measured) and it supports vertical and horizontal orientation.
- **Sortable** — a headless drag-to-reorder primitive built on @dnd-kit/react. Controlled (`items` + `onReorder`), keyboard-accessible out of the box, with an optional `Sortable.Handle`. Composes into reorderable lists, sortable rows, and multi-column boards.
- **DataTableAdvanced** — new opt-in `enableVirtualization` mode that windows rows while preserving the sticky header and column pinning. Pagination is replaced by scrolling; not combinable with `renderSubRow`.
