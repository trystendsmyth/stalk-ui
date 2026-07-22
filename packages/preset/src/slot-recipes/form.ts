import type { RecipeConfig } from '../types'

export const form = {
  className: 'stalk-form',
  jsx: [
    'Form',
    'FormField',
    'FormItem',
    'FormLabel',
    'FormControl',
    'FormDescription',
    'FormMessage',
    /^Form\./,
  ],
  description:
    'Slot recipe for react-hook-form field scaffolding (item, label, description, message).',
  slots: ['item', 'label', 'description', 'message'],
  base: {
    item: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6',
    },
    label: {
      '&[data-error=true]': {
        color: 'danger.solid',
      },
    },
    description: {
      color: 'fg.muted',
      textStyle: 'bodySm',
    },
    message: {
      color: 'danger.solid',
      textStyle: 'bodySm',
      fontWeight: 'medium',
    },
  },
} satisfies RecipeConfig
