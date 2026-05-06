# Tree-shaking Rules

`@stalk-ui/components` (and any consumer that imports a subset of a compound component) declares `"sideEffects": false`. That promise only holds if **every top-level expression with side-effect potential is annotated `/* @__PURE__ */`** and component files have no observable side effects on import.

## Annotate every `forwardRef`

```tsx
// ❌ Incorrect.
const ButtonContent = forwardRef(function ButtonContent(props, ref) {
  /* ... */
})

// ✅ Correct.
const ButtonContent = /* @__PURE__ */ forwardRef(function ButtonContent(props, ref) {
  /* ... */
})
```

## Annotate every top-level recipe call

Recipe calls produce class names eagerly. Annotate so the call is dropped when the component is unused.

```tsx
// ❌ Incorrect.
const styles = buttonRecipe()

// ✅ Correct.
const styles = /* @__PURE__ */ buttonRecipe()
```

## Annotate the namespace `Object.assign`

```tsx
// ❌ Incorrect — pulling Dialog imports every part.
export const Dialog = Object.assign(DialogRoot, { Trigger, Content, Title })

// ✅ Correct.
export const Dialog = /* @__PURE__ */ Object.assign(DialogRoot, {
  Trigger,
  Content,
  Title,
})
```

## No top-level side effects in component files

Component sources may not run any of the following at module top level:

- `console.log` / `console.warn`
- `fetch(...)`
- Mutating an imported binding
- Adding listeners (`window.addEventListener`)
- Setting `Component.displayName = '...'`

Use named function expressions for `displayName` and put any one-time setup inside `useEffect` (or document a deliberate exception in a code comment).

## Verify with `pnpm verify`

`pnpm verify:audit` runs the tree-shaking audit. CI fails if a component file introduces an observable side effect or a namespace forgets the PURE annotation.
