interface BadgeRecipeOptions {
  size?: 'sm' | 'md'
  variant?: 'solid' | 'subtle' | 'outline'
}

export const badge = ({ size = 'md', variant = 'subtle' }: BadgeRecipeOptions = {}) =>
  `stalk-badge stalk-badge--${variant} stalk-badge--${size}`

interface ButtonRecipeOptions {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'outline' | 'ghost' | 'subtle'
}

export const button = ({ size = 'md', variant = 'solid' }: ButtonRecipeOptions = {}) =>
  `stalk-button stalk-button--${variant} stalk-button--${size}`

interface CheckboxRecipeOptions {
  invalid?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const checkbox = ({ invalid = false, size = 'md' }: CheckboxRecipeOptions = {}) =>
  ['stalk-checkbox', `stalk-checkbox--${size}`, invalid ? 'stalk-checkbox--invalid' : undefined]
    .filter(Boolean)
    .join(' ')

export const dialog = () => ({
  close: 'stalk-dialog__close',
  content: 'stalk-dialog__content',
  description: 'stalk-dialog__description',
  footer: 'stalk-dialog__footer',
  header: 'stalk-dialog__header',
  overlay: 'stalk-dialog__overlay',
  title: 'stalk-dialog__title',
})

export const dropdownMenu = () => ({
  content: 'stalk-dropdown-menu__content',
  item: 'stalk-dropdown-menu__item',
  label: 'stalk-dropdown-menu__label',
  separator: 'stalk-dropdown-menu__separator',
  shortcut: 'stalk-dropdown-menu__shortcut',
})

interface InputRecipeOptions {
  invalid?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const input = ({ invalid = false, size = 'md' }: InputRecipeOptions = {}) =>
  ['stalk-input', `stalk-input--${size}`, invalid ? 'stalk-input--invalid' : undefined]
    .filter(Boolean)
    .join(' ')

interface LabelRecipeOptions {
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const label = ({ required = false, size = 'md' }: LabelRecipeOptions = {}) =>
  ['stalk-label', `stalk-label--${size}`, required ? 'stalk-label--required' : undefined]
    .filter(Boolean)
    .join(' ')

interface RadioRecipeOptions {
  invalid?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const radio = ({ invalid = false, size = 'md' }: RadioRecipeOptions = {}) =>
  ['stalk-radio', `stalk-radio--${size}`, invalid ? 'stalk-radio--invalid' : undefined]
    .filter(Boolean)
    .join(' ')

interface SelectRecipeOptions {
  invalid?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const select = ({ invalid = false, size = 'md' }: SelectRecipeOptions = {}) =>
  ['stalk-select', `stalk-select--${size}`, invalid ? 'stalk-select--invalid' : undefined]
    .filter(Boolean)
    .join(' ')

interface SwitchRecipeOptions {
  invalid?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const switchRecipe = ({ invalid = false, size = 'md' }: SwitchRecipeOptions = {}) =>
  ['stalk-switch', `stalk-switch--${size}`, invalid ? 'stalk-switch--invalid' : undefined]
    .filter(Boolean)
    .join(' ')

export const tooltip = () => ({
  arrow: 'stalk-tooltip__arrow',
  content: 'stalk-tooltip__content',
})

interface TextareaRecipeOptions {
  invalid?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const textarea = ({ invalid = false, size = 'md' }: TextareaRecipeOptions = {}) =>
  ['stalk-textarea', `stalk-textarea--${size}`, invalid ? 'stalk-textarea--invalid' : undefined]
    .filter(Boolean)
    .join(' ')
