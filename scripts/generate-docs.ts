import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

import { format, resolveConfig } from 'prettier'
import { Node, Project, SyntaxKind } from 'ts-morph'

import { registryItems } from '../registry/ui'

import { componentExamples } from './component-examples'

interface ExtractedComponent {
  description: string
  displayName: string
  examples: string[]
  name: ComponentName
  props: ExtractedProp[]
  variants: ExtractedVariant[]
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
  badge: 'Displays compact status or metadata.',
  button: 'Triggers an action or submits a form.',
  checkbox: 'Toggles a binary option in a form or settings surface.',
  dialog: 'Displays modal content in a focus-trapped overlay.',
  'dropdown-menu': 'Displays a keyboard-accessible menu of actions from a trigger.',
  input: 'Collects short-form text from a user.',
  label: 'Associates text with a form control.',
  popover: 'Displays interactive floating content from a trigger.',
  radio: 'Selects one option from a related set of choices.',
  select: 'Lets a user choose one option from a native menu.',
  spinner: 'Indicates an indeterminate loading state with an accessible label.',
  switch: 'Toggles a setting on or off.',
  textarea: 'Collects multi-line text from a user.',
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

const extractProps = (name: ComponentName) => {
  const sourceFile = project.getSourceFileOrThrow(`packages/components/src/${name}.tsx`)
  const propsInterface = sourceFile.getInterface(`${pascalCase(name)}Props`)

  if (propsInterface === undefined) {
    return []
  }

  return propsInterface.getProperties().map((property) => {
    const defaultValue = jsDocDefault(property)

    return {
      ...(defaultValue === undefined ? {} : { defaultValue }),
      description: jsDocText(property),
      name: property.getName(),
      required: !property.hasQuestionToken(),
      type: property.getTypeNode()?.getText() ?? property.getType().getText(property),
    }
  })
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
  const declaration =
    sourceFile.getVariableDeclaration(recipeName) ??
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
    props: extractProps(name),
    variants: item.stalk.preset.recipes.flatMap(extractVariantsFromRecipe),
    examples: [...componentExamples[name]],
  }
}

const propsTable = (props: ExtractedProp[]) => {
  if (props.length === 0) {
    return 'No component-specific props are documented yet. Primitive props pass through to the underlying element or Radix part.'
  }

  return `| Prop | Type | Required | Default | Description |
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

${propsTable(component.props)}

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

for (const name of Object.keys(componentExamples) as ComponentName[]) {
  await writeGeneratedDoc(extractComponent(name))
}
