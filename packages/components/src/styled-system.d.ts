declare module 'styled-system/recipes' {
  interface ButtonRecipeOptions {
    size?: 'sm' | 'md' | 'lg'
    variant?: 'solid' | 'outline' | 'ghost' | 'subtle'
  }

  export const button: (options?: ButtonRecipeOptions) => string

  interface InputRecipeOptions {
    invalid?: boolean
    size?: 'sm' | 'md' | 'lg'
  }

  export const input: (options?: InputRecipeOptions) => string
}
