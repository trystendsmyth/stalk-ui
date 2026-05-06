import type { RegistryItem } from '../types'
import type { RegistryListing } from './registry'

export const formatItemListing = (items: RegistryListing[]): string => {
  if (items.length === 0) {
    return 'No items found.'
  }

  return items
    .map((item) => `- ${item.registry}/${item.name} (${item.variant}, ${item.flavor})`)
    .join('\n')
}

export const formatItemDetails = (items: RegistryItem[]): string => {
  if (items.length === 0) {
    return 'No items found. Check the registry prefix (e.g. "@stalk-ui/button") and try again.'
  }

  return items
    .map((item) => {
      const lines: string[] = [`## ${item.name}`, `**Type:** ${item.type}`]

      if (item.dependencies.length > 0) {
        lines.push(`**npm dependencies:** ${item.dependencies.join(', ')}`)
      }

      if (item.registryDependencies.length > 0) {
        lines.push(`**Registry dependencies:** ${item.registryDependencies.join(', ')}`)
      }

      const recipes = item.stalk.preset.recipes
      if (recipes.length > 0) {
        lines.push(`**Panda recipes:** ${recipes.join(', ')}`)
      }

      const tokenKeys = Object.keys(item.stalk.preset.semanticTokens)
      if (tokenKeys.length > 0) {
        lines.push(`**Semantic tokens:** ${tokenKeys.join(', ')}`)
      }

      lines.push(`**Files:** ${String(item.files.length)}`)

      for (const file of item.files) {
        lines.push('', `### ${file.path} (${file.type})`, '```tsx', file.content, '```')
      }

      return lines.join('\n')
    })
    .join('\n\n---\n\n')
}

const installRunners = {
  pnpm: 'pnpm dlx',
  npm: 'npx',
  yarn: 'yarn dlx',
  bun: 'bunx',
} as const

export const formatAddCommand = (
  items: string[],
  packageManager?: keyof typeof installRunners,
): string => {
  const args = items.join(' ')
  if (packageManager !== undefined) {
    return `${installRunners[packageManager]} @stalk-ui/cli add ${args}`
  }
  return [
    `npx @stalk-ui/cli add ${args}`,
    `pnpm dlx @stalk-ui/cli add ${args}`,
    `yarn dlx @stalk-ui/cli add ${args}`,
    `bunx @stalk-ui/cli add ${args}`,
  ].join('\n')
}

export const installInstructions = `Stalk UI is a PandaCSS-native component library. Components install as source files into your project.

Prerequisites:
- Node 24+, React 19, TypeScript 5.x
- PandaCSS 1.9.1 configured (we are pinned to 1.9.1 until TypeScript 6.x matures)

Setup:
1. \`npx @stalk-ui/cli init\` — patches your panda config, installs @stalk-ui/preset and @stalk-ui/i18n, writes stalk.config.json.
2. \`npx @stalk-ui/cli add <name>\` — installs a component (and its registry/package dependencies) by copying source files into ./src/components/ui by default.
3. Run \`panda codegen\` (the CLI does this for you) so styled-system reflects the new recipes and tokens.

Variants:
- \`radix\` (default) uses Radix primitives where an established accessible primitive exists.
- \`base\` uses lower-level primitives. Set \`primitives: "base"\` in stalk.config.json to switch.

Themes: neutral (default), rainbow, monochrome. Apply via \`<html data-panda-theme="rainbow">\` or on a subtree.`

export const auditChecklist = `# Stalk UI Audit Checklist

After adding or modifying components, verify:

- [ ] \`pnpm verify\` passes (format, lint, typecheck, tests, drift, audits).
- [ ] Components import recipes from generated \`styled-system/recipes\`, not from \`@stalk-ui/preset\` directly.
- [ ] Semantic tokens used everywhere (\`bg.default\`, \`fg.muted\`, \`accent.solid\`); no raw color values.
- [ ] Logical properties used for direction-aware spacing/borders so RTL works.
- [ ] Compound components composed with \`/* @__PURE__ */ Object.assign\`; \`forwardRef\` parts use named function expressions (no \`Component.displayName = '...'\` mutations).
- [ ] Top-level \`recipe()\` calls and \`Object.assign\` namespaces are annotated with \`/* @__PURE__ */\`.
- [ ] User-facing strings remain localizable; hard-coded English is reserved for last-resort fallbacks.
- [ ] Tests query by role/label/text — not class names or \`fireEvent\`.
- [ ] Stories cover variants, states, RTL, and color mode (via Storybook globals/toolbar).
- [ ] Panda codegen ran (the CLI does this; run it manually after editing the preset).`
