declare module 'styled-system/recipes' {
  interface ButtonRecipeOptions {
    size?: 'sm' | 'md' | 'lg'
    variant?: 'solid' | 'outline' | 'ghost' | 'subtle'
  }

  export const button: (options?: ButtonRecipeOptions) => string
}
