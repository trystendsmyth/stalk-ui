# Customization & Theming

Stalk UI is PandaCSS-native. Theming flows through PandaCSS semantic tokens defined in `@stalk-ui/preset` and consumed via the generated `styled-system/`.

## Contents

- How it works (preset → tokens → recipes → components)
- Themes (neutral, rainbow, monochrome) and `data-panda-theme`
- Semantic token reference
- Custom themes
- Color mode
- RTL

---

## How It Works

1. `@stalk-ui/preset` exposes semantic tokens (`bg.default`, `fg.muted`, `accent.solid`) and slot recipes (`button`, `dialog`, `select`, …).
2. PandaCSS generates `styled-system/` from your project's `panda.config.ts`, including the preset.
3. Components import recipes from `styled-system/recipes` and refer to tokens by name. Changing the token in the preset (or via `data-panda-theme`) re-themes every component automatically.

---

## Themes

Stalk ships three themes:

- `neutral` (default) — applied automatically.
- `rainbow` — apply via `data-panda-theme="rainbow"`.
- `monochrome` — apply via `data-panda-theme="monochrome"`.

Apply at any granularity:

```text
<html data-panda-theme="rainbow">       (entire app)
<div  data-panda-theme="monochrome">    (subtree)
```

Use the CLI to print usage:

```bash
npx @stalk-ui/cli theme            # list themes
npx @stalk-ui/cli theme rainbow    # show how to apply
```

---

## Semantic Token Reference

Use semantic tokens, never raw colors.

| Token            | Purpose                                    |
| ---------------- | ------------------------------------------ |
| `bg.default`     | Default page/surface background            |
| `bg.subtle`      | Subtle/secondary surface                   |
| `fg.default`     | Default text/icon                          |
| `fg.muted`       | Muted text (placeholders, disabled states) |
| `accent.solid`   | Primary action background                  |
| `accent.fg`      | Foreground on top of accent surfaces       |
| `border.default` | Default border color                       |
| `border.muted`   | Subtle dividers                            |
| `focus.ring`     | Focus ring color                           |
| `danger.solid`   | Destructive action background              |

Full reference is generated and viewable in Storybook (`semantic-tokens.mdx`) and in the generated `styled-system/tokens`.

---

## Custom Themes

Add a theme by extending the preset with `data-panda-theme="<name>"` rules. See `https://stalk-ui.com/en/docs/getting-started/custom-themes` for the canonical recipe.

For runtime switching between themes (with `next-themes` or similar), see `https://stalk-ui.com/en/docs/getting-started/theming`.

---

## Color Mode

Color mode is class-based via the same `data-panda-theme` mechanism plus a separate `data-color-mode` attribute or `class="dark"`. Components reference semantic tokens that resolve correctly in both light and dark — never write `dark:` overrides per-component.

---

## RTL

Stalk components use **logical properties** so direction-aware spacing/borders flip automatically:

- `marginInlineStart` / `marginInlineEnd` (not `marginLeft` / `marginRight`)
- `paddingInline`, `paddingBlock`
- `insetInlineStart`, `insetInlineEnd`
- `borderInlineStartWidth`, etc.

Stories cover RTL via the Storybook globals/toolbar. New components must work in `dir="rtl"` without bespoke wrappers.
