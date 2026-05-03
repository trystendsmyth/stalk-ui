'use client'

import { Button } from '@stalk-ui/components/button'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

interface InstallCommandProps {
  command: string
}

export const InstallCommand = ({ command }: InstallCommandProps) => {
  const [copied, setCopied] = useState(false)

  const onCopy = () => {
    void navigator.clipboard.writeText(command).then(() => {
      setCopied(true)
      window.setTimeout(() => {
        setCopied(false)
      }, 1500)
    })
  }

  return (
    <div className="install-command">
      <pre className="install-command__pre">
        <code>
          <span aria-hidden="true" className="install-command__prompt">
            $
          </span>
          <span>{command}</span>
        </code>
      </pre>
      <Button
        aria-label={copied ? 'Copied' : 'Copy install command'}
        size="sm"
        type="button"
        variant="ghost"
        onClick={onCopy}
      >
        {copied ? (
          <Check aria-hidden="true" height={16} width={16} />
        ) : (
          <Copy aria-hidden="true" height={16} width={16} />
        )}
        {copied ? 'Copied' : 'Copy'}
      </Button>
    </div>
  )
}
