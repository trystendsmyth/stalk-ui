import { Slot } from '@radix-ui/react-slot'
import { createContext, forwardRef, useContext, useId } from 'react'
import { Controller, FormProvider, useFormContext, useFormState } from 'react-hook-form'
import { cx } from 'styled-system/css'
import { form as formRecipe } from 'styled-system/recipes'

import { Label } from './label'

import type { ComponentPropsWithoutRef, ComponentRef, HTMLAttributes } from 'react'
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form'

const styles = /* @__PURE__ */ formRecipe()

/** Provides the react-hook-form context. Spread the object returned by `useForm`. */
export const Form = FormProvider

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName
}

const FormFieldContext = /* @__PURE__ */ createContext<FormFieldContextValue | null>(null)

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: ControllerProps<TFieldValues, TName>,
) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

interface FormItemContextValue {
  id: string
}

const FormItemContext = /* @__PURE__ */ createContext<FormItemContextValue | null>(null)

export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext)
  const itemContext = useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  // `exactOptionalPropertyTypes` forbids passing `name: undefined`; subscribe to
  // the whole form state until a field name is available.
  const formState = useFormState(fieldContext === null ? undefined : { name: fieldContext.name })

  if (fieldContext === null) {
    throw new Error('useFormField must be used within <FormField>.')
  }
  if (itemContext === null) {
    throw new Error('useFormField must be used within <FormItem>.')
  }

  const fieldState = getFieldState(fieldContext.name, formState)
  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

export type FormItemProps = HTMLAttributes<HTMLDivElement>

export const FormItem = /* @__PURE__ */ forwardRef<HTMLDivElement, FormItemProps>(function FormItem(
  { className, ...props },
  ref,
) {
  const id = useId()
  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cx(styles.item, className)} {...props} />
    </FormItemContext.Provider>
  )
})

export type FormLabelProps = ComponentPropsWithoutRef<typeof Label>

export const FormLabel = /* @__PURE__ */ forwardRef<ComponentRef<typeof Label>, FormLabelProps>(
  function FormLabel({ className, ...props }, ref) {
    const { error, formItemId } = useFormField()
    return (
      <Label
        ref={ref}
        data-error={Boolean(error)}
        className={cx(styles.label, className)}
        htmlFor={formItemId}
        {...props}
      />
    )
  },
)

export type FormControlProps = ComponentPropsWithoutRef<typeof Slot>

export const FormControl = /* @__PURE__ */ forwardRef<ComponentRef<typeof Slot>, FormControlProps>(
  function FormControl(props, ref) {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
    return (
      <Slot
        ref={ref}
        id={formItemId}
        aria-describedby={error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId}
        aria-invalid={Boolean(error)}
        {...props}
      />
    )
  },
)

export type FormDescriptionProps = HTMLAttributes<HTMLParagraphElement>

export const FormDescription = /* @__PURE__ */ forwardRef<
  HTMLParagraphElement,
  FormDescriptionProps
>(function FormDescription({ className, ...props }, ref) {
  const { formDescriptionId } = useFormField()
  return (
    <p ref={ref} id={formDescriptionId} className={cx(styles.description, className)} {...props} />
  )
})

export type FormMessageProps = HTMLAttributes<HTMLParagraphElement>

export const FormMessage = /* @__PURE__ */ forwardRef<HTMLParagraphElement, FormMessageProps>(
  function FormMessage({ className, children, ...props }, ref) {
    const { error, formMessageId } = useFormField()
    const body = error ? (error.message ?? '') : children
    if (!body) return null
    return (
      <p ref={ref} id={formMessageId} className={cx(styles.message, className)} {...props}>
        {body}
      </p>
    )
  },
)
