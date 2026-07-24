/** Keyframe presets backing the animation tokens. Recipes can also reference these directly. */
export const keyframes = {
  spin: {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
  ping: {
    '75%, 100%': { transform: 'scale(2)', opacity: '0' },
  },
  pulse: {
    '50%': { opacity: '0.5' },
  },
  bounce: {
    '0%, 100%': {
      transform: 'translateY(-25%)',
      animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
    },
    '50%': {
      transform: 'translateY(0)',
      animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
    },
  },
  'fade-in': {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  'fade-out': {
    from: { opacity: '1' },
    to: { opacity: '0' },
  },
  'scale-in': {
    from: { opacity: '0', transform: 'scale(0.96)' },
    to: { opacity: '1', transform: 'scale(1)' },
  },
  'scale-out': {
    from: { opacity: '1', transform: 'scale(1)' },
    to: { opacity: '0', transform: 'scale(0.96)' },
  },
  // Composable enter/exit driven by CSS vars — set via the `animateIn`/
  // `animateOut` + fade/zoom/spin/slide utilities; unset vars fall back to rest.
  enter: {
    from: {
      opacity: 'var(--enter-opacity, 1)',
      transform:
        'translate3d(var(--enter-translate-x, 0), var(--enter-translate-y, 0), 0) scale3d(var(--enter-scale, 1), var(--enter-scale, 1), 1) rotate(var(--enter-rotate, 0))',
    },
  },
  exit: {
    to: {
      opacity: 'var(--exit-opacity, 1)',
      transform:
        'translate3d(var(--exit-translate-x, 0), var(--exit-translate-y, 0), 0) scale3d(var(--exit-scale, 1), var(--exit-scale, 1), 1) rotate(var(--exit-rotate, 0))',
    },
  },
  // Radix exposes the measured content size via `--radix-accordion-content-height`
  // / `--radix-collapsible-content-height` so we can animate from 0 to the
  // intrinsic height without measuring it ourselves. The trigger stays anchored
  // because the content holds `height: 0` until the open animation runs.
  'accordion-down': {
    from: { height: '0' },
    to: { height: 'var(--radix-accordion-content-height)' },
  },
  'accordion-up': {
    from: { height: 'var(--radix-accordion-content-height)' },
    to: { height: '0' },
  },
  'collapsible-down': {
    from: { height: '0' },
    to: { height: 'var(--radix-collapsible-content-height)' },
  },
  'collapsible-up': {
    from: { height: 'var(--radix-collapsible-content-height)' },
    to: { height: '0' },
  },
  // Edge-anchored slide for Sheet content, one pair per physical side. The side
  // name matches the offscreen origin so RTL keeps the physical direction.
  'slide-in-from-top': {
    from: { transform: 'translateY(-100%)' },
    to: { transform: 'translateY(0)' },
  },
  'slide-out-to-top': {
    from: { transform: 'translateY(0)' },
    to: { transform: 'translateY(-100%)' },
  },
  'slide-in-from-bottom': {
    from: { transform: 'translateY(100%)' },
    to: { transform: 'translateY(0)' },
  },
  'slide-out-to-bottom': {
    from: { transform: 'translateY(0)' },
    to: { transform: 'translateY(100%)' },
  },
  'slide-in-from-left': {
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(0)' },
  },
  'slide-out-to-left': {
    from: { transform: 'translateX(0)' },
    to: { transform: 'translateX(-100%)' },
  },
  'slide-in-from-right': {
    from: { transform: 'translateX(100%)' },
    to: { transform: 'translateX(0)' },
  },
  'slide-out-to-right': {
    from: { transform: 'translateX(0)' },
    to: { transform: 'translateX(100%)' },
  },
}
