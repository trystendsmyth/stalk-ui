import { accordion } from './accordion'
import { alert } from './alert'
import { avatar } from './avatar'
import { badge } from './badge'
import { blockquote } from './blockquote'
import { button } from './button'
import { card } from './card'
import { checkbox } from './checkbox'
import { code } from './code'
import { collapsible } from './collapsible'
import { contextMenu } from './context-menu'
import { dialog } from './dialog'
import { dropdownMenu } from './dropdown-menu'
import { heading } from './heading'
import { input } from './input'
import { kbd } from './kbd'
import { label } from './label'
import { link } from './link'
import { menubar } from './menubar'
import { popover } from './popover'
import { progress } from './progress'
import { radio } from './radio'
import { select } from './select'
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
  avatar,
  badge,
  blockquote,
  button,
  card,
  checkbox,
  code,
  collapsible,
  contextMenu,
  dialog,
  dropdownMenu,
  heading,
  input,
  kbd,
  label,
  link,
  menubar,
  popover,
  progress,
  radio,
  select,
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
  toast,
  toggle,
  tooltip,
] satisfies RegistrySource[]
