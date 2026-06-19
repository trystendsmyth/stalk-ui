import { accordion } from './accordion'
import { alert } from './alert'
import { alertDialog } from './alert-dialog'
import { aspectRatio } from './aspect-ratio'
import { avatar } from './avatar'
import { badge } from './badge'
import { blockquote } from './blockquote'
import { breadcrumb } from './breadcrumb'
import { button } from './button'
import { calendar } from './calendar'
import { card } from './card'
import { carousel } from './carousel'
import { chart } from './chart'
import { checkbox } from './checkbox'
import { code } from './code'
import { collapsible } from './collapsible'
import { colorPicker } from './color-picker'
import { combobox } from './combobox'
import { command } from './command'
import { contextMenu } from './context-menu'
import { dataList } from './data-list'
import { dataTable } from './data-table'
import { datePicker } from './date-picker'
import { datetimeInput } from './datetime-input'
import { dialog } from './dialog'
import { dropdownMenu } from './dropdown-menu'
import { form } from './form'
import { formatInput } from './format-input'
import { heading } from './heading'
import { hoverCard } from './hover-card'
import { input } from './input'
import { kbd } from './kbd'
import { label } from './label'
import { link } from './link'
import { menubar } from './menubar'
import { navigationMenu } from './navigation-menu'
import { numberInput } from './number-input'
import { otpInput } from './otp-input'
import { pagination } from './pagination'
import { passwordInput } from './password-input'
import { phoneInput } from './phone-input'
import { popover } from './popover'
import { progress } from './progress'
import { qrCode } from './qr-code'
import { radio } from './radio'
import { resizable } from './resizable'
import { scrollArea } from './scroll-area'
import { searchInput } from './search-input'
import { select } from './select'
import { separator } from './separator'
import { sheet } from './sheet'
import { sidebar } from './sidebar'
import { skeleton } from './skeleton'
import { slider } from './slider'
import { spinner } from './spinner'
import { switchItem } from './switch'
import { table } from './table'
import { tabs } from './tabs'
import { tag } from './tag'
import { tagsInput } from './tags-input'
import { text } from './text'
import { textarea } from './textarea'
import { timePicker } from './time-picker'
import { toast } from './toast'
import { toggle } from './toggle'
import { toolbar } from './toolbar'
import { tooltip } from './tooltip'

import type { RegistrySource } from './_template'

// Each registry item lives in its own `registry/ui/<name>.ts` file (per
// AGENTS.md). Adding a new component is a single new file plus one entry here;
// per-component PRs do not collide on a shared array.
export const registryItems = [
  accordion,
  alert,
  alertDialog,
  aspectRatio,
  avatar,
  badge,
  blockquote,
  breadcrumb,
  button,
  calendar,
  card,
  carousel,
  chart,
  checkbox,
  code,
  collapsible,
  colorPicker,
  combobox,
  command,
  contextMenu,
  dataList,
  dataTable,
  datePicker,
  datetimeInput,
  dialog,
  dropdownMenu,
  form,
  formatInput,
  heading,
  hoverCard,
  input,
  kbd,
  label,
  link,
  menubar,
  navigationMenu,
  numberInput,
  otpInput,
  pagination,
  passwordInput,
  phoneInput,
  popover,
  progress,
  qrCode,
  radio,
  resizable,
  scrollArea,
  searchInput,
  select,
  separator,
  sheet,
  sidebar,
  skeleton,
  slider,
  spinner,
  switchItem,
  table,
  tabs,
  tag,
  tagsInput,
  text,
  textarea,
  timePicker,
  toast,
  toggle,
  toolbar,
  tooltip,
] satisfies RegistrySource[]
