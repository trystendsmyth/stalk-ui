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
    // fg.muted (not subtle): xs text on bg.default must clear WCAG AA.
    time: {
      color: 'fg.muted',
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
  variants: {
    orientation: {
      vertical: {},
      // Items spread along a row; each rail runs dot → connector toward the
      // next item, with the content stacked underneath. The rail spans the
      // full item and the connector stops one gap short, so the line sits
      // 4px off each dot on both sides and the dots read as one aligned row.
      horizontal: {
        root: { flexDirection: 'row' },
        item: {
          flex: '1',
          flexDirection: 'column',
          gap: '8',
          minW: '0',
          pb: '0',
        },
        rail: { flexDirection: 'row', w: 'full' },
        indicator: { mt: '0' },
        connector: { h: '2', mr: '4', w: 'auto' },
        content: { pr: '12' },
      },
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
} satisfies RecipeConfig
