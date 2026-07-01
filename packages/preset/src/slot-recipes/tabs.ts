import type { RecipeConfig } from '../types'

export const tabs = {
  className: 'stalk-tabs',
  description: 'Slot recipe for the Tabs component (root, list, trigger, content, indicator).',
  slots: ['root', 'list', 'trigger', 'content', 'indicator'],
  base: {
    root: {
      colorPalette: 'accent',
      display: 'flex',
      // Content-width by default so a tab strip / segmented control sits inline in a
      // toolbar; opt into full width with the `fitted` variant (shared width vocabulary).
      '&[data-orientation="vertical"]': { flexDirection: 'row' },
      '&[data-orientation="horizontal"]': { flexDirection: 'column' },
    },
    list: {
      alignItems: 'center',
      display: 'flex',
      flexShrink: 0,
      pos: 'relative',
      '&[data-orientation="vertical"]': {
        flexDirection: 'column',
        alignItems: 'stretch',
      },
    },
    trigger: {
      alignItems: 'center',
      appearance: 'none',
      bgColor: 'transparent',
      border: 'none',
      color: 'fg.muted',
      cursor: 'pointer',
      display: 'inline-flex',
      flexShrink: 0,
      fontWeight: 'medium',
      gap: '6',
      justifyContent: 'center',
      lineHeight: 'normal',
      m: 0,
      outline: 'none',
      pos: 'relative',
      transitionDuration: 'fast',
      transitionProperty: 'color',
      whiteSpace: 'nowrap',
      zIndex: '1',
      /** Hover only affects inactive triggers so the active text color (set per variant)
       *  never gets clobbered — e.g. `pills` keeps `colorPalette.contrast` over its solid
       *  indicator instead of flipping to a dark `fg.default` on hover. */
      '&:not([data-state="active"]):hover': { color: 'fg.default' },
      _focusVisible: {
        focusRingWidth: 'base',
        focusRingColor: 'accent.subtle',
        focusRingOffsetWidth: '1',
        focusRingOffsetColor: 'bg.default',
      },
      _disabled: { cursor: 'not-allowed', opacity: 0.5, _hover: { color: 'fg.muted' } },
    },
    content: {
      flex: 1,
      mt: '16',
      outline: 'none',
      '[data-orientation="vertical"] > &': {
        mt: 0,
        ml: '16',
      },
      _focusVisible: {
        focusRingWidth: 'base',
        focusRingColor: 'accent.subtle',
        focusRingOffsetWidth: '1',
        focusRingOffsetColor: 'bg.default',
      },
    },
    /** Animated indicator. Position/size set by the component via inline `transform`
     *  and `width`/`height` so the only animated properties are GPU-composited — no
     *  layout or paint passes per frame. Variants below provide the visual styling. */
    indicator: {
      pos: 'absolute',
      pointerEvents: 'none',
      opacity: 0,
      top: 0,
      left: 0,
      transitionDuration: 'normal',
      transitionProperty: 'transform, width, height, opacity, background-color',
      transitionTimingFunction: 'ease-out',
      willChange: 'transform',
      zIndex: 0,
      '@media (prefers-reduced-motion: reduce)': {
        transition: 'opacity 0.01ms',
      },
    },
  },
  variants: {
    size: {
      sm: {
        list: { gap: '2' },
        trigger: { fontSize: 'xs', h: '28', px: '10' },
      },
      md: {
        list: { gap: '4' },
        trigger: { fontSize: 'sm', h: '32', px: '12' },
      },
      lg: {
        list: { gap: '4' },
        trigger: { fontSize: 'sm', h: '40', px: '16' },
      },
    },
    variant: {
      line: {
        list: {
          borderBottomWidth: 'xs',
          borderBottomStyle: 'solid',
          borderBottomColor: 'border.default',
          gap: '0',
          '&[data-orientation="vertical"]': {
            borderBottom: 'none',
            borderRightWidth: 'xs',
            borderRightStyle: 'solid',
            borderRightColor: 'border.default',
          },
        },
        trigger: {
          rounded: 'none',
          '&[data-state="active"]': { color: 'colorPalette.fg' },
        },
        indicator: {
          bgColor: 'colorPalette.solid',
          bottom: '-1px',
          top: 'auto',
          height: '2px',
          '[data-orientation="vertical"] &': {
            bottom: 'auto',
            top: 0,
            right: '-1px',
            left: 'auto',
            width: '2px',
            height: 'auto',
          },
        },
      },
      segmented: {
        list: {
          bgColor: 'bg.subtle',
          border: 'default',
          rounded: 'lg',
          p: '4',
        },
        trigger: {
          rounded: 'md',
          flex: 1,
          // Honor `tone`/`colorPalette` like `pills` does — the selected segment is
          // branded, not a neutral grey. A neutral look is opt-in via `tone`.
          '&[data-state="active"]': { color: 'colorPalette.contrast' },
        },
        indicator: {
          bgColor: 'colorPalette.solid',
          rounded: 'md',
          shadow: 'sm',
        },
      },
      pills: {
        list: { gap: '4' },
        trigger: {
          rounded: 'full',
          '&[data-state="active"]': { color: 'colorPalette.contrast' },
        },
        indicator: {
          bgColor: 'colorPalette.solid',
          rounded: 'full',
        },
      },
    },
    fitted: {
      true: { root: { w: 'full' }, list: { w: 'full' }, trigger: { flex: 1 } },
      false: {},
    },
  },
  defaultVariants: {
    fitted: false,
    size: 'md',
    variant: 'line',
  },
} satisfies RecipeConfig
