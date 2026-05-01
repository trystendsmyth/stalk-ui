// Verifies every registry item has the full set of artifacts: source, test,
// story, manifest, generated JSON (native + shadcn), and declared recipe(s).

import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { registryItems } from '../registry/ui'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const abs = (path: string) => resolve(projectRoot, path)

const failures: string[] = []

const recipesRoot = abs('packages/preset/src/recipes')
const slotRecipesRoot = abs('packages/preset/src/slot-recipes')

const recipeExists = (recipeName: string): boolean => {
  const filename = recipeName.replace(/[A-Z]/g, (char, index: number) =>
    index === 0 ? char.toLowerCase() : `-${char.toLowerCase()}`,
  )
  return (
    existsSync(`${recipesRoot}/${recipeName}.ts`) ||
    existsSync(`${recipesRoot}/${filename}.ts`) ||
    existsSync(`${slotRecipesRoot}/${recipeName}.ts`) ||
    existsSync(`${slotRecipesRoot}/${filename}.ts`)
  )
}

for (const item of registryItems) {
  const name = item.name

  const sourcePath = `packages/components/src/${name}.tsx`
  if (!existsSync(abs(sourcePath))) {
    failures.push(`${name}: missing source ${sourcePath}`)
  }

  const testPath = `packages/components/src/${name}.test.tsx`
  if (!existsSync(abs(testPath))) {
    failures.push(`${name}: missing test file ${testPath}`)
  }

  const storyPath = `packages/components/src/${name}.stories.tsx`
  if (!existsSync(abs(storyPath))) {
    failures.push(`${name}: missing story file ${storyPath}`)
  }

  const manifestPath = `registry/ui/${name}.ts`
  if (!existsSync(abs(manifestPath))) {
    failures.push(`${name}: missing manifest ${manifestPath}`)
  }

  const nativeJson = `public/r/${name}.json`
  if (!existsSync(abs(nativeJson))) {
    failures.push(
      `${name}: missing generated registry JSON ${nativeJson} (run pnpm build:registry)`,
    )
  }

  const shadcnJson = `public/r/shadcn/${name}.json`
  if (!existsSync(abs(shadcnJson))) {
    failures.push(
      `${name}: missing shadcn-compat registry JSON ${shadcnJson} (run pnpm build:registry)`,
    )
  }

  for (const recipe of item.stalk.preset.recipes) {
    if (!recipeExists(recipe)) {
      failures.push(`${name}: declared recipe '${recipe}' not found in preset recipes/slot-recipes`)
    }
  }
}

if (failures.length > 0) {
  console.error('Component completeness check failed:')
  for (const failure of failures) {
    console.error(`  - ${failure}`)
  }
  console.error(`\n${String(failures.length)} missing artifact${failures.length === 1 ? '' : 's'}.`)
  process.exit(1)
}

console.log(
  `Component completeness check passed for ${String(registryItems.length)} component${
    registryItems.length === 1 ? '' : 's'
  }.`,
)
