import { Check } from 'lucide-react'
import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { steps as stepsRecipe } from 'styled-system/recipes'

import type { HTMLAttributes, ReactNode } from 'react'

export type StepsOrientation = (typeof stepsRecipe.variantMap.orientation)[number]
export type StepState = 'complete' | 'current' | 'upcoming'

export interface Step {
  title: ReactNode
  description?: ReactNode
}

export interface StepsProps extends HTMLAttributes<HTMLOListElement> {
  steps: readonly Step[]
  /** Zero-based index of the active step (steps before it render complete). */
  current?: number
  orientation?: StepsOrientation
}

const stateFor = (index: number, current: number): StepState =>
  index < current ? 'complete' : index === current ? 'current' : 'upcoming'

export const Steps = /* @__PURE__ */ forwardRef<HTMLOListElement, StepsProps>(function Steps(
  { className, current = 0, orientation = 'horizontal', steps, ...props },
  ref,
) {
  const styles = stepsRecipe({ orientation })

  return (
    <ol ref={ref} className={cx(styles.root, className)} {...props}>
      {steps.map((step, index) => {
        const state = stateFor(index, current)

        return (
          <li
            key={index}
            className={styles.item}
            data-state={state}
            aria-current={state === 'current' ? 'step' : undefined}
          >
            <span className={styles.indicator} aria-hidden="true">
              {state === 'complete' ? <Check size={14} /> : index + 1}
            </span>
            <span className={styles.content}>
              <span className={styles.title}>{step.title}</span>
              {step.description !== undefined ? (
                <span className={styles.description}>{step.description}</span>
              ) : null}
            </span>
            <span className={styles.separator} data-steps-separator aria-hidden="true" />
          </li>
        )
      })}
    </ol>
  )
})

Steps.displayName = 'Steps'
