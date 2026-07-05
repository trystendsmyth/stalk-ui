// Fixture coverage for repo codemods (scripts/codemods) per their README —
// they run under the CLI package's vitest so CI exercises them.

import { describe, expect, test } from 'vitest'

import { badgeSize12To13 } from '../../../scripts/codemods/badge-size-1-2-to-1-3'

describe('badgeSize12To13', () => {
  test('renames explicit sizes sm→md and md→lg on Badge only', () => {
    const source = `
      <Badge size="sm">A</Badge>
      <Badge size="md" tone="info">B</Badge>
      <Badge size={'sm'}>C</Badge>
      <Button size="sm">not a badge</Button>
    `

    const result = badgeSize12To13(source)

    expect(result).toContain(`<Badge size="md">A</Badge>`)
    expect(result).toContain(`<Badge size="lg" tone="info">B</Badge>`)
    expect(result).toContain(`<Badge size={'md'}>C</Badge>`)
    expect(result).toContain(`<Button size="sm">not a badge</Button>`)
  })

  test('leaves badges without explicit size and dynamic sizes untouched', () => {
    const source = `<Badge tone="danger">x</Badge>\n<Badge size={dynamic}>y</Badge>`

    expect(badgeSize12To13(source)).toBe(source)
  })

  test('handles multi-line opening tags', () => {
    const source = `<Badge\n  tone="success"\n  size="sm"\n>\n  ok\n</Badge>`

    expect(badgeSize12To13(source)).toContain(`size="md"`)
  })
})
