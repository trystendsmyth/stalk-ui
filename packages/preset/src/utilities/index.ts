import { backgroundAlpha } from './background-alpha'
import { borderColorAlpha } from './border-color-alpha'
import { focusRing } from './focus-ring'
import { textAlpha } from './text-alpha'

import type { UtilityConfig } from '@pandacss/types'

export const utilities: UtilityConfig = {
  ...focusRing,
  ...backgroundAlpha,
  ...borderColorAlpha,
  ...textAlpha,
}
