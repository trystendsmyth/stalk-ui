import { forwardRef } from 'react'
import { QRCode } from 'react-qrcode-logo'
import { cx } from 'styled-system/css'
import { qrCode as qrCodeRecipe } from 'styled-system/recipes'

import type { ComponentProps } from 'react'

export type QrCodeProps = ComponentProps<typeof QRCode> & {
  className?: string
  /**
   * Accessible name announced for the generated code. The underlying canvas is
   * decorative, so the wrapper exposes the `img` role with this label.
   */
  'aria-label'?: string
}

export const QrCode = /* @__PURE__ */ forwardRef<HTMLDivElement, QrCodeProps>(function QrCode(
  { className, 'aria-label': ariaLabel = 'QR code', ...props },
  ref,
) {
  return (
    <div ref={ref} role="img" aria-label={ariaLabel} className={cx(qrCodeRecipe(), className)}>
      <QRCode {...props} />
    </div>
  )
})
