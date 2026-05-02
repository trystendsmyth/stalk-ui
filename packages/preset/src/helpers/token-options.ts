import { semanticTokens } from '../semantic-tokens'

const flattenTokenKeys = (obj: Record<string, unknown>, prefix = ''): string[] => {
  return Object.entries(obj).flatMap(([key, val]) => {
    if (key === 'DEFAULT') {
      return [prefix]
    }

    const path = prefix ? `${prefix}.${key}` : key

    if (val && typeof val === 'object' && !('value' in val)) {
      return flattenTokenKeys(val as Record<string, unknown>, path)
    }

    return [path]
  })
}

export const SEMANTIC_COLOR_TOKENS = flattenTokenKeys(semanticTokens.colors)

export const BACKGROUND_COLORS = flattenTokenKeys(
  semanticTokens.colors.bg as Record<string, unknown>,
  'bg',
)

export const FOREGROUND_COLORS = flattenTokenKeys(
  semanticTokens.colors.fg as Record<string, unknown>,
  'fg',
)

export const BORDER_COLORS = flattenTokenKeys(
  semanticTokens.colors.border as Record<string, unknown>,
  'border',
)

export const ACCENT_COLORS = flattenTokenKeys(
  semanticTokens.colors.accent as Record<string, unknown>,
  'accent',
)

export const STATUS_COLORS = [
  ...flattenTokenKeys(semanticTokens.colors.success as Record<string, unknown>, 'success'),
  ...flattenTokenKeys(semanticTokens.colors.warning as Record<string, unknown>, 'warning'),
  ...flattenTokenKeys(semanticTokens.colors.danger as Record<string, unknown>, 'danger'),
  ...flattenTokenKeys(semanticTokens.colors.info as Record<string, unknown>, 'info'),
]

export const HIGHLIGHT_COLORS = flattenTokenKeys(
  semanticTokens.colors.highlight as Record<string, unknown>,
  'highlight',
)
