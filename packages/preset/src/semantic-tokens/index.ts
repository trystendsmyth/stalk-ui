import { createSemanticBorderTokens } from '../tokens/semantic-borders'
import { createSemanticColorTokens } from '../tokens/semantic-colors'

export const semanticTokens = {
  borders: createSemanticBorderTokens(),
  colors: createSemanticColorTokens('blue', 'neutral'),
}
