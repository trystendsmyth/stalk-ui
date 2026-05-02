# Agent Instructions

Stalk UI is a PandaCSS-native component library distributed through `@stalk-ui/cli`, `@stalk-ui/preset`, published `@stalk-ui/i18n`, and generated static registry manifests under `public/r/`. The shadcn CLI path is secondary compatibility output for projects that already satisfy the PandaCSS prerequisites.

## Critical Rules

- Use Node 24, pnpm 10, TypeScript 5.x, React 19, and PandaCSS 1.9.1.
- PandaCSS is pinned at 1.9.1 until TypeScript 6.x has matured enough for us to move to it. Do not suggest or apply 1.10+ upgrades without explicit maintainer approval.
- Do not add Tailwind tooling, `prettier-plugin-tailwindcss`, or `bradlc.vscode-tailwindcss`.
- Components are distributed as copied source files, not through a component npm package.
- Public component APIs use dot notation composed from named exports with `/* @__PURE__ */ Object.assign`.
- Keep compound component namespaces tree-shakeable. Use `/* @__PURE__ */` on every `forwardRef`, top-level recipe call (`const styles = /* @__PURE__ */ recipe()`), and the bottom `Object.assign(Root, { ... })` namespace.
- Use named function expressions inside `forwardRef` (`forwardRef(function ComponentName(...) { ... })`) so React picks up `displayName` automatically. Do not write `Component.displayName = 'X'` mutations — they are top-level side effects that defeat tree-shaking.
- Keep user-facing strings localizable and styles RTL-ready through logical properties.
- Use semantic tokens such as `bg.default`, `fg.muted`, and `accent.solid`; do not hardcode raw color values.
- Component sources are bundled assuming `@stalk-ui/components` (and any consumer) declares `"sideEffects": false`. Do not introduce top-level statements with observable side effects (logging, fetch, mutation of imported bindings, etc.).

## Workspace Layout

- `packages/cli`: `@stalk-ui/cli`, the install and upgrade tool.
- `packages/preset`: `@stalk-ui/preset`, PandaCSS tokens, recipes, slot recipes, and themes.
- `packages/i18n`: `@stalk-ui/i18n`, published locale and runtime support.
- `packages/components`: private internal component source of truth.
- `packages/utils`: private internal helper source copied through registry manifests.
- `packages/tsconfig`: shared TypeScript configuration package.
- `registry`: TypeScript-authored install manifests.
- `public/r`: generated native and shadcn-compatible registry JSON.
- `apps/docs`: documentation site.
- `apps/storybook`: Storybook examples and visual coverage.

## Component Requirements

Every component must have:

1. Source in `packages/components/src/<kebab-case-name>.tsx`.
2. A matching manifest in `registry/ui/<kebab-case-name>.ts`.
3. Named React exports and a dot-notation public API composed with `/* @__PURE__ */ Object.assign`.
4. Stories covering variants, states, RTL, and color mode (via Storybook globals / toolbar, not one-off dark wrappers).
5. Tests covering axe, keyboard interactions, and screen reader labels.
6. `asChild` support where applicable through `@radix-ui/react-slot`.
7. Forwarded refs (`/* @__PURE__ */ forwardRef(function ComponentName(...) { ... })`) and strict TypeScript types.
8. Recipe usage from generated `styled-system/recipes`; components do not import from `@stalk-ui/preset` directly.
9. Documentation and tree-shaking verification for compound components.

## Component Template

Use `packages/components/src/dialog.tsx` as the canonical compound component reference.

- Import Radix primitives where the interaction has an established accessible primitive, for example `import * as DialogPrimitive from '@radix-ui/react-dialog'`.
- Import the generated Panda recipe from `styled-system/recipes`, for example `import { dialog as dialogRecipe } from 'styled-system/recipes'`.
- Import `cx` from generated `styled-system/css` instead of creating local class-name helpers.
- Wrap every `forwardRef` part as `/* @__PURE__ */ forwardRef(function PartName(props, ref) { ... })`. The named function expression supplies React's `displayName`; no separate `Part.displayName = '...'` statement is needed (those mutations defeat tree-shaking).
- Mark the top-level recipe call as `const styles = /* @__PURE__ */ recipeName()` so bundlers can drop it when no part of the file is referenced.
- Compose public compound APIs as `export const Name = /* @__PURE__ */ Object.assign(NameRoot, { ... })`. The PURE annotation on `Object.assign` lets bundlers drop the namespace when consumers import only individual named exports.
- Do not add blanket component JSDoc. Prefer generated docs from source metadata and add comments only when they explain non-obvious behavior.
- Tests should cover render behavior, axe, keyboard interactions, and role or label queries rather than class-name queries.
- Stories should cover variants, states, RTL, and color mode or alternate themes (validated with toolbar globals).
- Components must work across color mode, theme, and RTL combinations.

## Stories (Storybook)

Author CSF stories in `packages/components/src/*.stories.tsx` using Panda JSX and semantic tokens. Token reference docs live as MDX in `apps/storybook/src/` (see `semantic-tokens.mdx`) so `@storybook/addon-docs/blocks` resolves. See `.cursor/rules/15-stories-authoring.mdc` for the full checklist. Canonical story example: `packages/components/src/button.stories.tsx`.

## Verifying Changes

After any component, recipe, registry, or i18n edit, run `pnpm verify` as the final step before reporting work complete or staging a commit. It chains the same gates CI enforces:

- `pnpm verify:fast` — `format:check`, `syncpack:check`, `lint`, `typecheck`, unit tests.
- `pnpm verify:drift` — regenerates `packages/preset/__snapshots__/reference.css` and `public/r/*.json`, then fails if either differs from what's checked in. Slot-recipe or component-source edits require committing the regenerated artifacts; do not bypass this step.
- `pnpm verify:audit` — completeness, semantic tokens, i18n, third-party budgets, registry deps, tree-shaking, docs, exports.

Heavier suites (`pnpm test:integration`, `pnpm lost-pixel`, `pnpm size:check`) are not part of `pnpm verify`; run them on demand when their inputs change (registry/CLI/preset publishing, story visuals, bundle budgets respectively). If a Lost Pixel baseline shifts, refresh it before the commit that introduces the visual change.

## Testing And Accessibility

Accessibility is a blocking requirement. jsx-a11y strict lint rules, axe tests, Storybook a11y checks, and docs accessibility checks should fail CI when violated.

Use Testing Library queries by role, label, or text. Avoid class-name queries and `fireEvent`; prefer `user-event` for interactions.

## Commits

Use Conventional Commits:

```text
<type>(<scope>): <subject>
```

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`, `a11y`.

Common scopes: `preset`, `cli`, `i18n`, `registry`, `docs`, `storybook`, `ci`, `deps`, `repo`.

Branch names should follow `<type>/<kebab-description>`.
