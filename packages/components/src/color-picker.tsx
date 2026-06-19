import { Pipette } from 'lucide-react'
import { createContext, forwardRef, useContext, useMemo, useState } from 'react'
import { HexAlphaColorPicker, HexColorInput, HexColorPicker } from 'react-colorful'
import { cx } from 'styled-system/css'
import { colorPicker as colorPickerRecipe } from 'styled-system/recipes'

import { Popover } from './popover'

import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'

const styles = /* @__PURE__ */ colorPickerRecipe()

export type ColorPickerFormat = 'hex' | 'hexAlpha'

interface ColorPickerContextValue {
  alpha: boolean
  disabled: boolean
  setValue: (value: string) => void
  value: string
}

const ColorPickerContext = /* @__PURE__ */ createContext<ColorPickerContextValue | null>(null)

const useColorPickerContext = (consumer: string): ColorPickerContextValue => {
  const context = useContext(ColorPickerContext)
  if (context === null) {
    throw new Error(`${consumer} must be rendered inside <ColorPicker>.`)
  }
  return context
}

export interface ColorPickerRootProps {
  /** Enable the alpha (opacity) channel. Defaults to false. */
  alpha?: boolean
  children: ReactNode
  defaultOpen?: boolean
  /** Uncontrolled initial color (hex). */
  defaultValue?: string
  disabled?: boolean
  onOpenChange?: (open: boolean) => void
  /** Called with the selected color as a hex string. */
  onValueChange?: (value: string) => void
  open?: boolean
  /** Controlled color value (hex). */
  value?: string
}

export const ColorPickerRoot = function ColorPickerRoot({
  alpha = false,
  children,
  defaultOpen,
  defaultValue = '#000000',
  disabled = false,
  onOpenChange,
  onValueChange,
  open,
  value,
}: ColorPickerRootProps) {
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue)
  const currentValue = isControlled ? value : internalValue

  const setValue = useMemo(
    () => (next: string) => {
      if (!isControlled) setInternalValue(next)
      onValueChange?.(next)
    },
    [isControlled, onValueChange],
  )

  const context = useMemo<ColorPickerContextValue>(
    () => ({ alpha, disabled, setValue, value: currentValue }),
    [alpha, currentValue, disabled, setValue],
  )

  // Only forward the open-state props that were actually provided — passing an
  // explicit `undefined` trips the repo's exactOptionalPropertyTypes.
  const popoverProps: {
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
    open?: boolean
  } = {}
  if (open !== undefined) popoverProps.open = open
  if (defaultOpen !== undefined) popoverProps.defaultOpen = defaultOpen
  if (onOpenChange !== undefined) popoverProps.onOpenChange = onOpenChange

  return (
    <ColorPickerContext.Provider value={context}>
      <Popover.Root {...popoverProps}>{children}</Popover.Root>
    </ColorPickerContext.Provider>
  )
}

export type ColorPickerTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>

export const ColorPickerTrigger = /* @__PURE__ */ forwardRef<
  HTMLButtonElement,
  ColorPickerTriggerProps
>(function ColorPickerTrigger({ 'aria-label': ariaLabel, className, ...props }, ref) {
  const { disabled, value } = useColorPickerContext('ColorPicker.Trigger')
  return (
    <Popover.Trigger asChild>
      <button
        ref={ref}
        aria-label={ariaLabel ?? `Current color ${value}`}
        className={cx(styles.trigger, className)}
        disabled={disabled}
        type="button"
        {...props}
      >
        <span className={styles.triggerSwatch} style={{ backgroundColor: value }} />
      </button>
    </Popover.Trigger>
  )
})

export interface ColorPickerContentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export const ColorPickerContent = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  ColorPickerContentProps
>(function ColorPickerContent({ children, className, ...props }, ref) {
  return (
    <Popover.Content ref={ref} className={cx(styles.content, className)} {...props}>
      {children}
    </Popover.Content>
  )
})

export interface ColorPickerPickerProps {
  className?: string
}

export const ColorPickerPicker = function ColorPickerPicker({ className }: ColorPickerPickerProps) {
  const { alpha, setValue, value } = useColorPickerContext('ColorPicker.Picker')
  const Picker = alpha ? HexAlphaColorPicker : HexColorPicker
  return (
    <div className={cx(styles.picker, className)}>
      <Picker color={value} onChange={setValue} />
    </div>
  )
}

export type ColorPickerInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'onChange' | 'value'
>

// react-colorful's HexColorInput does not forward a ref, so this part is a plain
// function component (the only non-ref-forwarding part of the compound).
export const ColorPickerInput = function ColorPickerInput({
  className,
  ...props
}: ColorPickerInputProps) {
  const { alpha, setValue, value } = useColorPickerContext('ColorPicker.Input')
  return (
    <HexColorInput
      alpha={alpha}
      className={cx(styles.input, className)}
      color={value}
      prefixed
      onChange={setValue}
      {...props}
    />
  )
}

export type ColorPickerControlsProps = HTMLAttributes<HTMLDivElement>

export const ColorPickerControls = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  ColorPickerControlsProps
>(function ColorPickerControls({ className, ...props }, ref) {
  return <div ref={ref} className={cx(styles.controls, className)} {...props} />
})

export type ColorPickerSwatchesProps = HTMLAttributes<HTMLDivElement>

export const ColorPickerSwatches = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  ColorPickerSwatchesProps
>(function ColorPickerSwatches({ className, ...props }, ref) {
  return <div ref={ref} className={cx(styles.swatches, className)} role="group" {...props} />
})

export interface ColorPickerSwatchProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'color'
> {
  color: string
}

export const ColorPickerSwatch = /* @__PURE__ */ forwardRef<
  HTMLButtonElement,
  ColorPickerSwatchProps
>(function ColorPickerSwatch(
  { 'aria-label': ariaLabel, className, color, onClick, ...props },
  ref,
) {
  const { setValue, value } = useColorPickerContext('ColorPicker.Swatch')
  const selected = value.toLowerCase() === color.toLowerCase()
  return (
    <button
      ref={ref}
      aria-label={ariaLabel ?? color}
      aria-pressed={selected}
      className={cx(styles.swatch, className)}
      style={{ backgroundColor: color }}
      type="button"
      onClick={(event) => {
        setValue(color)
        onClick?.(event)
      }}
      {...props}
    />
  )
})

export type ColorPickerEyeDropperProps = ButtonHTMLAttributes<HTMLButtonElement>

// Window.EyeDropper is a recent, non-universal API (Chromium-based). The button
// renders only where it's supported so consumers don't show a dead control.
interface EyeDropperApi {
  open: () => Promise<{ sRGBHex: string }>
}

export const ColorPickerEyeDropper = /* @__PURE__ */ forwardRef<
  HTMLButtonElement,
  ColorPickerEyeDropperProps
>(function ColorPickerEyeDropper({ 'aria-label': ariaLabel, className, ...props }, ref) {
  const { setValue } = useColorPickerContext('ColorPicker.EyeDropper')
  const supported = typeof window !== 'undefined' && 'EyeDropper' in window
  if (!supported) return null

  const pick = async () => {
    try {
      const EyeDropperCtor = (window as unknown as { EyeDropper: new () => EyeDropperApi })
        .EyeDropper
      const result = await new EyeDropperCtor().open()
      setValue(result.sRGBHex)
    } catch {
      // The user dismissed the eyedropper; nothing to do.
    }
  }

  return (
    <button
      ref={ref}
      aria-label={ariaLabel ?? 'Pick a color from the screen'}
      className={cx(styles.eyeDropper, className)}
      type="button"
      onClick={() => {
        void pick()
      }}
      {...props}
    >
      <Pipette aria-hidden="true" />
    </button>
  )
})

export const ColorPicker = /* @__PURE__ */ Object.assign(ColorPickerRoot, {
  Content: ColorPickerContent,
  Controls: ColorPickerControls,
  EyeDropper: ColorPickerEyeDropper,
  Input: ColorPickerInput,
  Picker: ColorPickerPicker,
  Root: ColorPickerRoot,
  Swatch: ColorPickerSwatch,
  Swatches: ColorPickerSwatches,
  Trigger: ColorPickerTrigger,
})
