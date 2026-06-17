import { GripVertical } from 'lucide-react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { cx } from 'styled-system/css'
import { resizable as resizableRecipe } from 'styled-system/recipes'

import type { ComponentProps, FC } from 'react'

const styles = /* @__PURE__ */ resizableRecipe()

// react-resizable-panels exposes imperative handles (not DOM refs), so these are
// plain styled wrappers rather than forwardRef components.

export type ResizableRootProps = ComponentProps<typeof PanelGroup>

export const ResizableRoot: FC<ResizableRootProps> = function ResizableRoot({
  className,
  ...props
}) {
  return <PanelGroup className={cx(styles.root, className)} {...props} />
}

export type ResizablePanelProps = ComponentProps<typeof Panel>

export const ResizablePanel: FC<ResizablePanelProps> = function ResizablePanel({
  className,
  ...props
}) {
  return <Panel className={cx(styles.panel, className)} {...props} />
}

export interface ResizableHandleProps extends ComponentProps<typeof PanelResizeHandle> {
  /** Render a visible grip affordance centered on the handle. */
  withHandle?: boolean
}

export const ResizableHandle: FC<ResizableHandleProps> = function ResizableHandle({
  className,
  withHandle = false,
  ...props
}) {
  return (
    <PanelResizeHandle className={cx(styles.handle, className)} {...props}>
      {withHandle ? (
        <div className={styles.handleGrip}>
          <GripVertical aria-hidden="true" />
        </div>
      ) : null}
    </PanelResizeHandle>
  )
}

type ResizableNamespace = typeof ResizableRoot & {
  Handle: typeof ResizableHandle
  Panel: typeof ResizablePanel
  Root: typeof ResizableRoot
}

export const Resizable: ResizableNamespace = /* @__PURE__ */ Object.assign(ResizableRoot, {
  Handle: ResizableHandle,
  Panel: ResizablePanel,
  Root: ResizableRoot,
})
