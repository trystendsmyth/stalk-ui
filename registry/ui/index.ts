import { accordion } from './accordion'
import { alert } from './alert'
import { avatar } from './avatar'
import { badge } from './badge'
import { button } from './button'
import { checkbox } from './checkbox'
import { collapsible } from './collapsible'
import { contextMenu } from './context-menu'
import { dialog } from './dialog'
import { dropdownMenu } from './dropdown-menu'
import { input } from './input'
import { label } from './label'
import { menubar } from './menubar'
import { popover } from './popover'
import { progress } from './progress'
import { radio } from './radio'
import { select } from './select'
import { skeleton } from './skeleton'
import { slider } from './slider'
import { spinner } from './spinner'
import { switchItem } from './switch'
import { tabs } from './tabs'
import { tag } from './tag'
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
  button,
  checkbox,
  collapsible,
  contextMenu,
  dialog,
  dropdownMenu,
  input,
  label,
  menubar,
  popover,
  progress,
  radio,
  select,
  skeleton,
  slider,
  spinner,
  switchItem,
  tabs,
  tag,
  textarea,
  toast,
  toggle,
  tooltip,
] satisfies RegistrySource[]
