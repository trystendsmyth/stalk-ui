import type { RecipeConfig } from '../types'

export const input = {
  className: 'stalk-input',
  description: 'Slot recipe for composed Stalk UI input controls.',
  slots: ['root', 'input', 'slot'],
  base: {
    root: {
      alignItems: 'stretch',
      backgroundColor: 'bg.canvas',
      borderColor: 'border.default',
      borderRadius: 'md',
      borderWidth: '1px',
      color: 'fg.default',
      cursor: 'text',
      display: 'inline-flex',
      transitionDuration: '150ms',
      transitionProperty: 'background-color, border-color, box-shadow',
      width: '100%',
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
      backgroundColor: 'transparent',
      border: 'none',
      color: 'inherit',
      flex: '1 1 auto',
      minWidth: '0',
      outline: 'none',
      paddingBlock: '0',
      width: '100%',
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
          minHeight: '32',
          paddingInline: '12',
        },
        input: { textStyle: 'bodySm' },
        slot: { textStyle: 'bodySm' },
      },
      md: {
        root: {
          gap: '8',
          minHeight: '40',
          paddingInline: 'base',
        },
        input: { textStyle: 'body' },
        slot: { textStyle: 'body' },
      },
      lg: {
        root: {
          gap: '12',
          minHeight: '48',
          paddingInline: '20',
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
