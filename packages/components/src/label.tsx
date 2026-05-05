'use client'

import * as LabelPrimitive from '@radix-ui/react-label'
import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { label as labelRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef } from 'react'

export type LabelSize = 'sm' | 'md' | 'lg'

export interface LabelProps extends ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  required?: boolean
  size?: LabelSize
}

export const Label = forwardRef<ComponentRef<typeof LabelPrimitive.Root>, LabelProps>(
  ({ children, className, required = false, size = 'md', ...props }, ref) => {
    return (
      <LabelPrimitive.Root
        ref={ref}
        className={cx(labelRecipe({ required, size }), className)}
        data-required={required ? '' : undefined}
        {...props}
      >
        {children}
      </LabelPrimitive.Root>
    )
  },
)

Label.displayName = 'Label'
