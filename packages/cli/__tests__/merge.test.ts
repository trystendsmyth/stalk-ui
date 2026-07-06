import { describe, expect, test } from 'vitest'

import { mergeThreeWay } from '../src/merge'

const base = ['const a = 1', 'const b = 2', 'const c = 3', ''].join('\n')

describe('mergeThreeWay', () => {
  test('returns remote content when local matches base', () => {
    const remote = base.replace('const b = 2', 'const b = 20')
    const result = mergeThreeWay(base, base, remote)

    expect(result.conflicted).toBe(false)
    expect(result.content).toBe(remote)
  })

  test('keeps disjoint local and registry edits in a clean merge', () => {
    const local = base.replace('const a = 1', 'const a = 100')
    const remote = base.replace('const c = 3', 'const c = 300')
    const result = mergeThreeWay(base, local, remote)

    expect(result.conflicted).toBe(false)
    expect(result.content).toContain('const a = 100')
    expect(result.content).toContain('const b = 2')
    expect(result.content).toContain('const c = 300')
  })

  test('marks overlapping edits as conflicts with git-style markers', () => {
    const local = base.replace('const b = 2', 'const b = 21')
    const remote = base.replace('const b = 2', 'const b = 22')
    const result = mergeThreeWay(base, local, remote)

    expect(result.conflicted).toBe(true)
    expect(result.content).toContain('<<<<<<< local edits')
    expect(result.content).toContain('const b = 21')
    expect(result.content).toContain('=======')
    expect(result.content).toContain('const b = 22')
    expect(result.content).toContain('>>>>>>> registry')
  })

  test('treats identical local and registry edits as clean', () => {
    const both = base.replace('const b = 2', 'const b = 9')
    const result = mergeThreeWay(base, both, both)

    expect(result.conflicted).toBe(false)
    expect(result.content).toBe(both)
  })
})
