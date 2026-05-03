import type { HTMLAttributes } from 'react'

// Test stub for `styled-system/jsx`. Mirrors the Panda-generated VisuallyHidden
// pattern (clip-path + 1px offscreen) so axe + Testing Library see expected
// semantics without pulling in the generated styled-system runtime.
export const VisuallyHidden = ({ children, ...props }: HTMLAttributes<HTMLSpanElement>) => (
  <span
    {...props}
    style={{
      border: 0,
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      whiteSpace: 'nowrap',
      width: 1,
      ...props.style,
    }}
  >
    {children}
  </span>
)
