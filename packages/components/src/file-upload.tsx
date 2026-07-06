'use client'

import { UploadCloud, X } from 'lucide-react'
import { forwardRef, useRef, useState } from 'react'
import { cx } from 'styled-system/css'
import { fileUpload as fileUploadRecipe } from 'styled-system/recipes'

import type { DragEvent, HTMLAttributes, ReactNode } from 'react'

const styles = /* @__PURE__ */ fileUploadRecipe()

export interface RejectedFile {
  file: File
  reason: 'size' | 'type'
}

export interface FileUploadProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Native accept filter, e.g. `"image/*,.pdf"`. Also validated on drop. */
  accept?: string
  multiple?: boolean
  /** Per-file size ceiling in bytes; larger files are rejected. */
  maxSize?: number
  disabled?: boolean
  /** Fires with the full selected list after every add/remove. */
  onFilesChange?: (files: File[]) => void
  /** Fires for drops/picks that fail the accept or maxSize checks. */
  onReject?: (rejected: RejectedFile[]) => void
  /** Dropzone headline. */
  label?: ReactNode
  /** Secondary hint line (formats, size limit). */
  hint?: ReactNode
  /** Accessible label for a file's remove button; receives the file name. */
  removeLabel?: (name: string) => string
}

const matchesAccept = (file: File, accept: string): boolean =>
  accept.split(',').some((raw) => {
    const pattern = raw.trim()
    if (pattern === '') {
      return true
    }
    if (pattern.startsWith('.')) {
      return file.name.toLowerCase().endsWith(pattern.toLowerCase())
    }
    if (pattern.endsWith('/*')) {
      return file.type.startsWith(pattern.slice(0, -1))
    }
    return file.type === pattern
  })

const formatSize = (bytes: number): string => {
  if (bytes >= 1_048_576) {
    return `${(bytes / 1_048_576).toFixed(1)} MB`
  }
  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(0)} KB`
  }
  return `${String(bytes)} B`
}

/**
 * Drag-and-drop file picker: a keyboard-activatable dropzone (hidden native
 * input) with accept/maxSize validation and a removable selected-file list.
 */
export const FileUpload = /* @__PURE__ */ forwardRef<HTMLDivElement, FileUploadProps>(
  function FileUpload(
    {
      accept,
      className,
      disabled = false,
      hint,
      label = 'Drag files here or click to browse',
      maxSize,
      multiple = false,
      onFilesChange,
      onReject,
      removeLabel = (name) => `Remove ${name}`,
      ...props
    },
    ref,
  ) {
    const [files, setFiles] = useState<File[]>([])
    const [dragging, setDragging] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const addFiles = (incoming: readonly File[]) => {
      const accepted: File[] = []
      const rejected: RejectedFile[] = []

      for (const file of incoming) {
        if (accept !== undefined && !matchesAccept(file, accept)) {
          rejected.push({ file, reason: 'type' })
        } else if (maxSize !== undefined && file.size > maxSize) {
          rejected.push({ file, reason: 'size' })
        } else {
          accepted.push(file)
        }
      }

      if (rejected.length > 0) {
        onReject?.(rejected)
      }

      if (accepted.length > 0) {
        const next = multiple ? [...files, ...accepted] : accepted.slice(0, 1)
        setFiles(next)
        onFilesChange?.(next)
      }
    }

    const removeFile = (index: number) => {
      const next = files.filter((_, i) => i !== index)
      setFiles(next)
      onFilesChange?.(next)
    }

    const onDrop = (event: DragEvent<HTMLButtonElement>) => {
      event.preventDefault()
      setDragging(false)
      if (!disabled) {
        addFiles([...event.dataTransfer.files])
      }
    }

    return (
      <div ref={ref} className={cx(styles.root, className)} {...props}>
        <button
          type="button"
          className={styles.dropzone}
          data-dragging={dragging ? '' : undefined}
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          onDragLeave={() => {
            setDragging(false)
          }}
          onDragOver={(event) => {
            event.preventDefault()
            if (!disabled) {
              setDragging(true)
            }
          }}
          onDrop={onDrop}
        >
          <span className={styles.icon} aria-hidden="true">
            <UploadCloud size={24} />
          </span>
          <span className={styles.label}>{label}</span>
          {hint !== undefined ? <span className={styles.hint}>{hint}</span> : null}
        </button>
        <input
          ref={inputRef}
          type="file"
          hidden
          accept={accept}
          multiple={multiple}
          onChange={(event) => {
            addFiles([...(event.target.files ?? [])])
            // Allow re-selecting the same file.
            event.target.value = ''
          }}
        />
        {files.length > 0 ? (
          <ul className={styles.list}>
            {files.map((file, index) => (
              <li key={`${file.name}:${String(index)}`} className={styles.item}>
                <span className={styles.itemName}>{file.name}</span>
                <span className={styles.itemSize}>{formatSize(file.size)}</span>
                <button
                  type="button"
                  aria-label={removeLabel(file.name)}
                  className={styles.remove}
                  onClick={() => {
                    removeFile(index)
                  }}
                >
                  <X size={14} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    )
  },
)
