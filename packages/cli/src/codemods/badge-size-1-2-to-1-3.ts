// Badge size ladder rename (1.2 → 1.3): the two-step scale grew to
// `micro | sm | md | lg`, where the new `lg` is the old `md` and the new `md`
// is the old `sm` (the default renders unchanged). Rewrites explicit `size`
// props on <Badge> elements: sm→md, md→lg. Handles string and braced-string
// JSX attribute forms; leave dynamic expressions to the type-checker.

const SIZE_RENAMES: Record<string, string> = { md: 'lg', sm: 'md' }

const badgeOpenTagPattern = /<Badge\b[^>]*?>/gs

const sizeAttributePattern = /(\bsize=)(?:"(sm|md)"|\{\s*['"](sm|md)['"]\s*\})/g

export const badgeSize12To13 = (source: string): string =>
  source.replace(badgeOpenTagPattern, (tag) =>
    tag.replace(sizeAttributePattern, (_match, lead: string, quoted?: string, braced?: string) => {
      const size = quoted ?? braced ?? ''
      const renamed = SIZE_RENAMES[size] ?? size
      return quoted !== undefined ? `${lead}"${renamed}"` : `${lead}{'${renamed}'}`
    }),
  )
