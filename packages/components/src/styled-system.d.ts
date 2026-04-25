declare module 'styled-system/recipes' {
  interface BadgeRecipeOptions {
    size?: 'sm' | 'md'
    variant?: 'solid' | 'subtle' | 'outline'
  }

  export const badge: (options?: BadgeRecipeOptions) => string

  interface ButtonRecipeOptions {
    size?: 'sm' | 'md' | 'lg'
    variant?: 'solid' | 'outline' | 'ghost' | 'subtle'
  }

  export const button: (options?: ButtonRecipeOptions) => string

  interface CheckboxRecipeOptions {
    invalid?: boolean
    size?: 'sm' | 'md' | 'lg'
  }

  export const checkbox: (options?: CheckboxRecipeOptions) => string

  interface DialogSlotClasses {
    close: string
    content: string
    description: string
    footer: string
    header: string
    overlay: string
    title: string
  }

  export const dialog: () => DialogSlotClasses

  interface DropdownMenuSlotClasses {
    content: string
    item: string
    label: string
    separator: string
    shortcut: string
  }

  export const dropdownMenu: () => DropdownMenuSlotClasses

  interface InputRecipeOptions {
    invalid?: boolean
    size?: 'sm' | 'md' | 'lg'
  }

  export const input: (options?: InputRecipeOptions) => string

  interface LabelRecipeOptions {
    required?: boolean
    size?: 'sm' | 'md' | 'lg'
  }

  export const label: (options?: LabelRecipeOptions) => string

  interface RadioRecipeOptions {
    invalid?: boolean
    size?: 'sm' | 'md' | 'lg'
  }

  export const radio: (options?: RadioRecipeOptions) => string

  interface SelectRecipeOptions {
    invalid?: boolean
    size?: 'sm' | 'md' | 'lg'
  }

  export const select: (options?: SelectRecipeOptions) => string

  interface SwitchRecipeOptions {
    invalid?: boolean
    size?: 'sm' | 'md' | 'lg'
  }

  export const switchRecipe: (options?: SwitchRecipeOptions) => string

  interface TextareaRecipeOptions {
    invalid?: boolean
    size?: 'sm' | 'md' | 'lg'
  }

  export const textarea: (options?: TextareaRecipeOptions) => string
}
