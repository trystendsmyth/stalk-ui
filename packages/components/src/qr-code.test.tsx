import { render, screen } from '@testing-library/react'
import { afterAll, beforeAll, expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { QrCode } from './qr-code'

// jsdom ships no canvas implementation; react-qrcode-logo draws on mount. Return
// a no-op 2D context so the draw is harmless and the wrapper still renders.
beforeAll(() => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(
    () => new Proxy({}, { get: () => () => undefined }) as unknown as CanvasRenderingContext2D,
  )
  vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/png;base64,')
})

afterAll(() => {
  vi.restoreAllMocks()
})

test('exposes an accessible image without axe violations', async () => {
  const { container } = render(
    <QrCode value="https://example.com" aria-label="QR code linking to example.com" />,
  )
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('img', { name: 'QR code linking to example.com' })).toBeInTheDocument()
})

test('applies the recipe class to the wrapper', () => {
  render(<QrCode value="https://example.com" aria-label="QR" />)

  expect(screen.getByRole('img', { name: 'QR' })).toHaveClass('stalk-qr-code')
})
