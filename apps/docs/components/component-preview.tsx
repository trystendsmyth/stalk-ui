'use client'

import { Accordion } from '@stalk-ui/components/accordion'
import { Alert } from '@stalk-ui/components/alert'
import { AlertDialog } from '@stalk-ui/components/alert-dialog'
import { Avatar } from '@stalk-ui/components/avatar'
import { Badge } from '@stalk-ui/components/badge'
import { Blockquote } from '@stalk-ui/components/blockquote'
import { Button } from '@stalk-ui/components/button'
import { Card } from '@stalk-ui/components/card'
import { Checkbox } from '@stalk-ui/components/checkbox'
import { Code } from '@stalk-ui/components/code'
import { Collapsible } from '@stalk-ui/components/collapsible'
import { ContextMenu } from '@stalk-ui/components/context-menu'
import { Dialog } from '@stalk-ui/components/dialog'
import { DropdownMenu } from '@stalk-ui/components/dropdown-menu'
import { Heading } from '@stalk-ui/components/heading'
import { Input } from '@stalk-ui/components/input'
import { Kbd } from '@stalk-ui/components/kbd'
import { Label } from '@stalk-ui/components/label'
import { Link } from '@stalk-ui/components/link'
import { Menubar } from '@stalk-ui/components/menubar'
import { Popover } from '@stalk-ui/components/popover'
import { Progress } from '@stalk-ui/components/progress'
import { Radio } from '@stalk-ui/components/radio'
import { Select } from '@stalk-ui/components/select'
import { Sheet } from '@stalk-ui/components/sheet'
import { Skeleton } from '@stalk-ui/components/skeleton'
import { Slider } from '@stalk-ui/components/slider'
import { Spinner } from '@stalk-ui/components/spinner'
import { Switch } from '@stalk-ui/components/switch'
import { Table } from '@stalk-ui/components/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@stalk-ui/components/tabs'
import { Tag } from '@stalk-ui/components/tag'
import { Text } from '@stalk-ui/components/text'
import { Textarea } from '@stalk-ui/components/textarea'
import { Toaster, toast } from '@stalk-ui/components/toast'
import { Toggle, ToggleGroup, ToggleGroupItem } from '@stalk-ui/components/toggle'
import { Tooltip } from '@stalk-ui/components/tooltip'
import { AlertCircle, AlertTriangle, Info, X } from 'lucide-react'
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
  Accordion,
  Alert,
  AlertDialog,
  AlertCircle,
  AlertTriangle,
  Avatar,
  Badge,
  Blockquote,
  Button,
  Card,
  Checkbox,
  Code,
  Collapsible,
  ContextMenu,
  Dialog,
  DropdownMenu,
  Heading,
  Info,
  Input,
  Kbd,
  Label,
  Link,
  Menubar,
  Popover,
  Progress,
  Radio,
  Select,
  Sheet,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Table,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tag,
  Text,
  Textarea,
  Toaster,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  X,
  toast,
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
