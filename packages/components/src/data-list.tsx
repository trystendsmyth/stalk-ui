import { createStyleContext } from '@stalk-ui/utils'
import { forwardRef } from 'react'
import { css, cx } from 'styled-system/css'
import { dataList as dataListRecipe } from 'styled-system/recipes'

import type { Tone } from './tones'
import type { ComponentPropsWithoutRef } from 'react'

export type DataListOrientation = (typeof dataListRecipe.variantMap.orientation)[number]
export type DataListSize = (typeof dataListRecipe.variantMap.size)[number]
export type DataListTone = Tone

export type DataListRootProps = ComponentPropsWithoutRef<'dl'> & {
  /** Lay each label/value pair side by side (`horizontal`) or stacked (`vertical`). */
  orientation?: DataListOrientation
  /** Text scale applied to labels and values. */
  size?: DataListSize
}

const { useSlotStyles, withContext, withRootProvider } = /* @__PURE__ */ createStyleContext(
  dataListRecipe,
  { name: 'DataList' },
)

export const DataListRoot = /* @__PURE__ */ withRootProvider('dl')
export const DataListItem = /* @__PURE__ */ withContext('div', 'item')
export const DataListValue = /* @__PURE__ */ withContext('dd', 'value')

export type DataListLabelProps = ComponentPropsWithoutRef<'dt'> & {
  /** Tint the label with a semantic tone. Defaults to the muted neutral text. */
  tone?: DataListTone
}

export const DataListLabel = /* @__PURE__ */ forwardRef<HTMLElement, DataListLabelProps>(
  function DataListLabel({ className, tone, ...props }, ref) {
    const styles = useSlotStyles()
    return (
      <dt
        ref={ref}
        className={cx(
          styles.label,
          tone === undefined ? undefined : css({ colorPalette: tone, color: 'colorPalette.text' }),
          className,
        )}
        {...props}
      />
    )
  },
)

export const DataList = /* @__PURE__ */ Object.assign(DataListRoot, {
  Item: DataListItem,
  Label: DataListLabel,
  Root: DataListRoot,
  Value: DataListValue,
})
