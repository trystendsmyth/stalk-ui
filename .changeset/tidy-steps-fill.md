---
"@stalk-ui/preset": patch
"@stalk-ui/cli": patch
---

Make horizontal Steps fill their container

The `steps` slot recipe root had no width, so a horizontal stepper shrink-wrapped
to its content and the `flex: 1` items had no space to distribute — labels
overlapped the following indicator. The root now stretches to `width: full` so
items spread and separators fill the gaps.
