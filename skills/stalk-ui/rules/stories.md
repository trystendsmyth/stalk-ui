# Stories Rules

CSF stories live in `packages/components/src/<name>.stories.tsx`. They use Panda JSX and semantic tokens — never bespoke wrapper components for theme/RTL/color-mode coverage.

## Use Panda JSX, not custom wrappers

```tsx
// ❌ Incorrect — bespoke dark-mode wrapper.
<div style={{ background: '#000', color: '#fff', padding: 16 }}>
  <Button>Save</Button>
</div>

// ✅ Correct — semantic tokens via Panda's styled JSX.
<Box bg="bg.default" color="fg.default" p="4">
  <Button>Save</Button>
</Box>
```

## Cover the matrix via toolbar globals

Each component must demonstrate:

- Variants (`size`, `variant`, etc.)
- States (`disabled`, `loading`, error/invalid where applicable)
- Color mode (toggled via Storybook globals)
- RTL (toggled via Storybook globals)

Don't author one story per combination — let the toolbar cycle them. Only add a dedicated story when it captures a layout that the toolbar can't.

## Token reference docs are MDX

MDX docs (e.g. `semantic-tokens.mdx`) live under `apps/storybook/src/`. That location is required so `@storybook/addon-docs/blocks` resolves.

## Canonical reference

`packages/components/src/button.stories.tsx` is the canonical example. Mirror its structure: argTypes for the public API, a default story, plus minimal extra stories only when they show something the toolbar cannot.

See `.cursor/rules/15-stories-authoring.mdc` in the repo for the full checklist.
