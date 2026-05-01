import type { TokenGroup } from '../types'

export const easingTokens: TokenGroup = {
  default: { value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  linear: { value: 'linear' },
  in: { value: 'cubic-bezier(0.4, 0, 1, 1)' },
  out: { value: 'cubic-bezier(0, 0, 0.2, 1)' },
  'in-out': { value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  emphasized: { value: 'cubic-bezier(0.2, 0, 0, 1)' },
}
