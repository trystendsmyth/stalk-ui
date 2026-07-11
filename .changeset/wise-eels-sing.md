---
"@stalk-ui/preset": patch
"@stalk-ui/cli": patch
---

Fix Dialog and Sheet clobbering each other when imported together

Both compounds were assembled with `Object.assign` on the shared
`@radix-ui/react-dialog` `Root` singleton, so importing `Dialog` and `Sheet` in
the same module made the later import overwrite the earlier one's parts — e.g.
`Dialog.Content` would render as `Sheet.Content` (a side sheet instead of a
centered modal). Each compound now composes onto its own root wrapper instead of
mutating the shared Radix primitive.
