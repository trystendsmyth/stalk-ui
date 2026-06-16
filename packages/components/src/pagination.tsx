import { Slot } from '@radix-ui/react-slot'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { forwardRef } from 'react'
import { css, cx } from 'styled-system/css'
import { button as buttonRecipe, pagination as paginationRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, HTMLAttributes } from 'react'

const styles = /* @__PURE__ */ paginationRecipe()

// RTL-aware chevrons: the trail direction mirrors with the writing direction.
const directionalIcon = /* @__PURE__ */ css({ _rtl: { transform: 'scaleX(-1)' } })

export const PaginationRoot = /* @__PURE__ */ forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<'nav'>
>(function PaginationRoot({ 'aria-label': ariaLabel = 'Pagination', className, ...props }, ref) {
  return (
    <nav
      ref={ref}
      aria-label={ariaLabel}
      role="navigation"
      className={cx(styles.root, className)}
      {...props}
    />
  )
})

export const PaginationContent = /* @__PURE__ */ forwardRef<
  HTMLUListElement,
  ComponentPropsWithoutRef<'ul'>
>(function PaginationContent({ className, ...props }, ref) {
  return <ul ref={ref} className={cx(styles.content, className)} {...props} />
})

export const PaginationItem = /* @__PURE__ */ forwardRef<
  HTMLLIElement,
  ComponentPropsWithoutRef<'li'>
>(function PaginationItem({ className, ...props }, ref) {
  return <li ref={ref} className={cx(styles.item, className)} {...props} />
})

export interface PaginationLinkProps extends ComponentPropsWithoutRef<'a'> {
  /** Render the single child element (e.g. a router `<Link>`) instead of an `<a>`. */
  asChild?: boolean
  /** Marks the current page: applies `aria-current="page"` and the outline variant. */
  isActive?: boolean
}

export const PaginationLink = /* @__PURE__ */ forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  function PaginationLink({ asChild = false, className, isActive = false, ...props }, ref) {
    const Comp = asChild ? Slot : 'a'
    return (
      <Comp
        ref={ref}
        aria-current={isActive ? 'page' : undefined}
        className={cx(buttonRecipe({ variant: isActive ? 'outline' : 'ghost' }), className)}
        {...props}
      />
    )
  },
)

export interface PaginationEdgeProps extends PaginationLinkProps {
  /** Accessible label for the control. */
  label?: string
  /** Show the text label next to the chevron. */
  showLabel?: boolean
}

export const PaginationPrevious = /* @__PURE__ */ forwardRef<
  HTMLAnchorElement,
  PaginationEdgeProps
>(function PaginationPrevious({ label = 'Previous', showLabel = true, ...props }, ref) {
  return (
    <PaginationLink ref={ref} aria-label={label} {...props}>
      <ChevronLeft className={directionalIcon} />
      {showLabel ? <span>{label}</span> : null}
    </PaginationLink>
  )
})

export const PaginationNext = /* @__PURE__ */ forwardRef<HTMLAnchorElement, PaginationEdgeProps>(
  function PaginationNext({ label = 'Next', showLabel = true, ...props }, ref) {
    return (
      <PaginationLink ref={ref} aria-label={label} {...props}>
        {showLabel ? <span>{label}</span> : null}
        <ChevronRight className={directionalIcon} />
      </PaginationLink>
    )
  },
)

export interface PaginationEllipsisProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visually-hidden label announced for the skipped pages. */
  label?: string
}

export const PaginationEllipsis = /* @__PURE__ */ forwardRef<
  HTMLSpanElement,
  PaginationEllipsisProps
>(function PaginationEllipsis({ className, label = 'More pages', ...props }, ref) {
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

type PaginationNamespace = typeof PaginationRoot & {
  Content: typeof PaginationContent
  Ellipsis: typeof PaginationEllipsis
  Item: typeof PaginationItem
  Link: typeof PaginationLink
  Next: typeof PaginationNext
  Previous: typeof PaginationPrevious
  Root: typeof PaginationRoot
}

export const Pagination: PaginationNamespace = /* @__PURE__ */ Object.assign(PaginationRoot, {
  Content: PaginationContent,
  Ellipsis: PaginationEllipsis,
  Item: PaginationItem,
  Link: PaginationLink,
  Next: PaginationNext,
  Previous: PaginationPrevious,
  Root: PaginationRoot,
})
