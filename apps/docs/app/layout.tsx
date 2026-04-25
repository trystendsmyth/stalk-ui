import { RootProvider } from 'fumadocs-ui/provider'
import 'fumadocs-ui/style.css'

import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import './styles.css'

export const metadata: Metadata = {
  title: 'Stalk UI',
  description: 'PandaCSS-native component library documentation.',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
