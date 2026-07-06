import { createStyleContext } from '@stalk-ui/utils'
import { forwardRef, useMemo } from 'react'
import { cx } from 'styled-system/css'
import { emptyState as emptyStateRecipe } from 'styled-system/recipes'

import type { HTMLAttributes } from 'react'

export type EmptyStateSize = (typeof emptyStateRecipe.variantMap.size)[number]

const { StyleProvider, useSlotStyles, withContext } = /* @__PURE__ */ createStyleContext(
  emptyStateRecipe,
  { name: 'EmptyState' },
)

export interface EmptyStateRootProps extends HTMLAttributes<HTMLDivElement> {
  size?: EmptyStateSize
}

export const EmptyStateRoot = /* @__PURE__ */ forwardRef<HTMLDivElement, EmptyStateRootProps>(
  function EmptyStateRoot({ className, size = 'md', ...props }, ref) {
    const styles = useMemo(() => emptyStateRecipe({ size }), [size])

    return (
      <StyleProvider value={styles}>
        <div ref={ref} className={cx(styles.root, className)} {...props} />
      </StyleProvider>
    )
  },
)

export const EmptyStateTitle = /* @__PURE__ */ withContext('h3', 'title')
export const EmptyStateDescription = /* @__PURE__ */ withContext('p', 'description')
export const EmptyStateActions = /* @__PURE__ */ withContext('div', 'actions')

// Hand-rolled for its aria-hidden default: the icon is decorative.
export const EmptyStateIcon = /* @__PURE__ */ forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(function EmptyStateIcon({ className, ...props }, ref) {
  const styles = useSlotStyles()
  return <span ref={ref} aria-hidden="true" className={cx(styles.icon, className)} {...props} />
})

export const EmptyState = /* @__PURE__ */ Object.assign(EmptyStateRoot, {
  Actions: EmptyStateActions,
  Description: EmptyStateDescription,
  Icon: EmptyStateIcon,
  Root: EmptyStateRoot,
  Title: EmptyStateTitle,
})
