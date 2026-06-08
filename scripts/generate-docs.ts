import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

import { format, resolveConfig } from 'prettier'
import { Node, Project, SyntaxKind } from 'ts-morph'

import { registryItems } from '../registry/ui'

import { componentExamples } from './component-examples'

import type { InterfaceDeclaration, SourceFile, TypeLiteralNode, TypeNode } from 'ts-morph'

type PropSource = InterfaceDeclaration | TypeLiteralNode

interface ExtractedComponent {
  description: string
  displayName: string
  examples: string[]
  name: ComponentName
  propGroups: ExtractedPropGroup[]
  variants: ExtractedVariant[]
}

interface ExtractedPropGroup {
  label: string
  props: ExtractedProp[]
}

interface ExtractedProp {
  defaultValue?: string
  description: string
  name: string
  required: boolean
  type: string
}

interface ExtractedVariant {
  name: string
  values: string[]
}

type ComponentName = keyof typeof componentExamples

const componentDescriptions = {
  accordion: 'Reveals related content in vertically stacked, expandable sections.',
  alert: 'Surfaces an inline, persistent status message.',
  'alert-dialog': 'Interrupts with a modal that requires an explicit confirm or cancel.',
  avatar: 'Represents a user or entity with an image, initials, or fallback content.',
  badge: 'Displays compact status or metadata.',
  blockquote: 'Sets apart a quotation as a distinct block.',
  button: 'Triggers an action or submits a form.',
  card: 'Groups related content and actions on a single bordered surface.',
  checkbox: 'Toggles a binary option in a form or settings surface.',
  code: 'Marks inline code or a short command within running text.',
  collapsible: 'Toggles the visibility of a single content region.',
  'context-menu': 'Reveals a menu of actions on right-click or long-press.',
  dialog: 'Displays modal content in a focus-trapped overlay.',
  'dropdown-menu': 'Displays a keyboard-accessible menu of actions from a trigger.',
  heading: 'Titles a section with a semantic heading level.',
  input: 'Collects short-form text from a user.',
  kbd: 'Marks a keyboard key or shortcut.',
  label: 'Associates text with a form control.',
  link: 'Navigates to another page or resource.',
  menubar: 'Provides a persistent menu surface for top-level application commands.',
  popover: 'Displays interactive floating content from a trigger.',
  progress: 'Shows the completion progress of a task.',
  radio: 'Selects one option from a related set of choices.',
  select: 'Lets a user choose one option from a native menu.',
  sheet: 'Slides a panel in from a screen edge for secondary content or forms.',
  skeleton: 'Reserves layout space with a shimmering placeholder while content loads.',
  slider: 'Selects a numeric value or range along a track.',
  spinner: 'Indicates an indeterminate loading state with an accessible label.',
  switch: 'Toggles a setting on or off.',
  table: 'Presents rows and columns of data in an accessible HTML table.',
  tabs: 'Organizes related content into selectable panels.',
  tag: 'Labels content with a compact, optionally interactive chip.',
  text: 'Renders body text with consistent size, weight, and tone.',
  textarea: 'Collects multi-line text from a user.',
  toast: 'Surfaces transient notifications via a Sonner-backed toaster region.',
  toggle: 'A two-state button for inline preferences and toolbar controls.',
  tooltip: 'Provides supplemental context when a control is hovered or focused.',
} as const satisfies Record<ComponentName, string>

const project = new Project({
  tsConfigFilePath: 'packages/components/tsconfig.json',
})

const rootDirectory = process.cwd()
const generatedDirectory = join(rootDirectory, 'apps/docs/content/components')
const prettierConfig = await resolveConfig(join(generatedDirectory, 'component.mdx'))

const pascalCase = (name: string) =>
  name
    .split('-')
    .map((part) => `${part[0]?.toUpperCase() ?? ''}${part.slice(1)}`)
    .join('')

const markdownCell = (value: string) =>
  value.replaceAll('|', '\\|').replaceAll('\n', '<br />').replaceAll('`', '\\`')

const jsDocText = (node: Node) => {
  if (!Node.isJSDocable(node)) {
    return ''
  }

  return (
    node
      .getJsDocs()
      .map((doc) => doc.getDescription().trim())
      .find((description) => description.length > 0) ?? ''
  )
}

const jsDocDefault = (node: Node) => {
  if (!Node.isJSDocable(node)) {
    return undefined
  }

  const tag = node
    .getJsDocs()
    .flatMap((doc) => doc.getTags())
    .find((jsDocTag) => jsDocTag.getTagName() === 'default')

  return tag?.getCommentText()?.trim()
}

const findObjectLiteralProperty = (object: Node | undefined, name: string) => {
  if (object === undefined || !Node.isObjectLiteralExpression(object)) {
    return undefined
  }

  return object.getProperty(name)?.asKind(SyntaxKind.PropertyAssignment)?.getInitializer()
}

const objectKeys = (node: Node | undefined) => {
  if (node === undefined || !Node.isObjectLiteralExpression(node)) {
    return []
  }

  return node.getProperties().flatMap((property) => {
    if (Node.isPropertyAssignment(property)) {
      return [property.getName().replaceAll(/['"]/g, '')]
    }

    return []
  })
}

const extractMemberProps = (source: PropSource): ExtractedProp[] =>
  source.getProperties().map((property) => {
    const defaultValue = jsDocDefault(property)

    return {
      ...(defaultValue === undefined ? {} : { defaultValue }),
      description: jsDocText(property),
      name: property.getName(),
      required: !property.hasQuestionToken(),
      type: property.getTypeNode()?.getText() ?? property.getType().getText(property),
    }
  })

const resolvePropSources = (
  sourceFile: SourceFile,
  name: string,
  seen: Set<string> = new Set(),
): PropSource[] => {
  if (seen.has(name)) {
    return []
  }

  seen.add(name)

  const directInterface = sourceFile.getInterface(name)

  if (directInterface !== undefined) {
    return [directInterface]
  }

  const alias = sourceFile.getTypeAlias(name)
  const typeNode = alias?.getTypeNode()

  if (typeNode === undefined) {
    return []
  }

  return resolveTypeNodeSources(sourceFile, typeNode, seen)
}

const resolveTypeNodeSources = (
  sourceFile: SourceFile,
  typeNode: TypeNode,
  seen: Set<string>,
): PropSource[] => {
  if (Node.isTypeLiteral(typeNode)) {
    return [typeNode]
  }

  if (Node.isTypeReference(typeNode)) {
    return resolvePropSources(sourceFile, typeNode.getTypeName().getText(), seen)
  }

  if (Node.isIntersectionTypeNode(typeNode)) {
    return typeNode.getTypeNodes().flatMap((node) => resolveTypeNodeSources(sourceFile, node, seen))
  }

  return []
}

const slotLabel = (displayName: string, candidateName: string) => {
  const slot = candidateName.replace(/Props$/, '').slice(displayName.length)

  if (slot.length === 0) {
    return `<${displayName}>`
  }

  return `<${displayName}.${slot}>`
}

const extractPropGroups = (name: ComponentName): ExtractedPropGroup[] => {
  const sourceFile = project.getSourceFileOrThrow(`packages/components/src/${name}.tsx`)
  const displayName = pascalCase(name)
  const pattern = new RegExp(`^${displayName}.*Props$`)

  const candidateNames = [
    ...sourceFile.getInterfaces().map((decl) => decl.getName()),
    ...sourceFile.getTypeAliases().map((decl) => decl.getName()),
  ].filter((candidate) => pattern.test(candidate))

  // Stable order: bare `${DisplayName}Props` first (top-level), then alphabetical.
  candidateNames.sort((a, b) => {
    const aBare = a === `${displayName}Props`
    const bBare = b === `${displayName}Props`
    if (aBare !== bBare) return aBare ? -1 : 1
    return a.localeCompare(b)
  })

  const seenSources = new Set<PropSource>()
  const groups: ExtractedPropGroup[] = []

  for (const candidateName of candidateNames) {
    const sources = resolvePropSources(sourceFile, candidateName)
    const props: ExtractedProp[] = []
    const seenProps = new Set<string>()

    for (const source of sources) {
      if (seenSources.has(source)) {
        continue
      }

      seenSources.add(source)

      for (const prop of extractMemberProps(source)) {
        if (seenProps.has(prop.name)) {
          continue
        }
        seenProps.add(prop.name)
        props.push(prop)
      }
    }

    if (props.length === 0) {
      continue
    }

    groups.push({ label: slotLabel(displayName, candidateName), props })
  }

  return groups
}

const extractVariantsFromRecipe = (recipeName: string) => {
  const recipePaths = [
    join(rootDirectory, 'packages/preset/src/recipes', `${recipeName}.ts`),
    join(
      rootDirectory,
      'packages/preset/src/recipes',
      `${recipeName.replaceAll(/([A-Z])/g, '-$1').toLowerCase()}.ts`,
    ),
    join(rootDirectory, 'packages/preset/src/slot-recipes', `${recipeName}.ts`),
    join(
      rootDirectory,
      'packages/preset/src/slot-recipes',
      `${recipeName.replaceAll(/([A-Z])/g, '-$1').toLowerCase()}.ts`,
    ),
  ]
  const path = recipePaths.find((candidate) => existsSync(candidate))

  if (path === undefined) {
    return []
  }

  const sourceFile = project.getSourceFile(path) ?? project.addSourceFileAtPath(path)
  // Recipe variable usually matches the recipe name, but JS-reserved words
  // (e.g. `switch`) are exported as `${name}Recipe` instead.
  const declaration =
    sourceFile.getVariableDeclaration(recipeName) ??
    sourceFile.getVariableDeclaration(`${recipeName}Recipe`) ??
    sourceFile.getVariableDeclarations().find((variable) => variable.getName() === recipeName)
  const initializer = declaration?.getInitializer()
  const recipeObject = Node.isSatisfiesExpression(initializer)
    ? initializer.getExpression()
    : initializer
  const variantsObject = findObjectLiteralProperty(recipeObject, 'variants')

  return objectKeys(variantsObject).map((variantName) => {
    const valuesObject = findObjectLiteralProperty(variantsObject, variantName)

    return {
      name: variantName,
      values: objectKeys(valuesObject),
    }
  })
}

const extractDescription = (name: ComponentName) => {
  const sourceFile = project.getSourceFileOrThrow(`packages/components/src/${name}.tsx`)
  const displayName = pascalCase(name)
  const declaration = sourceFile.getVariableDeclaration(displayName)
  const description = declaration === undefined ? '' : jsDocText(declaration)

  if (description.length > 0) {
    return description
  }

  return componentDescriptions[name]
}

const extractComponent = (name: ComponentName): ExtractedComponent => {
  const item = registryItems.find((registryItem) => registryItem.name === name)

  if (item === undefined) {
    throw new Error(`Missing registry item for ${name}.`)
  }

  return {
    name,
    displayName: pascalCase(name),
    description: extractDescription(name),
    propGroups: extractPropGroups(name),
    variants: item.stalk.preset.recipes.flatMap(extractVariantsFromRecipe),
    examples: [...componentExamples[name]],
  }
}

const propsTable = (props: ExtractedProp[]) =>
  `| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
${props
  .map(
    (prop) =>
      `| \`${markdownCell(prop.name)}\` | \`${markdownCell(prop.type)}\` | ${
        prop.required ? 'Yes' : 'No'
      } | ${prop.defaultValue === undefined ? '-' : `\`${markdownCell(prop.defaultValue)}\``} | ${
        prop.description.length === 0 ? '-' : markdownCell(prop.description)
      } |`,
  )
  .join('\n')}`

const propsSection = (groups: ExtractedPropGroup[]) => {
  if (groups.length === 0) {
    return 'No component-specific props are documented yet. Primitive props pass through to the underlying element or Radix part.'
  }

  if (groups.length === 1 && groups[0] !== undefined) {
    return propsTable(groups[0].props)
  }

  return groups.map((group) => `### \`${group.label}\`\n\n${propsTable(group.props)}`).join('\n\n')
}

const variantsTable = (variants: ExtractedVariant[]) => {
  if (variants.length === 0) {
    return 'No recipe variants are documented for this component.'
  }

  return `| Variant | Values |
| --- | --- |
${variants
  .map(
    (variant) =>
      `| \`${markdownCell(variant.name)}\` | ${variant.values.map((value) => `\`${markdownCell(value)}\``).join(', ')} |`,
  )
  .join('\n')}`
}

const writeGeneratedDoc = async (component: ExtractedComponent) => {
  const item = registryItems.find((registryItem) => registryItem.name === component.name)

  if (item === undefined) {
    throw new Error(`Missing registry item for ${component.name}.`)
  }

  const name = component.name
  const path = join(generatedDirectory, `${name}.mdx`)
  const content = `---
title: ${component.displayName}
description: ${component.description}
---

<!-- This file is generated by scripts/generate-docs.ts. Do not edit manually. -->

# ${component.displayName}

${component.description}

## Install

\`\`\`bash
pnpm dlx @stalk-ui/cli add @stalk-ui/${name}
\`\`\`

## Examples

${component.examples
  .map(
    (
      example,
      index,
    ) => `<ComponentPreview slug="${name}" example={${String(index)}} code={\`${example}\`} />

\`\`\`tsx
${example}
\`\`\``,
  )
  .join('\n\n')}

## Props

${propsSection(component.propGroups)}

## Variants

${variantsTable(component.variants)}

## Registry

- Manifest: \`/r/${name}.json\`
- Recipe: \`${item.stalk.preset.recipes.join(', ')}\`
- Files: ${item.files.map((file) => `\`${file.path}\``).join(', ')}
`

  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, await format(content, { ...prettierConfig, filepath: path, parser: 'mdx' }))
}

// Docs are driven by `componentExamples`, but the source of truth for what
// exists is the registry. Fail loudly if they diverge so a new component can't
// be shipped without docs (and a stale example can't outlive its component).
const exampleNames = new Set(Object.keys(componentExamples))
const registryNames = new Set(registryItems.map((item) => item.name))
const missingExamples = [...registryNames].filter((name) => !exampleNames.has(name)).sort()
const orphanExamples = [...exampleNames].filter((name) => !registryNames.has(name)).sort()

if (missingExamples.length > 0 || orphanExamples.length > 0) {
  const problems = [
    ...missingExamples.map(
      (name) => `  - ${name}: registry component has no entry in scripts/component-examples.ts`,
    ),
    ...orphanExamples.map(
      (name) => `  - ${name}: component-examples entry has no matching registry item`,
    ),
  ]
  throw new Error(
    `Docs/registry parity check failed (every component needs docs examples):\n${problems.join('\n')}`,
  )
}

for (const name of Object.keys(componentExamples) as ComponentName[]) {
  await writeGeneratedDoc(extractComponent(name))
}
