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
  | 'yellow'
  | 'orange'
  | 'red'

export type AccentColor = Extract<
  ScaleName,
  'blue' | 'violet' | 'teal' | 'emerald' | 'amber' | 'yellow' | 'orange' | 'red'
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
  /**
   * JSX element names Panda's static extractor tracks for this recipe, so
   * variant props written as JSX attributes (`<SelectField size="sm">`) emit
   * their CSS even when the value never appears as a static recipe call.
   * Exact part names plus a `^Name\.` regex for dot-notation usage.
   */
  jsx?: (string | RegExp)[]
  base?: Record<string, unknown>
  slots?: string[]
  variants?: Record<string, Record<string, Record<string, unknown>>>
  compoundVariants?: { css: Record<string, unknown>; [variant: string]: unknown }[]
  defaultVariants?: Record<string, string | boolean>
}
