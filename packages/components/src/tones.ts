/**
 * The semantic color palettes that drive per-component `tone` props. Each name
 * maps to a `colorPalette` token defined in the preset (see
 * `packages/preset/src/tokens/semantic-colors.ts`), so any tone listed here
 * resolves to a full surface/subtle/muted/solid/fg/contrast ramp at runtime.
 *
 * `highlight` is intentionally excluded — it's a promotional brand accent, not
 * a status, and components that want to surface it should opt in explicitly.
 */
export const TONES = ['accent', 'success', 'warning', 'danger', 'info'] as const

export type Tone = (typeof TONES)[number]
