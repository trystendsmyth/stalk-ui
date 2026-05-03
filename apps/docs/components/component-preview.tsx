'use client'

import { Badge } from '@stalk-ui/components/badge'
import { Button } from '@stalk-ui/components/button'
import { Checkbox } from '@stalk-ui/components/checkbox'
import { Dialog } from '@stalk-ui/components/dialog'
import { DropdownMenu } from '@stalk-ui/components/dropdown-menu'
import { Input } from '@stalk-ui/components/input'
import { Label } from '@stalk-ui/components/label'
import { Popover } from '@stalk-ui/components/popover'
import { Radio } from '@stalk-ui/components/radio'
import { Select } from '@stalk-ui/components/select'
import { Spinner } from '@stalk-ui/components/spinner'
import { Switch } from '@stalk-ui/components/switch'
import { Textarea } from '@stalk-ui/components/textarea'
import { Tooltip } from '@stalk-ui/components/tooltip'
import { themes } from 'prism-react-renderer'
import { useId, useState } from 'react'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'

interface ComponentPreviewProps {
  code: string
}

type PreviewTheme = 'monochrome' | 'neutral' | 'rainbow'

/*
 * Scope exposed to live snippets. Snippets reference these names at the top
 * level (no imports required). Keep in sync with the components advertised
 * in the registry so docs examples stay editable end-to-end.
 */
const liveScope = {
  Badge,
  Button,
  Checkbox,
  Dialog,
  DropdownMenu,
  Input,
  Label,
  Popover,
  Radio,
  Select,
  Spinner,
  Switch,
  Textarea,
  Tooltip,
}

export const ComponentPreview = ({ code }: ComponentPreviewProps) => {
  const [showCode, setShowCode] = useState(true)
  const [theme, setTheme] = useState<PreviewTheme>('neutral')
  const themeLabelId = useId()

  return (
    <LiveProvider code={code} scope={liveScope} theme={themes.nightOwl}>
      <section className="component-preview">
        <div className="component-preview__toolbar">
          <div className="component-preview__theme">
            <span className="component-preview__label" id={themeLabelId}>
              Theme
            </span>
            <Select.Root
              value={theme}
              onValueChange={(value) => {
                setTheme(value as PreviewTheme)
              }}
            >
              <Select.Trigger aria-labelledby={themeLabelId} size="sm">
                <Select.Value />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="neutral">Neutral</Select.Item>
                <Select.Item value="rainbow">Rainbow</Select.Item>
                <Select.Item value="monochrome">Monochrome</Select.Item>
              </Select.Content>
            </Select.Root>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setShowCode((current) => !current)
            }}
          >
            {showCode ? 'Hide code' : 'Edit code'}
          </Button>
        </div>
        <div
          className="component-preview__rendered"
          data-panda-theme={theme === 'neutral' ? undefined : theme}
        >
          <LivePreview />
        </div>
        {showCode && (
          <div className="component-preview__code">
            <LiveEditor className="component-preview__editor" />
          </div>
        )}
        <LiveError className="component-preview__error" />
      </section>
    </LiveProvider>
  )
}
