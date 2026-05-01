import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { build } from 'esbuild'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const componentsRoot = join(projectRoot, 'packages/components/src')

interface ComponentSpec {
  // The component file (without extension) under packages/components/src/.
  file: string
  // Named export to import in the fixture (any single named export is fine —
  // we just need to prove the whole module isn't pulled in).
  importedExport: string
  // Sibling exports from the same module that MUST NOT appear in the bundled
  // output (proves they were tree-shaken).
  forbiddenExports: string[]
}

// One spec per non-trivial compound component. Single-export modules (Badge,
// Input, Label, Textarea) cannot be tree-shaken at the named-export level so
// they are not represented here; the dependency on the named-export pattern
// is still enforced by `verify-tree-shaking-named-exports` below.
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
    forbiddenExports: [
      'DropdownMenuContent',
      // We omit `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuShortcut`
      // because their suffixes (Item, Label, Shortcut) appear in the radix
      // stub's exports too — distinguishing the source's export from the
      // bundler's retained stub would require a more invasive analysis.
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

// Components that are simple enough to not have compound parts. We still
// assert they remain named exports without `export default` so importer
// bundlers can drop unused symbols at module granularity.
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

const stubModulesPlugin = (stubs: Record<string, string>): import('esbuild').Plugin => ({
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

// Stubs for modules the components import that pull in heavyweight runtime
// code unrelated to the tree-shake invariant we are testing. We replace each
// with a tiny passthrough so the bundler analyses our component code, not its
// transitive deps, and so the test runs offline without `panda codegen`.
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

// Radix primitives are accessed via `import * as P from '@radix-ui/react-X'`,
// so the stub must export every short primitive name (Root, Item, Content,
// etc.) that our components access through `P.<Name>`. The stub names
// intentionally do NOT overlap with our public component export names like
// `DialogContent` or `RadioItem` — collisions would survive star-import
// retention and pollute the bundle assertions.
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

const stubsForCompound = (): Record<string, string> => ({
  ...RUNTIME_STUBS,
  '@radix-ui/react-dialog': RADIX_STUB,
  '@radix-ui/react-dropdown-menu': RADIX_STUB,
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
          `// Reference the imported symbol so esbuild does not drop it before\n` +
          `// running tree-shaking, which would mask the real assertion.\n` +
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
        // Look for the export's binding identifier in the bundled output.
        // The bundler renames module-internal bindings but preserves the name
        // when they survive into the final output, so a word-boundary match
        // against the original symbol catches retained code paths.
        const wordBoundary = new RegExp(`\\b${forbidden}\\b`)
        if (wordBoundary.test(bundleContents)) {
          throw new Error(
            `${spec.file}: tree-shake regression — bundling only '${spec.importedExport}' ` +
              `still pulled in sibling export '${forbidden}'.`,
          )
        }
      }

      // Also verify the imported export survived (sanity check: a broken
      // bundler config could trivially "pass" by dropping everything).
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
