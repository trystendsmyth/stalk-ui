---
"@stalk-ui/preset": minor
"@stalk-ui/cli": minor
"@stalk-ui/i18n": minor
"@stalk-ui/components": minor
"@stalk-ui/tsconfig": minor
"@stalk-ui/utils": minor
---

dialog: support non-modal dialogs via an optional overlay

`Dialog.Content` gains an `overlay` prop (default `true`). Setting `overlay={false}`
alongside `Dialog.Root`'s already-forwarded `modal={false}` renders a non-blocking,
click-through panel (the page behind stays interactive) — for live side panels that
shouldn't trap focus or dim the app.
