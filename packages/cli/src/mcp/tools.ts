import { defaultConfig, DEFAULT_VARIANT } from '../constants'

import {
  auditChecklist,
  formatAddCommand,
  formatItemDetails,
  formatItemListing,
  installInstructions,
} from './format'
import { listAllItems, searchItems, viewItem } from './registry'

import type { PackageManager, StalkConfig, Variant } from '../types'

export interface ToolContext {
  config: StalkConfig
  packageManager?: PackageManager
  hasProjectConfig: boolean
}

export const remoteContext = (): ToolContext => ({
  config: { ...defaultConfig },
  hasProjectConfig: false,
})

export interface ListItemsArgs {
  registries?: string[] | undefined
  variant?: Variant | undefined
  flavor?: 'stalk' | 'shadcn' | undefined
}

export const listItemsTool = async (context: ToolContext, args: ListItemsArgs) => {
  const registries = args.registries ?? Object.keys(context.config.registries)
  const items = await listAllItems({
    registries,
    config: context.config,
    variant: args.variant,
    flavor: args.flavor,
  })

  return {
    text: [
      `Found ${String(items.length)} item${items.length === 1 ? '' : 's'} (variant: ${args.variant ?? context.config.primitives ?? DEFAULT_VARIANT}, flavor: ${args.flavor ?? 'stalk'}):`,
      '',
      formatItemListing(items),
    ].join('\n'),
  }
}

export interface SearchItemsArgs extends ListItemsArgs {
  query: string
  limit?: number | undefined
}

export const searchItemsTool = async (context: ToolContext, args: SearchItemsArgs) => {
  const registries = args.registries ?? Object.keys(context.config.registries)
  const items = await listAllItems({
    registries,
    config: context.config,
    variant: args.variant,
    flavor: args.flavor,
  })
  const matches = searchItems(items, args.query).slice(0, args.limit ?? 25)

  return {
    text:
      matches.length === 0
        ? `No items match "${args.query}". Try a different query or run list_items to see what's available.`
        : [
            `Found ${String(matches.length)} match${matches.length === 1 ? '' : 'es'} for "${args.query}":`,
            '',
            formatItemListing(matches),
          ].join('\n'),
  }
}

export interface ViewItemsArgs {
  items: string[]
}

export const viewItemsTool = async (context: ToolContext, args: ViewItemsArgs) => {
  const fetched = await Promise.all(
    args.items.map((name) => viewItem(name, { config: context.config })),
  )
  return { text: formatItemDetails(fetched) }
}

export interface GetAddCommandArgs {
  items: string[]
}

export const getAddCommandTool = (context: ToolContext, args: GetAddCommandArgs) => ({
  text: formatAddCommand(args.items, context.packageManager),
})

export const getProjectRegistriesTool = (context: ToolContext) => {
  if (!context.hasProjectConfig) {
    return {
      text: 'No stalk.config.json detected for the current project. Run `npx @stalk-ui/cli init` to create one, or use the default `@stalk-ui` registry.',
    }
  }
  const names = Object.keys(context.config.registries)
  return {
    text: [
      `Registries configured in stalk.config.json:`,
      '',
      ...names.map((name) => `- ${name} → ${context.config.registries[name] ?? ''}`),
      '',
      `Variant: ${context.config.primitives ?? DEFAULT_VARIANT}`,
      `Components path: ${context.config.components}`,
      `Styled-system path: ${context.config.styledSystem}`,
    ].join('\n'),
  }
}

export const getInstallInstructionsTool = () => ({ text: installInstructions })

export const getAuditChecklistTool = () => ({ text: auditChecklist })
