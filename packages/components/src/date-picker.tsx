import { CalendarIcon } from 'lucide-react'
import { forwardRef, useState } from 'react'
import { cx } from 'styled-system/css'
import { datePicker as datePickerRecipe } from 'styled-system/recipes'

import { Calendar } from './calendar'
import { DatetimeInput } from './datetime-input'
import { Popover } from './popover'

import type { InputSize } from './input'

const styles = /* @__PURE__ */ datePickerRecipe()

export interface DatePickerProps {
  /** Selected date (controlled). */
  value?: Date | undefined
  onChange?: (date: Date | undefined) => void
  /** BCP-47 locale for the typed field. */
  locale?: string
  size?: InputSize
  invalid?: boolean
  disabled?: boolean
  className?: string
  /** Accessible label for the typed date field. */
  'aria-label'?: string
  /** Accessible label for the calendar trigger button. */
  calendarLabel?: string
}

export const DatePicker = /* @__PURE__ */ forwardRef<HTMLDivElement, DatePickerProps>(
  function DatePicker(
    {
      value,
      onChange,
      locale,
      size = 'md',
      invalid = false,
      disabled = false,
      className,
      'aria-label': ariaLabel,
      calendarLabel = 'Open calendar',
    },
    ref,
  ) {
    const [open, setOpen] = useState(false)

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Anchor asChild>
          <div className={cx(styles.root, className)}>
            <DatetimeInput
              ref={ref}
              aria-label={ariaLabel}
              disabled={disabled}
              invalid={invalid}
              locale={locale}
              size={size}
              value={value}
              onChange={onChange}
              endSlot={
                <Popover.Trigger asChild>
                  <button
                    type="button"
                    aria-label={calendarLabel}
                    disabled={disabled}
                    className={styles.trigger}
                  >
                    <CalendarIcon size={16} aria-hidden />
                  </button>
                </Popover.Trigger>
              }
            />
          </div>
        </Popover.Anchor>
        <Popover.Content align="start" className={styles.content}>
          <Calendar
            mode="single"
            {...(value === undefined ? {} : { selected: value, defaultMonth: value })}
            onSelect={(date) => {
              onChange?.(date)
              setOpen(false)
            }}
          />
        </Popover.Content>
      </Popover.Root>
    )
  },
)
