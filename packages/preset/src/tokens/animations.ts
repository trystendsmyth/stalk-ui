import type { TokenGroup } from '../types'

export const animationTokens: TokenGroup = {
  spin: { value: 'spin 1s linear infinite' },
  ping: { value: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite' },
  pulse: { value: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' },
  bounce: { value: 'bounce 1s infinite' },
  'fade-in': { value: 'fade-in 150ms cubic-bezier(0, 0, 0.2, 1)' },
  'fade-out': { value: 'fade-out 150ms cubic-bezier(0.4, 0, 1, 1)' },
  'scale-in': { value: 'scale-in 150ms cubic-bezier(0, 0, 0.2, 1)' },
  'scale-out': { value: 'scale-out 150ms cubic-bezier(0.4, 0, 1, 1)' },
}
