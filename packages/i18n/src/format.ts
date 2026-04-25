export const formatDate = (
  date: Date | number,
  locale: string,
  options?: Intl.DateTimeFormatOptions,
) => new Intl.DateTimeFormat(locale, options).format(date)

export const formatNumber = (value: number, locale: string, options?: Intl.NumberFormatOptions) =>
  new Intl.NumberFormat(locale, options).format(value)

export const formatRelativeTime = (
  value: number,
  unit: Intl.RelativeTimeFormatUnit,
  locale: string,
  options?: Intl.RelativeTimeFormatOptions,
) => new Intl.RelativeTimeFormat(locale, { numeric: 'auto', ...options }).format(value, unit)
