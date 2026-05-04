import type { RecipeConfig } from '../types'

export const input = {
  className: 'stalk-input',
  description: 'Slot recipe for composed Stalk UI input controls.',
  slots: ['root', 'input', 'slot'],
  base: {
    root: {
      alignItems: 'stretch',
      bgColor: 'bg.canvas',
      border: 'default',
      rounded: 'md',
      color: 'fg.default',
      cursor: 'text',
      display: 'inline-flex',
      transitionDuration: 'fast',
      transitionProperty: 'background-color, border-color, box-shadow',
      w: 'full',
      _focusWithin: {
        borderColor: 'accent.solid',
        focusRingWidth: 'base',
        focusRingColor: 'accent.muted',
        focusRingOffsetWidth: '2',
        focusRingOffsetColor: 'bg.default',
      },
    },
    input: {
      appearance: 'none',
      bgColor: 'transparent',
      border: 'none',
      color: 'inherit',
      flex: '1 1 auto',
      minW: '0',
      outline: 'none',
      py: '0',
      w: 'full',
      _disabled: {
        cursor: 'not-allowed',
      },
      _placeholder: {
        color: 'fg.muted',
      },
    },
    slot: {
      alignItems: 'center',
      color: 'fg.muted',
      display: 'inline-flex',
      flex: '0 0 auto',
      gap: '2',
      justifyContent: 'center',
    },
  },
  variants: {
    disabled: {
      true: {
        root: {
          cursor: 'not-allowed',
          opacity: 0.5,
        },
      },
    },
    invalid: {
      true: {
        root: {
          borderColor: 'danger.solid',
          _focusWithin: {
            borderColor: 'danger.solid',
            focusRingWidth: 'base',
            focusRingColor: 'danger.muted',
            focusRingOffsetWidth: '2',
            focusRingOffsetColor: 'bg.default',
          },
        },
      },
    },
    size: {
      sm: {
        root: {
          gap: '8',
          minH: '32',
          px: '12',
        },
        input: { textStyle: 'bodySm' },
        slot: { textStyle: 'bodySm' },
      },
      md: {
        root: {
          gap: '8',
          minH: '40',
          px: 'base',
        },
        input: { textStyle: 'body' },
        slot: { textStyle: 'body' },
      },
      lg: {
        root: {
          gap: '12',
          minH: '48',
          px: '20',
        },
        input: { textStyle: 'bodyLg' },
        slot: { textStyle: 'bodyLg' },
      },
    },
    align: {
      start: {
        input: {
          textAlign: 'start',
        },
      },
      center: {
        input: {
          textAlign: 'center',
        },
      },
      end: {
        input: {
          textAlign: 'end',
        },
      },
    },
  },
  defaultVariants: {
    align: 'start',
    disabled: false,
    invalid: false,
    size: 'md',
  },
} satisfies RecipeConfig
