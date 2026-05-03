import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { RootProvider } from 'fumadocs-ui/provider/next'
import 'fumadocs-ui/style.css'

import { DocsI18nProvider } from '../components/i18n-provider'
import { notoSansBase, rootSansStackStyle } from '../lib/fonts'

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
    <html className={`dark ${notoSansBase.variable}`} lang="en" style={rootSansStackStyle}>
      <body>
        <RootProvider theme={{ enabled: false }}>
          <DocsI18nProvider>{children}</DocsI18nProvider>
        </RootProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
