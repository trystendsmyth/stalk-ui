import {
  createContext,
  forwardRef,
  useContext,
  type ComponentPropsWithoutRef,
  type ComponentRef,
  type ElementType,
} from 'react'

type Slots = Record<string, string>

// Structural shape of a Panda slot recipe, kept deliberately minimal: we only
// rely on the callable (variants -> slot classes) and `splitVariantProps`. The
// variant (`V`) and slot (`S`) types are inferred from the call signature at the
// use site, so they stay precise without restating Panda's generated shape.
//
// `splitVariantProps` is typed loosely on purpose. Its `never` parameter is the
// trick that avoids `any`: because parameters are contravariant, a `never` param
// accepts any recipe's concrete signature — including Panda's generic,
// `DistributiveOmit`-returning one — without the variance clash an exact match
// produces. We never consume its return type (only its first element, re-narrowed
// below), so `unknown` tuple slots are enough.
interface Recipe<V, S extends Slots> {
  (props?: V): S
  splitVariantProps: (props: never) => [unknown, unknown]
}

interface CreateStyleContextOptions {
  name: string
}

const cx = (...classes: (string | false | null | undefined)[]): string => {
  let result = ''
  for (const value of classes) {
    if (typeof value === 'string' && value !== '') {
      if (result !== '') result += ' '
      result += value
    }
  }
  return result
}

const capitalize = (value: string): string =>
  value.length === 0 ? value : value.charAt(0).toUpperCase() + value.slice(1)

export function createStyleContext<V, S extends Slots>(
  recipe: Recipe<V, S>,
  { name }: CreateStyleContextOptions,
) {
  type TSlots = S
  type TVariants = NonNullable<V>

  // `recipe`'s real call/split signatures are erased to `Recipe<V, S>` here; recover
  // the two we actually invoke through contained assertions. This is where the
  // structural looseness above is paid back as precise local types — no `any`.
  const applyRecipe = recipe as unknown as (variantProps: Partial<TVariants>) => TSlots
  const splitVariantProps = recipe.splitVariantProps as (
    props: object,
  ) => [Partial<TVariants>, { className?: string } & Record<string, unknown>]

  const StyleContext = /* @__PURE__ */ createContext<TSlots | null>(null)

  const useSlotStyles = (): TSlots => {
    const styles = useContext(StyleContext)
    if (styles === null) {
      throw new Error(`${name} subcomponents must be rendered inside <${name}Root>.`)
    }
    return styles
  }

  // Escape hatch for roots that need custom rendering (e.g. applying a
  // `colorPalette` from a `tone` prop) while still feeding `withContext` slots.
  // Compute `recipe(variants)` in the root and wrap children in this provider.
  const StyleProvider = StyleContext.Provider

  // Per-part `displayName` so React DevTools shows `AccordionItem` rather than a
  // generic factory name. A factory can't use static function names, so this
  // assignment is the only option — and unlike the top-level mutations the repo
  // rules forbid, it runs inside the `/* @__PURE__ */`-annotated factory call on
  // a freshly created component, so unused parts still tree-shake (verified by
  // scripts/verify-tree-shaking.ts).
  function withRootProvider<TElement extends ElementType>(Component: TElement) {
    type Props = ComponentPropsWithoutRef<TElement> & Partial<TVariants>
    const Styled = /* @__PURE__ */ forwardRef<ComponentRef<TElement>, Props>(
      function StyledRoot(props, ref) {
        const [variantProps, rest] = splitVariantProps(props)
        const styles = applyRecipe(variantProps)
        const { className, ...passthrough } = rest
        const Element: ElementType = Component
        return (
          <StyleContext.Provider value={styles}>
            <Element ref={ref} className={cx(styles.root, className)} {...passthrough} />
          </StyleContext.Provider>
        )
      },
    )
    Styled.displayName = `${name}Root`
    return Styled
  }

  function withContext<TElement extends ElementType>(Component: TElement, slot: keyof TSlots) {
    type Props = ComponentPropsWithoutRef<TElement>
    const slotKey = String(slot)
    const Styled = /* @__PURE__ */ forwardRef<ComponentRef<TElement>, Props>(
      function StyledSlot(props, ref) {
        const styles = useSlotStyles()
        const { className, ...passthrough } = props as {
          className?: string
        } & Record<string, unknown>
        const Element: ElementType = Component
        return <Element ref={ref} className={cx(styles[slotKey], className)} {...passthrough} />
      },
    )
    Styled.displayName = `${name}${capitalize(slotKey)}`
    return Styled
  }

  return { StyleProvider, useSlotStyles, withContext, withRootProvider }
}
