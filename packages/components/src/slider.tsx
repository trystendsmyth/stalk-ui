import * as SliderPrimitive from '@radix-ui/react-slider'
import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { slider as sliderRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef } from 'react'

export type SliderProps = ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
  /**
   * Accessible label for each thumb, index-matched. Use on multi-thumb (range)
   * sliders so every thumb has a distinct name — e.g. `['Minimum', 'Maximum']`.
   */
  thumbLabels?: string[]
}

export const Slider = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof SliderPrimitive.Root>,
  SliderProps
>(function Slider(
  {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    className,
    max = 100,
    min = 0,
    step = 1,
    thumbLabels,
    ...props
  },
  ref,
) {
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
