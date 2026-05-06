# Styling Rules

Stalk UI uses **PandaCSS recipes + semantic tokens**. Never Tailwind, never raw colors, never style overrides that bypass the recipe.

## Recipes from generated `styled-system/recipes`

Components import the recipe from the generated package, never from `@stalk-ui/preset`.

```tsx
// ❌ Incorrect — preset is the authoring surface, not the runtime.
import { button as buttonRecipe } from '@stalk-ui/preset/recipes'

// ✅ Correct — codegen output.
import { button as buttonRecipe } from 'styled-system/recipes'
```

## Use `cx` from generated `styled-system/css`

```tsx
// ❌ Incorrect — local class-name helper.
const cx = (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' ')

// ✅ Correct.
import { cx } from 'styled-system/css'
```

## Mark recipe calls as PURE

Top-level recipe calls are top-level effects unless tagged. Annotate so unused parts are tree-shaken.

```tsx
// ❌ Incorrect.
const styles = buttonRecipe()

// ✅ Correct.
const styles = /* @__PURE__ */ buttonRecipe()
```

## Semantic tokens, never raw colors

```tsx
// ❌ Incorrect.
<div className={css({ bg: '#fff', color: 'red.500' })} />

// ✅ Correct.
<div className={css({ bg: 'bg.default', color: 'fg.default' })} />
```

## Logical properties for direction-aware styles

```tsx
// ❌ Incorrect — breaks in RTL.
<div className={css({ marginLeft: '4', borderLeftWidth: '1px' })} />

// ✅ Correct.
<div className={css({ marginInlineStart: '4', borderInlineStartWidth: '1px' })} />
```

## `className` is for layout/composition, not theming

Consumers can pass `className` to extend layout (`mt-4`, gap, grid placement). Don't use `className` overrides inside components to override colors or typography produced by the recipe — change the recipe instead.
