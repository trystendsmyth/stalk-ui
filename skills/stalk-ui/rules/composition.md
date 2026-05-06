# Composition Rules

Stalk's compound components are exported as **named React components** plus a **dot-notation namespace** built with `/* @__PURE__ */ Object.assign`. This is what gives consumers `<Dialog.Trigger>` while still letting bundlers drop unused parts.

## Compose the namespace with PURE Object.assign

```tsx
// ❌ Incorrect — one big object literal, no PURE annotations,
// not tree-shakeable.
export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Content: DialogContent,
}

// ✅ Correct.
export const Dialog = /* @__PURE__ */ Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose,
})
```

Each part is also exported by name:

```tsx
export {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  /* … */
}
```

so consumers can `import { DialogContent } from '...'` and skip pulling the entire namespace.

## `forwardRef` parts use named function expressions

```tsx
// ❌ Incorrect — anonymous + manual displayName mutation.
const DialogContent = forwardRef((props, ref) => {
  /* ... */
})
DialogContent.displayName = 'DialogContent'

// ✅ Correct — name from the function expression, no top-level mutation.
const DialogContent = /* @__PURE__ */ forwardRef<HTMLDivElement, DialogContentProps>(
  function DialogContent(props, ref) {
    // ...
  },
)
```

The named function expression gives React's devtools `displayName` automatically. A `Component.displayName = '...'` statement is a top-level side effect and defeats `"sideEffects": false`.

## Use `asChild` (Radix Slot) for custom triggers

```tsx
// ❌ Incorrect — wrapper component duplicating Trigger semantics.
<Dialog.Trigger>
  <Link href="/x">Open</Link>
</Dialog.Trigger>

// ✅ Correct — Slot merges props onto the child.
<Dialog.Trigger asChild>
  <Link href="/x">Open</Link>
</Dialog.Trigger>
```

`asChild` is implemented via `@radix-ui/react-slot`. It's available on triggers that need to delegate semantics to a consumer-provided element.

## Items always inside their group

```tsx
// ❌ Incorrect.
<Select.Content>
  <Select.Item value="a">A</Select.Item>
  <Select.Item value="b">B</Select.Item>
</Select.Content>

// ✅ Correct — Items live inside SelectGroup so a11y labels work.
<Select.Content>
  <Select.Group>
    <Select.Label>Letters</Select.Label>
    <Select.Item value="a">A</Select.Item>
    <Select.Item value="b">B</Select.Item>
  </Select.Group>
</Select.Content>
```

## Dialog/Sheet/Popover require a Title

For accessibility every overlay needs a title. Hide it visually if the design doesn't show one:

```tsx
<Dialog.Title className={css({ srOnly: true })}>Confirm delete</Dialog.Title>
```

## Canonical reference

`packages/components/src/dialog.tsx` is the canonical compound-component template. Mirror its shape for new parts.
