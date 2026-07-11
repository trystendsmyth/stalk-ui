import { QrCode } from './qr-code'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Data Visualization/QR Code',
  component: QrCode,
  tags: ['autodocs', 'stable'],
  args: {
    'aria-label': 'QR code linking to example.com',
    bgColor: '#ffffff',
    ecLevel: 'M',
    fgColor: '#000000',
    qrStyle: 'squares',
    size: 160,
    value: 'https://example.com',
  },
  argTypes: {
    'aria-label': { control: 'text' },
    bgColor: { control: 'color' },
    className: { table: { disable: true } },
    ecLevel: { control: 'select', options: ['L', 'M', 'Q', 'H'] },
    fgColor: { control: 'color' },
    logoHeight: { table: { disable: true } },
    logoImage: { table: { disable: true } },
    logoOpacity: { table: { disable: true } },
    logoPadding: { table: { disable: true } },
    logoWidth: { table: { disable: true } },
    qrStyle: { control: 'select', options: ['squares', 'dots', 'fluid'] },
    size: { control: 'number' },
    value: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Renders a QR code via `react-qrcode-logo`, wrapped with an accessible `img` role and `aria-label`.',
      },
    },
  },
} satisfies Meta<typeof QrCode>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Styled: Story = {
  args: {
    qrStyle: 'dots',
    eyeRadius: 8,
    fgColor: '#4f46e5',
  },
}
