---
'@stalk-ui/cli': minor
'@stalk-ui/components': minor
'@stalk-ui/i18n': minor
'@stalk-ui/preset': minor
'@stalk-ui/tsconfig': minor
'@stalk-ui/utils': minor
---

The Aperture feedback release: consumer-integration fixes upstreamed, two roadmap tiers closed, and a rich text editor.

**New component — `text-editor`.** A Tiptap v3 compound editor: marks, block types, lists and task lists, alignment, text color and highlight, links, an emoji picker, undo/redo, character count, and a selection bubble toolbar. Zero React re-renders per keystroke, SSR-safe, with a consumer-editable extension set as the tree-shaking boundary. Dependencies are registry-scoped — only `text-editor` consumers install them.

**Dialog.** New `layout="banded"` variant (full-width header/body/footer bands with separators — the fit for dense panels), `Dialog.HeaderActions` for trailing header controls, `Dialog.Body`, `scrollBehavior="inside"`, and draggable floating panels: viewport-clamped dragging by the header, animated snap-back, enter/exit motion (reduced-motion aware). The body slot no longer clips child focus rings in the default layout.

**Preset.** Every recipe now declares `jsx` extraction hints, so variant props passed through wrapper components emit their CSS reliably. New composable `animate` utilities (enter/exit with fade/zoom/spin/slide modifiers). Eight curated opt-in accent palettes (`staticCss.themes`). Disabled controls no longer show hover or press feedback (new `_enabledHover`/`_enabledActive` conditions).

**Toolbar.** `tooltip` + `shortcut` props on Button and ToggleItem render labelled tooltips with Kbd shortcut chips; the root ships a shared TooltipProvider.

**DatePicker.** Quick-date `presets` in single mode, mirroring the range-mode rail.

**i18n.** Locale set grows from 4 to 12 (adds de, fr, it, ja, ko, pt-BR, ru, hi) plus `textEditor` keys across all locales.

**CLI.** `get_components_manifest` MCP tool serves per-component metadata from the published Storybook build; the `theme` command lists the curated palettes.

**Registry & docs.** Registry manifests are attested with build provenance on every publish (verify with `gh attestation verify`); a generated Server Components boundary guide classifies every component, and the audit behind it fixed missing `'use client'` injection for `card`, `data-list`, `drawer`, and `resizable`.
