import { diff3Merge } from 'node-diff3'

export interface MergeResult {
  conflicted: boolean
  content: string
}

export const CONFLICT_LOCAL_LABEL = 'local edits'
export const CONFLICT_REMOTE_LABEL = 'registry'

/**
 * Three-way merge of a registry-managed file: the recorded base (content as
 * installed), the local working copy (possibly edited), and the new registry
 * content. Clean merges keep both sides' changes; true conflicts are emitted
 * with git-style markers for the consumer to resolve.
 */
export const mergeThreeWay = (base: string, local: string, remote: string): MergeResult => {
  const regions = diff3Merge(local.split('\n'), base.split('\n'), remote.split('\n'), {
    excludeFalseConflicts: true,
  })

  const lines: string[] = []
  let conflicted = false

  for (const region of regions) {
    if (region.ok !== undefined) {
      lines.push(...region.ok)
      continue
    }

    if (region.conflict !== undefined) {
      conflicted = true
      lines.push(
        `<<<<<<< ${CONFLICT_LOCAL_LABEL}`,
        ...region.conflict.a,
        '=======',
        ...region.conflict.b,
        `>>>>>>> ${CONFLICT_REMOTE_LABEL}`,
      )
    }
  }

  return { conflicted, content: lines.join('\n') }
}
