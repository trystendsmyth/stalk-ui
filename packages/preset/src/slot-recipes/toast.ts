import type { RecipeConfig } from '../types'

export const toast = {
  className: 'stalk-toast',
  description: 'Slot recipe for Sonner-backed toast notifications.',
  slots: [
    'toaster',
    'toast',
    'title',
    'description',
    'actionButton',
    'cancelButton',
    'closeButton',
    'icon',
    'loader',
  ],
  base: {
    toaster: {
      fontFamily: 'sans',
      '--normal-bg': 'token(colors.bg.default)',
      '--normal-text': 'token(colors.fg.default)',
      '--normal-border': 'token(colors.border.default)',
      '--success-bg': 'token(colors.success.surface)',
      '--success-text': 'token(colors.success.fg)',
      '--success-border': 'token(colors.success.muted)',
      '--error-bg': 'token(colors.danger.surface)',
      '--error-text': 'token(colors.danger.fg)',
      '--error-border': 'token(colors.danger.muted)',
      '--info-bg': 'token(colors.info.surface)',
      '--info-text': 'token(colors.info.fg)',
      '--info-border': 'token(colors.info.muted)',
      '--warning-bg': 'token(colors.warning.surface)',
      '--warning-text': 'token(colors.warning.fg)',
      '--warning-border': 'token(colors.warning.muted)',
    },
    toast: {
      rounded: 'lg',
      shadow: 'lg',
    },
    title: {
      textStyle: 'bodySm',
      fontWeight: 'medium',
    },
    description: {
      textStyle: 'bodySm',
      color: 'fg.muted',
    },
    actionButton: {
      bgColor: 'accent.solid',
      color: 'accent.contrast',
      rounded: 'sm',
    },
    cancelButton: {
      bgColor: 'bg.subtle',
      color: 'fg.default',
      rounded: 'sm',
    },
    closeButton: {
      bgColor: 'bg.default',
      borderColor: 'border.default',
      color: 'fg.muted',
      _hover: {
        bgColor: 'bg.subtle',
        color: 'fg.default',
      },
      _focusVisible: {
        focusRingWidth: 'base',
        focusRingColor: 'accent.subtle',
        focusRingOffsetWidth: '1',
        focusRingOffsetColor: 'bg.default',
      },
    },
    icon: {
      flexShrink: 0,
    },
    loader: {
      color: 'fg.muted',
    },
  },
} satisfies RecipeConfig
