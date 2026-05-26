import * as SliderPrimitive from '@radix-ui/react-slider'
import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { slider as sliderRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef } from 'react'

export type SliderProps = ComponentPropsWithoutRef<typeof SliderPrimitive.Root>

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
      {Array.from({ length: thumbCount }, (_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          aria-label={thumbCount === 1 ? ariaLabel : undefined}
          aria-labelledby={thumbCount === 1 ? ariaLabelledBy : undefined}
          className={styles.thumb}
        />
      ))}
    </SliderPrimitive.Root>
  )
})
