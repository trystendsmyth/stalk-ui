import { readFileSync, readdirSync } from 'node:fs'
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
    slug: 'registry',
    title: 'Registry',
    description: 'Install source components from the native or shadcn-compatible registry.',
    body: [
      'Native manifests live under /r/*.json and are consumed by the Stalk UI CLI.',
      'Compatibility manifests live under /r/shadcn/*.json for mixed shadcn and Stalk projects: `npx shadcn@latest add https://stalk-ui.com/r/shadcn/<component>.json` installs the same Panda-native source through the shadcn CLI, including Stalk lib helpers (inlined) and the `@stalk-ui/preset` dependency. The flow is exercised in CI against the current shadcn release.',
      '**Owning the code without owning the drift.** `add` records each install (manifest URL, file hashes, and a pristine base copy) under `.stalk-ui/` — commit that directory. `stalk-ui upgrade` then performs a real three-way merge per file: base snapshot × your local edits × the new registry version. Clean merges keep both sides; true overlaps get git-style conflict markers. `stalk-ui drift` (and the `trystendsmyth/stalk-ui/actions/drift` GitHub Action) reports when the registry has moved past your recorded base — local edits alone never fail the check.',
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
  {
    slug: 'customization',
    title: 'Customization',
    description: 'Theme, override recipes, and tune surfaces — without forking component source.',
    body: [
      'Customize Stalk at three levels — full themes via `defineTheme`, recipe overrides in your `panda.config`, and per-instance props or tokens. Try the interactive card and theme builder below.',
      '**Themes.** `@stalk-ui/preset/theme` exports `defineTheme`, which generates the entire semantic surface (background, foreground, border, accent, status, highlight) from a couple of Radix scale names. Register the result under `themes` in `panda.config.ts`, add it to `staticCss.themes`, and apply it with the `data-panda-theme` attribute.',
      '**Recipe overrides.** Adjust any Stalk recipe from your own `panda.config.ts` with `theme.extend`. Slot recipes (Card, Select, Tabs, Table) extend under `theme.extend.slotRecipes.<name>`; single-element recipes (Button, Badge) under `theme.extend.recipes.<name>`. For example, set `theme.extend.recipes.button.defaultVariants` to make outline / sm your app default — Stalk’s internal components pin their variants explicitly, so they are unaffected.',
      '**Elevation.** The model is page = `bg.canvas`, surfaces = `bg.default`: `bg.canvas` sits one step under `bg.default`, so raised surfaces read as elevated. Set your page background to `bg.canvas` and cards on the default `bg.default` pop automatically; if your page must stay `bg.default`, reach for `<Card variant="elevated">` instead of overriding the card recipe’s base background.',
    ],
  },
] satisfies GettingStartedPage[]

const contentDirectory = join(process.cwd(), 'content/components')

export interface ComponentGroup {
  slugs: string[]
  title: string
}

/**
 * Mirrors the Storybook `Components/<category>` grouping so the docs index and
 * Storybook stay in lockstep. Every generated component doc must belong to
 * exactly one group; `getComponentDocs` throws if the on-disk docs and these
 * groups drift apart.
 */
export const componentGroups = [
  {
    title: 'Typography',
    slugs: ['text', 'heading', 'blockquote', 'code', 'kbd', 'link'],
  },
  {
    title: 'Forms',
    slugs: [
      'button',
      'calendar',
      'checkbox',
      'color-picker',
      'combobox',
      'date-picker',
      'datetime-input',
      'form',
      'format-input',
      'input',
      'label',
      'number-input',
      'otp-input',
      'password-input',
      'phone-input',
      'radio',
      'copy-button',
      'editable',
      'file-upload',
      'rating',
      'search-input',
      'select',
      'slider',
      'switch',
      'tags-input',
      'textarea',
      'time-picker',
      'toggle',
    ],
  },
  {
    title: 'Data Display',
    slugs: [
      'avatar',
      'badge',
      'card',
      'chart',
      'data-list',
      'data-table',
      'data-table-advanced',
      'empty-state',
      'heatmap',
      'qr-code',
      'sparkline',
      'stat',
      'table',
      'tag',
      'timeline',
      'tree-view',
    ],
  },
  {
    title: 'Feedback',
    slugs: ['alert', 'progress', 'skeleton', 'spinner', 'toast'],
  },
  {
    title: 'Overlay',
    slugs: [
      'alert-dialog',
      'dialog',
      'drawer',
      'hover-card',
      'popover',
      'sheet',
      'tooltip',
      'tour',
    ],
  },
  {
    title: 'Navigation',
    slugs: [
      'breadcrumb',
      'command',
      'context-menu',
      'dropdown-menu',
      'menubar',
      'navigation-menu',
      'pagination',
      'sidebar',
      'steps',
      'tabs',
      'toolbar',
    ],
  },
  {
    title: 'Disclosure',
    slugs: ['accordion', 'collapsible'],
  },
  {
    title: 'Layout',
    slugs: ['aspect-ratio', 'carousel', 'resizable', 'scroll-area', 'separator'],
  },
] satisfies ComponentGroup[]

const componentSlugs = componentGroups.flatMap((group) => group.slugs)

// Guard against drift between the generated docs on disk and the grouped slug
// list: a component with a doc but no group (or vice versa) would silently fall
// out of the explorer. Fail the build instead.
const assertDocsGrouped = () => {
  const generated = readdirSync(contentDirectory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.slice(0, -'.mdx'.length))
  const grouped = new Set(componentSlugs)
  const ungrouped = generated.filter((slug) => !grouped.has(slug)).sort()
  const missingDocs = componentSlugs.filter((slug) => !generated.includes(slug)).sort()

  if (ungrouped.length > 0 || missingDocs.length > 0) {
    const problems = [
      ...ungrouped.map(
        (slug) => `  - ${slug}: has a generated doc but is not in any componentGroups entry`,
      ),
      ...missingDocs.map(
        (slug) => `  - ${slug}: listed in componentGroups but has no generated doc`,
      ),
    ]
    throw new Error(`Component docs grouping is out of sync:\n${problems.join('\n')}`)
  }
}

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
  assertDocsGrouped()

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

export interface ComponentDocGroup {
  components: ComponentDoc[]
  title: string
}

/** Component docs bucketed into their Storybook-matching categories, in order. */
export const getComponentDocsByGroup = (): ComponentDocGroup[] => {
  const docs = getComponentDocs()

  return componentGroups.map((group) => ({
    title: group.title,
    components: group.slugs
      .map((slug) => docs.find((doc) => doc.slug === slug))
      .filter((doc): doc is ComponentDoc => doc !== undefined),
  }))
}

export const getGettingStartedPage = (slug: string) =>
  gettingStartedPages.find((page) => page.slug === slug)

export const isLocale = (value: string): value is Locale => locales.includes(value as Locale)
