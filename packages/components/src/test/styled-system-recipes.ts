interface ButtonRecipeOptions {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'outline' | 'ghost' | 'subtle'
}

export const button = ({ size = 'md', variant = 'solid' }: ButtonRecipeOptions = {}) =>
  `stalk-button stalk-button--${variant} stalk-button--${size}`

interface InputRecipeOptions {
  invalid?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const input = ({ invalid = false, size = 'md' }: InputRecipeOptions = {}) =>
  ['stalk-input', `stalk-input--${size}`, invalid ? 'stalk-input--invalid' : undefined]
    .filter(Boolean)
    .join(' ')

interface TextareaRecipeOptions {
  invalid?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const textarea = ({ invalid = false, size = 'md' }: TextareaRecipeOptions = {}) =>
  ['stalk-textarea', `stalk-textarea--${size}`, invalid ? 'stalk-textarea--invalid' : undefined]
    .filter(Boolean)
    .join(' ')
