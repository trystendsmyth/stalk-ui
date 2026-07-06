import { createStyleContext } from '@stalk-ui/utils'
import { forwardRef, useMemo } from 'react'
import { css, cx } from 'styled-system/css'
import { timeline as timelineRecipe } from 'styled-system/recipes'

import type { Tone } from './tones'
import type { HTMLAttributes, LiHTMLAttributes, TimeHTMLAttributes } from 'react'

export type TimelineTone = Tone

const { StyleProvider, useSlotStyles, withContext } = /* @__PURE__ */ createStyleContext(
  timelineRecipe,
  { name: 'Timeline' },
)

export interface TimelineRootProps extends HTMLAttributes<HTMLOListElement> {
  /** Lay items along a row (dot rails run left→right) instead of a column. */
  orientation?: 'vertical' | 'horizontal'
}

export const TimelineRoot = /* @__PURE__ */ forwardRef<HTMLOListElement, TimelineRootProps>(
  function TimelineRoot({ className, orientation = 'vertical', ...props }, ref) {
    const styles = useMemo(() => timelineRecipe({ orientation }), [orientation])

    return (
      <StyleProvider value={styles}>
        <ol ref={ref} className={cx(styles.root, className)} {...props} />
      </StyleProvider>
    )
  },
)

export interface TimelineItemProps extends LiHTMLAttributes<HTMLLIElement> {
  /** Colors the item's dot (accent default; status tones for event severity). */
  tone?: TimelineTone
}

export const TimelineItem = /* @__PURE__ */ forwardRef<HTMLLIElement, TimelineItemProps>(
  function TimelineItem({ children, className, tone = 'accent', ...props }, ref) {
    const styles = useSlotStyles()

    return (
      <li ref={ref} className={cx(styles.item, className)} {...props}>
        <span className={styles.rail} aria-hidden="true">
          <span className={cx(styles.indicator, css({ colorPalette: tone }))} />
          <span className={styles.connector} data-timeline-connector />
        </span>
        {children}
      </li>
    )
  },
)

export const TimelineContent = /* @__PURE__ */ withContext('div', 'content')
export const TimelineTitle = /* @__PURE__ */ withContext('p', 'title')
export const TimelineDescription = /* @__PURE__ */ withContext('p', 'description')

export type TimelineTimeProps = TimeHTMLAttributes<HTMLTimeElement>

export const TimelineTime = /* @__PURE__ */ forwardRef<HTMLTimeElement, TimelineTimeProps>(
  function TimelineTime({ className, ...props }, ref) {
    const styles = useSlotStyles()
    return <time ref={ref} className={cx(styles.time, className)} {...props} />
  },
)

export const Timeline = /* @__PURE__ */ Object.assign(TimelineRoot, {
  Content: TimelineContent,
  Description: TimelineDescription,
  Item: TimelineItem,
  Root: TimelineRoot,
  Time: TimelineTime,
  Title: TimelineTitle,
})
