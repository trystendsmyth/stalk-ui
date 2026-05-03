import { badge } from './badge'
import { button } from './button'
import { checkbox } from './checkbox'
import { dialog } from './dialog'
import { dropdownMenu } from './dropdown-menu'
import { input } from './input'
import { label } from './label'
import { popover } from './popover'
import { radio } from './radio'
import { select } from './select'
import { spinner } from './spinner'
import { switchItem } from './switch'
import { textarea } from './textarea'
import { tooltip } from './tooltip'

import type { RegistryItem } from '../schema'

// Each registry item lives in its own `registry/ui/<name>.ts` file (per
// AGENTS.md). Adding a new component is a single new file plus one entry here;
// per-component PRs do not collide on a shared array.
export const registryItems = [
  badge,
  button,
  checkbox,
  dialog,
  dropdownMenu,
  input,
  label,
  popover,
  radio,
  select,
  spinner,
  switchItem,
  textarea,
  tooltip,
] satisfies RegistryItem[]
