import { defineRegistryLib } from './_template'
import { STALK_UTILS_LIBS } from './utils-exports'

import type { RegistrySource } from '../ui/_template'

export const registryLibs: RegistrySource[] = STALK_UTILS_LIBS.map((lib) =>
  defineRegistryLib({
    dependencies: lib.dependencies,
    filePath: lib.filePath,
    name: lib.name,
    sourcePath: lib.sourcePath,
  }),
)
