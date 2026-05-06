import { describe, expect, test } from 'vitest'

import { configSchemaUrl, defaultRegistryTemplate } from '../src/constants'
import { resolveManifestUrl } from '../src/manifest'

import type { StalkConfig } from '../src/types'

const baseConfig: StalkConfig = {
  $schema: configSchemaUrl,
  preset: '@stalk-ui/preset',
  components: './src/components/ui',
  utils: './src/lib/utils',
  styledSystem: 'styled-system',
  registries: {
    '@stalk-ui': defaultRegistryTemplate,
  },
}

describe('resolveManifestUrl', () => {
  test('default variant resolves to canonical {name}.json path', () => {
    expect(resolveManifestUrl('button', baseConfig)).toBe('https://stalk-ui.com/r/button.json')
    expect(resolveManifestUrl('@stalk-ui/dialog', baseConfig)).toBe(
      'https://stalk-ui.com/r/dialog.json',
    )
  })

  test('explicit radix primitives is treated as default', () => {
    expect(resolveManifestUrl('button', { ...baseConfig, primitives: 'radix' })).toBe(
      'https://stalk-ui.com/r/button.json',
    )
  })

  test('non-default variant prepends a variant segment', () => {
    expect(resolveManifestUrl('button', { ...baseConfig, primitives: 'base' })).toBe(
      'https://stalk-ui.com/r/base/button.json',
    )
    expect(resolveManifestUrl('@stalk-ui/dialog', { ...baseConfig, primitives: 'base' })).toBe(
      'https://stalk-ui.com/r/base/dialog.json',
    )
  })

  test('templated --registry override receives variant rewriting', () => {
    expect(
      resolveManifestUrl(
        '@stalk-ui/button',
        { ...baseConfig, primitives: 'base' },
        'https://example.com/r/{name}.json',
      ),
    ).toBe('https://example.com/r/base/button.json')
  })

  test('literal --registry override is passed through unchanged', () => {
    expect(
      resolveManifestUrl(
        'button',
        { ...baseConfig, primitives: 'base' },
        'https://example.com/manifests/literal.json',
      ),
    ).toBe('https://example.com/manifests/literal.json')
  })
})
