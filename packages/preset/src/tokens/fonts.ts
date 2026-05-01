/** Shared stack: apps set `--font-sans` (e.g. via `next/font`); otherwise system UI. */
export const FONT_SANS_STACK =
  'var(--font-sans, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif)'

export const FONT_MONO_STACK =
  'var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace)'

export const fontTokens = {
  sans: { value: FONT_SANS_STACK },
  mono: { value: FONT_MONO_STACK },
}
