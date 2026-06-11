import { forwardRef, useState } from 'react'
import { timePicker as timePickerRecipe } from 'styled-system/recipes'

import { Select } from './select'

import type { SelectSize } from './select'

const styles = /* @__PURE__ */ timePickerRecipe()

const pad = (value: number): string => String(value).padStart(2, '0')

const parseTime = (value: string | undefined): { hours?: number; minutes?: number } => {
  if (value === undefined || value === '') return {}
  const parts = value.split(':')
  const hours = Number(parts[0])
  const minutes = Number(parts[1])
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return {}
  return { hours, minutes }
}

const to24Hour = (hour12: number, period: 'AM' | 'PM'): number => {
  const base = hour12 % 12
  return period === 'PM' ? base + 12 : base
}

const range = (count: number, step = 1): number[] =>
  Array.from({ length: Math.ceil(count / step) }, (_, index) => index * step)

export interface TimePickerProps {
  /** Time as a 24-hour `HH:mm` string (controlled). */
  value?: string
  /** Called with the updated 24-hour `HH:mm` string. */
  onChange?: (value: string) => void
  /** Display the hours as a 12-hour clock with an AM/PM selector (default `'12'`). */
  hourCycle?: '12' | '24'
  /** Granularity of the minutes options in minutes (default `1`). */
  minuteStep?: number
  size?: SelectSize
  disabled?: boolean
  className?: string
  hourLabel?: string
  minuteLabel?: string
  periodLabel?: string
}

export const TimePicker = /* @__PURE__ */ forwardRef<HTMLDivElement, TimePickerProps>(
  function TimePicker(
    {
      value,
      onChange,
      hourCycle = '12',
      minuteStep = 1,
      size = 'md',
      disabled = false,
      className,
      hourLabel = 'Hours',
      minuteLabel = 'Minutes',
      periodLabel = 'AM/PM',
    },
    ref,
  ) {
    // Support both controlled (`value` provided) and uncontrolled usage.
    const [internalValue, setInternalValue] = useState('')
    const isControlled = value !== undefined
    const currentValue = isControlled ? value : internalValue

    const { hours, minutes } = parseTime(currentValue)
    const is12 = hourCycle === '12'
    const period: 'AM' | 'PM' = hours !== undefined && hours >= 12 ? 'PM' : 'AM'
    const currentHours = hours ?? 0
    const currentMinutes = minutes ?? 0

    const emit = (nextHours: number, nextMinutes: number) => {
      const next = `${pad(nextHours)}:${pad(nextMinutes)}`
      if (!isControlled) setInternalValue(next)
      onChange?.(next)
    }

    const hourOptions = is12 ? range(12).map((index) => index + 1) : range(24)
    const minuteOptions = range(60, minuteStep)

    const hourValue =
      hours === undefined ? undefined : is12 ? String(currentHours % 12 || 12) : pad(currentHours)
    const minuteValue = minutes === undefined ? undefined : pad(currentMinutes)

    return (
      <div ref={ref} className={className ? `${styles.root} ${className}` : styles.root}>
        <Select.Root
          disabled={disabled}
          {...(hourValue === undefined ? {} : { value: hourValue })}
          onValueChange={(next) => {
            const hour = Number(next)
            emit(is12 ? to24Hour(hour, period) : hour, currentMinutes)
          }}
        >
          <Select.Trigger aria-label={hourLabel} size={size}>
            <Select.Value placeholder="HH" />
          </Select.Trigger>
          <Select.Content style={{ maxHeight: '14rem' }}>
            {hourOptions.map((hour) => (
              <Select.Item key={hour} value={is12 ? String(hour) : pad(hour)}>
                {is12 ? String(hour) : pad(hour)}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
        <span className={styles.separator}>:</span>
        <Select.Root
          disabled={disabled}
          {...(minuteValue === undefined ? {} : { value: minuteValue })}
          onValueChange={(next) => {
            emit(currentHours, Number(next))
          }}
        >
          <Select.Trigger aria-label={minuteLabel} size={size}>
            <Select.Value placeholder="MM" />
          </Select.Trigger>
          <Select.Content style={{ maxHeight: '14rem' }}>
            {minuteOptions.map((minute) => (
              <Select.Item key={minute} value={pad(minute)}>
                {pad(minute)}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
        {is12 ? (
          <Select.Root
            disabled={disabled}
            {...(hours === undefined ? {} : { value: period })}
            onValueChange={(next) => {
              const hour12 = currentHours % 12 || 12
              emit(to24Hour(hour12, next as 'AM' | 'PM'), currentMinutes)
            }}
          >
            <Select.Trigger aria-label={periodLabel} size={size}>
              <Select.Value placeholder="--" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="AM">AM</Select.Item>
              <Select.Item value="PM">PM</Select.Item>
            </Select.Content>
          </Select.Root>
        ) : null}
      </div>
    )
  },
)
