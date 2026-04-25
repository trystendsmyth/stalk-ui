export type ScaleName =
  | 'gray'
  | 'neutral'
  | 'slate'
  | 'mauve'
  | 'blue'
  | 'violet'
  | 'teal'
  | 'emerald'
  | 'amber'
  | 'red'

export type AccentColor = Extract<
  ScaleName,
  'blue' | 'violet' | 'teal' | 'emerald' | 'amber' | 'red'
>

export type GrayColor = Extract<ScaleName, 'gray' | 'neutral' | 'slate' | 'mauve'>

export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl'

export interface TokenLeaf {
  value: string | Record<string, string>
}

export interface TokenGroup {
  [key: string]: TokenLeaf | TokenGroup
}

export interface RecipeConfig {
  className?: string
  description?: string
  base?: Record<string, unknown>
  slots?: string[]
  variants?: Record<string, Record<string, Record<string, unknown>>>
  defaultVariants?: Record<string, string | boolean>
}

export interface StalkPreset {
  name: string
  theme: {
    tokens: {
      colors: TokenGroup
      radii: TokenGroup
    }
    semanticTokens: {
      colors: TokenGroup
    }
    recipes: Record<string, RecipeConfig>
    slotRecipes: Record<string, RecipeConfig>
  }
  themes: Record<
    string,
    {
      semanticTokens: {
        colors: TokenGroup
      }
    }
  >
}

export interface CreatePresetOptions {
  accentColor?: AccentColor
  grayColor?: GrayColor
  borderRadius?: BorderRadius
  additionalThemes?: AccentColor[]
}
