import { Fragment, forwardRef, useEffect, useMemo, useRef } from 'react'
import { css, cx } from 'styled-system/css'
import { input as inputRecipe } from 'styled-system/recipes'

import type { InputSize } from './input'
import type { KeyboardEvent, ReactNode } from 'react'

export type DatetimeInputMode = 'date' | 'time' | 'datetime'

type SegmentKey = 'day' | 'month' | 'year' | 'hour' | 'minute'

interface Segment {
  key: SegmentKey
  length: number
  placeholder: string
  label: string
  min: number
  max: number
  /** Separator rendered before this segment (empty for the first). */
  separator: string
}

const SEGMENT_META: Record<
  SegmentKey,
  { length: number; placeholder: string; label: string; min: number; max: number }
> = {
  month: { length: 2, placeholder: 'MM', label: 'Month', min: 1, max: 12 },
  day: { length: 2, placeholder: 'DD', label: 'Day', min: 1, max: 31 },
  year: { length: 4, placeholder: 'YYYY', label: 'Year', min: 1, max: 9999 },
  hour: { length: 2, placeholder: 'HH', label: 'Hour', min: 0, max: 23 },
  minute: { length: 2, placeholder: 'mm', label: 'Minute', min: 0, max: 59 },
}

// A fixed sample with distinct day/month/year so `formatToParts` reveals the
// locale's field order regardless of the current date.
const SAMPLE_DATE = new Date(2023, 10, 25)

const dateFieldOrder = (locale: string | undefined): SegmentKey[] =>
  new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit', year: 'numeric' })
    .formatToParts(SAMPLE_DATE)
    .filter(
      (part): part is { type: 'day' | 'month' | 'year'; value: string } =>
        part.type === 'day' || part.type === 'month' || part.type === 'year',
    )
    .map((part) => part.type)

const buildSegments = (mode: DatetimeInputMode, locale: string | undefined): Segment[] => {
  const segments: Segment[] = []
  const push = (key: SegmentKey, separator: string) => {
    segments.push({ key, separator, ...SEGMENT_META[key] })
  }

  if (mode === 'date' || mode === 'datetime') {
    dateFieldOrder(locale).forEach((key, index) => {
      push(key, index === 0 ? '' : '/')
    })
  }
  if (mode === 'time' || mode === 'datetime') {
    push('hour', segments.length > 0 ? ' ' : '')
    push('minute', ':')
  }
  return segments
}

type SegmentValues = Partial<Record<SegmentKey, string>>

const valuesFromDate = (date: Date, segments: Segment[]): SegmentValues => {
  const map: Record<SegmentKey, number> = {
    month: date.getMonth() + 1,
    day: date.getDate(),
    year: date.getFullYear(),
    hour: date.getHours(),
    minute: date.getMinutes(),
  }
  return Object.fromEntries(
    segments.map((segment) => [
      segment.key,
      String(map[segment.key]).padStart(segment.length, '0'),
    ]),
  )
}

// Combine the typed segments into a Date, or `undefined` while any required
// segment is empty / the year is incomplete / the date is out of range.
const toDate = (values: SegmentValues, segments: Segment[]): Date | undefined => {
  for (const segment of segments) {
    const raw = values[segment.key] ?? ''
    if (raw === '') return undefined
    if (segment.key === 'year' && raw.length < 4) return undefined
  }

  const read = (key: SegmentKey, fallback: number) => {
    const raw = values[key]
    return raw === undefined || raw === '' ? fallback : Number(raw)
  }

  const now = new Date()
  const year = read('year', now.getFullYear())
  const monthIndex = read('month', 1) - 1
  const day = read('day', 1)
  const hour = read('hour', 0)
  const minute = read('minute', 0)
  const date = new Date(year, monthIndex, day, hour, minute)

  if (values.year !== undefined && date.getFullYear() !== year) return undefined
  if (values.month !== undefined && date.getMonth() !== monthIndex) return undefined
  if (values.day !== undefined && date.getDate() !== day) return undefined
  if (values.hour !== undefined && date.getHours() !== hour) return undefined
  if (values.minute !== undefined && date.getMinutes() !== minute) return undefined
  return date
}

// Advance to the next segment once it is full, or once another digit could only
// overflow the segment's max (e.g. month "2" can't become "2x" ≤ 12).
const isComplete = (segment: Segment, value: string): boolean =>
  value.length >= segment.length ||
  (value.length > 0 && segment.key !== 'year' && Number(value) * 10 > segment.max)

const wrap = (value: number, min: number, max: number): number => {
  const range = max - min + 1
  return ((((value - min) % range) + range) % range) + min
}

const segmentInputClass = css({
  appearance: 'none',
  bgColor: 'transparent',
  border: 'none',
  boxSizing: 'border-box',
  color: 'inherit',
  flexShrink: '0',
  font: 'inherit',
  minW: '0',
  outline: 'none',
  p: '0',
  textAlign: 'center',
  _placeholder: { color: 'fg.muted' },
  _disabled: { cursor: 'not-allowed' },
})

// `white-space: pre` keeps the space separator (between date and time) from
// collapsing between the inline segment inputs.
const separatorClass = css({
  color: 'fg.muted',
  flexShrink: '0',
  userSelect: 'none',
  whiteSpace: 'pre',
})

const fieldRowClass = css({
  alignItems: 'center',
  display: 'flex',
  flex: '1 1 auto',
  minW: '0',
})

export interface DatetimeInputProps {
  /** Selected value (controlled). In `time` mode only the time portion is meaningful. */
  value?: Date | undefined
  /** Called with the parsed value, or `undefined` while it is incomplete/invalid. */
  onChange?: ((date: Date | undefined) => void) | undefined
  /** Which fields to collect: a date, a time, or both. Defaults to `date`. */
  mode?: DatetimeInputMode | undefined
  /** BCP-47 locale controlling date field order (defaults to the runtime locale). */
  locale?: string | undefined
  size?: InputSize
  invalid?: boolean
  disabled?: boolean
  className?: string
  id?: string
  /** Accessible name for the whole field. */
  'aria-label'?: string | undefined
  'aria-describedby'?: string
  /** Trailing content rendered inside the field (e.g. a calendar trigger). */
  endSlot?: ReactNode
}

export const DatetimeInput = /* @__PURE__ */ forwardRef<HTMLDivElement, DatetimeInputProps>(
  function DatetimeInput(
    {
      value,
      onChange,
      mode = 'date',
      locale,
      size = 'md',
      invalid = false,
      disabled = false,
      className,
      endSlot,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      id,
    },
    ref,
  ) {
    const segments = useMemo(() => buildSegments(mode, locale), [mode, locale])
    const styles = useMemo(
      () => inputRecipe({ size, invalid, disabled }),
      [size, invalid, disabled],
    )

    // Segment inputs are uncontrolled (DOM-owned); we sync them from `value`
    // only on external changes. This keeps masked typing stable instead of
    // fighting a controlled re-render on every keystroke.
    const inputsRef = useRef<(HTMLInputElement | null)[]>([])
    const lastEmitted = useRef<number | null>(value ? value.getTime() : null)

    const readValues = (): SegmentValues =>
      Object.fromEntries(
        segments.map((segment, index) => [segment.key, inputsRef.current[index]?.value ?? '']),
      )

    const emit = () => {
      const parsed = toDate(readValues(), segments)
      lastEmitted.current = parsed ? parsed.getTime() : null
      onChange?.(parsed)
    }

    const focusSegment = (index: number) => {
      const node = inputsRef.current[index]
      if (node) {
        node.focus()
        node.select()
      }
    }

    // Push an external value change (e.g. a calendar selection) into the DOM
    // inputs without clobbering in-progress typing.
    useEffect(() => {
      const next = value ? value.getTime() : null
      if (next === lastEmitted.current) return
      lastEmitted.current = next
      const nextValues = value ? valuesFromDate(value, segments) : undefined
      segments.forEach((segment, index) => {
        const node = inputsRef.current[index]
        if (node) node.value = nextValues?.[segment.key] ?? ''
      })
    }, [value, segments])

    const handleInput = (index: number) => () => {
      const segment = segments[index]
      const input = inputsRef.current[index]
      if (segment === undefined || input === null || input === undefined) return
      let clean = input.value.replace(/\D/g, '').slice(0, segment.length)
      // Clamp out-of-range entries (year excepted — its range is wide and a short
      // year is normalized on blur). e.g. day "39" -> "31", month "00" -> "01".
      if (clean !== '' && segment.key !== 'year') {
        const numeric = Number(clean)
        if (numeric > segment.max) {
          clean = String(segment.max)
        } else if (clean.length === segment.length && numeric < segment.min) {
          clean = String(segment.min).padStart(segment.length, '0')
        }
      }
      if (input.value !== clean) input.value = clean
      emit()
      if (isComplete(segment, clean) && index < segments.length - 1) {
        focusSegment(index + 1)
      }
    }

    const handleKeyDown = (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
      const segment = segments[index]
      const input = event.currentTarget
      if (segment === undefined) return

      if (event.key === 'ArrowLeft' && input.selectionStart === 0 && index > 0) {
        event.preventDefault()
        focusSegment(index - 1)
      } else if (
        event.key === 'ArrowRight' &&
        input.selectionStart === input.value.length &&
        index < segments.length - 1
      ) {
        event.preventDefault()
        focusSegment(index + 1)
      } else if (event.key === 'Backspace' && input.value === '' && index > 0) {
        event.preventDefault()
        focusSegment(index - 1)
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault()
        const delta = event.key === 'ArrowUp' ? 1 : -1
        const current = input.value
        let next: number
        if (segment.key === 'year') {
          const base = current === '' ? new Date().getFullYear() - delta : Number(current)
          next = Math.min(segment.max, Math.max(segment.min, base + delta))
        } else {
          const base =
            current === '' ? (delta > 0 ? segment.min - 1 : segment.max + 1) : Number(current)
          next = wrap(base + delta, segment.min, segment.max)
        }
        input.value = String(next).padStart(segment.length, '0')
        input.select()
        emit()
      }
    }

    const handleSegmentBlur = (index: number) => () => {
      const segment = segments[index]
      const input = inputsRef.current[index]
      if (segment === undefined || input === null || input === undefined) return
      const raw = input.value
      if (raw === '' || raw.length >= segment.length) return

      // Normalize a partial draft; never clear it.
      if (segment.key === 'year') {
        // A 1–2 digit year expands into the 2000s (e.g. "24" -> "2024"); a JS
        // Date built from a <100 year would otherwise resolve to the 1900s.
        if (raw.length <= 2) {
          input.value = String(2000 + Number(raw)).padStart(4, '0')
          emit()
        }
        return
      }
      // Pad a partial 2-digit segment (e.g. "2" -> "02").
      input.value = raw.padStart(segment.length, '0')
      emit()
    }

    const initialValues = value ? valuesFromDate(value, segments) : undefined

    return (
      <div
        ref={ref}
        role="group"
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-disabled={disabled || undefined}
        id={id}
        className={cx(styles.root, className)}
        data-disabled={disabled ? '' : undefined}
        data-invalid={invalid ? '' : undefined}
      >
        <div className={fieldRowClass}>
          {segments.map((segment, index) => (
            <Fragment key={`${mode}-${segment.key}`}>
              {segment.separator === '' ? null : (
                <span aria-hidden className={separatorClass}>
                  {segment.separator}
                </span>
              )}
              <input
                ref={(node) => {
                  inputsRef.current[index] = node
                }}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                disabled={disabled}
                aria-label={segment.label}
                aria-invalid={invalid || undefined}
                placeholder={segment.placeholder}
                defaultValue={initialValues?.[segment.key] ?? ''}
                maxLength={segment.length}
                // `size` is in average char widths; add a column so wide-letter
                // placeholders (MM/mm/HH) are not clipped.
                size={segment.length + 1}
                className={segmentInputClass}
                onInput={handleInput(index)}
                onKeyDown={handleKeyDown(index)}
                onFocus={(event) => {
                  event.currentTarget.select()
                }}
                onBlur={handleSegmentBlur(index)}
              />
            </Fragment>
          ))}
        </div>
        {endSlot === undefined ? null : <span className={styles.slot}>{endSlot}</span>}
      </div>
    )
  },
)
