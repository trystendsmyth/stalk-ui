import type { RecipeConfig } from '../types'

export const timeline = {
  className: 'stalk-timeline',
  description:
    'Slot recipe for Timeline / activity feeds (rail with toned dot + connector, time, title, description).',
  slots: [
    'root',
    'item',
    'rail',
    'indicator',
    'connector',
    'content',
    'time',
    'title',
    'description',
  ],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      listStyle: 'none',
      m: '0',
      p: '0',
    },
    item: {
      display: 'flex',
      gap: '12',
      pb: '20',
      '&:last-of-type': {
        pb: '0',
        '& [data-timeline-connector]': { display: 'none' },
      },
    },
    rail: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      gap: '4',
    },
    // Toned via `colorPalette` from the item's tone (accent default).
    indicator: {
      bgColor: 'colorPalette.vivid',
      boxSize: '10',
      flexShrink: 0,
      mt: '6',
      rounded: 'full',
    },
    connector: {
      bgColor: 'border.muted',
      flex: '1',
      w: '2',
    },
    content: {
      display: 'flex',
      flex: '1',
      flexDirection: 'column',
      gap: '2',
      minW: '0',
    },
    time: {
      color: 'fg.subtle',
      fontSize: 'xs',
    },
    title: {
      color: 'fg.default',
      fontWeight: 'medium',
      m: '0',
    },
    description: {
      color: 'fg.muted',
      m: '0',
      textStyle: 'bodySm',
    },
  },
} satisfies RecipeConfig
