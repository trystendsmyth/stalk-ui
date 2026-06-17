import { defineRegistryItem } from './_template'

// Option B (per the component roadmap): a thin theming contract. recharts is a
// consumer-provided peer and is intentionally NOT a registry dependency, so it is
// never bundled into the registry.
export const chart = defineRegistryItem({
  dependencies: ['@stalk-ui/preset'],
  filePath: 'src/components/ui/chart.tsx',
  name: 'chart',
  recipes: ['chart'],
  sourcePath: 'packages/components/src/chart.tsx',
})
