import { RootProvider } from 'fumadocs-ui/provider'
import 'fumadocs-ui/style.css'

import { DocsI18nProvider } from '../components/i18n-provider'

import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import '../styled-system/styles.css'
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
        <RootProvider>
          <DocsI18nProvider>{children}</DocsI18nProvider>
        </RootProvider>
      </body>
    </html>
  )
}
