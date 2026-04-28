export interface ColorMixArgs {
  token: (path: string) => string | undefined
}

export interface ColorMixResult {
  amount: string
  color: string
  value: string
}

/**
 * Parses `semanticTokenPath/opacity` (e.g. `accent.solid/40`) into a
 * `color-mix` value and a solid fallback for `var(..., fallback)`.
 */
export const colorMix = (value: string, { token }: ColorMixArgs): ColorMixResult => {
  const parts = value.split('/').map((part: string) => part.trim())
  const colorKey = parts[0] ?? ''
  const alphaPart = parts[1]
  const colorValue = token(`colors.${colorKey}`)

  if (alphaPart === undefined || alphaPart === '') {
    const solid = colorValue ?? colorKey

    return {
      color: solid,
      amount: '100%',
      value: solid,
    }
  }

  const pct = Number.parseInt(alphaPart, 10)
  const safe = Number.isFinite(pct) ? Math.min(100, Math.max(0, pct)) : 100
  const resolvedColor = colorValue ?? `{colors.${colorKey}}`
  const mixed = `color-mix(in srgb, ${resolvedColor} ${String(safe)}%, transparent)`

  return {
    color: resolvedColor,
    amount: `${String(safe)}%`,
    value: mixed,
  }
}
