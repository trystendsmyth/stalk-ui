// Hover/active gated off on disabled controls. Not `pointer-events: none` —
// that also kills cursor/`title`/tooltips and lets clicks fall through.
export const conditions = {
  enabledActive:
    '&:is(:active, [data-active]):not(:disabled, [disabled], [data-disabled], [aria-disabled=true])',
  enabledHover:
    '&:is(:hover, [data-hover]):not(:disabled, [disabled], [data-disabled], [aria-disabled=true])',
}
