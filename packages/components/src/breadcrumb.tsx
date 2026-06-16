import { Slot } from '@radix-ui/react-slot'
import { ChevronRight, MoreHorizontal } from 'lucide-react'
import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { breadcrumb as breadcrumbRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, HTMLAttributes } from 'react'

const styles = /* @__PURE__ */ breadcrumbRecipe()

export const BreadcrumbRoot = /* @__PURE__ */ forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<'nav'>
>(function BreadcrumbRoot({ 'aria-label': ariaLabel = 'Breadcrumb', className, ...props }, ref) {
  return <nav ref={ref} aria-label={ariaLabel} className={cx(styles.root, className)} {...props} />
})

export const BreadcrumbList = /* @__PURE__ */ forwardRef<
  HTMLOListElement,
  ComponentPropsWithoutRef<'ol'>
>(function BreadcrumbList({ className, ...props }, ref) {
  return <ol ref={ref} className={cx(styles.list, className)} {...props} />
})

export const BreadcrumbItem = /* @__PURE__ */ forwardRef<
  HTMLLIElement,
  ComponentPropsWithoutRef<'li'>
>(function BreadcrumbItem({ className, ...props }, ref) {
  return <li ref={ref} className={cx(styles.item, className)} {...props} />
})

export interface BreadcrumbLinkProps extends ComponentPropsWithoutRef<'a'> {
  /** Render the single child element (e.g. a router `<Link>`) instead of an `<a>`. */
  asChild?: boolean
}

export const BreadcrumbLink = /* @__PURE__ */ forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  function BreadcrumbLink({ asChild = false, className, ...props }, ref) {
    const Comp = asChild ? Slot : 'a'
    return <Comp ref={ref} className={cx(styles.link, className)} {...props} />
  },
)

export const BreadcrumbPage = /* @__PURE__ */ forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<'span'>
>(function BreadcrumbPage({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      aria-current="page"
      aria-disabled="true"
      role="link"
      className={cx(styles.page, className)}
      {...props}
    />
  )
})

export const BreadcrumbSeparator = /* @__PURE__ */ forwardRef<
  HTMLLIElement,
  ComponentPropsWithoutRef<'li'>
>(function BreadcrumbSeparator({ children, className, ...props }, ref) {
  return (
    <li
      ref={ref}
      aria-hidden="true"
      role="presentation"
      className={cx(styles.separator, className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
})

export interface BreadcrumbEllipsisProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visually-hidden label announced for the collapsed items. */
  label?: string
}

export const BreadcrumbEllipsis = /* @__PURE__ */ forwardRef<
  HTMLSpanElement,
  BreadcrumbEllipsisProps
>(function BreadcrumbEllipsis({ className, label = 'More', ...props }, ref) {
  return (
    <span
      ref={ref}
      aria-hidden="true"
      role="presentation"
      className={cx(styles.ellipsis, className)}
      {...props}
    >
      <MoreHorizontal />
      <span style={SR_ONLY}>{label}</span>
    </span>
  )
})

const SR_ONLY = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
} as const

type BreadcrumbNamespace = typeof BreadcrumbRoot & {
  Ellipsis: typeof BreadcrumbEllipsis
  Item: typeof BreadcrumbItem
  Link: typeof BreadcrumbLink
  List: typeof BreadcrumbList
  Page: typeof BreadcrumbPage
  Root: typeof BreadcrumbRoot
  Separator: typeof BreadcrumbSeparator
}

export const Breadcrumb: BreadcrumbNamespace = /* @__PURE__ */ Object.assign(BreadcrumbRoot, {
  Ellipsis: BreadcrumbEllipsis,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  List: BreadcrumbList,
  Page: BreadcrumbPage,
  Root: BreadcrumbRoot,
  Separator: BreadcrumbSeparator,
})
