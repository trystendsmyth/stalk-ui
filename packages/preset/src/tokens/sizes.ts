import { spacingTokens } from './spacing'

import type { TokenGroup } from '../types'

/**
 * Sizing tokens share the spacing scale and add content-shape keywords.
 * Use this for `width`, `height`, `min{Width,Height}`, and `max{Width,Height}`.
 */
export const sizeTokens: TokenGroup = {
  ...spacingTokens,
  prose: { value: '65ch' },
  full: { value: '100%' },
  min: { value: 'min-content' },
  max: { value: 'max-content' },
  fit: { value: 'fit-content' },
  'screen-w': { value: '100vw' },
  'screen-h': { value: '100vh' },
  'screen-svh': { value: '100svh' },
  'screen-lvh': { value: '100lvh' },
  'screen-dvh': { value: '100dvh' },
}
