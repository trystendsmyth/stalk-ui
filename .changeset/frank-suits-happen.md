---
'@stalk-ui/cli': minor
'@stalk-ui/components': minor
'@stalk-ui/i18n': minor
'@stalk-ui/preset': minor
'@stalk-ui/tsconfig': minor
'@stalk-ui/utils': minor
---

Component, Storybook, and docs cleanup pass.

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
