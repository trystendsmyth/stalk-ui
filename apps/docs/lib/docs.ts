import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export const locales = ['en'] as const

export type Locale = (typeof locales)[number]

export interface GettingStartedPage {
  body: string[]
  description: string
  slug: string
  title: string
}

export interface ComponentDoc {
  description: string
  examples: string[]
  installCommand: string
  registry: string[]
  slug: string
  title: string
}

export const gettingStartedPages = [
  {
    slug: 'installation',
    title: 'Installation',
    description: 'Install the CLI and configure PandaCSS for Stalk UI.',
    body: [
      'Start in an existing React project that already uses PandaCSS, then run the init command.',
      'The CLI writes a stalk.config.json file, patches panda.config.ts with the Stalk preset, and installs the runtime packages.',
    ],
  },
  {
    slug: 'theming',
    title: 'Theming',
    description: 'Use preset options and named accent themes to adapt components.',
    body: [
      'Stalk UI ships recipes and semantic tokens through @stalk-ui/preset.',
      'Run stalk-ui theme <name> to register an additional accent theme for previews and product surfaces.',
    ],
  },
  {
    slug: 'registry',
    title: 'Registry',
    description: 'Install source components from the native or shadcn-compatible registry.',
    body: [
      'Native manifests live under /r/*.json and are consumed by the Stalk UI CLI.',
      'Compatibility manifests live under /r/shadcn/*.json for mixed shadcn and Stalk projects.',
    ],
  },
] satisfies GettingStartedPage[]

const contentDirectory = join(process.cwd(), 'content/components')
const componentSlugs = [
  'badge',
  'button',
  'checkbox',
  'dialog',
  'dropdown-menu',
  'input',
  'label',
  'radio',
  'select',
  'switch',
  'textarea',
] as const

const frontmatterValue = (source: string, key: string) => {
  const match = new RegExp(`^${key}:\\s*(.+)$`, 'm').exec(source)
  return match?.[1]?.trim() ?? ''
}

const fencedBlocks = (source: string) =>
  [...source.matchAll(/```(?:tsx|bash)\n([\s\S]*?)```/g)].map((match) => match[1]?.trim() ?? '')

const registryLines = (source: string) =>
  source
    .split('\n')
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2))

export const getComponentDocs = () => {
  return componentSlugs.map((slug) => {
    const source = readFileSync(join(contentDirectory, `${slug}.mdx`), 'utf8')
    const blocks = fencedBlocks(source)

    return {
      slug,
      title: frontmatterValue(source, 'title'),
      description: frontmatterValue(source, 'description'),
      installCommand: blocks[0] ?? '',
      examples: blocks.slice(1),
      registry: registryLines(source),
    }
  }) satisfies ComponentDoc[]
}

export const getComponentDoc = (slug: string) => getComponentDocs().find((doc) => doc.slug === slug)

export const getGettingStartedPage = (slug: string) =>
  gettingStartedPages.find((page) => page.slug === slug)

export const isLocale = (value: string): value is Locale => locales.includes(value as Locale)
