import type { TokenGroup } from '../types'

/** Stacking layers, ordered low → high. Use semantic names so cross-component intent is obvious. */
export const zIndexTokens: TokenGroup = {
  hide: { value: '-1' },
  base: { value: '0' },
  raised: { value: '1' },
  sticky: { value: '1000' },
  toolbar: { value: '1050' },
  panel: { value: '1100' },
  overlay: { value: '1200' },
  modal: { value: '1300' },
  dropdown: { value: '1400' },
  popover: { value: '1500' },
  contextMenu: { value: '1600' },
  tooltip: { value: '1700' },
  toast: { value: '1800' },
  max: { value: '9999' },
}
