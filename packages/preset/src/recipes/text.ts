import type { RecipeConfig } from '../types'

// Shared typography engine for the Text and Heading components. `size` maps
// directly onto the composite `textStyles` tokens so font-size, line-height,
// and tracking stay in sync; `weight`/`align`/`truncate` are orthogonal knobs
// the components layer on top. Colour (semantic `fg.*` or a `colorPalette`
// tone) is applied by the component via `css()` rather than as a variant.
export const text = {
  className: 'stalk-text',
  description: 'Typography styles shared by the Stalk UI Text and Heading components.',
  base: {
    color: 'fg.default',
    // Primitives stay margin-free; spacing belongs to layout, not the glyph run.
    margin: 0,
  },
  variants: {
    size: {
      displayLg: { textStyle: 'displayLg' },
      display: { textStyle: 'display' },
      h1: { textStyle: 'h1' },
      h2: { textStyle: 'h2' },
      h3: { textStyle: 'h3' },
      h4: { textStyle: 'h4' },
      h5: { textStyle: 'h5' },
      h6: { textStyle: 'h6' },
      bodyLg: { textStyle: 'bodyLg' },
      body: { textStyle: 'body' },
      bodySm: { textStyle: 'bodySm' },
      caption: { textStyle: 'caption' },
      micro: { textStyle: 'micro' },
    },
    weight: {
      regular: { fontWeight: 'regular' },
      medium: { fontWeight: 'medium' },
      semibold: { fontWeight: 'semibold' },
      bold: { fontWeight: 'bold' },
    },
    align: {
      start: { textAlign: 'start' },
      center: { textAlign: 'center' },
      end: { textAlign: 'end' },
      justify: { textAlign: 'justify' },
    },
    truncate: {
      true: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
  },
} satisfies RecipeConfig
