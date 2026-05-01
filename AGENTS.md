# Agent Instructions

Stalk UI is a PandaCSS-native component library distributed through `@stalk-ui/cli`, `@stalk-ui/preset`, published `@stalk-ui/i18n`, and generated static registry manifests under `public/r/`. The shadcn CLI path is secondary compatibility output for projects that already satisfy the PandaCSS prerequisites.

## Critical Rules

- Use Node 24, pnpm 10, TypeScript 5.x, React 19, and PandaCSS 1.9.1.
- PandaCSS is pinned at 1.9.1. Do not suggest or apply 1.10+ upgrades without explicit maintainer approval.
- Do not add Tailwind tooling, `prettier-plugin-tailwindcss`, or `bradlc.vscode-tailwindcss`.
- Components are distributed as copied source files, not through a component npm package.
- Public component APIs use dot notation composed from named exports with `Object.assign`.
- Keep compound component namespaces tree-shakeable.
- Keep user-facing strings localizable and styles RTL-ready through logical properties.
- Use semantic tokens such as `bg.default`, `fg.muted`, and `accent.solid`; do not hardcode raw color values.

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
3. Named React exports and a dot-notation public API composed with `Object.assign`.
4. Stories covering variants, states, RTL, and color mode (via Storybook globals / toolbar, not one-off dark wrappers).
5. Tests covering axe, keyboard interactions, and screen reader labels.
6. `asChild` support where applicable through `@radix-ui/react-slot`.
7. Forwarded refs, `displayName`, and strict TypeScript types.
8. Recipe usage from generated `styled-system/recipes`; components do not import from `@stalk-ui/preset` directly.
9. Documentation and tree-shaking verification for compound components.

## Component Template

Use `packages/components/src/dialog.tsx` as the canonical compound component reference.

- Import Radix primitives where the interaction has an established accessible primitive, for example `import * as DialogPrimitive from '@radix-ui/react-dialog'`.
- Import the generated Panda recipe from `styled-system/recipes`, for example `import { dialog as dialogRecipe } from 'styled-system/recipes'`.
- Import `cx` from generated `styled-system/css` instead of creating local class-name helpers.
- Use `forwardRef` for every rendered part and assign a `displayName` immediately after each part.
- Compose public compound APIs with named exports plus `Object.assign`, keeping each part independently tree-shakeable.
- Do not add blanket component JSDoc. Prefer generated docs from source metadata and add comments only when they explain non-obvious behavior.
- Tests should cover render behavior, axe, keyboard interactions, and role or label queries rather than class-name queries.
- Stories should cover variants, states, RTL, and color mode or alternate themes (validated with toolbar globals).
- Components must work across color mode, theme, and RTL combinations.

## Stories (Storybook)

Author CSF stories in `packages/components/src/*.stories.tsx` using Panda JSX and semantic tokens. Token reference docs live as MDX in `apps/storybook/src/` (see `semantic-tokens.mdx`) so `@storybook/addon-docs/blocks` resolves. See `.cursor/rules/15-stories-authoring.mdc` for the full checklist. Canonical story example: `packages/components/src/button.stories.tsx`.

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
