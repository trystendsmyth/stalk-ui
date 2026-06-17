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

if (typeof globalThis.matchMedia !== 'function') {
  // Embla (carousel) and other responsive primitives call matchMedia, which JSDOM
  // does not implement. Default every query to a non-matching, inert MediaQueryList.
  const noop = () => {
    /* inert listener; JSDOM has no media query engine */
  }
  globalThis.matchMedia = (query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: noop,
    removeListener: noop,
    addEventListener: noop,
    removeEventListener: noop,
    dispatchEvent: () => false,
  })
}

if (typeof globalThis.IntersectionObserver === 'undefined') {
  // Embla (carousel) observes slide visibility; JSDOM has no IntersectionObserver.
  class JSDomIntersectionObserver {
    readonly root = null
    readonly rootMargin = ''
    readonly thresholds: readonly number[] = []
    observe() {
      /* no layout in JSDOM; nothing to observe */
    }
    unobserve() {
      /* no-op */
    }
    disconnect() {
      /* no-op */
    }
    takeRecords() {
      return []
    }
  }

  globalThis.IntersectionObserver = JSDomIntersectionObserver
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
