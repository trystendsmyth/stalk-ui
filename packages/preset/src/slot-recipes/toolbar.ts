import type { RecipeConfig } from '../types'

const control = {
  alignItems: 'center',
  appearance: 'none',
  bgColor: 'transparent',
  border: 'none',
  color: 'fg.default',
  cursor: 'default',
  display: 'inline-flex',
  flexShrink: 0,
  gap: '6',
  justifyContent: 'center',
  minH: '32',
  outline: 'none',
  px: '8',
  rounded: 'sm',
  textStyle: 'bodySm',
  userSelect: 'none',
  transitionProperty: 'background-color, color',
  transitionDuration: 'fast',
  '& > svg': { h: '16', w: '16', flexShrink: 0, pointerEvents: 'none' },
  _hover: { bgColor: 'bg.subtle' },
  _focusVisible: {
    focusRingWidth: 'base',
    focusRingColor: 'accent.subtle',
    focusRingOffsetWidth: '1',
    focusRingOffsetColor: 'bg.default',
  },
  _disabled: { opacity: 0.5, pointerEvents: 'none' },
} as const

export const toolbar = {
  className: 'stalk-toolbar',
  description: 'Slot recipe for Radix-backed toolbars.',
  jsx: [
    'Toolbar',
    'ToolbarRoot',
    'ToolbarButton',
    'ToolbarLink',
    'ToolbarSeparator',
    'ToolbarToggleGroup',
    'ToolbarToggleItem',
    /^Toolbar\./,
  ],
  slots: ['root', 'button', 'link', 'separator', 'toggleGroup', 'toggleItem'],
  base: {
    root: {
      display: 'flex',
      alignItems: 'center',
      gap: '4',
      bgColor: 'bg.default',
      border: 'default',
      rounded: 'md',
      p: '4',
      w: 'full',
      maxW: 'full',
      '&[data-orientation="vertical"]': {
        flexDirection: 'column',
        alignItems: 'stretch',
        w: 'fit-content',
      },
    },
    button: control,
    link: {
      ...control,
      textDecoration: 'none',
      _hover: { bgColor: 'bg.subtle', textDecoration: 'none' },
    },
    separator: {
      flexShrink: 0,
      bgColor: 'border.default',
      '&[data-orientation="vertical"]': { alignSelf: 'stretch', w: 'px', mx: '4' },
      '&[data-orientation="horizontal"]': { h: 'px', my: '4' },
    },
    toggleGroup: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '2',
    },
    toggleItem: {
      ...control,
      '&[data-state="on"]': {
        bgColor: 'accent.subtle',
        color: 'accent.fg',
        // Already-selected items don't react to hover. The higher-specificity
        // `[data-state=on]:hover` reliably beats the base `:hover` background.
        _hover: { bgColor: 'accent.subtle' },
      },
    },
  },
} satisfies RecipeConfig
