import { CalendarIcon } from 'lucide-react'
import { forwardRef, useState } from 'react'
import { cx } from 'styled-system/css'
import { datePicker as datePickerRecipe, input as inputRecipe } from 'styled-system/recipes'

import { Calendar } from './calendar'
import { DatetimeInput } from './datetime-input'
import { Popover } from './popover'

import type { InputSize } from './input'
import type { Ref } from 'react'
import type { DateRange } from 'react-day-picker'

const styles = /* @__PURE__ */ datePickerRecipe()

export type { DateRange } from 'react-day-picker'

/** A quick range ("Last 7 days") rendered beside the range calendar. */
export interface DatePickerPreset {
  label: string
  range: DateRange
}

/** A quick date ("Today", "Tomorrow") rendered beside the single calendar. */
export interface DatePickerSinglePreset {
  label: string
  date: Date
}

interface DatePickerBaseProps {
  /** BCP-47 locale for the typed field / formatted range. */
  locale?: string
  size?: InputSize
  invalid?: boolean
  disabled?: boolean
  className?: string
  /** Accessible label for the date field. */
  'aria-label'?: string
  /** Accessible label for the calendar trigger button. */
  calendarLabel?: string
}

export interface DatePickerSingleProps extends DatePickerBaseProps {
  mode?: 'single'
  /** Selected date (controlled). */
  value?: Date | undefined
  onChange?: (date: Date | undefined) => void
  /** Quick dates rendered in a rail beside the calendar. */
  presets?: readonly DatePickerSinglePreset[]
}

export interface DatePickerRangeProps extends DatePickerBaseProps {
  mode: 'range'
  /** Selected range (controlled). */
  value?: DateRange | undefined
  onChange?: (range: DateRange | undefined) => void
  /** Quick ranges rendered in a rail beside the calendar. */
  presets?: readonly DatePickerPreset[]
  /** Months shown side by side (default 2). */
  numberOfMonths?: number
  /** Placeholder when no range is selected. */
  placeholder?: string
}

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps

const formatRange = (range: DateRange | undefined, locale?: string) => {
  if (range?.from === undefined) {
    return undefined
  }

  const format = new Intl.DateTimeFormat(locale, { dateStyle: 'medium' })

  return range.to === undefined
    ? format.format(range.from)
    : `${format.format(range.from)} – ${format.format(range.to)}`
}

const SingleDatePicker = /* @__PURE__ */ forwardRef<HTMLDivElement, DatePickerSingleProps>(
  function SingleDatePicker(
    {
      value,
      onChange,
      presets,
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
          <div className={styles.panel}>
            {presets !== undefined && presets.length > 0 ? (
              <div className={styles.presets}>
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    className={styles.preset}
                    onClick={() => {
                      onChange?.(preset.date)
                      setOpen(false)
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            ) : null}
            <Calendar
              mode="single"
              {...(value === undefined ? {} : { selected: value, defaultMonth: value })}
              onSelect={(date) => {
                onChange?.(date)
                setOpen(false)
              }}
            />
          </div>
        </Popover.Content>
      </Popover.Root>
    )
  },
)

const RangeDatePicker = /* @__PURE__ */ forwardRef<HTMLButtonElement, DatePickerRangeProps>(
  function RangeDatePicker(
    {
      value,
      onChange,
      presets,
      numberOfMonths = 2,
      locale,
      size = 'md',
      invalid = false,
      disabled = false,
      className,
      'aria-label': ariaLabel,
      placeholder = 'Pick a date range',
    },
    ref,
  ) {
    const [open, setOpen] = useState(false)
    const inputStyles = inputRecipe({ disabled, invalid, size })
    const formatted = formatRange(value, locale)

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            ref={ref}
            type="button"
            aria-label={ariaLabel}
            disabled={disabled}
            className={cx(inputStyles.root, styles.rangeField, className)}
          >
            <CalendarIcon size={16} aria-hidden />
            <span
              className={styles.rangeValue}
              data-placeholder={formatted === undefined ? '' : undefined}
            >
              {formatted ?? placeholder}
            </span>
          </button>
        </Popover.Trigger>
        <Popover.Content align="start" className={styles.content}>
          <div className={styles.panel}>
            {presets !== undefined && presets.length > 0 ? (
              <div className={styles.presets}>
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    className={styles.preset}
                    onClick={() => {
                      onChange?.(preset.range)
                      setOpen(false)
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            ) : null}
            <Calendar
              mode="range"
              numberOfMonths={numberOfMonths}
              {...(value === undefined
                ? {}
                : {
                    selected: value,
                    ...(value.from === undefined ? {} : { defaultMonth: value.from }),
                  })}
              onSelect={(range) => {
                onChange?.(range)

                if (range?.from !== undefined && range.to !== undefined) {
                  setOpen(false)
                }
              }}
            />
          </div>
        </Popover.Content>
      </Popover.Root>
    )
  },
)

export const DatePicker = /* @__PURE__ */ forwardRef<HTMLDivElement, DatePickerProps>(
  function DatePicker(props, ref) {
    if (props.mode === 'range') {
      const { mode: _mode, ...rest } = props
      return <RangeDatePicker ref={ref as Ref<HTMLButtonElement>} mode="range" {...rest} />
    }

    const { mode: _mode, ...rest } = props
    return <SingleDatePicker ref={ref} {...rest} />
  },
)
