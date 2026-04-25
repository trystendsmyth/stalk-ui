export const createDataAttribute = (name: string, value = '') =>
  value.length > 0 ? { [`data-${name}`]: value } : { [`data-${name}`]: '' }
