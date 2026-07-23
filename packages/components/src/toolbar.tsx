import * as ToolbarPrimitive from '@radix-ui/react-toolbar'
import { forwardRef } from 'react'
import { css, cx } from 'styled-system/css'
import { toolbar as toolbarRecipe } from 'styled-system/recipes'

import { Kbd } from './kbd'
import { TooltipContent, TooltipProvider, TooltipRoot, TooltipTrigger } from './tooltip'

import type { ComponentPropsWithoutRef, ComponentRef, ReactNode } from 'react'

const styles = /* @__PURE__ */ toolbarRecipe()

const tooltipRow = /* @__PURE__ */ css({
  alignItems: 'center',
  display: 'inline-flex',
  gap: '8',
})

export interface ToolbarTooltipProps {
  /** Tooltip label shown on hover/focus. */
  tooltip?: ReactNode | undefined
  /** Keyboard shortcut key(s) rendered as `<Kbd>` beside the label. */
  shortcut?: string | string[] | undefined
}

// Wraps a toolbar control in a labelled tooltip, with the shortcut keys as
// Kbd chips. Renders children untouched when neither prop is set.
const ToolbarTooltip = ({
  children,
  shortcut,
  tooltip,
}: ToolbarTooltipProps & { children: ReactNode }) => {
  if (tooltip === undefined && shortcut === undefined) {
    return children
  }
  const keys = typeof shortcut === 'string' ? [shortcut] : (shortcut ?? [])
  return (
    <TooltipRoot>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <span className={tooltipRow}>
          {tooltip}
          {keys.map((key) => (
            <Kbd key={key} size="sm">
              {key}
            </Kbd>
          ))}
        </span>
      </TooltipContent>
    </TooltipRoot>
  )
}

// The root provides a shared TooltipProvider so moving between controls skips
// the open delay after the first tooltip (renders no DOM of its own).
export const ToolbarRoot = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ToolbarPrimitive.Root>,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root>
>(function ToolbarRoot({ className, ...props }, ref) {
  return (
    <TooltipProvider delayDuration={300}>
      <ToolbarPrimitive.Root ref={ref} className={cx(styles.root, className)} {...props} />
    </TooltipProvider>
  )
})

export interface ToolbarButtonProps
  extends ComponentPropsWithoutRef<typeof ToolbarPrimitive.Button>, ToolbarTooltipProps {}

export const ToolbarButton = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ToolbarPrimitive.Button>,
  ToolbarButtonProps
>(function ToolbarButton({ className, shortcut, tooltip, ...props }, ref) {
  return (
    <ToolbarTooltip shortcut={shortcut} tooltip={tooltip}>
      <ToolbarPrimitive.Button ref={ref} className={cx(styles.button, className)} {...props} />
    </ToolbarTooltip>
  )
})

export const ToolbarLink = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ToolbarPrimitive.Link>,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.Link>
>(function ToolbarLink({ className, ...props }, ref) {
  return <ToolbarPrimitive.Link ref={ref} className={cx(styles.link, className)} {...props} />
})

export const ToolbarSeparator = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ToolbarPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator>
>(function ToolbarSeparator({ className, ...props }, ref) {
  return (
    <ToolbarPrimitive.Separator ref={ref} className={cx(styles.separator, className)} {...props} />
  )
})

export const ToolbarToggleGroup = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ToolbarPrimitive.ToggleGroup>,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleGroup>
>(function ToolbarToggleGroup({ className, ...props }, ref) {
  return (
    <ToolbarPrimitive.ToggleGroup
      ref={ref}
      className={cx(styles.toggleGroup, className)}
      {...props}
    />
  )
})

export interface ToolbarToggleItemProps
  extends ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleItem>, ToolbarTooltipProps {}

export const ToolbarToggleItem = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ToolbarPrimitive.ToggleItem>,
  ToolbarToggleItemProps
>(function ToolbarToggleItem({ className, shortcut, tooltip, ...props }, ref) {
  return (
    <ToolbarTooltip shortcut={shortcut} tooltip={tooltip}>
      <ToolbarPrimitive.ToggleItem
        ref={ref}
        className={cx(styles.toggleItem, className)}
        {...props}
      />
    </ToolbarTooltip>
  )
})

type ToolbarNamespace = typeof ToolbarRoot & {
  Button: typeof ToolbarButton
  Link: typeof ToolbarLink
  Root: typeof ToolbarRoot
  Separator: typeof ToolbarSeparator
  ToggleGroup: typeof ToolbarToggleGroup
  ToggleItem: typeof ToolbarToggleItem
}

export const Toolbar: ToolbarNamespace = /* @__PURE__ */ Object.assign(ToolbarRoot, {
  Button: ToolbarButton,
  Link: ToolbarLink,
  Root: ToolbarRoot,
  Separator: ToolbarSeparator,
  ToggleGroup: ToolbarToggleGroup,
  ToggleItem: ToolbarToggleItem,
})
