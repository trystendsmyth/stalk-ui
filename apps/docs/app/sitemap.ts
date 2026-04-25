import { getComponentDocs, gettingStartedPages, locales } from '../lib/docs'

import type { MetadataRoute } from 'next'

const siteUrl = 'https://stalk-ui.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) => [
    {
      url: `${siteUrl}/${locale}`,
      lastModified: new Date('2026-01-01'),
    },
    {
      url: `${siteUrl}/${locale}/docs`,
      lastModified: new Date('2026-01-01'),
    },
    {
      url: `${siteUrl}/${locale}/components`,
      lastModified: new Date('2026-01-01'),
    },
    ...gettingStartedPages.map((page) => ({
      url: `${siteUrl}/${locale}/docs/getting-started/${page.slug}`,
      lastModified: new Date('2026-01-01'),
    })),
    ...getComponentDocs().map((component) => ({
      url: `${siteUrl}/${locale}/components/${component.slug}`,
      lastModified: new Date('2026-01-01'),
    })),
  ])
}
