# Copilot Instructions

Stalk UI is a PandaCSS-native component library.

## Critical Rules

- TypeScript strict mode. Never use `any`.
- PandaCSS 1.9.1 is pinned. Do not suggest 1.10+ upgrades.
- Components consume generated `styled-system/recipes`; never duplicate recipes in copied component files.
- Use semantic tokens such as `bg.default` and `accent.solid`. Never use raw colors.
- Public component examples should prefer dot notation built from named exports.
- Lucide is a peer dependency. Do not bundle icons.
- Use logical properties for RTL.
- Keep user-facing strings localizable.

## Every New Component Requires

- Story file with RTL and dark mode variants.
- Test file with axe, keyboard, and screen reader tests.
- Component source in `packages/components/src/`.
- Registry manifest in `registry/ui/`.
- Tree-shaking verification for compound components.
- Recipe in `packages/preset/src/recipes/`.
- MDX docs, either generated or hand-written.
- A changeset.

## Commits

Use Conventional Commits. Types include `a11y` for accessibility work.

Common scopes: `preset`, `cli`, `i18n`, `registry`, `docs`, `storybook`, `ci`, `deps`, `repo`.

Branch naming: `<type>/<kebab-description>`.
