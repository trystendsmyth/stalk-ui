import { describe, expect, test } from 'vitest'

import { cn } from '../src/cn'

describe('cn', () => {
  test('joins class names and filters falsy values', () => {
    expect(cn('button', undefined, null, false, 'active')).toBe('button active')
  })

  test('preserves non-empty whitespace class strings', () => {
    expect(cn('button', '  ', 'active')).toBe('button    active')
  })
})
