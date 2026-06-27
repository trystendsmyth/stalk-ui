import { createSemanticBorderTokens } from '../tokens/semantic-borders'
import { createSemanticColorTokens } from '../tokens/semantic-colors'
import { createScaleSemanticTokens } from '../tokens/semantic-scales'

export const semanticTokens = {
  borders: createSemanticBorderTokens(),
  colors: {
    ...createSemanticColorTokens('blue', 'neutral'),
    // Data-viz ramps follow the default accent/neutral so the HeatMap and
    // Sparklines work out of the box; defineTheme({ scales }) re-hues them.
    ...createScaleSemanticTokens({
      sequential: 'blue',
      diverging: ['red', 'blue'],
      gray: 'neutral',
    }),
  },
}
