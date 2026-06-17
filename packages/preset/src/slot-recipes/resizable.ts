import type { RecipeConfig } from '../types'

export const resizable = {
  className: 'stalk-resizable',
  description: 'Slot recipe for react-resizable-panels resizable panel groups.',
  slots: ['root', 'panel', 'handle', 'handleGrip'],
  base: {
    root: {
      display: 'flex',
      blockSize: 'full',
      inlineSize: 'full',
      '&[data-panel-group-direction="vertical"]': { flexDirection: 'column' },
    },
    panel: {
      overflow: 'hidden',
    },
    handle: {
      position: 'relative',
      display: 'flex',
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'center',
      inlineSize: 'px',
      bgColor: 'border.default',
      outline: 'none',
      transitionProperty: 'background-color',
      transitionDuration: 'fast',
      _hover: { bgColor: 'border.hover' },
      '&[data-resize-handle-state="drag"]': { bgColor: 'accent.solid' },
      _focusVisible: {
        focusRingWidth: 'base',
        focusRingColor: 'accent.subtle',
        focusRingOffsetWidth: '1',
        focusRingOffsetColor: 'bg.default',
      },
      '&[data-panel-group-direction="vertical"]': {
        blockSize: 'px',
        inlineSize: 'full',
      },
    },
    handleGrip: {
      zIndex: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      blockSize: '16',
      inlineSize: '12',
      rounded: 'xs',
      border: 'default',
      bgColor: 'bg.default',
      color: 'fg.muted',
      '& > svg': { h: '10', w: '10' },
      '[data-panel-group-direction="vertical"] &': { transform: 'rotate(90deg)' },
    },
  },
} satisfies RecipeConfig
