import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { createContext, forwardRef, useCallback, useContext, useEffect, useState } from 'react'
import { cx } from 'styled-system/css'
import { carousel as carouselRecipe } from 'styled-system/recipes'

import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  KeyboardEvent as ReactKeyboardEvent,
} from 'react'

type UseEmblaParameters = Parameters<typeof useEmblaCarousel>
export type CarouselApi = ReturnType<typeof useEmblaCarousel>[1]
export type CarouselOptions = UseEmblaParameters[0]
export type CarouselPlugin = UseEmblaParameters[1]
export type CarouselOrientation = (typeof carouselRecipe.variantMap.orientation)[number]

interface CarouselContextValue {
  api: CarouselApi
  canScrollNext: boolean
  canScrollPrev: boolean
  emblaRef: ReturnType<typeof useEmblaCarousel>[0]
  orientation: CarouselOrientation
  scrollNext: () => void
  scrollPrev: () => void
  styles: ReturnType<typeof carouselRecipe>
}

const CarouselContext = createContext<CarouselContextValue | null>(null)

function useCarousel(): CarouselContextValue {
  const context = useContext(CarouselContext)
  if (context === null) {
    throw new Error('Carousel parts must be used within <Carousel>.')
  }
  return context
}

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  opts?: CarouselOptions
  orientation?: CarouselOrientation
  plugins?: CarouselPlugin
  /** Receives the Embla API once initialized, for external controls. */
  setApi?: (api: CarouselApi) => void
}

export const CarouselRoot = /* @__PURE__ */ forwardRef<HTMLDivElement, CarouselProps>(
  function CarouselRoot(
    {
      'aria-label': ariaLabel = 'Carousel',
      children,
      className,
      opts,
      orientation = 'horizontal',
      plugins,
      setApi,
      ...props
    },
    ref,
  ) {
    const [emblaRef, api] = useEmblaCarousel(
      { ...opts, axis: orientation === 'horizontal' ? 'x' : 'y' },
      plugins,
    )
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)
    const styles = carouselRecipe({ orientation })

    const onSelect = useCallback((embla: NonNullable<CarouselApi>) => {
      setCanScrollPrev(embla.canScrollPrev())
      setCanScrollNext(embla.canScrollNext())
    }, [])

    const scrollPrev = useCallback(() => api?.scrollPrev(), [api])
    const scrollNext = useCallback(() => api?.scrollNext(), [api])

    const onKeyDown = useCallback(
      (event: ReactKeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === 'ArrowRight') {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext],
    )

    useEffect(() => {
      if (api && setApi) setApi(api)
    }, [api, setApi])

    useEffect(() => {
      if (!api) return
      // One-time sync from the imperative Embla API on mount (Embla's own
      // 'init' has already fired by the time this effect runs). This settles
      // immediately and does not cascade.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      onSelect(api)
      api.on('reInit', onSelect)
      api.on('select', onSelect)
      return () => {
        api.off('reInit', onSelect)
        api.off('select', onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          api,
          canScrollNext,
          canScrollPrev,
          emblaRef,
          orientation,
          scrollNext,
          scrollPrev,
          styles,
        }}
      >
        <div
          ref={ref}
          aria-label={ariaLabel}
          aria-roledescription="carousel"
          className={cx(styles.root, className)}
          role="region"
          onKeyDownCapture={onKeyDown}
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  },
)

export const CarouselContent = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function CarouselContent({ className, ...props }, ref) {
  const { emblaRef, styles } = useCarousel()
  return (
    <div ref={emblaRef} className={styles.viewport}>
      <div ref={ref} className={cx(styles.content, className)} {...props} />
    </div>
  )
})

export const CarouselItem = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function CarouselItem({ className, ...props }, ref) {
  const { styles } = useCarousel()
  return (
    <div
      ref={ref}
      aria-roledescription="slide"
      className={cx(styles.item, className)}
      role="group"
      {...props}
    />
  )
})

export const CarouselPrevious = /* @__PURE__ */ forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function CarouselPrevious(
  { 'aria-label': ariaLabel = 'Previous slide', className, ...props },
  ref,
) {
  const { canScrollPrev, scrollPrev, styles } = useCarousel()
  return (
    <button
      ref={ref}
      aria-label={ariaLabel}
      className={cx(styles.previous, className)}
      disabled={!canScrollPrev}
      type="button"
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeft aria-hidden="true" />
    </button>
  )
})

export const CarouselNext = /* @__PURE__ */ forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function CarouselNext({ 'aria-label': ariaLabel = 'Next slide', className, ...props }, ref) {
  const { canScrollNext, scrollNext, styles } = useCarousel()
  return (
    <button
      ref={ref}
      aria-label={ariaLabel}
      className={cx(styles.next, className)}
      disabled={!canScrollNext}
      type="button"
      onClick={scrollNext}
      {...props}
    >
      <ChevronRight aria-hidden="true" />
    </button>
  )
})

type CarouselNamespace = typeof CarouselRoot & {
  Content: typeof CarouselContent
  Item: typeof CarouselItem
  Next: typeof CarouselNext
  Previous: typeof CarouselPrevious
  Root: typeof CarouselRoot
}

export const Carousel: CarouselNamespace = /* @__PURE__ */ Object.assign(CarouselRoot, {
  Content: CarouselContent,
  Item: CarouselItem,
  Next: CarouselNext,
  Previous: CarouselPrevious,
  Root: CarouselRoot,
})
