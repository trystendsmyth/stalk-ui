import '@testing-library/jest-dom/vitest'

import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

Reflect.set(globalThis, 'IS_REACT_ACT_ENVIRONMENT', true)

const htmlProto = HTMLElement.prototype as unknown as {
  hasPointerCapture?: (this: Element, id: number) => boolean
  setPointerCapture?: (this: Element, id: number) => void
  releasePointerCapture?: (this: Element) => void
}

if (typeof htmlProto.hasPointerCapture !== 'function') {
  htmlProto.hasPointerCapture = () => false
}

if (typeof htmlProto.setPointerCapture !== 'function') {
  htmlProto.setPointerCapture = () => {
    /* Radix expects this in JSDOM; no-op */
  }
}

if (typeof htmlProto.releasePointerCapture !== 'function') {
  htmlProto.releasePointerCapture = () => {
    /* Radix expects this in JSDOM; no-op */
  }
}

if (typeof globalThis.ResizeObserver === 'undefined') {
  class JSDomResizeObserver {
    observe() {
      /* Radix expects ResizeObserver in JSDOM; no-op */
    }
    unobserve() {
      /* Radix expects ResizeObserver in JSDOM; no-op */
    }
    disconnect() {
      /* Radix expects ResizeObserver in JSDOM; no-op */
    }
  }

  globalThis.ResizeObserver = JSDomResizeObserver
}

afterEach(() => {
  cleanup()
})
