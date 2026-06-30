// AST audit: every subcomponent attached to a compound namespace via
// `Object.assign(Root, { ... })` must also be a named export of the same file.
// Accessing `Compound.Sub` inside a React Server Component yields `undefined`
// ("Element type is invalid"), so server files need a server-safe named import
// (e.g. `TooltipProvider`) for each part. This enforces that path exists.

import { readdirSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Project, SyntaxKind } from 'ts-morph'

import type { SourceFile } from 'ts-morph'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const componentsDir = resolve(projectRoot, 'packages/components/src')

const collectComponentFiles = (): string[] => {
  const out: string[] = []
  for (const entry of readdirSync(componentsDir)) {
    if (!entry.endsWith('.tsx')) continue
    if (entry.endsWith('.test.tsx') || entry.endsWith('.stories.tsx')) continue
    const full = join(componentsDir, entry)
    if (statSync(full).isFile()) out.push(full)
  }
  return out
}

const failures: string[] = []
const project = new Project({ skipFileDependencyResolution: true })

const auditFile = (sourceFile: SourceFile) => {
  const exportedNames = new Set(sourceFile.getExportedDeclarations().keys())
  for (const call of sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression)) {
    if (call.getExpression().getText() !== 'Object.assign') continue
    const objArg = call.getArguments()[1]
    if (objArg?.getKind() !== SyntaxKind.ObjectLiteralExpression) continue

    for (const prop of objArg.asKindOrThrow(SyntaxKind.ObjectLiteralExpression).getProperties()) {
      // `{ Sub }` (shorthand) or `{ Name: Sub }` — the referenced identifier must export.
      let identifier: string | undefined
      if (prop.getKind() === SyntaxKind.ShorthandPropertyAssignment) {
        identifier = prop.asKindOrThrow(SyntaxKind.ShorthandPropertyAssignment).getName()
      } else if (prop.getKind() === SyntaxKind.PropertyAssignment) {
        const initializer = prop.asKindOrThrow(SyntaxKind.PropertyAssignment).getInitializer()
        if (initializer?.getKind() === SyntaxKind.Identifier) identifier = initializer.getText()
      }
      if (identifier === undefined) continue

      if (!exportedNames.has(identifier)) {
        const { line } = sourceFile.getLineAndColumnAtPos(prop.getStart())
        failures.push(
          `${sourceFile.getFilePath()}:${String(line)}: '${identifier}' is attached to a compound namespace but is not a named export — add 'export' so React Server Components can import it directly.`,
        )
      }
    }
  }
}

const files = collectComponentFiles()
for (const filePath of files) {
  auditFile(project.addSourceFileAtPath(filePath))
}

if (failures.length > 0) {
  console.error('RSC named-export audit failed:')
  for (const failure of failures) console.error(`  - ${failure}`)
  process.exit(1)
}

console.log(`RSC named-export audit passed across ${String(files.length)} component files.`)
