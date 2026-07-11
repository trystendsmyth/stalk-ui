---
"@stalk-ui/preset": patch
"@stalk-ui/cli": patch
---

Center the DatePicker range field's icon and label

The range-mode field borrows the input recipe's root, whose `align-items: stretch`
(so prefix/suffix buttons fill the height) was winning over the range field's own
`center`, leaving the calendar icon sitting above the label. The range field now
forces `align-items: center`.
