export const cx = (...classNames: (string | undefined | null | false)[]) =>
  classNames
    .filter(
      (className): className is string => typeof className === 'string' && className.length > 0,
    )
    .join(' ')
