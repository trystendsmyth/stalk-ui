import { accordion } from './accordion'
import { alert } from './alert'
import { alertDialog } from './alert-dialog'
import { aspectRatio } from './aspect-ratio'
import { avatar } from './avatar'
import { badge } from './badge'
import { blockquote } from './blockquote'
import { button } from './button'
import { calendar } from './calendar'
import { card } from './card'
import { checkbox } from './checkbox'
import { code } from './code'
import { collapsible } from './collapsible'
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
import { heading } from './heading'
import { hoverCard } from './hover-card'
import { input } from './input'
import { kbd } from './kbd'
import { label } from './label'
import { link } from './link'
import { menubar } from './menubar'
import { navigationMenu } from './navigation-menu'
import { otpInput } from './otp-input'
import { phoneInput } from './phone-input'
import { popover } from './popover'
import { progress } from './progress'
import { qrCode } from './qr-code'
import { radio } from './radio'
import { scrollArea } from './scroll-area'
import { select } from './select'
import { separator } from './separator'
import { sheet } from './sheet'
import { skeleton } from './skeleton'
import { slider } from './slider'
import { spinner } from './spinner'
import { switchItem } from './switch'
import { table } from './table'
import { tabs } from './tabs'
import { tag } from './tag'
import { text } from './text'
import { textarea } from './textarea'
import { timePicker } from './time-picker'
import { toast } from './toast'
import { toggle } from './toggle'
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
  button,
  calendar,
  card,
  checkbox,
  code,
  collapsible,
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
  heading,
  hoverCard,
  input,
  kbd,
  label,
  link,
  menubar,
  navigationMenu,
  otpInput,
  phoneInput,
  popover,
  progress,
  qrCode,
  radio,
  scrollArea,
  select,
  separator,
  sheet,
  skeleton,
  slider,
  spinner,
  switchItem,
  table,
  tabs,
  tag,
  text,
  textarea,
  timePicker,
  toast,
  toggle,
  tooltip,
] satisfies RegistrySource[]
