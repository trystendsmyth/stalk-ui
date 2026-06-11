import { OTPInput, OTPInputContext } from 'input-otp'
import { createContext, forwardRef, useContext, useMemo } from 'react'
import { cx } from 'styled-system/css'
import { otpInput as otpInputRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef, HTMLAttributes, ReactNode } from 'react'

export type OtpInputSize = (typeof otpInputRecipe.variantMap.size)[number]

type OtpInputStyles = ReturnType<typeof otpInputRecipe>

const OtpInputStylesContext = /* @__PURE__ */ createContext<OtpInputStyles | null>(null)

const useOtpInputStyles = (): OtpInputStyles => {
  const styles = useContext(OtpInputStylesContext)
  if (styles === null) {
    throw new Error('OtpInput subcomponents must be rendered inside <OtpInputRoot>.')
  }
  return styles
}

// `OTPInput`'s props are a render-XOR-children union over the native input
// attributes (whose `size` is a number). Strip the union discriminants and the
// numeric `size`, then re-add the slot children and our recipe `size` variant so
// the public type is a single clean shape.
type OtpInputBaseProps = Omit<
  ComponentPropsWithoutRef<typeof OTPInput>,
  'size' | 'render' | 'children'
>

export type OtpInputRootProps = OtpInputBaseProps & {
  /** Cell size. */
  size?: OtpInputSize
  /** The slot groups to render (see `OtpInput.Group` / `OtpInput.Slot`). */
  children: ReactNode
}

export const OtpInputRoot = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof OTPInput>,
  OtpInputRootProps
>(function OtpInputRoot({ className, containerClassName, size = 'md', ...props }, ref) {
  const styles = useMemo(() => otpInputRecipe({ size }), [size])
  return (
    <OtpInputStylesContext.Provider value={styles}>
      <OTPInput
        ref={ref}
        containerClassName={cx(styles.root, containerClassName)}
        className={className}
        {...props}
      />
    </OtpInputStylesContext.Provider>
  )
})

export type OtpInputGroupProps = HTMLAttributes<HTMLDivElement>

export const OtpInputGroup = /* @__PURE__ */ forwardRef<HTMLDivElement, OtpInputGroupProps>(
  function OtpInputGroup({ className, ...props }, ref) {
    const styles = useOtpInputStyles()
    return <div ref={ref} className={cx(styles.group, className)} {...props} />
  },
)

export type OtpInputSlotProps = HTMLAttributes<HTMLDivElement> & {
  /** Index of the underlying input character this cell renders. */
  index: number
}

export const OtpInputSlot = /* @__PURE__ */ forwardRef<HTMLDivElement, OtpInputSlotProps>(
  function OtpInputSlot({ className, index, ...props }, ref) {
    const styles = useOtpInputStyles()
    const context = useContext(OTPInputContext)
    const slot = context.slots[index]
    const { char, hasFakeCaret, isActive } = slot ?? {
      char: null,
      hasFakeCaret: false,
      isActive: false,
    }

    return (
      <div ref={ref} data-active={isActive} className={cx(styles.slot, className)} {...props}>
        {char}
        {hasFakeCaret ? <div className={styles.caret} /> : null}
      </div>
    )
  },
)

export type OtpInputSeparatorProps = HTMLAttributes<HTMLDivElement>

export const OtpInputSeparator = /* @__PURE__ */ forwardRef<HTMLDivElement, OtpInputSeparatorProps>(
  function OtpInputSeparator({ className, children, ...props }, ref) {
    const styles = useOtpInputStyles()
    return (
      <div ref={ref} role="separator" className={cx(styles.separator, className)} {...props}>
        {children ?? '-'}
      </div>
    )
  },
)

export const OtpInput = /* @__PURE__ */ Object.assign(OtpInputRoot, {
  Group: OtpInputGroup,
  Root: OtpInputRoot,
  Separator: OtpInputSeparator,
  Slot: OtpInputSlot,
})
