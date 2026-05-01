// AST audit: color values in recipes, slot recipes, and component sources
// must be semantic-token references. Raw hex/rgb/hsl/named colors fail CI.

import { readdirSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Project, SyntaxKind } from 'ts-morph'

import type { SourceFile } from 'ts-morph'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const directoriesToScan = [
  'packages/preset/src/recipes',
  'packages/preset/src/slot-recipes',
  'packages/components/src',
]

const COLOR_PROPERTY_KEYS = new Set([
  'background',
  'backgroundColor',
  'bg',
  'border',
  'borderBlockColor',
  'borderBlockEndColor',
  'borderBlockStartColor',
  'borderBottomColor',
  'borderColor',
  'borderInlineColor',
  'borderInlineEndColor',
  'borderInlineStartColor',
  'borderLeftColor',
  'borderRightColor',
  'borderTopColor',
  'boxShadow',
  'caretColor',
  'color',
  'columnRuleColor',
  'fill',
  'outlineColor',
  'stroke',
  'textDecorationColor',
])

const ALLOWED_RAW_COLOR_LITERALS = new Set([
  'currentColor',
  'inherit',
  'initial',
  'transparent',
  'unset',
  'none',
])

const isRawColorLiteral = (value: string): boolean => {
  const trimmed = value.trim()
  if (trimmed === '') return false
  if (ALLOWED_RAW_COLOR_LITERALS.has(trimmed)) return false
  // Panda token refs: `{colors.fg.muted}` or bare paths like `fg.muted`.
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) return false
  if (/^[a-z][\w]*(\.[\w]+)+$/i.test(trimmed)) return false
  if (/^#([0-9a-f]{3,4}){1,2}$/i.test(trimmed)) return true
  if (/^(rgb|rgba|hsl|hsla|oklch|oklab|lab|lch|color)\s*\(/i.test(trimmed)) return true
  if (/^(red|blue|green|yellow|orange|purple|pink|gray|grey|black|white)$/i.test(trimmed)) {
    return true
  }
  return false
}

const collectFiles = (directory: string): string[] => {
  const out: string[] = []
  const absoluteDir = resolve(projectRoot, directory)
  const walk = (current: string) => {
    for (const entry of readdirSync(current)) {
      const full = join(current, entry)
      if (statSync(full).isDirectory()) {
        walk(full)
        continue
      }
      if (entry.endsWith('.ts') || entry.endsWith('.tsx') || entry.endsWith('.stories.tsx')) {
        if (entry === 'index.ts') continue
        out.push(full)
      }
    }
  }
  walk(absoluteDir)
  return out
}

const failures: string[] = []

const project = new Project({ skipFileDependencyResolution: true })

const auditSourceFile = (sourceFile: SourceFile) => {
  const properties = sourceFile.getDescendantsOfKind(SyntaxKind.PropertyAssignment)
  for (const prop of properties) {
    const nameNode = prop.getNameNode()
    let propertyName: string
    if (nameNode.getKind() === SyntaxKind.Identifier) {
      propertyName = nameNode.getText()
    } else if (nameNode.getKind() === SyntaxKind.StringLiteral) {
      propertyName = nameNode.asKindOrThrow(SyntaxKind.StringLiteral).getLiteralText()
    } else {
      continue
    }

    if (!COLOR_PROPERTY_KEYS.has(propertyName)) continue

    const initializer = prop.getInitializer()
    if (!initializer) continue
    if (initializer.getKind() === SyntaxKind.StringLiteral) {
      const value = initializer.asKindOrThrow(SyntaxKind.StringLiteral).getLiteralText()
      if (isRawColorLiteral(value)) {
        const { line } = sourceFile.getLineAndColumnAtPos(prop.getStart())
        failures.push(
          `${sourceFile.getFilePath()}:${String(line)}: '${propertyName}: ${JSON.stringify(value)}' uses a raw color literal — use a semantic token like 'fg.muted' or '{colors.bg.default}'.`,
        )
      }
    } else if (initializer.getKind() === SyntaxKind.NoSubstitutionTemplateLiteral) {
      const value = initializer.getText().slice(1, -1)
      if (isRawColorLiteral(value)) {
        const { line } = sourceFile.getLineAndColumnAtPos(prop.getStart())
        failures.push(
          `${sourceFile.getFilePath()}:${String(line)}: '${propertyName}' uses a raw color literal — use a semantic token instead.`,
        )
      }
    }
  }
}

for (const directory of directoriesToScan) {
  for (const filePath of collectFiles(directory)) {
    const sourceFile = project.addSourceFileAtPath(filePath)
    auditSourceFile(sourceFile)
  }
}

if (failures.length > 0) {
  console.error('Semantic-token audit failed:')
  for (const failure of failures) {
    console.error(`  - ${failure}`)
  }
  console.error(
    `\n${String(failures.length)} raw color literal${failures.length === 1 ? '' : 's'} detected.`,
  )
  process.exit(1)
}

console.log(`Semantic-token audit passed across ${String(directoriesToScan.length)} directories.`)
