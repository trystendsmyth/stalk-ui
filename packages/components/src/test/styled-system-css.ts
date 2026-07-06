export const cx = (...classNames: (string | undefined | null | false)[]) =>
  classNames
    .filter(
      (className): className is string => typeof className === 'string' && className.length > 0,
    )
    .join(' ')

type CssInput = Record<string, unknown> & { colorPalette?: string; position?: string }

export const css = (styles: CssInput = {}): string => {
  const classes: string[] = []
  if (typeof styles.position === 'string') {
    classes.push(`pos_${styles.position}`)
  }
  if (typeof styles.colorPalette === 'string') {
    classes.push(`color-palette_${styles.colorPalette}`)
  }
  return classes.join(' ')
}
