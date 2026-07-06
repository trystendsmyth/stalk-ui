import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, test } from 'vitest'

import {
  createImportRewriter,
  importMapCommonPrefix,
  resolveStyledSystemTarget,
  styledSystemAliasFor,
} from '../src/import-rewrite'
import { detectPandaImportMap } from '../src/panda-config'

import type { StalkConfig } from '../src/types'

const componentSource = `import { forwardRef } from 'react'
import { css, cx } from 'styled-system/css'
import { HStack } from 'styled-system/jsx'
import { badge as badgeRecipe } from 'styled-system/recipes'

import type { SystemStyleObject } from 'styled-system/types'

const load = async () => import('styled-system/css')
`

const roots: string[] = []

const createRoot = async () => {
  const root = await mkdtemp(join(tmpdir(), 'stalk-import-rewrite-'))
  roots.push(root)
  return root
}

afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, { force: true, recursive: true })))
})

const baseConfig: StalkConfig = {
  $schema: 'https://stalk-ui.com/schema/v1/config.json',
  preset: '@stalk-ui/preset',
  components: './src/components/ui',
  utils: './src/lib/utils',
  styledSystem: 'styled-system',
  registries: {},
}

describe('createImportRewriter', () => {
  test('is the identity when source and target match', () => {
    const rewrite = createImportRewriter('styled-system', 'styled-system')

    expect(rewrite(componentSource)).toBe(componentSource)
  })

  test('rewrites every specifier form to a string alias', () => {
    const rewrite = createImportRewriter('styled-system', '@styled')
    const result = rewrite(componentSource)

    expect(result).toContain(`from '@styled/css'`)
    expect(result).toContain(`from '@styled/jsx'`)
    expect(result).toContain(`from '@styled/recipes'`)
    expect(result).toContain(`from '@styled/types'`)
    expect(result).toContain(`import('@styled/css')`)
    expect(result).not.toContain('styled-system')
  })

  test('leaves other modules and lookalike prefixes untouched', () => {
    const rewrite = createImportRewriter('styled-system', '@styled')
    const source = `import { x } from 'styled-system-extras'\nimport { y } from 'react'\n`

    expect(rewrite(source)).toBe(source)
  })

  test('maps object-form importMap entries per key', () => {
    const rewrite = createImportRewriter('styled-system', {
      css: '@acme/design/css',
      jsx: '@acme/design/jsx',
      patterns: '@acme/design/patterns',
      recipes: '@acme/design/recipes',
    })
    const result = rewrite(componentSource)

    expect(result).toContain(`from '@acme/design/css'`)
    expect(result).toContain(`from '@acme/design/recipes'`)
    // Unknown subpath falls back to the shared prefix.
    expect(result).toContain(`from '@acme/design/types'`)
  })

  test('leaves unknown subpaths alone when object entries share no prefix', () => {
    const rewrite = createImportRewriter('styled-system', {
      css: '@acme/css-layer',
      jsx: '@acme/jsx-layer',
      patterns: '@acme/patterns-layer',
      recipes: '@acme/recipes-layer',
    })
    const result = rewrite(componentSource)

    expect(result).toContain(`from '@acme/css-layer'`)
    expect(result).toContain(`from 'styled-system/types'`)
  })
})

describe('importMap helpers', () => {
  test('collapses a uniform object importMap to its prefix', () => {
    expect(
      importMapCommonPrefix({
        css: '@styled/css',
        jsx: '@styled/jsx',
        patterns: '@styled/patterns',
        recipes: '@styled/recipes',
      }),
    ).toBe('@styled')

    expect(styledSystemAliasFor('@styled')).toBe('@styled')
    expect(
      styledSystemAliasFor({
        css: '@a/css',
        jsx: '@b/jsx',
        patterns: '@a/patterns',
        recipes: '@a/recipes',
      }),
    ).toBeUndefined()
  })
})

describe('detectPandaImportMap', () => {
  test('reads the string form', async () => {
    const root = await createRoot()
    await writeFile(
      join(root, 'panda.config.ts'),
      `import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  presets: ['@stalk-ui/preset'],
  importMap: '@styled',
  outdir: 'styled-system',
})
`,
    )

    expect(await detectPandaImportMap(root, {})).toBe('@styled')
  })

  test('reads the object form and fills missing keys with defaults', async () => {
    const root = await createRoot()
    await writeFile(
      join(root, 'panda.config.ts'),
      `import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  importMap: {
    css: '@acme/css',
    recipes: '@acme/recipes',
  },
})
`,
    )

    expect(await detectPandaImportMap(root, {})).toEqual({
      css: '@acme/css',
      jsx: 'styled-system/jsx',
      patterns: 'styled-system/patterns',
      recipes: '@acme/recipes',
    })
  })

  test('returns undefined without a config or importMap', async () => {
    const root = await createRoot()

    expect(await detectPandaImportMap(root, {})).toBeUndefined()

    await writeFile(
      join(root, 'panda.config.ts'),
      `import { defineConfig } from '@pandacss/dev'

export default defineConfig({ outdir: 'styled-system' })
`,
    )

    expect(await detectPandaImportMap(root, {})).toBeUndefined()
  })
})

describe('resolveStyledSystemTarget', () => {
  test('an explicit stalk.config.json alias wins over the panda importMap', async () => {
    const root = await createRoot()
    await writeFile(
      join(root, 'panda.config.ts'),
      `import { defineConfig } from '@pandacss/dev'

export default defineConfig({ importMap: '@from-panda' })
`,
    )

    expect(
      await resolveStyledSystemTarget(root, { ...baseConfig, styledSystem: '@explicit' }, {}),
    ).toBe('@explicit')
    expect(await resolveStyledSystemTarget(root, baseConfig, {})).toBe('@from-panda')
  })

  test('falls back to the default alias', async () => {
    const root = await createRoot()

    expect(await resolveStyledSystemTarget(root, baseConfig, {})).toBe('styled-system')
  })
})
