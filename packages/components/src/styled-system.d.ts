declare module 'styled-system/recipes' {
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

  interface InputRecipeOptions {
    invalid?: boolean
    size?: 'sm' | 'md' | 'lg'
  }

  export const input: (options?: InputRecipeOptions) => string

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
