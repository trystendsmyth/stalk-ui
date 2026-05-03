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
    description: 'Apply the neutral baseline or rainbow theme with PandaCSS theme attributes.',
    body: [
      'Stalk UI ships recipes, semantic tokens, and themes through @stalk-ui/preset.',
      'Use data-panda-theme="rainbow" on the whole app or a subtree to opt into the alternate built-in theme.',
    ],
  },
  {
    slug: 'custom-themes',
    title: 'Custom Themes',
    description: 'Extend the preset with your own PandaCSS theme definitions.',
    body: [
      'Keep presets: ["@stalk-ui/preset"] in panda.config.ts, then add custom themes through PandaCSS theme configuration.',
      'Apply custom themes with the same data-panda-theme attribute used by the built-in rainbow theme.',
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
  {
    slug: 'semantic-tokens',
    title: 'Semantic tokens',
    description:
      'Use semantic color tokens in components and recipes instead of raw palette steps.',
    body: [
      'Primitive Radix-style scales live in the preset as implementation detail; consumers and copied components should use semantic aliases such as bg.default, fg.muted, border.default, and accent.solid.',
      'Panda recipes should rely on semantic tokens and shared preset utilities; avoid raw hex except where the preset defines intentional contrast pairs.',
      'Themes such as rainbow remap semantic tokens; component source should not hardcode theme-specific values.',
    ],
  },
  {
    slug: 'typography',
    title: 'Typography',
    description:
      'Default UI font is Noto Sans (variable) in Stalk docs; the preset stays font-agnostic via CSS variables.',
    body: [
      '@stalk-ui/preset defines fonts.sans as var(--font-sans, system stack). Set --font-sans on :root (for example with next/font/google and Noto_Sans) so headings, body text, and components inherit your choice.',
      'Copied registry components never hardcode a font name; override --font-sans or replace the fonts.sans token in your Panda theme to use a different family.',
      'For multilingual apps, load a script-specific Noto Sans family first in the stack (Noto_Sans_Arabic, Noto_Sans_JP, etc.) and map locales to those loaders so only the glyphs you need are downloaded.',
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
  'spinner',
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
