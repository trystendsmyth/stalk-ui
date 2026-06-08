// Mirrors Panda's generated `splitVariantProps`: partition props into variant
// keys vs the rest. Used by recipe stubs that back `createStyleContext` roots.
const makeSplitVariantProps =
  (keys: readonly string[]) =>
  (props: Record<string, unknown>): [Record<string, unknown>, Record<string, unknown>] => {
    const variantProps: Record<string, unknown> = {}
    const rest: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(props)) {
      ;(keys.includes(key) ? variantProps : rest)[key] = value
    }
    return [variantProps, rest]
  }

interface BadgeRecipeOptions {
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  size?: 'sm' | 'md'
  variant?: 'solid' | 'subtle' | 'outline'
}

export const badge = ({
  radius = 'full',
  size = 'md',
  variant = 'subtle',
}: BadgeRecipeOptions = {}) =>
  `stalk-badge stalk-badge--${variant} stalk-badge--${size} stalk-badge--radius-${radius}`

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

interface DropdownMenuRecipeOptions {
  inset?: boolean
}

export const dropdownMenu = ({ inset = false }: DropdownMenuRecipeOptions = {}) => ({
  content: 'stalk-dropdown-menu__content',
  subContent: 'stalk-dropdown-menu__sub-content',
  item: `stalk-dropdown-menu__item${inset ? ' stalk-dropdown-menu__item--inset' : ''}`,
  itemIndicator: 'stalk-dropdown-menu__item-indicator',
  label: 'stalk-dropdown-menu__label',
  separator: 'stalk-dropdown-menu__separator',
  shortcut: 'stalk-dropdown-menu__shortcut',
})

interface InputRecipeOptions {
  align?: 'start' | 'center' | 'end'
  disabled?: boolean
  invalid?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const input = ({
  align = 'start',
  disabled = false,
  invalid = false,
  size = 'md',
}: InputRecipeOptions = {}) => ({
  root: [
    'stalk-input__root',
    `stalk-input--${size}`,
    `stalk-input--align-${align}`,
    disabled ? 'stalk-input--disabled' : undefined,
    invalid ? 'stalk-input--invalid' : undefined,
  ]
    .filter(Boolean)
    .join(' '),
  input: ['stalk-input__input', `stalk-input__input--${size}`, `stalk-input__input--align-${align}`]
    .filter(Boolean)
    .join(' '),
  slot: ['stalk-input__slot', `stalk-input__slot--${size}`].filter(Boolean).join(' '),
})

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

export const hoverCard = () => ({
  content: 'stalk-hover-card__content',
  arrow: 'stalk-hover-card__arrow',
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

interface SheetRecipeOptions {
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export const sheet = ({ side = 'right' }: SheetRecipeOptions = {}) => ({
  overlay: 'stalk-sheet__overlay',
  content: `stalk-sheet__content stalk-sheet__content--side-${side}`,
  header: 'stalk-sheet__header',
  title: 'stalk-sheet__title',
  description: 'stalk-sheet__description',
  footer: 'stalk-sheet__footer',
  close: 'stalk-sheet__close',
})

export const toast = () => ({
  toaster: 'stalk-toast__toaster',
  toast: 'stalk-toast__toast',
  title: 'stalk-toast__title',
  description: 'stalk-toast__description',
  actionButton: 'stalk-toast__action-button',
  cancelButton: 'stalk-toast__cancel-button',
  closeButton: 'stalk-toast__close-button',
  icon: 'stalk-toast__icon',
  loader: 'stalk-toast__loader',
})

interface SpinnerRecipeOptions {
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const spinner = ({ size = 'md' }: SpinnerRecipeOptions = {}) => ({
  root: `stalk-spinner__root stalk-spinner__root--${size}`,
  track: 'stalk-spinner__track',
  indicator: 'stalk-spinner__indicator',
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

interface AvatarRecipeOptions {
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export const avatar = ({ radius = 'full', size = 'md' }: AvatarRecipeOptions = {}) => ({
  root: `stalk-avatar__root stalk-avatar__root--${size} stalk-avatar__root--radius-${radius}`,
  image: 'stalk-avatar__image',
  fallback: `stalk-avatar__fallback stalk-avatar__fallback--${size}`,
})

interface TagRecipeOptions {
  dot?: boolean
  interactive?: boolean
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'subtle' | 'outline'
}

export const tag = ({
  dot = false,
  interactive = false,
  radius = 'full',
  size = 'md',
  variant = 'subtle',
}: TagRecipeOptions = {}) => ({
  root: [
    'stalk-tag__root',
    `stalk-tag--${variant}`,
    `stalk-tag--${size}`,
    `stalk-tag--radius-${radius}`,
    dot ? 'stalk-tag--dot' : undefined,
    interactive ? 'stalk-tag--interactive' : undefined,
  ]
    .filter(Boolean)
    .join(' '),
  label: 'stalk-tag__label',
  count: 'stalk-tag__count',
  close: 'stalk-tag__close',
})

interface AlertRecipeOptions {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'subtle' | 'solid' | 'outline'
}

export const alert = ({ size = 'md', variant = 'subtle' }: AlertRecipeOptions = {}) => ({
  root: `stalk-alert__root stalk-alert--${variant} stalk-alert--${size}`,
  icon: 'stalk-alert__icon',
  body: 'stalk-alert__body',
  title: 'stalk-alert__title',
  description: 'stalk-alert__description',
  actions: 'stalk-alert__actions',
  close: 'stalk-alert__close',
})

export const alertDialog = () => ({
  overlay: 'stalk-alert-dialog__overlay',
  content: 'stalk-alert-dialog__content',
  header: 'stalk-alert-dialog__header',
  title: 'stalk-alert-dialog__title',
  description: 'stalk-alert-dialog__description',
  footer: 'stalk-alert-dialog__footer',
})

interface TabsRecipeOptions {
  fitted?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'line' | 'segmented' | 'pills'
}

export const tabs = ({
  fitted = false,
  size = 'md',
  variant = 'line',
}: TabsRecipeOptions = {}) => ({
  root: `stalk-tabs__root stalk-tabs--${variant}`,
  list: [
    `stalk-tabs__list`,
    `stalk-tabs__list--${size}`,
    fitted ? 'stalk-tabs__list--fitted' : undefined,
  ]
    .filter(Boolean)
    .join(' '),
  trigger: `stalk-tabs__trigger stalk-tabs__trigger--${size}`,
  content: 'stalk-tabs__content',
  indicator: `stalk-tabs__indicator stalk-tabs__indicator--${variant}`,
})

export const table = () => ({
  root: 'stalk-table__root',
  table: 'stalk-table__table',
  header: 'stalk-table__header',
  body: 'stalk-table__body',
  footer: 'stalk-table__footer',
  row: 'stalk-table__row',
  head: 'stalk-table__head',
  cell: 'stalk-table__cell',
  caption: 'stalk-table__caption',
})

interface ToggleRecipeOptions {
  attached?: boolean
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outline' | 'ghost' | 'solid'
}

export const toggle = ({
  attached = false,
  radius = 'md',
  size = 'md',
  variant = 'outline',
}: ToggleRecipeOptions = {}) => ({
  root: ['stalk-toggle__root', attached ? 'stalk-toggle__root--attached' : undefined]
    .filter(Boolean)
    .join(' '),
  item: [
    'stalk-toggle__item',
    `stalk-toggle__item--${variant}`,
    `stalk-toggle__item--${size}`,
    `stalk-toggle__item--radius-${radius}`,
  ].join(' '),
})

interface TextareaRecipeOptions {
  invalid?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const textarea = ({ invalid = false, size = 'md' }: TextareaRecipeOptions = {}) =>
  ['stalk-textarea', `stalk-textarea--${size}`, invalid ? 'stalk-textarea--invalid' : undefined]
    .filter(Boolean)
    .join(' ')

interface AccordionRecipeOptions {
  variant?: 'inline' | 'card'
}

const accordionVariantKeys = ['variant'] as const

export const accordion = ({ variant = 'inline' }: AccordionRecipeOptions = {}) => ({
  root: `stalk-accordion__root stalk-accordion--${variant}`,
  item: 'stalk-accordion__item',
  header: 'stalk-accordion__header',
  trigger: 'stalk-accordion__trigger',
  content: 'stalk-accordion__content',
  icon: 'stalk-accordion__icon',
})

accordion.variantMap = { variant: ['inline', 'card'] as const }
accordion.variantKeys = accordionVariantKeys
accordion.splitVariantProps = makeSplitVariantProps(accordionVariantKeys)

interface CollapsibleRecipeOptions {
  variant?: 'inline' | 'card'
}

const collapsibleVariantKeys = ['variant'] as const

export const collapsible = ({ variant = 'inline' }: CollapsibleRecipeOptions = {}) => ({
  root: `stalk-collapsible__root stalk-collapsible--${variant}`,
  trigger: 'stalk-collapsible__trigger',
  content: 'stalk-collapsible__content',
})

collapsible.variantMap = { variant: ['inline', 'card'] as const }
collapsible.variantKeys = collapsibleVariantKeys
collapsible.splitVariantProps = makeSplitVariantProps(collapsibleVariantKeys)

interface CardRecipeOptions {
  variant?: 'outline' | 'elevated'
}

const cardVariantKeys = ['variant'] as const

export const card = ({ variant = 'outline' }: CardRecipeOptions = {}) => ({
  root: `stalk-card__root stalk-card--${variant}`,
  header: 'stalk-card__header',
  title: 'stalk-card__title',
  description: 'stalk-card__description',
  action: 'stalk-card__action',
  content: 'stalk-card__content',
  footer: 'stalk-card__footer',
})

card.variantMap = { variant: ['outline', 'elevated'] as const }
card.variantKeys = cardVariantKeys
card.splitVariantProps = makeSplitVariantProps(cardVariantKeys)

interface ContextMenuRecipeOptions {
  inset?: boolean
}

export const contextMenu = ({ inset = false }: ContextMenuRecipeOptions = {}) => ({
  content: 'stalk-context-menu__content',
  subContent: 'stalk-context-menu__sub-content',
  item: `stalk-context-menu__item${inset ? ' stalk-context-menu__item--inset' : ''}`,
  itemIndicator: 'stalk-context-menu__item-indicator',
  label: 'stalk-context-menu__label',
  separator: 'stalk-context-menu__separator',
  shortcut: 'stalk-context-menu__shortcut',
})

interface MenubarRecipeOptions {
  inset?: boolean
}

export const menubar = ({ inset = false }: MenubarRecipeOptions = {}) => ({
  root: 'stalk-menubar__root',
  trigger: 'stalk-menubar__trigger',
  content: 'stalk-menubar__content',
  subContent: 'stalk-menubar__sub-content',
  item: `stalk-menubar__item${inset ? ' stalk-menubar__item--inset' : ''}`,
  itemIndicator: 'stalk-menubar__item-indicator',
  label: 'stalk-menubar__label',
  separator: 'stalk-menubar__separator',
  shortcut: 'stalk-menubar__shortcut',
})

interface ProgressRecipeOptions {
  size?: 'sm' | 'md' | 'lg'
}

export const progress = ({ size = 'md' }: ProgressRecipeOptions = {}) => ({
  root: `stalk-progress__root stalk-progress__root--${size}`,
  indicator: 'stalk-progress__indicator',
})

interface SkeletonRecipeOptions {
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
}

export const skeleton = ({ radius = 'md' }: SkeletonRecipeOptions = {}) =>
  `stalk-skeleton stalk-skeleton--radius-${radius}`

export const slider = () => ({
  root: 'stalk-slider__root',
  track: 'stalk-slider__track',
  range: 'stalk-slider__range',
  thumb: 'stalk-slider__thumb',
})

interface TextRecipeOptions {
  align?: string
  size?: string
  truncate?: boolean
  weight?: string
}

export const text = ({
  align,
  size = 'body',
  truncate = false,
  weight = 'regular',
}: TextRecipeOptions = {}) =>
  [
    'stalk-text',
    `stalk-text--${size}`,
    `stalk-text--weight-${weight}`,
    align ? `stalk-text--align-${align}` : undefined,
    truncate ? 'stalk-text--truncate' : undefined,
  ]
    .filter(Boolean)
    .join(' ')

interface CodeRecipeOptions {
  variant?: 'soft' | 'outline' | 'ghost'
}

export const code = ({ variant = 'soft' }: CodeRecipeOptions = {}) =>
  `stalk-code stalk-code--${variant}`

interface KbdRecipeOptions {
  size?: 'sm' | 'md' | 'lg'
}

export const kbd = ({ size = 'md' }: KbdRecipeOptions = {}) => `stalk-kbd stalk-kbd--${size}`

interface LinkRecipeOptions {
  underline?: 'none' | 'hover' | 'always'
}

export const link = ({ underline = 'hover' }: LinkRecipeOptions = {}) =>
  `stalk-link stalk-link--underline-${underline}`

interface BlockquoteRecipeOptions {
  size?: 'sm' | 'md' | 'lg'
}

export const blockquote = ({ size = 'md' }: BlockquoteRecipeOptions = {}) =>
  `stalk-blockquote stalk-blockquote--${size}`
