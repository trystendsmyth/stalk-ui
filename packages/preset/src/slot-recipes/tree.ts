import type { RecipeConfig } from '../types'

export const tree = {
  className: 'stalk-tree',
  jsx: ['Tree', /^Tree\./],
  description:
    'Slot recipe for Tree hierarchies (rows with expand chevrons, selection, nested groups, and optional indent guides).',
  slots: ['root', 'branch', 'row', 'indicator', 'label', 'group'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2',
      listStyle: 'none',
      m: '0',
      p: '0',
    },
    branch: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2',
      outline: 'none',
      '&:focus-visible > [data-tree-row]': {
        focusRingWidth: 'base',
        focusRingColor: 'accent.muted',
        focusRingOffsetWidth: '0',
      },
    },
    row: {
      alignItems: 'center',
      color: 'fg.default',
      cursor: 'pointer',
      display: 'flex',
      minW: '0',
      pe: 'var(--tree-px)',
      ps: 'var(--tree-px)',
      '[aria-disabled="true"] > &': { cursor: 'not-allowed', opacity: 0.5 },
    },
    indicator: {
      alignItems: 'center',
      color: 'fg.subtle',
      display: 'inline-flex',
      flexShrink: 0,
      justifyContent: 'center',
      transitionDuration: 'fast',
      transitionProperty: 'transform',
      '[aria-expanded="true"] > [data-tree-row] > &': { transform: 'rotate(90deg)' },
    },
    label: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    group: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2',
      listStyle: 'none',
      m: '0',
      p: '0',
      ps: 'var(--tree-indent)',
    },
  },
  variants: {
    // Row chrome for the whole tree, selected and not. Selection never
    // changes fontWeight — bolding on select reflows the label and reads as
    // movement.
    variant: {
      // Bare rows; selection is a tint (Radix step 5, the selected-state
      // step: visible in light mode and with the neutral tone group).
      ghost: {
        row: {
          _hover: { bgColor: 'bg.subtle' },
          '[aria-selected="true"] > &': {
            bgColor: 'accent.subtle',
            color: 'accent.text',
            _hover: { bgColor: 'accent.subtle' },
          },
        },
      },
      // Every row is a filled chip; selection swaps the fill to the accent.
      solid: {
        row: {
          bgColor: 'bg.subtle',
          _hover: { bgColor: 'bg.muted' },
          '[aria-selected="true"] > &': {
            bgColor: 'accent.solid',
            color: 'accent.contrast',
            _hover: { bgColor: 'accent.emphasis' },
          },
        },
      },
      // Every row carries an inset ring; selection recolors it to the accent.
      outline: {
        row: {
          boxShadow: 'inset 0 0 0 1px {colors.border.default}',
          _hover: { bgColor: 'bg.subtle' },
          '[aria-selected="true"] > &': {
            boxShadow: 'inset 0 0 0 1px {colors.accent.solid}',
            color: 'accent.text',
          },
        },
      },
    },
    // Geometry per size, exposed as vars so nesting math derives from them:
    // group indent = chevron + gap (child labels align with the parent
    // label); guide offset = row padding + half the chevron (rule centered
    // under the parent's chevron).
    size: {
      micro: {
        root: { '--tree-icon': '10px', '--tree-indent': '14px', '--tree-px': '6px' },
        row: { fontSize: '2xs', gap: '4', py: '1' },
        indicator: { '& svg': { boxSize: '10' } },
      },
      sm: {
        root: { '--tree-icon': '12px', '--tree-indent': '18px', '--tree-px': '8px' },
        row: { fontSize: 'xs', gap: '6', py: '2' },
        indicator: { '& svg': { boxSize: '12' } },
      },
      md: {
        root: { '--tree-icon': '14px', '--tree-indent': '22px', '--tree-px': '10px' },
        row: { gap: '8', py: '6', textStyle: 'bodySm' },
        indicator: { '& svg': { boxSize: '14' } },
      },
      lg: {
        root: { '--tree-icon': '16px', '--tree-indent': '26px', '--tree-px': '12px' },
        row: { fontSize: 'sm', gap: '10', py: '8' },
        indicator: { '& svg': { boxSize: '16' } },
      },
    },
    radius: {
      none: { row: { rounded: 'none' } },
      sm: { row: { rounded: 'sm' } },
      md: { row: { rounded: 'md' } },
      lg: { row: { rounded: 'lg' } },
      full: { row: { rounded: 'full' } },
    },
    guides: {
      false: {},
      // Vertical rule under each branch's chevron, tying children to their
      // parent; the per-size inline offset keeps it centered on the chevron.
      true: {
        group: {
          pos: 'relative',
          _before: {
            bgColor: 'border.default',
            content: '""',
            insetBlock: '0',
            insetInlineStart: 'calc(var(--tree-px) + var(--tree-icon) / 2)',
            pos: 'absolute',
            w: '1px',
            // Above the row fills (solid/fullWidth rows would otherwise chop
            // the rule into per-gap dashes); VS Code draws indent guides over
            // row highlights the same way.
            zIndex: '1',
          },
        },
      },
    },
    // Rows span the tree's full width at every depth — equal boxes, aligned
    // edges — with the indent moved inside the row via the `--tree-depth`
    // var the component sets on each group.
    fullWidth: {
      false: {},
      true: {
        row: {
          ps: 'calc(var(--tree-px) + var(--tree-depth, 0) * var(--tree-indent))',
        },
        group: { ps: '0' },
      },
    },
  },
  compoundVariants: [
    // Full-width guides: groups no longer indent, so the rule's offset is
    // recomputed from the parent row's depth.
    {
      fullWidth: true,
      guides: true,
      css: {
        group: {
          _before: {
            insetInlineStart:
              'calc(var(--tree-px) + (var(--tree-depth, 1) - 1) * var(--tree-indent) + var(--tree-icon) / 2)',
          },
        },
      },
    },
  ],
  defaultVariants: {
    fullWidth: false,
    guides: false,
    radius: 'sm',
    size: 'md',
    variant: 'ghost',
  },
} satisfies RecipeConfig
