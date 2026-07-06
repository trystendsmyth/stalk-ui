'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import { forwardRef, useRef, useState } from 'react'
import { cx } from 'styled-system/css'
import { slider as sliderRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef, KeyboardEvent, PointerEvent } from 'react'

export type SliderShape = 'linear' | 'circular'

export type SliderProps = ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
  /**
   * Accessible label for each thumb, index-matched. Use on multi-thumb (range)
   * sliders so every thumb has a distinct name — e.g. `['Minimum', 'Maximum']`.
   */
  thumbLabels?: string[]
  /** Geometry: linear track (default) or a circular knob. Circular is single-value only. */
  shape?: SliderShape
  /** Render the current value in the center of a circular knob. */
  showValue?: boolean
  /** Format the circular knob's centered read-out (default: the raw value). */
  formatValue?: (value: number, max: number) => string
}

// Fixed 100-unit viewBox shared with the circular Progress gauge: stroke
// geometry is constant and the rendered size is pure CSS.
const CIRCLE_CENTER = 50
const CIRCLE_RADIUS = 42
const CIRCLE_STROKE_WIDTH = 10
const CIRCLE_THUMB_RADIUS = 8
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS
// 270° arc with the gap at the bottom, rotary-knob style: min at 7:30, max at 4:30.
const ARC_START_DEG = 135
const ARC_SWEEP_DEG = 270
const ARC_LENGTH = (ARC_SWEEP_DEG / 360) * CIRCLE_CIRCUMFERENCE

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const snapToStep = (raw: number, min: number, max: number, step: number) => {
  const snapped = min + Math.round((raw - min) / step) * step
  // Trim float noise from fractional steps (e.g. 0.30000000000000004).
  return clamp(Math.round(snapped * 1e6) / 1e6, min, max)
}

// Explicit `| undefined` so the linear Slider can forward its (possibly
// undefined) destructured props under exactOptionalPropertyTypes.
interface CircularSliderProps {
  'aria-label'?: string | undefined
  'aria-labelledby'?: string | undefined
  className?: string | undefined
  defaultValue?: number[] | undefined
  disabled?: boolean | undefined
  formatValue?: ((value: number, max: number) => string) | undefined
  max?: number | undefined
  min?: number | undefined
  onValueChange?: ((value: number[]) => void) | undefined
  onValueCommit?: ((value: number[]) => void) | undefined
  showValue?: boolean | undefined
  step?: number | undefined
  thumbLabels?: string[] | undefined
  value?: number[] | undefined
}

const CircularSlider = /* @__PURE__ */ forwardRef<HTMLSpanElement, CircularSliderProps>(
  function CircularSlider(
    {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      className,
      defaultValue,
      disabled = false,
      formatValue,
      max = 100,
      min = 0,
      onValueChange,
      onValueCommit,
      showValue = false,
      step = 1,
      thumbLabels,
      value,
    },
    ref,
  ) {
    const styles = sliderRecipe()
    const [internal, setInternal] = useState(defaultValue?.[0] ?? min)
    const current = clamp(value?.[0] ?? internal, min, max)
    const draggingRef = useRef(false)

    const setValue = (next: number) => {
      if (next !== current) {
        setInternal(next)
        onValueChange?.([next])
      }
    }

    const valueFromPointer = (event: PointerEvent<HTMLSpanElement>) => {
      const rect = event.currentTarget.getBoundingClientRect()
      const x = event.clientX - (rect.left + rect.width / 2)
      const y = event.clientY - (rect.top + rect.height / 2)
      // 0° at 3 o'clock, then re-based so 0 sits at the arc start.
      const deg = (Math.atan2(y, x) * 180) / Math.PI
      const rel = (deg - ARC_START_DEG + 360) % 360
      // Pointers in the bottom gap snap to the nearer end stop.
      const arc =
        rel > ARC_SWEEP_DEG
          ? rel < ARC_SWEEP_DEG + (360 - ARC_SWEEP_DEG) / 2
            ? ARC_SWEEP_DEG
            : 0
          : rel
      return snapToStep(min + (arc / ARC_SWEEP_DEG) * (max - min), min, max, step)
    }

    const onPointerDown = (event: PointerEvent<HTMLSpanElement>) => {
      if (disabled) {
        return
      }
      draggingRef.current = true
      event.currentTarget.setPointerCapture(event.pointerId)
      event.currentTarget.focus()
      setValue(valueFromPointer(event))
    }

    const onPointerMove = (event: PointerEvent<HTMLSpanElement>) => {
      if (draggingRef.current) {
        setValue(valueFromPointer(event))
      }
    }

    const onPointerUp = () => {
      if (draggingRef.current) {
        draggingRef.current = false
        onValueCommit?.([current])
      }
    }

    const onKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
      if (disabled) {
        return
      }
      const deltas: Record<string, number> = {
        ArrowDown: -step,
        ArrowLeft: -step,
        ArrowRight: step,
        ArrowUp: step,
        PageDown: -step * 10,
        PageUp: step * 10,
      }
      let next: number | undefined
      if (event.key in deltas) {
        next = snapToStep(current + (deltas[event.key] ?? 0), min, max, step)
      } else if (event.key === 'Home') {
        next = min
      } else if (event.key === 'End') {
        next = max
      }
      if (next === undefined) {
        return
      }
      event.preventDefault()
      setValue(next)
      onValueCommit?.([next])
    }

    const fraction = max > min ? (current - min) / (max - min) : 0
    const thumbAngle = ((ARC_START_DEG + fraction * ARC_SWEEP_DEG) * Math.PI) / 180
    const thumbX = CIRCLE_CENTER + CIRCLE_RADIUS * Math.cos(thumbAngle)
    const thumbY = CIRCLE_CENTER + CIRCLE_RADIUS * Math.sin(thumbAngle)

    return (
      <span
        ref={ref}
        aria-disabled={disabled ? true : undefined}
        aria-label={thumbLabels?.[0] ?? ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={current}
        className={cx(styles.circleRoot, className)}
        data-disabled={disabled ? '' : undefined}
        role="slider"
        // Focusable even when disabled (discoverable but inert; handlers no-op).
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <svg aria-hidden className={styles.circle} viewBox="0 0 100 100">
          <circle
            className={styles.circleTrack}
            cx={CIRCLE_CENTER}
            cy={CIRCLE_CENTER}
            r={CIRCLE_RADIUS}
            strokeDasharray={`${String(ARC_LENGTH)} ${String(CIRCLE_CIRCUMFERENCE)}`}
            strokeWidth={CIRCLE_STROKE_WIDTH}
            transform={`rotate(${String(ARC_START_DEG)} ${String(CIRCLE_CENTER)} ${String(CIRCLE_CENTER)})`}
          />
          <circle
            className={styles.circleRange}
            cx={CIRCLE_CENTER}
            cy={CIRCLE_CENTER}
            r={CIRCLE_RADIUS}
            strokeDasharray={`${String(fraction * ARC_LENGTH)} ${String(CIRCLE_CIRCUMFERENCE)}`}
            strokeWidth={CIRCLE_STROKE_WIDTH}
            transform={`rotate(${String(ARC_START_DEG)} ${String(CIRCLE_CENTER)} ${String(CIRCLE_CENTER)})`}
          />
          <circle className={styles.circleThumb} cx={thumbX} cy={thumbY} r={CIRCLE_THUMB_RADIUS} />
          {showValue ? (
            <text
              className={styles.valueText}
              dominantBaseline="central"
              textAnchor="middle"
              x={CIRCLE_CENTER}
              y={CIRCLE_CENTER}
            >
              {formatValue === undefined ? String(current) : formatValue(current, max)}
            </text>
          ) : null}
        </svg>
      </span>
    )
  },
)

export const Slider = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof SliderPrimitive.Root>,
  SliderProps
>(function Slider(
  {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    className,
    formatValue,
    max = 100,
    min = 0,
    shape = 'linear',
    showValue,
    step = 1,
    thumbLabels,
    ...props
  },
  ref,
) {
  if (shape === 'circular') {
    return (
      <CircularSlider
        ref={ref}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={className}
        formatValue={formatValue}
        max={max}
        min={min}
        showValue={showValue}
        step={step}
        thumbLabels={thumbLabels}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        value={props.value}
        onValueChange={props.onValueChange}
        onValueCommit={props.onValueCommit}
      />
    )
  }

  const styles = sliderRecipe()
  const resolved = props.value ?? props.defaultValue ?? [min]
  const thumbCount = Math.max(resolved.length, 1)

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cx(styles.root, className)}
      max={max}
      min={min}
      step={step}
      {...props}
    >
      <SliderPrimitive.Track className={styles.track}>
        <SliderPrimitive.Range className={styles.range} />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbCount }, (_, index) => {
        // Every thumb needs its own accessible name. A single-thumb slider inherits
        // the root aria-label/labelledby; multi-thumb (range) sliders use
        // `thumbLabels` (index-matched) and fall back to a numbered default so no
        // thumb is ever left unnamed.
        const explicitLabel = thumbLabels?.[index]
        const isSingle = thumbCount === 1
        return (
          <SliderPrimitive.Thumb
            key={index}
            aria-label={explicitLabel ?? (isSingle ? ariaLabel : `Value ${String(index + 1)}`)}
            aria-labelledby={explicitLabel === undefined && isSingle ? ariaLabelledBy : undefined}
            className={styles.thumb}
          />
        )
      })}
    </SliderPrimitive.Root>
  )
})
