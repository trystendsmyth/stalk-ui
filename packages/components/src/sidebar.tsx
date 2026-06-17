import { Slot } from '@radix-ui/react-slot'
import { PanelLeft } from 'lucide-react'
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { cx } from 'styled-system/css'
import { sidebar as sidebarRecipe } from 'styled-system/recipes'

import type {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  HTMLAttributes,
  ReactNode,
} from 'react'

const styles = /* @__PURE__ */ sidebarRecipe()

const SIDEBAR_COOKIE = 'stalk_sidebar_state'
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_KEYBOARD_SHORTCUT = 'b'
const MOBILE_QUERY = '(max-width: 767px)'

interface SidebarContextValue {
  isMobile: boolean
  open: boolean
  openMobile: boolean
  setOpen: (open: boolean) => void
  setOpenMobile: (open: boolean) => void
  state: 'expanded' | 'collapsed'
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

export function useSidebar(): SidebarContextValue {
  const context = useContext(SidebarContext)
  if (context === null) {
    throw new Error('useSidebar must be used within a <SidebarProvider>.')
  }
  return context
}

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY)
    const update = () => {
      setIsMobile(query.matches)
    }
    update()
    query.addEventListener('change', update)
    return () => {
      query.removeEventListener('change', update)
    }
  }, [])
  return isMobile
}

export interface SidebarProviderProps extends HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const SidebarProvider = /* @__PURE__ */ forwardRef<HTMLDivElement, SidebarProviderProps>(
  function SidebarProvider(
    { children, className, defaultOpen = true, onOpenChange, open: openProp, ...props },
    ref,
  ) {
    const isMobile = useIsMobile()
    const [openMobile, setOpenMobile] = useState(false)
    const [internalOpen, setInternalOpen] = useState(defaultOpen)
    const open = openProp ?? internalOpen

    const setOpen = useCallback(
      (value: boolean) => {
        if (onOpenChange) {
          onOpenChange(value)
        } else {
          setInternalOpen(value)
        }
        if (typeof document !== 'undefined') {
          document.cookie = `${SIDEBAR_COOKIE}=${String(value)}; path=/; max-age=${String(SIDEBAR_COOKIE_MAX_AGE)}`
        }
      },
      [onOpenChange],
    )

    const toggleSidebar = useCallback(() => {
      if (isMobile) {
        setOpenMobile((value) => !value)
      } else {
        setOpen(!open)
      }
    }, [isMobile, open, setOpen])

    useEffect(() => {
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
          event.preventDefault()
          toggleSidebar()
        }
      }
      window.addEventListener('keydown', onKeyDown)
      return () => {
        window.removeEventListener('keydown', onKeyDown)
      }
    }, [toggleSidebar])

    const value = useMemo<SidebarContextValue>(
      () => ({
        isMobile,
        open,
        openMobile,
        setOpen,
        setOpenMobile,
        state: open ? 'expanded' : 'collapsed',
        toggleSidebar,
      }),
      [isMobile, open, openMobile, setOpen, toggleSidebar],
    )

    return (
      <SidebarContext.Provider value={value}>
        <div ref={ref} className={cx(styles.provider, className)} {...props}>
          {children}
        </div>
      </SidebarContext.Provider>
    )
  },
)

export interface SidebarRootProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode
}

export const SidebarRoot = /* @__PURE__ */ forwardRef<HTMLElement, SidebarRootProps>(
  function SidebarRoot({ children, className, ...props }, ref) {
    const { isMobile, open, openMobile, setOpenMobile } = useSidebar()
    const expanded = isMobile ? openMobile : open
    return (
      <>
        {isMobile && openMobile ? (
          <button
            aria-label="Close sidebar"
            className={styles.backdrop}
            type="button"
            onClick={() => {
              setOpenMobile(false)
            }}
          />
        ) : null}
        <aside
          ref={ref}
          aria-label="Sidebar"
          className={cx(styles.root, className)}
          data-mobile={isMobile ? 'true' : undefined}
          data-state={expanded ? 'expanded' : 'collapsed'}
          {...props}
        >
          {children}
        </aside>
      </>
    )
  },
)

export const SidebarTrigger = /* @__PURE__ */ forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function SidebarTrigger(
  { 'aria-label': ariaLabel = 'Toggle sidebar', className, onClick, ...props },
  ref,
) {
  const { toggleSidebar } = useSidebar()
  return (
    <button
      ref={ref}
      aria-label={ariaLabel}
      className={cx(styles.trigger, className)}
      type="button"
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeft aria-hidden="true" />
    </button>
  )
})

export const SidebarRail = /* @__PURE__ */ forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function SidebarRail({ 'aria-label': ariaLabel = 'Resize sidebar', className, ...props }, ref) {
  const { toggleSidebar } = useSidebar()
  return (
    <button
      ref={ref}
      aria-label={ariaLabel}
      className={cx(styles.rail, className)}
      tabIndex={-1}
      type="button"
      onClick={toggleSidebar}
      {...props}
    />
  )
})

export const SidebarInset = /* @__PURE__ */ forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  function SidebarInset({ className, ...props }, ref) {
    return <main ref={ref} className={cx(styles.inset, className)} {...props} />
  },
)

export const SidebarHeader = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function SidebarHeader({ className, ...props }, ref) {
  return <div ref={ref} className={cx(styles.header, className)} {...props} />
})

export const SidebarFooter = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function SidebarFooter({ className, ...props }, ref) {
  return <div ref={ref} className={cx(styles.footer, className)} {...props} />
})

export const SidebarContent = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function SidebarContent({ className, ...props }, ref) {
  return <div ref={ref} className={cx(styles.content, className)} {...props} />
})

export const SidebarGroup = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function SidebarGroup({ className, ...props }, ref) {
  return <div ref={ref} className={cx(styles.group, className)} {...props} />
})

export const SidebarGroupLabel = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function SidebarGroupLabel({ className, ...props }, ref) {
  return <div ref={ref} className={cx(styles.groupLabel, className)} {...props} />
})

export const SidebarMenu = /* @__PURE__ */ forwardRef<
  HTMLUListElement,
  HTMLAttributes<HTMLUListElement>
>(function SidebarMenu({ className, ...props }, ref) {
  return <ul ref={ref} className={cx(styles.menu, className)} {...props} />
})

export const SidebarMenuItem = /* @__PURE__ */ forwardRef<
  HTMLLIElement,
  HTMLAttributes<HTMLLIElement>
>(function SidebarMenuItem({ className, ...props }, ref) {
  return <li ref={ref} className={cx(styles.menuItem, className)} {...props} />
})

export interface SidebarMenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render the single child element (e.g. a router link) instead of a `<button>`. */
  asChild?: boolean
  /** Marks the button as the current item. */
  isActive?: boolean
}

export const SidebarMenuButton = /* @__PURE__ */ forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(function SidebarMenuButton({ asChild = false, className, isActive = false, ...props }, ref) {
  const Comp = asChild ? Slot : 'button'
  const buttonProps: ComponentPropsWithoutRef<'button'> = asChild ? {} : { type: 'button' }
  return (
    <Comp
      ref={ref}
      aria-current={isActive ? 'page' : undefined}
      className={cx(styles.menuButton, className)}
      data-active={isActive ? 'true' : undefined}
      {...buttonProps}
      {...props}
    />
  )
})

type SidebarNamespace = typeof SidebarRoot & {
  Content: typeof SidebarContent
  Footer: typeof SidebarFooter
  Group: typeof SidebarGroup
  GroupLabel: typeof SidebarGroupLabel
  Header: typeof SidebarHeader
  Inset: typeof SidebarInset
  Menu: typeof SidebarMenu
  MenuButton: typeof SidebarMenuButton
  MenuItem: typeof SidebarMenuItem
  Provider: typeof SidebarProvider
  Rail: typeof SidebarRail
  Root: typeof SidebarRoot
  Trigger: typeof SidebarTrigger
}

export const Sidebar: SidebarNamespace = /* @__PURE__ */ Object.assign(SidebarRoot, {
  Content: SidebarContent,
  Footer: SidebarFooter,
  Group: SidebarGroup,
  GroupLabel: SidebarGroupLabel,
  Header: SidebarHeader,
  Inset: SidebarInset,
  Menu: SidebarMenu,
  MenuButton: SidebarMenuButton,
  MenuItem: SidebarMenuItem,
  Provider: SidebarProvider,
  Rail: SidebarRail,
  Root: SidebarRoot,
  Trigger: SidebarTrigger,
})
