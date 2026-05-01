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
  size?: 'sm' | 'md' | 'lg'
}

export const checkbox = ({ size = 'md' }: CheckboxRecipeOptions = {}) => ({
  root: `stalk-checkbox__root stalk-checkbox__root--${size}`,
  indicator: 'stalk-checkbox__indicator',
})

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

export const popover = () => ({
  arrow: 'stalk-popover__arrow',
  close: 'stalk-popover__close',
  content: 'stalk-popover__content',
})

interface RadioRecipeOptions {
  size?: 'sm' | 'md' | 'lg'
}

export const radio = ({ size = 'md' }: RadioRecipeOptions = {}) => ({
  root: `stalk-radio__root stalk-radio__root--${size}`,
  indicator: 'stalk-radio__indicator',
})

interface SelectRecipeOptions {
  size?: 'sm' | 'md' | 'lg'
}

export const select = ({ size = 'md' }: SelectRecipeOptions = {}) => ({
  trigger: `stalk-select__trigger stalk-select__trigger--${size}`,
  content: 'stalk-select__content',
  viewport: 'stalk-select__viewport',
  item: 'stalk-select__item',
  itemIndicator: 'stalk-select__item-indicator',
  label: 'stalk-select__label',
  separator: 'stalk-select__separator',
})

interface SwitchRecipeOptions {
  size?: 'sm' | 'md' | 'lg'
}

export const switchRecipe = ({ size = 'md' }: SwitchRecipeOptions = {}) => ({
  root: `stalk-switch__root stalk-switch__root--${size}`,
  thumb: 'stalk-switch__thumb',
})

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
