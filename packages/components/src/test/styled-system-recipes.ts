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

export const navigationMenu = () => ({
  root: 'stalk-navigation-menu__root',
  list: 'stalk-navigation-menu__list',
  item: 'stalk-navigation-menu__item',
  trigger: 'stalk-navigation-menu__trigger',
  triggerIcon: 'stalk-navigation-menu__triggerIcon',
  content: 'stalk-navigation-menu__content',
  link: 'stalk-navigation-menu__link',
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
  disabled?: boolean
  dot?: boolean
  interactive?: boolean
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'subtle' | 'outline'
}

export const tag = ({
  disabled = false,
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
    disabled ? 'stalk-tag--disabled' : undefined,
  ]
    .filter(Boolean)
    .join(' '),
  avatar: 'stalk-tag__avatar',
  icon: 'stalk-tag__icon',
  label: 'stalk-tag__label',
  count: 'stalk-tag__count',
  close: 'stalk-tag__close',
})

export const numberInput = () => ({
  stepper: 'stalk-number-input__stepper',
  button: 'stalk-number-input__button',
})

export const colorPicker = () => ({
  trigger: 'stalk-color-picker__trigger',
  triggerSwatch: 'stalk-color-picker__trigger-swatch',
  content: 'stalk-color-picker__content',
  picker: 'stalk-color-picker__picker',
  controls: 'stalk-color-picker__controls',
  input: 'stalk-color-picker__input',
  swatches: 'stalk-color-picker__swatches',
  swatch: 'stalk-color-picker__swatch',
  eyeDropper: 'stalk-color-picker__eye-dropper',
})

interface TagsInputRecipeOptions {
  disabled?: boolean
  invalid?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const tagsInput = ({
  disabled = false,
  invalid = false,
  size = 'md',
}: TagsInputRecipeOptions = {}) => ({
  root: [
    'stalk-tags-input__root',
    `stalk-tags-input--${size}`,
    disabled ? 'stalk-tags-input--disabled' : undefined,
    invalid ? 'stalk-tags-input--invalid' : undefined,
  ]
    .filter(Boolean)
    .join(' '),
  field: 'stalk-tags-input__field',
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

export const form = () => ({
  item: 'stalk-form__item',
  label: 'stalk-form__label',
  description: 'stalk-form__description',
  message: 'stalk-form__message',
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

export const timePicker = () => ({
  root: 'stalk-time-picker__root',
  separator: 'stalk-time-picker__separator',
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

export const calendar = () => ({
  root: 'stalk-calendar__root',
  months: 'stalk-calendar__months',
  month: 'stalk-calendar__month',
  nav: 'stalk-calendar__nav',
  navButton: 'stalk-calendar__nav-button',
  monthCaption: 'stalk-calendar__month-caption',
  captionLabel: 'stalk-calendar__caption-label',
  monthGrid: 'stalk-calendar__month-grid',
  weekdays: 'stalk-calendar__weekdays',
  weekday: 'stalk-calendar__weekday',
  week: 'stalk-calendar__week',
  day: 'stalk-calendar__day',
  dayButton: 'stalk-calendar__day-button',
  today: 'stalk-calendar__today',
  outside: 'stalk-calendar__outside',
  disabled: 'stalk-calendar__disabled',
  hidden: 'stalk-calendar__hidden',
  selected: 'stalk-calendar__selected',
  rangeStart: 'stalk-calendar__range-start',
  rangeMiddle: 'stalk-calendar__range-middle',
  rangeEnd: 'stalk-calendar__range-end',
})

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

interface DataListRecipeOptions {
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
}

const dataListVariantKeys = ['orientation', 'size'] as const

export const dataList = ({
  orientation = 'horizontal',
  size = 'md',
}: DataListRecipeOptions = {}) => ({
  root: `stalk-data-list__root stalk-data-list--${orientation} stalk-data-list--${size}`,
  item: 'stalk-data-list__item',
  label: 'stalk-data-list__label',
  value: 'stalk-data-list__value',
})

dataList.variantMap = {
  orientation: ['horizontal', 'vertical'] as const,
  size: ['sm', 'md', 'lg'] as const,
}
dataList.variantKeys = dataListVariantKeys
dataList.splitVariantProps = makeSplitVariantProps(dataListVariantKeys)

export const combobox = () => ({
  trigger: 'stalk-combobox__trigger',
  value: 'stalk-combobox__value',
  icon: 'stalk-combobox__icon',
  content: 'stalk-combobox__content',
  itemIndicator: 'stalk-combobox__item-indicator',
})

export const command = () => ({
  root: 'stalk-command__root',
  inputWrapper: 'stalk-command__input-wrapper',
  input: 'stalk-command__input',
  list: 'stalk-command__list',
  empty: 'stalk-command__empty',
  group: 'stalk-command__group',
  item: 'stalk-command__item',
  separator: 'stalk-command__separator',
  shortcut: 'stalk-command__shortcut',
})

export const dataTable = () => ({
  root: 'stalk-data-table__root',
  pagination: 'stalk-data-table__pagination',
  pageInfo: 'stalk-data-table__page-info',
  sortButton: 'stalk-data-table__sort-button',
})

export const datePicker = () => ({
  root: 'stalk-date-picker__root',
  content: 'stalk-date-picker__content',
})

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

interface OtpInputRecipeOptions {
  size?: 'sm' | 'md' | 'lg'
}

export const otpInput = ({ size = 'md' }: OtpInputRecipeOptions = {}) => ({
  root: `stalk-otp-input__root stalk-otp-input--${size}`,
  group: 'stalk-otp-input__group',
  slot: `stalk-otp-input__slot stalk-otp-input__slot--${size}`,
  separator: 'stalk-otp-input__separator',
  caret: 'stalk-otp-input__caret',
})

otpInput.variantMap = { size: ['sm', 'md', 'lg'] as const }

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

export const breadcrumb = () => ({
  root: 'stalk-breadcrumb__root',
  list: 'stalk-breadcrumb__list',
  item: 'stalk-breadcrumb__item',
  link: 'stalk-breadcrumb__link',
  page: 'stalk-breadcrumb__page',
  separator: 'stalk-breadcrumb__separator',
  ellipsis: 'stalk-breadcrumb__ellipsis',
})

export const pagination = () => ({
  root: 'stalk-pagination__root',
  content: 'stalk-pagination__content',
  item: 'stalk-pagination__item',
  ellipsis: 'stalk-pagination__ellipsis',
})

export const toolbar = () => ({
  root: 'stalk-toolbar__root',
  button: 'stalk-toolbar__button',
  link: 'stalk-toolbar__link',
  separator: 'stalk-toolbar__separator',
  toggleGroup: 'stalk-toolbar__toggle-group',
  toggleItem: 'stalk-toolbar__toggle-item',
})

export const chart = () => ({
  container: 'stalk-chart__container',
  tooltip: 'stalk-chart__tooltip',
  tooltipLabel: 'stalk-chart__tooltip-label',
  tooltipRow: 'stalk-chart__tooltip-row',
  tooltipIndicator: 'stalk-chart__tooltip-indicator',
  legend: 'stalk-chart__legend',
})

export const carousel = () => ({
  root: 'stalk-carousel__root',
  viewport: 'stalk-carousel__viewport',
  content: 'stalk-carousel__content',
  item: 'stalk-carousel__item',
  previous: 'stalk-carousel__previous',
  next: 'stalk-carousel__next',
})

export const resizable = () => ({
  root: 'stalk-resizable__root',
  panel: 'stalk-resizable__panel',
  handle: 'stalk-resizable__handle',
  handleGrip: 'stalk-resizable__handle-grip',
})

export const scrollArea = () => ({
  root: 'stalk-scroll-area__root',
  viewport: 'stalk-scroll-area__viewport',
  scrollbar: 'stalk-scroll-area__scrollbar',
  thumb: 'stalk-scroll-area__thumb',
  corner: 'stalk-scroll-area__corner',
})

export const sidebar = () => ({
  provider: 'stalk-sidebar__provider',
  root: 'stalk-sidebar__root',
  backdrop: 'stalk-sidebar__backdrop',
  inset: 'stalk-sidebar__inset',
  trigger: 'stalk-sidebar__trigger',
  rail: 'stalk-sidebar__rail',
  header: 'stalk-sidebar__header',
  footer: 'stalk-sidebar__footer',
  content: 'stalk-sidebar__content',
  group: 'stalk-sidebar__group',
  groupLabel: 'stalk-sidebar__group-label',
  menu: 'stalk-sidebar__menu',
  menuItem: 'stalk-sidebar__menu-item',
  menuButton: 'stalk-sidebar__menu-button',
})

interface SeparatorRecipeOptions {
  orientation?: 'horizontal' | 'vertical'
}

export const separator = ({ orientation = 'horizontal' }: SeparatorRecipeOptions = {}) =>
  `stalk-separator stalk-separator--${orientation}`

separator.variantMap = { orientation: ['horizontal', 'vertical'] as const }

export const qrCode = () => 'stalk-qr-code'

interface BlockquoteRecipeOptions {
  size?: 'sm' | 'md' | 'lg'
}

export const blockquote = ({ size = 'md' }: BlockquoteRecipeOptions = {}) =>
  `stalk-blockquote stalk-blockquote--${size}`
