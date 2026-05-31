import { createStyleContext } from '@stalk-ui/utils'
import { forwardRef, useMemo } from 'react'
import { css, cx } from 'styled-system/css'
import { alert as alertRecipe } from 'styled-system/recipes'

import type { Tone } from './tones'
import type { ButtonHTMLAttributes, HTMLAttributes } from 'react'

export type AlertSize = (typeof alertRecipe.variantMap.size)[number]
export type AlertVariant = (typeof alertRecipe.variantMap.variant)[number]
export type AlertTone = Tone

const { StyleProvider, useSlotStyles, withContext } = /* @__PURE__ */ createStyleContext(
  alertRecipe,
  { name: 'Alert' },
)

export interface AlertRootProps extends HTMLAttributes<HTMLDivElement> {
  size?: AlertSize
  /** Selects the semantic color palette. Defaults to `info`. */
  tone?: AlertTone
  variant?: AlertVariant
}

export const AlertRoot = /* @__PURE__ */ forwardRef<HTMLDivElement, AlertRootProps>(
  function AlertRoot(
    { className, role = 'alert', size = 'md', tone = 'info', variant = 'subtle', ...props },
    ref,
  ) {
    const styles = useMemo(() => alertRecipe({ size, variant }), [size, variant])

    return (
      <StyleProvider value={styles}>
        <div
          ref={ref}
          className={cx(styles.root, css({ colorPalette: tone }), className)}
          role={role}
          {...props}
        />
      </StyleProvider>
    )
  },
)

export const AlertBody = /* @__PURE__ */ withContext('div', 'body')
export const AlertTitle = /* @__PURE__ */ withContext('p', 'title')
export const AlertDescription = /* @__PURE__ */ withContext('p', 'description')
export const AlertActions = /* @__PURE__ */ withContext('div', 'actions')

// Hand-rolled for their attribute defaults (aria-hidden / type="button").
export const AlertIcon = /* @__PURE__ */ forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(function AlertIcon({ className, ...props }, ref) {
  const styles = useSlotStyles()
  return <span ref={ref} aria-hidden="true" className={cx(styles.icon, className)} {...props} />
})

export type AlertCloseProps = ButtonHTMLAttributes<HTMLButtonElement>

export const AlertClose = /* @__PURE__ */ forwardRef<HTMLButtonElement, AlertCloseProps>(
  function AlertClose({ className, type = 'button', ...props }, ref) {
    const styles = useSlotStyles()
    return <button ref={ref} className={cx(styles.close, className)} type={type} {...props} />
  },
)

export const Alert = /* @__PURE__ */ Object.assign(AlertRoot, {
  Actions: AlertActions,
  Body: AlertBody,
  Close: AlertClose,
  Description: AlertDescription,
  Icon: AlertIcon,
  Root: AlertRoot,
  Title: AlertTitle,
})
