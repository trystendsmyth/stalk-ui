---
name: stalk-ui
description: Manages Stalk UI components and projects — adding, searching, customizing, and composing UI. Provides project context, component manifests, and Stalk's PandaCSS rules. Applies when working with Stalk UI, stalk.config.json, @stalk-ui packages, or "stalk-ui add/init".
user-invocable: false
allowed-tools: Bash(npx @stalk-ui/cli *), Bash(pnpm dlx @stalk-ui/cli *), Bash(bunx @stalk-ui/cli *)
---

# Stalk UI

A PandaCSS-native React component library. Components are added as **copied source files** to the user's project via `@stalk-ui/cli`, not pulled in as a runtime npm package.

> **IMPORTANT:** Run all CLI commands using the project's package runner: `npx @stalk-ui/cli`, `pnpm dlx @stalk-ui/cli`, or `bunx @stalk-ui/cli`. Examples below use `npx`; substitute the runner that matches the project's `packageManager`.

## Current Project Context

```json
!`npx @stalk-ui/cli info --json`
```

The JSON above contains the project config (registries, variant, components path) and the list of components already installed under the configured components directory.

## Principles

1. **Use existing components first.** Run `npx @stalk-ui/cli mcp` (or query the remote MCP at `https://stalk-ui.com/mcp`) and call `search_items` / `list_items` before writing custom UI.
2. **Compose, don't reinvent.** Settings page = `Dialog` + form fields + `Button`. Empty states = `Spinner` + composition, not custom markup.
3. **Use built-in variants before custom styles.** `variant="solid"`, `size="md"` — don't override with `className` to recreate variants.
4. **Use semantic tokens.** `bg.default`, `fg.muted`, `accent.solid`. Never raw color values like `#fff` or `red.500`.
5. **PandaCSS, not Tailwind.** Do not add Tailwind tooling (`prettier-plugin-tailwindcss`, `bradlc.vscode-tailwindcss`). Stalk uses PandaCSS pinned at 1.9.1.

## Critical Rules

These rules are always enforced. Each links to a file with Incorrect/Correct code pairs.

### Styling → [styling.md](./rules/styling.md)

- **Recipes from `styled-system/recipes`,** not `@stalk-ui/preset` directly.
- **Semantic tokens only.** No raw hex/RGB/named colors in component source.
- **Logical properties for direction-aware spacing/borders** so RTL works (`marginInlineStart`, not `marginLeft`).
- **`cx` from generated `styled-system/css`,** not local class-name helpers.

### Composition → [composition.md](./rules/composition.md)

- **Compound components compose with `/* @__PURE__ */ Object.assign`.** `export const Dialog = /* @__PURE__ */ Object.assign(DialogRoot, { Trigger, Content, ... })`.
- **`forwardRef` parts use named function expressions.** `forwardRef(function DialogContent(props, ref) { ... })`. No `Component.displayName = '...'` mutations.
- **Use `asChild` (via `@radix-ui/react-slot`) for custom triggers** instead of building wrapper components.
- **Dialog/Popover/Tooltip require accessible labels.** A11y is a CI gate.

### Tree-shaking → [tree-shaking.md](./rules/tree-shaking.md)

- **Annotate every top-level recipe call** with `/* @__PURE__ */`: `const styles = /* @__PURE__ */ buttonRecipe()`.
- **Annotate every `forwardRef`** with `/* @__PURE__ */`.
- **Annotate the public namespace `Object.assign`** so unused parts of compound components can be dropped.
- **No top-level side effects** in component files (logging, fetch, mutating imported bindings). The package declares `"sideEffects": false`.

### Accessibility → [accessibility.md](./rules/accessibility.md)

- **Tests query by role/label/text.** No class-name queries, no `fireEvent` (use `user-event`).
- **Axe checks must pass.** jsx-a11y strict lint, axe tests, Storybook a11y, and docs a11y all gate CI.
- **Keep user-facing strings localizable.** Default `loadingLabel`-style props to `'Loading'` etc., let consumers pass translations.

### Stories → [stories.md](./rules/stories.md)

- **Author CSF stories** in `packages/components/src/<name>.stories.tsx` using Panda JSX and semantic tokens.
- **Cover variants, states, RTL, and color mode** via Storybook globals/toolbar — not bespoke wrappers.
- **MDX token reference docs** live under `apps/storybook/src/` so `@storybook/addon-docs/blocks` resolves.

### CLI

- **Variants, not flavors.** Stalk has two primitive variants: `radix` (default, uses Radix primitives where one fits) and `base`. Set in `stalk.config.json` as `"primitives": "base"`.
- **Themes:** `neutral` (default), `rainbow`, `monochrome`. Apply via `<html data-panda-theme="rainbow">` or any subtree.
- **`pnpm verify`** is the gate everything must pass before commit. Run it; don't bypass.

## Linked References

- [cli.md](./cli.md) — full CLI reference (init, add, theme, diff, upgrade, info, mcp).
- [mcp.md](./mcp.md) — MCP server (remote at `https://stalk-ui.com/mcp` and local stdio).
- [customization.md](./customization.md) — themes, semantic tokens, RTL.
