import type { Ref, RefCallback } from 'react'

export const mergeRefs =
  <T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> =>
  (value) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref !== undefined && ref !== null) {
        ref.current = value
      }
    }
  }
