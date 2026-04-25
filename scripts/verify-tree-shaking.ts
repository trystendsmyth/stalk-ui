import { readFileSync } from 'node:fs'

const components = [
  ['Badge', 'packages/components/src/badge.tsx'],
  ['Button', 'packages/components/src/button.tsx'],
  ['Checkbox', 'packages/components/src/checkbox.tsx'],
  ['Dialog', 'packages/components/src/dialog.tsx'],
  ['DropdownMenu', 'packages/components/src/dropdown-menu.tsx'],
  ['Input', 'packages/components/src/input.tsx'],
  ['Label', 'packages/components/src/label.tsx'],
  ['Popover', 'packages/components/src/popover.tsx'],
  ['Radio', 'packages/components/src/radio.tsx'],
  ['Select', 'packages/components/src/select.tsx'],
  ['Switch', 'packages/components/src/switch.tsx'],
  ['Tooltip', 'packages/components/src/tooltip.tsx'],
  ['Textarea', 'packages/components/src/textarea.tsx'],
] as const

for (const [name, path] of components) {
  const source = readFileSync(path, 'utf8')

  if (!source.includes(`export const ${name}`)) {
    throw new Error(`${name} must remain a named export for consumer tree-shaking.`)
  }

  if (source.includes('export default')) {
    throw new Error(
      'Components must not use default exports; named exports tree-shake predictably.',
    )
  }
}

console.log(
  'Tree-shaking invariants passed for Badge, Button, Checkbox, Dialog, DropdownMenu, Input, Label, Popover, Radio, Select, Switch, Tooltip, and Textarea.',
)
