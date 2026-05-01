export const cx = (...classNames: (string | undefined | null | false)[]) =>
  classNames
    .filter(
      (className): className is string => typeof className === 'string' && className.length > 0,
    )
    .join(' ')

type CssInput = Record<string, unknown> & { colorPalette?: string }

export const css = (styles: CssInput = {}): string => {
  const palette = typeof styles.colorPalette === 'string' ? styles.colorPalette : undefined
  return palette ? `color-palette_${palette}` : ''
}
