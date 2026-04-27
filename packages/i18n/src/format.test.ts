import { describe, expect, it } from 'vitest'

import { formatDate, formatNumber, formatRelativeTime } from './format'

describe('format utilities', () => {
  it('formats dates for the provided locale', () => {
    expect(formatDate(new Date(Date.UTC(2024, 0, 2)), 'en-US', { timeZone: 'UTC' })).toBe(
      '1/2/2024',
    )
  })

  it('formats numbers for the provided locale', () => {
    expect(formatNumber(1234.5, 'en-US')).toBe('1,234.5')
  })

  it('formats relative time with automatic wording by default', () => {
    expect(formatRelativeTime(-1, 'day', 'en-US')).toBe('yesterday')
  })
})
