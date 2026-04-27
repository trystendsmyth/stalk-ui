import { describe, expect, test } from 'vitest'

import { createDataAttribute } from '../src/create-data-attribute'

describe('createDataAttribute', () => {
  test('creates empty boolean data attributes by default', () => {
    expect(createDataAttribute('invalid')).toEqual({ 'data-invalid': '' })
  })

  test('creates valued data attributes', () => {
    expect(createDataAttribute('state', 'open')).toEqual({ 'data-state': 'open' })
  })
})
