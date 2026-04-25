import { readFileSync } from 'node:fs'

const components = [
  ['Button', 'packages/components/src/button.tsx'],
  ['Input', 'packages/components/src/input.tsx'],
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

console.log('Tree-shaking invariants passed for Button, Input, and Textarea.')
