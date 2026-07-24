import { defineRegistryItem } from './_template'

export const textEditor = defineRegistryItem({
  dependencies: [
    '@tiptap/core',
    '@tiptap/react',
    '@tiptap/starter-kit',
    '@tiptap/extension-character-count',
    '@tiptap/extension-highlight',
    '@tiptap/extension-placeholder',
    '@tiptap/extension-task-item',
    '@tiptap/extension-task-list',
    '@tiptap/extension-text-align',
    '@tiptap/extension-text-style',
    'lucide-react',
    '@stalk-ui/preset',
  ],
  filePath: 'src/components/ui/text-editor.tsx',
  name: 'text-editor',
  recipes: ['textEditor'],
  registryDependencies: ['input', 'popover', 'select', 'toolbar'],
  sourcePath: 'packages/components/src/text-editor.tsx',
})
