import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Project, SyntaxKind } from 'ts-morph'

import { registryItems } from '../registry/ui'

import type { ImportDeclaration } from 'ts-morph'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

// Specifiers that are not declared dependencies because the consumer
// provides them (React, Panda codegen output, or copied registry deps).
const ALLOWED_NON_DEP_MODULES = new Set(['react', 'react-dom'])

const ALLOWED_NON_DEP_PREFIXES = ['styled-system/', '@stalk-ui/utils']

const isRelativeSpecifier = (specifier: string) =>
  specifier.startsWith('.') || specifier.startsWith('/')

const isNodeBuiltin = (specifier: string) => specifier.startsWith('node:')

const isAllowedNonDep = (specifier: string) => {
  if (ALLOWED_NON_DEP_MODULES.has(specifier)) return true
  return ALLOWED_NON_DEP_PREFIXES.some((prefix) => specifier.startsWith(prefix))
}

const packageNameFromSpecifier = (specifier: string): string => {
  if (specifier.startsWith('@')) {
    const [scope, name] = specifier.split('/')
    return `${scope ?? ''}/${name ?? ''}`
  }
  return specifier.split('/')[0] ?? specifier
}

const collectExternalPackages = (sourcePath: string): Set<string> => {
  const project = new Project({ useInMemoryFileSystem: false })
  const source = project.addSourceFileAtPath(sourcePath)

  const declarations: ImportDeclaration[] = source.getImportDeclarations()
  const externals = new Set<string>()

  for (const declaration of declarations) {
    const specifier = declaration.getModuleSpecifierValue()
    if (isRelativeSpecifier(specifier) || isNodeBuiltin(specifier) || isAllowedNonDep(specifier)) {
      continue
    }
    externals.add(packageNameFromSpecifier(specifier))
  }

  for (const expression of source.getDescendantsOfKind(SyntaxKind.CallExpression)) {
    if (expression.getExpression().getKind() !== SyntaxKind.ImportKeyword) continue
    const [argument] = expression.getArguments()
    if (argument?.getKind() !== SyntaxKind.StringLiteral) continue
    const specifier = argument.asKindOrThrow(SyntaxKind.StringLiteral).getLiteralText()
    if (isRelativeSpecifier(specifier) || isNodeBuiltin(specifier) || isAllowedNonDep(specifier)) {
      continue
    }
    externals.add(packageNameFromSpecifier(specifier))
  }

  return externals
}

const failures: string[] = []

for (const item of registryItems) {
  const declaredDependencies = new Set(item.dependencies)
  // Preset is required by every component but never imported directly.
  declaredDependencies.add('@stalk-ui/preset')

  for (const file of item.files) {
    if (!file.sourcePath) continue
    const absoluteSource = resolve(projectRoot, file.sourcePath)

    let externals: Set<string>
    try {
      externals = collectExternalPackages(absoluteSource)
    } catch (error) {
      failures.push(`${item.name}: failed to parse ${file.sourcePath}: ${(error as Error).message}`)
      continue
    }

    for (const external of externals) {
      if (!declaredDependencies.has(external)) {
        failures.push(
          `${item.name}: source imports '${external}' but registry manifest does not declare it in 'dependencies'.`,
        )
      }
    }
  }
}

// Inverse drift: declared but never imported.
for (const item of registryItems) {
  const sourcePaths = item.files
    .map((file) => file.sourcePath)
    .filter((sourcePath): sourcePath is string => Boolean(sourcePath))
  if (sourcePaths.length === 0) continue

  const allExternals = new Set<string>()
  for (const sourcePath of sourcePaths) {
    const absoluteSource = resolve(projectRoot, sourcePath)
    try {
      for (const external of collectExternalPackages(absoluteSource)) {
        allExternals.add(external)
      }
    } catch {
      continue
    }
  }

  for (const declared of item.dependencies) {
    if (declared === '@stalk-ui/preset') continue
    if (!allExternals.has(declared)) {
      failures.push(
        `${item.name}: manifest declares dependency '${declared}' but no source file imports it.`,
      )
    }
  }
}

if (failures.length > 0) {
  console.error('Registry dependency drift detected:')
  for (const failure of failures) {
    console.error(`  - ${failure}`)
  }
  console.error(
    `\n${String(failures.length)} drift issue${failures.length === 1 ? '' : 's'} found. ` +
      'Update the affected registry manifests in registry/ui/<name>.ts to match the actual imports.',
  )
  process.exit(1)
}

const sourceFileCount = registryItems.reduce(
  (count, item) => count + item.files.filter((file) => Boolean(file.sourcePath)).length,
  0,
)

console.log(
  `Registry dependency check passed: ${String(registryItems.length)} component${
    registryItems.length === 1 ? '' : 's'
  } verified across ${String(sourceFileCount)} source file${sourceFileCount === 1 ? '' : 's'}.`,
)
