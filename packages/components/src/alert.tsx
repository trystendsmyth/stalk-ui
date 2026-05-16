import { createContext, forwardRef, useContext, useMemo } from 'react'
import { css, cx } from 'styled-system/css'
import { alert as alertRecipe } from 'styled-system/recipes'

import type { Tone } from './tones'
import type { ButtonHTMLAttributes, HTMLAttributes } from 'react'

export type AlertSize = (typeof alertRecipe.variantMap.size)[number]
export type AlertVariant = (typeof alertRecipe.variantMap.variant)[number]
export type AlertTone = Tone

interface AlertContextValue {
  styles: ReturnType<typeof alertRecipe>
}

const AlertContext = /* @__PURE__ */ createContext<AlertContextValue | null>(null)

const useAlertStyles = () => {
  const ctx = useContext(AlertContext)
  if (!ctx) {
    throw new Error('Alert subcomponents must be rendered inside <AlertRoot>.')
  }
  return ctx.styles
}

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
    const ctx = useMemo<AlertContextValue>(() => ({ styles }), [styles])

    return (
      <AlertContext.Provider value={ctx}>
        <div
          ref={ref}
          className={cx(styles.root, css({ colorPalette: tone }), className)}
          role={role}
          {...props}
        />
      </AlertContext.Provider>
    )
  },
)

export const AlertIcon = /* @__PURE__ */ forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(function AlertIcon({ className, ...props }, ref) {
  const styles = useAlertStyles()
  return <span ref={ref} aria-hidden="true" className={cx(styles.icon, className)} {...props} />
})

export const AlertBody = /* @__PURE__ */ forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function AlertBody({ className, ...props }, ref) {
    const styles = useAlertStyles()
    return <div ref={ref} className={cx(styles.body, className)} {...props} />
  },
)

export const AlertTitle = /* @__PURE__ */ forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function AlertTitle({ className, ...props }, ref) {
  const styles = useAlertStyles()
  return <p ref={ref} className={cx(styles.title, className)} {...props} />
})

export const AlertDescription = /* @__PURE__ */ forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function AlertDescription({ className, ...props }, ref) {
  const styles = useAlertStyles()
  return <p ref={ref} className={cx(styles.description, className)} {...props} />
})

export const AlertActions = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function AlertActions({ className, ...props }, ref) {
  const styles = useAlertStyles()
  return <div ref={ref} className={cx(styles.actions, className)} {...props} />
})

export type AlertCloseProps = ButtonHTMLAttributes<HTMLButtonElement>

export const AlertClose = /* @__PURE__ */ forwardRef<HTMLButtonElement, AlertCloseProps>(
  function AlertClose({ className, type = 'button', ...props }, ref) {
    const styles = useAlertStyles()
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
