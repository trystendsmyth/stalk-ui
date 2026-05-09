import { forwardRef, useEffect, useState } from 'react'
import { Toaster as SonnerToaster, toast } from 'sonner'
import { cx } from 'styled-system/css'
import { toast as toastRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef } from 'react'

export type ToasterProps = ComponentPropsWithoutRef<typeof SonnerToaster>
export type ToasterRef = ComponentRef<typeof SonnerToaster>

const styles = /* @__PURE__ */ toastRecipe()

const useDocumentColorMode = (): 'light' | 'dark' => {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const root = document.documentElement
    const sync = () => {
      setMode(root.classList.contains('dark') ? 'dark' : 'light')
    }
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => {
      observer.disconnect()
    }
  }, [])

  return mode
}

export const Toaster = /* @__PURE__ */ forwardRef<ToasterRef, ToasterProps>(function Toaster(
  { className, position = 'top-center', theme, toastOptions, ...props },
  ref,
) {
  const documentMode = useDocumentColorMode()
  const resolvedTheme = theme ?? documentMode

  return (
    <SonnerToaster
      ref={ref}
      position={position}
      theme={resolvedTheme}
      className={cx(styles.toaster, className)}
      toastOptions={{
        ...toastOptions,
        classNames: {
          toast: styles.toast,
          title: styles.title,
          description: styles.description,
          actionButton: styles.actionButton,
          cancelButton: styles.cancelButton,
          closeButton: styles.closeButton,
          icon: styles.icon,
          loader: styles.loader,
          ...toastOptions?.classNames,
        },
      }}
      {...props}
    />
  )
})

export { toast }
