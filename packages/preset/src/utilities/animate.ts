import type { UtilityConfig } from '@pandacss/types'

// Composable enter/exit animations: `animateIn`/`animateOut` run the shared
// `enter`/`exit` keyframes (which read CSS vars), and the fade/zoom/spin/slide
// modifiers set those vars — combine freely, e.g.
// `css({ animateIn: true, fadeIn: 0, slideInY: '8' })`.
export const animate: UtilityConfig = {
  animateIn: {
    className: 'animate-in',
    values: { type: 'boolean' },
    transform(value: boolean, { token }) {
      if (!value) return {}
      return {
        animationName: 'enter',
        animationDuration: token('durations.fast'),
      }
    },
  },
  animateOut: {
    className: 'animate-out',
    values: { type: 'boolean' },
    transform(value: boolean, { token }) {
      if (!value) return {}
      return {
        animationName: 'exit',
        animationDuration: token('durations.fast'),
        animationFillMode: 'forwards',
      }
    },
  },
  fadeIn: {
    className: 'fade-in',
    values: { type: 'number' },
    transform(value: number | string) {
      return { '--enter-opacity': String(value) }
    },
  },
  fadeOut: {
    className: 'fade-out',
    values: { type: 'number' },
    transform(value: number | string) {
      return { '--exit-opacity': String(value) }
    },
  },
  // Percent of final size, e.g. `zoomIn: 95` starts at scale(0.95).
  zoomIn: {
    className: 'zoom-in',
    values: { type: 'number' },
    transform(value: number | string) {
      return { '--enter-scale': String(Number(value) / 100) }
    },
  },
  zoomOut: {
    className: 'zoom-out',
    values: { type: 'number' },
    transform(value: number | string) {
      return { '--exit-scale': String(Number(value) / 100) }
    },
  },
  // CSS angle, e.g. `spinIn: '-6deg'`.
  spinIn: {
    className: 'spin-in',
    values: { type: 'string' },
    transform(value: string) {
      return { '--enter-rotate': value }
    },
  },
  spinOut: {
    className: 'spin-out',
    values: { type: 'string' },
    transform(value: string) {
      return { '--exit-rotate': value }
    },
  },
  // Spacing-token start offsets; negative raw lengths also work.
  slideInX: {
    className: 'slide-in-x',
    values: 'spacing',
    transform(value: string) {
      return { '--enter-translate-x': value }
    },
  },
  slideInY: {
    className: 'slide-in-y',
    values: 'spacing',
    transform(value: string) {
      return { '--enter-translate-y': value }
    },
  },
  slideOutX: {
    className: 'slide-out-x',
    values: 'spacing',
    transform(value: string) {
      return { '--exit-translate-x': value }
    },
  },
  slideOutY: {
    className: 'slide-out-y',
    values: 'spacing',
    transform(value: string) {
      return { '--exit-translate-y': value }
    },
  },
}
