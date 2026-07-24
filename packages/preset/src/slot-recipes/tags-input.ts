import type { RecipeConfig } from '../types'

export const tagsInput = {
  className: 'stalk-tags-input',
  description: 'Slot recipe for TagsInput — a wrapping chip shell around an inline field.',
  jsx: ['TagsInput', /^TagsInput\./],
  slots: ['root', 'field'],
  base: {
    // Mirrors the `input` shell (bg/border/focus ring) but wraps its children so
    // chips flow onto multiple rows alongside the inline entry field.
    root: {
      alignItems: 'center',
      bgColor: 'bg.canvas',
      border: 'default',
      color: 'fg.default',
      cursor: 'text',
      display: 'flex',
      flexWrap: 'wrap',
      rounded: 'md',
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
    field: {
      appearance: 'none',
      bgColor: 'transparent',
      border: 'none',
      color: 'inherit',
      flex: '1 1 80px',
      minW: '80',
      outline: 'none',
      p: '0',
      _disabled: { cursor: 'not-allowed' },
      _placeholder: { color: 'fg.muted' },
    },
  },
  variants: {
    disabled: {
      true: { root: { cursor: 'not-allowed', opacity: 0.5 } },
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
      sm: { root: { gap: '4', minH: '32', px: '8', py: '4' }, field: { textStyle: 'bodySm' } },
      md: { root: { gap: '6', minH: '40', px: '10', py: '6' }, field: { textStyle: 'body' } },
      lg: { root: { gap: '6', minH: '48', px: '12', py: '8' }, field: { textStyle: 'bodyLg' } },
    },
  },
  defaultVariants: {
    disabled: false,
    invalid: false,
    size: 'md',
  },
} satisfies RecipeConfig
