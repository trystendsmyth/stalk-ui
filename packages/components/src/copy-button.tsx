'use client'

import { Check, Copy } from 'lucide-react'
import { forwardRef, useEffect, useRef, useState } from 'react'

import { Button } from './button'
import { Swap } from './swap'

import type { ButtonProps } from './button'

export interface CopyButtonProps extends Omit<ButtonProps, 'onCopy' | 'value'> {
  /** Text written to the clipboard. */
  value: string
  /** Visible/accessible label; omit for an icon-only button with aria-label. */
  label?: string
  /** Label swapped in while the copied state is active. */
  copiedLabel?: string
  /** How long the copied state lasts, in ms. */
  timeout?: number
}

/** Clipboard button with a transient copied confirmation. Composes Button. */
export const CopyButton = /* @__PURE__ */ forwardRef<HTMLButtonElement, CopyButtonProps>(
  function CopyButton(
    {
      copiedLabel = 'Copied',
      label = 'Copy',
      size = 'sm',
      timeout = 1500,
      value,
      variant = 'ghost',
      ...props
    },
    ref,
  ) {
    const [copied, setCopied] = useState(false)
    const timer = useRef<number>(undefined)

    useEffect(
      () => () => {
        window.clearTimeout(timer.current)
      },
      [],
    )

    const onCopy = () => {
      void navigator.clipboard.writeText(value).then(() => {
        setCopied(true)
        window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => {
          setCopied(false)
        }, timeout)
      })
    }

    return (
      <Button ref={ref} size={size} type="button" variant={variant} onClick={onCopy} {...props}>
        <Swap effect="rotate" off={<Copy size={16} />} on={<Check size={16} />} swap={copied} />
        {copied ? copiedLabel : label}
      </Button>
    )
  },
)
