'use client'

import { Accordion } from '@stalk-ui/components/accordion'
import { Alert } from '@stalk-ui/components/alert'
import { AlertDialog } from '@stalk-ui/components/alert-dialog'
import { AspectRatio } from '@stalk-ui/components/aspect-ratio'
import { Avatar } from '@stalk-ui/components/avatar'
import { Badge } from '@stalk-ui/components/badge'
import { Blockquote } from '@stalk-ui/components/blockquote'
import { Breadcrumb } from '@stalk-ui/components/breadcrumb'
import { Button } from '@stalk-ui/components/button'
import { Calendar } from '@stalk-ui/components/calendar'
import { Card } from '@stalk-ui/components/card'
import { Checkbox } from '@stalk-ui/components/checkbox'
import { Code } from '@stalk-ui/components/code'
import { Collapsible } from '@stalk-ui/components/collapsible'
import { Combobox } from '@stalk-ui/components/combobox'
import { Command } from '@stalk-ui/components/command'
import { ContextMenu } from '@stalk-ui/components/context-menu'
import { DataList } from '@stalk-ui/components/data-list'
import { DataTable } from '@stalk-ui/components/data-table'
import { DatePicker } from '@stalk-ui/components/date-picker'
import { DatetimeInput } from '@stalk-ui/components/datetime-input'
import { Dialog } from '@stalk-ui/components/dialog'
import { DropdownMenu } from '@stalk-ui/components/dropdown-menu'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@stalk-ui/components/form'
import { Heading } from '@stalk-ui/components/heading'
import { HoverCard } from '@stalk-ui/components/hover-card'
import { Input } from '@stalk-ui/components/input'
import { Kbd } from '@stalk-ui/components/kbd'
import { Label } from '@stalk-ui/components/label'
import { Link } from '@stalk-ui/components/link'
import { Menubar } from '@stalk-ui/components/menubar'
import { NavigationMenu } from '@stalk-ui/components/navigation-menu'
import { OtpInput } from '@stalk-ui/components/otp-input'
import { Pagination } from '@stalk-ui/components/pagination'
import { PhoneInput } from '@stalk-ui/components/phone-input'
import { Popover } from '@stalk-ui/components/popover'
import { Progress } from '@stalk-ui/components/progress'
import { QrCode } from '@stalk-ui/components/qr-code'
import { Radio } from '@stalk-ui/components/radio'
import { ScrollArea } from '@stalk-ui/components/scroll-area'
import { Select } from '@stalk-ui/components/select'
import { Separator } from '@stalk-ui/components/separator'
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
import { TimePicker } from '@stalk-ui/components/time-picker'
import { Toaster, toast } from '@stalk-ui/components/toast'
import { Toggle, ToggleGroup, ToggleGroupItem } from '@stalk-ui/components/toggle'
import { Toolbar } from '@stalk-ui/components/toolbar'
import { Tooltip } from '@stalk-ui/components/tooltip'
import { AlertCircle, AlertTriangle, Bold, Info, Italic, X } from 'lucide-react'
import { themes } from 'prism-react-renderer'
import { useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'

import type { ColumnDef } from '@tanstack/react-table'

// react-live previews render a single JSX expression, so examples that need
// column/data definitions or a `useForm` instance can't be expressed inline.
// Expose ready-made demos the Form / Data Table examples render directly.
interface DemoInvoice {
  invoice: string
  status: 'paid' | 'pending' | 'overdue'
  amount: number
}

const invoiceColumns: ColumnDef<DemoInvoice>[] = [
  { accessorKey: 'invoice', header: 'Invoice' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue<DemoInvoice['status']>()
      const tone = status === 'paid' ? 'success' : status === 'overdue' ? 'danger' : 'warning'
      return <Badge tone={tone}>{status}</Badge>
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ getValue }) => `$${getValue<number>().toFixed(2)}`,
  },
]

const invoiceData: DemoInvoice[] = [
  { invoice: 'INV-001', status: 'paid', amount: 250 },
  { invoice: 'INV-002', status: 'pending', amount: 150 },
  { invoice: 'INV-003', status: 'overdue', amount: 350 },
  { invoice: 'INV-004', status: 'paid', amount: 450 },
]

const InvoiceTable = () => <DataTable columns={invoiceColumns} data={invoiceData} />

const EventDatePicker = () => {
  const [date, setDate] = useState<Date>()
  return <DatePicker aria-label="Event date" value={date} onChange={setDate} />
}

const FrameworkCombobox = () => {
  const [value, setValue] = useState<string>()
  return (
    <Combobox
      aria-label="Framework"
      options={[
        { label: 'Next.js', value: 'next' },
        { label: 'Remix', value: 'remix' },
        { label: 'Astro', value: 'astro' },
        { label: 'SvelteKit', value: 'sveltekit' },
      ]}
      value={value}
      onChange={setValue}
      placeholder="Select a framework…"
    />
  )
}

const ProfileForm = () => {
  const form = useForm<{ bio: string }>({ defaultValues: { bio: '' } })
  return (
    <Form {...form}>
      <form
        onSubmit={(event) => void form.handleSubmit(() => undefined)(event)}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '24rem' }}
      >
        <FormField
          control={form.control}
          name="bio"
          rules={{ required: 'Tell us a little about yourself.' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="I build things…" {...field} />
              </FormControl>
              <FormDescription>This appears on your public profile.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}

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
  AspectRatio,
  Avatar,
  Badge,
  Blockquote,
  Bold,
  Breadcrumb,
  Button,
  Calendar,
  Card,
  Checkbox,
  Code,
  Collapsible,
  Combobox,
  Command,
  ContextMenu,
  DataList,
  DataTable,
  DatePicker,
  DatetimeInput,
  Dialog,
  EventDatePicker,
  FrameworkCombobox,
  DropdownMenu,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Heading,
  HoverCard,
  Info,
  Input,
  Italic,
  Kbd,
  Label,
  Link,
  Menubar,
  InvoiceTable,
  NavigationMenu,
  OtpInput,
  Pagination,
  PhoneInput,
  Popover,
  ProfileForm,
  Progress,
  QrCode,
  Radio,
  ScrollArea,
  Select,
  Separator,
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
  TimePicker,
  Toaster,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Toolbar,
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
