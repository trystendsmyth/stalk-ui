import type { RecipeConfig } from '../types'

export const slider = {
  className: 'stalk-slider',
  description:
    'Slot recipe for the Stalk UI slider (root + track + range + thumb, plus circular-knob parts).',
  slots: [
    'root',
    'track',
    'range',
    'thumb',
    'circleRoot',
    'circle',
    'circleTrack',
    'circleRange',
    'circleThumb',
    'valueText',
  ],
  base: {
    root: {
      alignItems: 'center',
      display: 'flex',
      pos: 'relative',
      touchAction: 'none',
      userSelect: 'none',
      '&[data-orientation="horizontal"]': {
        h: '20',
        w: 'full',
      },
      '&[data-orientation="vertical"]': {
        flexDirection: 'column',
        h: 'full',
        w: '20',
      },
      _disabled: {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    },
    track: {
      bgColor: 'bg.subtle',
      flexGrow: 1,
      pos: 'relative',
      rounded: 'full',
      '&[data-orientation="horizontal"]': {
        h: '6',
        w: 'full',
      },
      '&[data-orientation="vertical"]': {
        h: 'full',
        w: '6',
      },
    },
    range: {
      bgColor: 'accent.solid',
      pos: 'absolute',
      rounded: 'full',
      '&[data-orientation="horizontal"]': {
        h: 'full',
      },
      '&[data-orientation="vertical"]': {
        w: 'full',
      },
    },
    thumb: {
      bgColor: 'bg.default',
      border: '2px solid',
      borderColor: 'accent.solid',
      cursor: 'pointer',
      display: 'block',
      h: '16',
      rounded: 'full',
      transitionDuration: 'fast',
      transitionProperty: 'border-color, box-shadow, transform',
      w: '16',
      _hover: {
        borderColor: 'accent.fg',
      },
      _focusVisible: {
        focusRingWidth: 'base',
        focusRingColor: 'accent.subtle',
        focusRingOffsetWidth: '1',
        focusRingOffsetColor: 'bg.default',
      },
      _disabled: {
        cursor: 'not-allowed',
      },
    },
    // Circular-knob parts. The svg uses a fixed 100-unit viewBox (like the
    // circular Progress), so stroke widths and the read-out scale with the
    // rendered size.
    circleRoot: {
      cursor: 'pointer',
      display: 'inline-flex',
      pos: 'relative',
      rounded: 'full',
      touchAction: 'none',
      userSelect: 'none',
      _focusVisible: {
        focusRingWidth: 'base',
        focusRingColor: 'accent.subtle',
        focusRingOffsetWidth: '1',
        focusRingOffsetColor: 'bg.default',
      },
      '&[data-disabled]': {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    },
    circle: {
      display: 'block',
      h: '96',
      w: '96',
    },
    circleTrack: {
      fill: 'none',
      stroke: 'bg.subtle',
      strokeLinecap: 'round',
    },
    circleRange: {
      fill: 'none',
      stroke: 'accent.solid',
      strokeLinecap: 'round',
    },
    circleThumb: {
      fill: 'bg.default',
      stroke: 'accent.solid',
      strokeWidth: '3px',
    },
    valueText: {
      fill: 'fg.default',
      // viewBox units (not document px): ~22% of the knob diameter.
      fontSize: '22px',
      fontWeight: 'semibold',
    },
  },
} satisfies RecipeConfig
