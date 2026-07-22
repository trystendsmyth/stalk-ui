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
   * JSX names Panda's extractor tracks, so wrapper-passed variant props
   * (`<SelectField size="sm">`) still emit CSS. Exact names + `^Name\.` regex.
   */
  jsx?: (string | RegExp)[]
  base?: Record<string, unknown>
  slots?: string[]
  variants?: Record<string, Record<string, Record<string, unknown>>>
  compoundVariants?: { css: Record<string, unknown>; [variant: string]: unknown }[]
  defaultVariants?: Record<string, string | boolean>
}
