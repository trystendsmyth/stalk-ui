import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayFlag, DayPicker, SelectionState, UI } from 'react-day-picker'
import { cx } from 'styled-system/css'
import { calendar as calendarRecipe } from 'styled-system/recipes'

import type { ComponentProps } from 'react'

const styles = /* @__PURE__ */ calendarRecipe()

export type CalendarProps = ComponentProps<typeof DayPicker>

export const Calendar = ({ className, classNames, ...props }: CalendarProps) => {
  return (
    <DayPicker
      classNames={{
        [UI.Root]: cx(styles.root, className),
        [UI.Months]: styles.months,
        [UI.Month]: styles.month,
        [UI.Nav]: styles.nav,
        [UI.PreviousMonthButton]: styles.navButton,
        [UI.NextMonthButton]: styles.navButton,
        [UI.MonthCaption]: styles.monthCaption,
        [UI.CaptionLabel]: styles.captionLabel,
        [UI.MonthGrid]: styles.monthGrid,
        [UI.Weekdays]: styles.weekdays,
        [UI.Weekday]: styles.weekday,
        [UI.Week]: styles.week,
        [UI.Day]: styles.day,
        [UI.DayButton]: styles.dayButton,
        [DayFlag.today]: styles.today,
        [DayFlag.outside]: styles.outside,
        [DayFlag.disabled]: styles.disabled,
        [DayFlag.hidden]: styles.hidden,
        [SelectionState.selected]: styles.selected,
        [SelectionState.range_start]: styles.rangeStart,
        [SelectionState.range_middle]: styles.rangeMiddle,
        [SelectionState.range_end]: styles.rangeEnd,
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: chevronClassName }) => {
          const Icon = orientation === 'left' ? ChevronLeft : ChevronRight
          return <Icon className={chevronClassName} size={16} aria-hidden />
        },
      }}
      {...props}
    />
  )
}

Calendar.displayName = 'Calendar'
