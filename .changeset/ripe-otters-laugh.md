---
'@stalk-ui/components': minor
'@stalk-ui/preset': minor
'@stalk-ui/cli': minor
'@stalk-ui/i18n': minor
'@stalk-ui/tsconfig': minor
'@stalk-ui/utils': minor
---

Add twelve new components.

- **Calendar / Date Picker** — month-grid date selection (react-day-picker) and a typed field paired with a calendar popover.
- **Datetime Input** — a segmented, locale-aware date / time / datetime field with always-visible separators, auto-advance, range clamping, and full keyboard navigation.
- **Time Picker** — hour / minute / period selects.
- **Combobox / Command** — a searchable popover select and a cmdk-backed command palette.
- **Form** — react-hook-form field scaffolding (item, label, control, description, message) with accessible id/aria wiring.
- **Data List / Data Table** — aligned label/value pairs (labels accept a semantic tone) and a sortable, paginated TanStack Table built on the existing `Table`.
- **OTP Input / Phone Input / QR Code** — one-time-passcode entry, an international phone field with a country selector, and QR rendering.

Also: `SelectItem` gains an `endContent` prop for trailing, inline-end option metadata, and the Select dropdown viewport now scrolls for long option lists.
