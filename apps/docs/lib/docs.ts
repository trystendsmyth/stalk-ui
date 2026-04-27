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
  props: ComponentProp[]
  registry: string[]
  slug: string
  title: string
  variants: ComponentVariant[]
}

export interface ComponentProp {
  defaultValue: string
  description: string
  name: string
  required: string
  type: string
}

export interface ComponentVariant {
  name: string
  values: string
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
  'popover',
  'radio',
  'select',
  'switch',
  'tooltip',
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

const sectionContent = (source: string, heading: string) => {
  const start = source.indexOf(`## ${heading}`)

  if (start === -1) {
    return ''
  }

  const next = source.indexOf('\n## ', start + 1)

  return source.slice(start, next === -1 ? undefined : next)
}

const tableRows = (source: string) =>
  source
    .split('\n')
    .filter((line) => line.startsWith('|') && !line.includes('---'))
    .slice(1)
    .map((line) =>
      line
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.trim().replaceAll('\\|', '|')),
    )

const propRows = (source: string) =>
  tableRows(sectionContent(source, 'Props')).map(
    ([name, type, required, defaultValue, description]) => ({
      defaultValue: defaultValue ?? '',
      description: description ?? '',
      name: name ?? '',
      required: required ?? '',
      type: type ?? '',
    }),
  )

const variantRows = (source: string) =>
  tableRows(sectionContent(source, 'Variants')).map(([name, values]) => ({
    name: name ?? '',
    values: values ?? '',
  }))

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
      props: propRows(source),
      registry: registryLines(source),
      variants: variantRows(source),
    }
  }) satisfies ComponentDoc[]
}

export const getComponentDoc = (slug: string) => getComponentDocs().find((doc) => doc.slug === slug)

export const getGettingStartedPage = (slug: string) =>
  gettingStartedPages.find((page) => page.slug === slug)

export const isLocale = (value: string): value is Locale => locales.includes(value as Locale)
