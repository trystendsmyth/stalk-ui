'use client'

import { forwardRef, useEffect, useId, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { tour as tourRecipe } from 'styled-system/recipes'

import { Button } from './button'

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

const styles = /* @__PURE__ */ tourRecipe()

export interface TourStep {
  /** CSS selector for the element this step spotlights. */
  target: string
  title: ReactNode
  description?: ReactNode
}

export interface TourProps extends HTMLAttributes<HTMLDivElement> {
  steps: readonly TourStep[]
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Active step index (controlled); uncontrolled when omitted. */
  step?: number
  onStepChange?: (step: number) => void
  nextLabel?: string
  previousLabel?: string
  skipLabel?: string
  doneLabel?: string
}

const SPOTLIGHT_PADDING = 6
const CARD_GAP = 10

interface Rect {
  height: number
  left: number
  top: number
  width: number
}

const rectFor = (selector: string): Rect | undefined => {
  const element = document.querySelector(selector)
  if (element === null) {
    return undefined
  }
  const { height, left, top, width } = element.getBoundingClientRect()
  return { height, left, top, width }
}

/**
 * Lightweight guided tour: spotlights each step's target (fixed overlay with a
 * cut-out shadow) and renders a step card beside it with next/back/skip.
 * Dependency-free; targets are plain CSS selectors so it works over any DOM.
 */
export const Tour = /* @__PURE__ */ forwardRef<HTMLDivElement, TourProps>(function Tour(
  {
    className,
    doneLabel = 'Done',
    nextLabel = 'Next',
    onOpenChange,
    onStepChange,
    open,
    previousLabel = 'Back',
    skipLabel = 'Skip',
    step,
    steps,
    ...props
  },
  ref,
) {
  const titleId = useId()
  const descriptionId = useId()
  const [internalStep, setInternalStep] = useState(0)
  const current = step ?? internalStep
  const activeStep = steps[current]
  const [rect, setRect] = useState<Rect | undefined>(undefined)

  const goTo = (next: number) => {
    setInternalStep(next)
    onStepChange?.(next)
  }

  const close = () => {
    onOpenChange(false)
    goTo(0)
  }

  useLayoutEffect(() => {
    if (!open || activeStep === undefined) {
      return
    }

    const update = () => {
      setRect(rectFor(activeStep.target))
    }

    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
    }
  }, [open, activeStep])

  useEffect(() => {
    if (!open) {
      return
    }

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- close is stable per render intent
  }, [open])

  if (!open || activeStep === undefined || typeof document === 'undefined') {
    return null
  }

  const spotlightStyle: CSSProperties | undefined =
    rect === undefined
      ? undefined
      : {
          height: rect.height + SPOTLIGHT_PADDING * 2,
          left: rect.left - SPOTLIGHT_PADDING,
          top: rect.top - SPOTLIGHT_PADDING,
          width: rect.width + SPOTLIGHT_PADDING * 2,
        }

  // Below the target, clamped to the viewport; centered fallback without a rect.
  const cardStyle: CSSProperties =
    rect === undefined
      ? { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }
      : {
          left: Math.max(CARD_GAP, Math.min(rect.left, window.innerWidth - 320 - CARD_GAP)),
          top: rect.top + rect.height + SPOTLIGHT_PADDING + CARD_GAP,
        }

  const last = current === steps.length - 1

  return createPortal(
    <div ref={ref} className={className} {...props}>
      {spotlightStyle !== undefined ? (
        <div aria-hidden className={styles.spotlight} style={spotlightStyle} />
      ) : null}
      <div
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        aria-describedby={activeStep.description === undefined ? undefined : descriptionId}
        className={styles.content}
        style={cardStyle}
      >
        <p className={styles.title} id={titleId}>
          {activeStep.title}
        </p>
        {activeStep.description !== undefined ? (
          <p className={styles.description} id={descriptionId}>
            {activeStep.description}
          </p>
        ) : null}
        <div className={styles.footer}>
          <span className={styles.counter}>
            {current + 1} / {steps.length}
          </span>
          <div className={styles.actions}>
            <Button size="sm" variant="ghost" onClick={close}>
              {skipLabel}
            </Button>
            {current > 0 ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  goTo(current - 1)
                }}
              >
                {previousLabel}
              </Button>
            ) : null}
            <Button
              size="sm"
              onClick={() => {
                if (last) {
                  close()
                } else {
                  goTo(current + 1)
                }
              }}
            >
              {last ? doneLabel : nextLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
})
