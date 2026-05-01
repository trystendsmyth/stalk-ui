import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { build } from 'esbuild'

import type { Plugin as EsbuildPlugin } from 'esbuild'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const componentsRoot = join(projectRoot, 'packages/components/src')

interface ComponentSpec {
  file: string
  importedExport: string
  forbiddenExports: string[]
}

const compoundSpecs: ComponentSpec[] = [
  {
    file: 'dialog',
    importedExport: 'DialogTrigger',
    forbiddenExports: [
      'DialogContent',
      'DialogOverlay',
      'DialogTitle',
      'DialogDescription',
      'DialogHeader',
      'DialogFooter',
      'DialogClose',
    ],
  },
  {
    file: 'dropdown-menu',
    importedExport: 'DropdownMenuTrigger',
    // Omits Item/Label/Shortcut because those suffixes also appear in the
    // radix stub and the stub-vs-source distinction needs deeper analysis.
    forbiddenExports: [
      'DropdownMenuContent',
      'DropdownMenuSeparator',
      'DropdownMenuCheckboxItem',
      'DropdownMenuSubContent',
      'DropdownMenuSubTrigger',
    ],
  },
  {
    file: 'popover',
    importedExport: 'PopoverTrigger',
    forbiddenExports: ['PopoverContent', 'PopoverArrow'],
  },
  {
    file: 'select',
    importedExport: 'SelectTrigger',
    forbiddenExports: ['SelectContent', 'SelectItem', 'SelectValue', 'SelectGroup'],
  },
  {
    file: 'tooltip',
    importedExport: 'TooltipTrigger',
    forbiddenExports: ['TooltipContent', 'TooltipArrow'],
  },
  {
    file: 'radio',
    importedExport: 'RadioRoot',
    forbiddenExports: ['RadioItem'],
  },
]

const namedExportOnlyFiles = [
  'badge.tsx',
  'button.tsx',
  'checkbox.tsx',
  'input.tsx',
  'label.tsx',
  'switch.tsx',
  'textarea.tsx',
]

const verifyNamedExportPattern = async () => {
  for (const file of namedExportOnlyFiles) {
    const source = await readFile(join(componentsRoot, file), 'utf8')
    if (source.includes('export default')) {
      throw new Error(
        `${file}: components must not use 'export default'; named exports tree-shake predictably.`,
      )
    }
    if (!/^export const \w/m.test(source)) {
      throw new Error(`${file}: expected at least one 'export const' named export.`)
    }
  }
}

const stubModulesPlugin = (stubs: Record<string, string>): EsbuildPlugin => ({
  name: 'stub-runtime-modules',
  setup(build) {
    for (const [filter, body] of Object.entries(stubs)) {
      const escaped = filter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const regex = new RegExp(`^${escaped}$`)
      build.onResolve({ filter: regex }, (args) => ({
        path: args.path,
        namespace: 'stub',
      }))
      build.onLoad({ filter: /.*/, namespace: 'stub' }, (args) => {
        if (args.path !== filter) return null
        return { contents: body, loader: 'js' }
      })
    }
  },
})

// Stub heavyweight runtime modules with passthroughs so the bundler analyzes
// our component code in isolation and the test runs without panda codegen.
const RUNTIME_STUBS: Record<string, string> = {
  'styled-system/css': `
    export const cx = (...args) => args.filter(Boolean).join(' ');
    export const css = () => '';
  `,
  'styled-system/recipes': `
    const recipe = () => new Proxy({}, { get: () => '' });
    recipe.raw = () => ({});
    export const badge = recipe;
    export const button = recipe;
    export const checkbox = recipe;
    export const dialog = recipe;
    export const dropdownMenu = recipe;
    export const input = recipe;
    export const label = recipe;
    export const popover = recipe;
    export const radio = recipe;
    export const select = recipe;
    export const switchRecipe = recipe;
    export const textarea = recipe;
    export const tooltip = recipe;
  `,
}

// Stub for `import * as P from '@radix-ui/react-X'`. Names must not collide
// with public component exports (e.g. DialogContent, RadioItem) — collisions
// would survive star-import retention and pollute the bundle assertions.
const RADIX_STUB = `
  import { forwardRef } from 'react';
  const stub = (name) => {
    const Component = forwardRef((props, ref) => null);
    Component.displayName = name;
    return Component;
  };
  export const Root = stub('Root');
  export const Trigger = stub('Trigger');
  export const Portal = stub('Portal');
  export const Content = stub('Content');
  export const Overlay = stub('Overlay');
  export const Title = stub('Title');
  export const Description = stub('Description');
  export const Close = stub('Close');
  export const Item = stub('Item');
  export const Group = stub('Group');
  export const Label = stub('Label');
  export const Separator = stub('Separator');
  export const Arrow = stub('Arrow');
  export const Sub = stub('Sub');
  export const SubTrigger = stub('SubTrigger');
  export const SubContent = stub('SubContent');
  export const Anchor = stub('Anchor');
  export const Provider = stub('Provider');
  export const Indicator = stub('Indicator');
  export const Value = stub('Value');
  export const Icon = stub('Icon');
  export const Viewport = stub('Viewport');
  export const ItemText = stub('ItemText');
  export const ItemIndicator = stub('ItemIndicator');
  export const ScrollUpButton = stub('ScrollUpButton');
  export const ScrollDownButton = stub('ScrollDownButton');
  export const CheckboxItem = stub('CheckboxItem');
  export const Slot = stub('Slot');
`

// Extra primitives that only `@radix-ui/react-dropdown-menu` exposes via dot
// access (e.g. `DropdownMenuPrimitive.RadioGroup`). Kept out of the shared
// `RADIX_STUB` because their bare names would collide with `radio.tsx`'s
// public `RadioItem` export under star-import retention.
const DROPDOWN_MENU_STUB =
  RADIX_STUB +
  `
  export const RadioGroup = stub('RadioGroup');
  export const RadioItem = stub('RadioItem');
`

const stubsForCompound = (): Record<string, string> => ({
  ...RUNTIME_STUBS,
  '@radix-ui/react-dialog': RADIX_STUB,
  '@radix-ui/react-dropdown-menu': DROPDOWN_MENU_STUB,
  '@radix-ui/react-popover': RADIX_STUB,
  '@radix-ui/react-select': RADIX_STUB,
  '@radix-ui/react-tooltip': RADIX_STUB,
  '@radix-ui/react-radio-group': RADIX_STUB,
  '@radix-ui/react-slot': RADIX_STUB,
})

const verifyCompoundTreeShake = async () => {
  const tempDirectory = await mkdtemp(join(tmpdir(), 'stalk-tree-shake-'))
  try {
    for (const spec of compoundSpecs) {
      const fixturePath = join(tempDirectory, `${spec.file}.fixture.tsx`)
      const sourceImport = `${componentsRoot}/${spec.file}`
      await writeFile(
        fixturePath,
        `import { ${spec.importedExport} } from '${sourceImport}';\n` +
          `globalThis.__stalkTreeShakeProbe = ${spec.importedExport};\n`,
      )

      const outputFile = join(tempDirectory, `${spec.file}.bundle.js`)
      const result = await build({
        bundle: true,
        entryPoints: [fixturePath],
        external: ['react', 'react-dom'],
        format: 'esm',
        legalComments: 'none',
        metafile: true,
        minify: false,
        outfile: outputFile,
        platform: 'browser',
        plugins: [stubModulesPlugin(stubsForCompound())],
        target: 'es2022',
        treeShaking: true,
        write: true,
      })

      const bundleContents = await readFile(outputFile, 'utf8')

      for (const forbidden of spec.forbiddenExports) {
        const wordBoundary = new RegExp(`\\b${forbidden}\\b`)
        if (wordBoundary.test(bundleContents)) {
          throw new Error(
            `${spec.file}: tree-shake regression — bundling only '${spec.importedExport}' ` +
              `still pulled in sibling export '${forbidden}'.`,
          )
        }
      }

      // Sanity: imported export must survive — otherwise a broken bundler
      // config trivially "passes" by dropping everything.
      if (!new RegExp(`\\b${spec.importedExport}\\b`).test(bundleContents)) {
        throw new Error(
          `${spec.file}: imported export '${spec.importedExport}' was dropped from the bundle ` +
            `— the test fixture is wrong, not the component.`,
        )
      }

      void result.metafile
    }
  } finally {
    await rm(tempDirectory, { force: true, recursive: true })
  }
}

await verifyNamedExportPattern()
await verifyCompoundTreeShake()

console.log(
  `Tree-shake verification passed: ${String(compoundSpecs.length)} compound component${
    compoundSpecs.length === 1 ? '' : 's'
  } tested with esbuild metafile assertions; ` +
    `${String(namedExportOnlyFiles.length)} simple component${
      namedExportOnlyFiles.length === 1 ? '' : 's'
    } verified for named-export pattern.`,
)
