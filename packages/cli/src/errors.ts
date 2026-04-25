export class CliError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CliError'
  }
}

export const assertNotCancelled = (value: unknown, message = 'Operation cancelled') => {
  if (typeof value === 'symbol') {
    throw new CliError(message)
  }
}
