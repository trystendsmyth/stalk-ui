import { readFileSync } from 'node:fs'

const buttonSource = readFileSync('packages/components/src/button.tsx', 'utf8')

if (!buttonSource.includes('export const Button')) {
  throw new Error('Button must remain a named export for consumer tree-shaking.')
}

if (buttonSource.includes('export default')) {
  throw new Error('Components must not use default exports; named exports tree-shake predictably.')
}

console.log('Tree-shaking invariants passed for Button.')
