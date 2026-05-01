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
}
