import { createStyleContext } from '@stalk-ui/utils'
import { card as cardRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef } from 'react'

export type CardVariant = (typeof cardRecipe.variantMap.variant)[number]

export type CardRootProps = ComponentPropsWithoutRef<'div'> & {
  /** Surface treatment. `outline` is a bordered surface; `elevated` adds a shadow. */
  variant?: CardVariant
}

const { withContext, withRootProvider } = /* @__PURE__ */ createStyleContext(cardRecipe, {
  name: 'Card',
})

export const CardRoot = /* @__PURE__ */ withRootProvider('div')
export const CardHeader = /* @__PURE__ */ withContext('div', 'header')
export const CardTitle = /* @__PURE__ */ withContext('h3', 'title')
export const CardDescription = /* @__PURE__ */ withContext('p', 'description')
export const CardAction = /* @__PURE__ */ withContext('div', 'action')
export const CardContent = /* @__PURE__ */ withContext('div', 'content')
export const CardFooter = /* @__PURE__ */ withContext('div', 'footer')

export const Card = /* @__PURE__ */ Object.assign(CardRoot, {
  Action: CardAction,
  Content: CardContent,
  Description: CardDescription,
  Footer: CardFooter,
  Header: CardHeader,
  Root: CardRoot,
  Title: CardTitle,
})
