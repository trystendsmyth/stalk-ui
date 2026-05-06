# Accessibility Rules

Accessibility is a CI gate. jsx-a11y strict, axe tests, Storybook a11y, and docs a11y must all pass before merge.

## Test by role/label/text — never by class name

```tsx
// ❌ Incorrect — tests fail when class names change, miss real a11y bugs.
const button = container.querySelector('.button-solid')

// ✅ Correct.
const button = screen.getByRole('button', { name: /save/i })
```

## Use `user-event`, not `fireEvent`

```tsx
// ❌ Incorrect — does not simulate keyboard, focus, or pointer events realistically.
fireEvent.click(button)

// ✅ Correct.
const user = userEvent.setup()
await user.click(button)
```

## Localizable user-facing strings

Default English strings are last-resort fallbacks. Expose props for any text that would otherwise be hardcoded:

```tsx
// ❌ Incorrect.
;<VisuallyHidden>Loading</VisuallyHidden>

// ✅ Correct — consumers can pass translations.
interface ButtonProps {
  loadingLabel?: string // default 'Loading'
}
```

## Overlays require accessible names

Dialog, Sheet, Popover, Tooltip — every overlay needs a title or label. Hide visually if needed:

```tsx
<Dialog.Title className={css({ srOnly: true })}>Confirm delete</Dialog.Title>
```

## Keyboard interactions matter

Tests must cover keyboard paths (`Enter`, `Escape`, `Tab`, arrow keys for `Select`/`Menu`/`Tabs`). Don't only test click handlers.

## Logical properties for RTL

See [styling.md](./styling.md). Direction-aware spacing/borders must use `marginInlineStart`, `borderInlineStartWidth`, etc. Stories cover both LTR and RTL via the Storybook globals/toolbar.
