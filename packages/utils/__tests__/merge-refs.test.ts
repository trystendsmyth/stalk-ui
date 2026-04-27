import { describe, expect, test, vi } from 'vitest'

import { mergeRefs } from '../src/merge-refs'

describe('mergeRefs', () => {
  test('assigns a value to object and callback refs', () => {
    const objectRef = { current: null as { id: string } | null }
    const callbackRef = vi.fn()
    const value = { id: 'target' }

    mergeRefs<{ id: string }>(objectRef, callbackRef)(value)

    expect(objectRef.current).toBe(value)
    expect(callbackRef).toHaveBeenCalledWith(value)
  })

  test('ignores undefined refs', () => {
    const objectRef = { current: null as { id: string } | null }
    const value = { id: 'target' }

    expect(() => {
      mergeRefs<{ id: string }>(undefined, objectRef)(value)
    }).not.toThrow()
    expect(objectRef.current).toBe(value)
  })
})
