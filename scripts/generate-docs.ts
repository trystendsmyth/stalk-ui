import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

import { format, resolveConfig } from 'prettier'

import { registryItems } from '../registry/ui'

const docs = {
  badge: {
    title: 'Badge',
    description: 'Displays compact status or metadata.',
    examples: [
      '<Badge>Published</Badge>',
      '<Badge variant="solid">Stable</Badge>',
      '<Badge size="sm" variant="outline">Beta</Badge>',
    ],
  },
  button: {
    title: 'Button',
    description: 'Triggers an action or submits a form.',
    examples: [
      '<Button>Save</Button>',
      '<Button variant="outline">Cancel</Button>',
      '<Button loading>Saving</Button>',
    ],
  },
  checkbox: {
    title: 'Checkbox',
    description: 'Toggles a binary option in a form or settings surface.',
    examples: [
      '<Checkbox label="Accept terms" />',
      '<Checkbox description="Receive product release notes." id="release-notes" label="Release notes" />',
      '<Checkbox invalid label="Required checkbox" />',
    ],
  },
  dialog: {
    title: 'Dialog',
    description: 'Displays modal content in a focus-trapped overlay.',
    examples: [
      '<Dialog.Root><Dialog.Trigger>Open</Dialog.Trigger><Dialog.Content><Dialog.Title>Title</Dialog.Title></Dialog.Content></Dialog.Root>',
      '<Dialog.Content><Dialog.Header><Dialog.Title>Settings</Dialog.Title><Dialog.Description>Manage preferences.</Dialog.Description></Dialog.Header></Dialog.Content>',
      '<Dialog.Footer><Dialog.Close>Cancel</Dialog.Close></Dialog.Footer>',
    ],
  },
  'dropdown-menu': {
    title: 'DropdownMenu',
    description: 'Displays a keyboard-accessible menu of actions from a trigger.',
    examples: [
      '<DropdownMenu.Root><DropdownMenu.Trigger>Open</DropdownMenu.Trigger><DropdownMenu.Content><DropdownMenu.Item>Edit</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Root>',
      '<DropdownMenu.Label>Project</DropdownMenu.Label><DropdownMenu.Separator />',
      '<DropdownMenu.Item>Rename<DropdownMenu.Shortcut>⌘R</DropdownMenu.Shortcut></DropdownMenu.Item>',
    ],
  },
  input: {
    title: 'Input',
    description: 'Collects short-form text from a user.',
    examples: [
      '<Input aria-label="Email" placeholder="hello@stalk-ui.com" />',
      '<Input invalid aria-label="Email" placeholder="Invalid email" />',
      '<Input disabled aria-label="Disabled input" placeholder="Disabled" />',
    ],
  },
  label: {
    title: 'Label',
    description: 'Associates text with a form control.',
    examples: [
      '<Label htmlFor="email">Email</Label>',
      '<Label required htmlFor="name">Name</Label>',
      '<Label size="lg">Large label</Label>',
    ],
  },
  popover: {
    title: 'Popover',
    description: 'Displays interactive floating content from a trigger.',
    examples: [
      '<Popover.Root><Popover.Trigger>Open</Popover.Trigger><Popover.Content>Interactive content</Popover.Content></Popover.Root>',
      '<Popover.Content aria-label="Project settings"><Popover.Close>Close</Popover.Close></Popover.Content>',
      '<Popover.Content side="bottom">Positioned below the trigger</Popover.Content>',
    ],
  },
  radio: {
    title: 'Radio',
    description: 'Selects one option from a related set of choices.',
    examples: [
      '<Radio label="Basic" name="plan" value="basic" />',
      '<Radio description="Best for small teams." id="plan-basic" label="Basic" name="plan" value="basic" />',
      '<Radio invalid label="Required choice" name="plan" value="required" />',
    ],
  },
  select: {
    title: 'Select',
    description: 'Lets a user choose one option from a native menu.',
    examples: [
      '<Select aria-label="Status"><option>Draft</option><option>Published</option></Select>',
      '<Select invalid aria-label="Status"><option>Choose a status</option></Select>',
      '<Select disabled aria-label="Disabled select"><option>Disabled</option></Select>',
    ],
  },
  switch: {
    title: 'Switch',
    description: 'Toggles a setting on or off.',
    examples: [
      '<Switch label="Email notifications" />',
      '<Switch description="Send product updates." id="product-updates" label="Product updates" />',
      '<Switch invalid label="Required setting" />',
    ],
  },
  tooltip: {
    title: 'Tooltip',
    description: 'Provides supplemental context when a control is hovered or focused.',
    examples: [
      '<Tooltip.Provider><Tooltip.Root><Tooltip.Trigger>Help</Tooltip.Trigger><Tooltip.Content>Helpful context</Tooltip.Content></Tooltip.Root></Tooltip.Provider>',
      '<Tooltip.Root defaultOpen><Tooltip.Trigger>Open</Tooltip.Trigger><Tooltip.Content>Visible by default</Tooltip.Content></Tooltip.Root>',
      '<Tooltip.Content side="bottom">Positioned below the trigger</Tooltip.Content>',
    ],
  },
  textarea: {
    title: 'Textarea',
    description: 'Collects multi-line text from a user.',
    examples: [
      '<Textarea aria-label="Message" placeholder="Write a message..." />',
      '<Textarea invalid aria-label="Message" placeholder="Message is required" />',
      '<Textarea disabled aria-label="Disabled textarea" placeholder="Disabled" />',
    ],
  },
} as const

const rootDirectory = process.cwd()
const generatedDirectory = join(rootDirectory, 'apps/docs/content/components')
const prettierConfig = await resolveConfig(join(generatedDirectory, 'component.mdx'))

const writeGeneratedDoc = async (name: keyof typeof docs) => {
  const item = registryItems.find((registryItem) => registryItem.name === name)

  if (item === undefined) {
    throw new Error(`Missing registry item for ${name}.`)
  }

  const doc = docs[name]
  const path = join(generatedDirectory, `${name}.mdx`)
  const content = `---
title: ${doc.title}
description: ${doc.description}
---

<!-- This file is generated by scripts/generate-docs.ts. Do not edit manually. -->

# ${doc.title}

${doc.description}

## Install

\`\`\`bash
pnpm dlx @stalk-ui/cli add @stalk-ui/${name}
\`\`\`

## Examples

${doc.examples
  .map(
    (example) => `\`\`\`tsx
${example}
\`\`\``,
  )
  .join('\n\n')}

## Registry

- Manifest: \`/r/${name}.json\`
- Recipe: \`${item.stalk.preset.recipes.join(', ')}\`
- Files: ${item.files.map((file) => `\`${file.path}\``).join(', ')}
`

  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, await format(content, { ...prettierConfig, filepath: path, parser: 'mdx' }))
}

for (const name of Object.keys(docs) as (keyof typeof docs)[]) {
  await writeGeneratedDoc(name)
}
