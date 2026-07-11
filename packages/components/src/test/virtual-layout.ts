// Test-only layout mocks. JSDOM has no layout engine, so every element measures
// 0×0 and a virtualizer renders nothing. These give it a viewport (via
// ResizeObserver) and a per-item size (via getBoundingClientRect) so a realistic,
// still-windowed subset mounts. Returns a cleanup to restore the originals.

import { vi } from 'vitest'

interface VirtualLayoutOptions {
  /** Measured size of each item in px. */
  itemSize?: number
  /** Measured size of the scroll viewport in px. */
  viewport?: number
}

export const installVirtualLayoutMocks = ({
  itemSize = 48,
  viewport = 240,
}: VirtualLayoutOptions = {}): (() => void) => {
  const originalResizeObserver = globalThis.ResizeObserver

  // spyOn avoids an unbound reference to the prototype method and self-restores.
  const rectSpy = vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(() => ({
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    right: 300,
    bottom: itemSize,
    width: 300,
    height: itemSize,
    toJSON: () => ({}),
  }))

  globalThis.ResizeObserver = class {
    // Arrow fields (rather than methods) keep `callback` in a closure, avoiding a
    // `this`-bound method and satisfying the lint rules.
    observe: (target: Element) => void
    unobserve: () => void
    disconnect: () => void

    constructor(callback: ResizeObserverCallback) {
      this.observe = (target) => {
        const entry = { target, borderBoxSize: [{ inlineSize: 300, blockSize: viewport }] }
        callback([entry as unknown as ResizeObserverEntry], this)
      }
      this.unobserve = () => {
        // No layout in JSDOM; nothing to track.
      }
      this.disconnect = () => {
        // No layout in JSDOM; nothing to track.
      }
    }
  }

  return () => {
    rectSpy.mockRestore()
    globalThis.ResizeObserver = originalResizeObserver
  }
}
