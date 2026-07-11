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
import { Carousel } from '@stalk-ui/components/carousel'
import { ChartContainer, ChartLegendContent, ChartTooltipContent } from '@stalk-ui/components/chart'
import { Checkbox } from '@stalk-ui/components/checkbox'
import { Code } from '@stalk-ui/components/code'
import { Collapsible } from '@stalk-ui/components/collapsible'
import { ColorPicker } from '@stalk-ui/components/color-picker'
import { Combobox } from '@stalk-ui/components/combobox'
import { Command } from '@stalk-ui/components/command'
import { ContextMenu } from '@stalk-ui/components/context-menu'
import { CopyButton } from '@stalk-ui/components/copy-button'
import { DataList } from '@stalk-ui/components/data-list'
import { DataTable } from '@stalk-ui/components/data-table'
import { DataTableAdvanced } from '@stalk-ui/components/data-table-advanced'
import { DatePicker } from '@stalk-ui/components/date-picker'
import { DatetimeInput } from '@stalk-ui/components/datetime-input'
import { Dialog } from '@stalk-ui/components/dialog'
import { Drawer } from '@stalk-ui/components/drawer'
import { DropdownMenu } from '@stalk-ui/components/dropdown-menu'
import { Editable } from '@stalk-ui/components/editable'
import { EmptyState } from '@stalk-ui/components/empty-state'
import { FileUpload } from '@stalk-ui/components/file-upload'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@stalk-ui/components/form'
import { FormatInput } from '@stalk-ui/components/format-input'
import { Heading } from '@stalk-ui/components/heading'
import { HeatMap } from '@stalk-ui/components/heatmap'
import { HoverCard } from '@stalk-ui/components/hover-card'
import { Input } from '@stalk-ui/components/input'
import { Kbd } from '@stalk-ui/components/kbd'
import { Label } from '@stalk-ui/components/label'
import { Link } from '@stalk-ui/components/link'
import { Menubar } from '@stalk-ui/components/menubar'
import { NavigationMenu } from '@stalk-ui/components/navigation-menu'
import { NumberInput } from '@stalk-ui/components/number-input'
import { OtpInput } from '@stalk-ui/components/otp-input'
import { Pagination } from '@stalk-ui/components/pagination'
import { PasswordInput } from '@stalk-ui/components/password-input'
import { PhoneInput } from '@stalk-ui/components/phone-input'
import { Popover } from '@stalk-ui/components/popover'
import { Progress } from '@stalk-ui/components/progress'
import { QrCode } from '@stalk-ui/components/qr-code'
import { Radio } from '@stalk-ui/components/radio'
import { Rating } from '@stalk-ui/components/rating'
import { Resizable } from '@stalk-ui/components/resizable'
import { ScrollArea } from '@stalk-ui/components/scroll-area'
import { SearchInput } from '@stalk-ui/components/search-input'
import { Select } from '@stalk-ui/components/select'
import { Separator } from '@stalk-ui/components/separator'
import { Sheet } from '@stalk-ui/components/sheet'
import { Sidebar } from '@stalk-ui/components/sidebar'
import { Skeleton } from '@stalk-ui/components/skeleton'
import { Slider } from '@stalk-ui/components/slider'
import { Sortable } from '@stalk-ui/components/sortable'
import { Sparkline } from '@stalk-ui/components/sparkline'
import { Spinner } from '@stalk-ui/components/spinner'
import { Stat } from '@stalk-ui/components/stat'
import { Steps } from '@stalk-ui/components/steps'
import { Swap } from '@stalk-ui/components/swap'
import { Switch } from '@stalk-ui/components/switch'
import { Table } from '@stalk-ui/components/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@stalk-ui/components/tabs'
import { Tag } from '@stalk-ui/components/tag'
import { TagsInput } from '@stalk-ui/components/tags-input'
import { Text } from '@stalk-ui/components/text'
import { Textarea } from '@stalk-ui/components/textarea'
import { TimePicker } from '@stalk-ui/components/time-picker'
import { Timeline } from '@stalk-ui/components/timeline'
import { Toaster, toast } from '@stalk-ui/components/toast'
import { Toggle, ToggleGroup, ToggleGroupItem } from '@stalk-ui/components/toggle'
import { Toolbar } from '@stalk-ui/components/toolbar'
import { Tooltip } from '@stalk-ui/components/tooltip'
import { Tour } from '@stalk-ui/components/tour'
import { Tree } from '@stalk-ui/components/tree'
import { VirtualList } from '@stalk-ui/components/virtual-list'
import {
  AlertCircle,
  AlertTriangle,
  Bold,
  Home,
  Inbox,
  Info,
  Italic,
  Moon,
  Settings,
  Sun,
  X,
} from 'lucide-react'
import { themes } from 'prism-react-renderer'
import { useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'

import type { DateRange } from '@stalk-ui/components/date-picker'
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

const MembersTable = () => (
  <DataTableAdvanced
    columns={invoiceColumns}
    data={invoiceData}
    columnPinning={{ left: ['invoice'] }}
    renderSubRow={(row) => (
      <div style={{ color: 'var(--colors-fg-muted)', padding: '0.5rem 0' }}>
        {row.invoice} — {row.status}, billed {row.amount}.
      </div>
    )}
  />
)

const heatmapRows = ['Node 1', 'Node 2', 'Node 3', 'Node 4']
const heatmapColumns = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const heatmapData: Record<string, Record<string, number | null>> = {
  'Node 1': { Mon: 98, Tue: 96, Wed: 99, Thu: 94, Fri: 97 },
  'Node 2': { Mon: 82, Tue: 88, Wed: 79, Thu: 91, Fri: 85 },
  'Node 3': { Mon: 64, Tue: 58, Wed: null, Thu: 71, Fri: 69 },
  'Node 4': { Mon: 45, Tue: 52, Wed: 48, Thu: 40, Fri: 55 },
}

const PerformanceHeatMap = () => (
  <HeatMap
    rows={heatmapRows}
    columns={heatmapColumns}
    cell={(row, column) => heatmapData[row]?.[column] ?? null}
    aria-label="Weekly node performance index"
    caption="Performance index (%) by node and weekday."
    formatValue={(value) => `${String(value)}%`}
    legend
  />
)

const EventDatePicker = () => {
  const [date, setDate] = useState<Date>()
  return <DatePicker aria-label="Event date" value={date} onChange={setDate} />
}

const ReportRangePicker = () => {
  const [range, setRange] = useState<DateRange | undefined>()
  const day = (offset: number) => {
    const date = new Date()
    date.setDate(date.getDate() + offset)
    return date
  }
  return (
    <DatePicker
      aria-label="Report window"
      mode="range"
      numberOfMonths={1}
      presets={[
        { label: 'Last 7 days', range: { from: day(-6), to: day(0) } },
        { label: 'Last 30 days', range: { from: day(-29), to: day(0) } },
      ]}
      value={range}
      onChange={setRange}
    />
  )
}

const FileTree = () => (
  <Tree
    aria-label="Files"
    defaultExpanded={['src']}
    nodes={[
      {
        id: 'src',
        label: 'src',
        children: [
          { id: 'app-tsx', label: 'App.tsx' },
          { id: 'index-ts', label: 'index.ts' },
        ],
      },
      { id: 'public', label: 'public', children: [{ id: 'favicon-svg', label: 'favicon.svg' }] },
    ]}
  />
)

const virtualListRows = Array.from({ length: 1000 }, (_, index) => ({
  id: index,
  label: `Row ${String(index + 1)}`,
}))

const VirtualListDemo = () => (
  <VirtualList
    items={virtualListRows}
    estimateSize={() => 44}
    getItemKey={(row) => row.id}
    style={{
      border: '1px solid var(--colors-border-default)',
      borderRadius: 8,
      height: 260,
      width: '100%',
    }}
  >
    {(row, virtualItem) => (
      <VirtualList.Item key={row.id} virtualItem={virtualItem}>
        <div
          style={{
            alignItems: 'center',
            borderBottom: '1px solid var(--colors-border-muted)',
            display: 'flex',
            height: 44,
            padding: '0 1rem',
          }}
        >
          {row.label}
        </div>
      </VirtualList.Item>
    )}
  </VirtualList>
)

const SortableDemo = () => {
  const [items, setItems] = useState([
    { id: 'a', label: 'Draft the RFC' },
    { id: 'b', label: 'Review with the team' },
    { id: 'c', label: 'Prototype the API' },
  ])
  return (
    <div style={{ width: 320 }}>
      <Sortable items={items} onReorder={setItems}>
        {items.map((item, index) => (
          <Sortable.Item key={item.id} id={item.id} index={index}>
            <Sortable.Handle />
            <span style={{ flex: 1 }}>{item.label}</span>
          </Sortable.Item>
        ))}
      </Sortable>
    </div>
  )
}

const SwapDemo = () => {
  const [on, setOn] = useState(false)
  return (
    <Button
      aria-label="Toggle color mode"
      variant="outline"
      onClick={() => {
        setOn((previous) => !previous)
      }}
    >
      <Swap effect="rotate" off={<Sun size={16} />} on={<Moon size={16} />} swap={on} />
      {on ? 'Dark' : 'Light'}
    </Button>
  )
}

const TaskTourDemo = () => {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Button
        style={{ alignSelf: 'flex-start' }}
        variant="outline"
        onClick={() => {
          setOpen(true)
        }}
      >
        Start tour
      </Button>
      <Card.Root id="preview-tour-queue" size="sm">
        <Card.Header>
          <Card.Title>Task queue</Card.Title>
          <Card.Description>Work items land here.</Card.Description>
        </Card.Header>
      </Card.Root>
      <Tour
        open={open}
        steps={[
          {
            target: '#preview-tour-queue',
            title: 'Task queue',
            description: 'New work items land here, newest first.',
          },
        ]}
        onOpenChange={setOpen}
      />
    </div>
  )
}

const StackMultiCombobox = () => {
  const [value, setValue] = useState<string[]>(['next'])
  return (
    <Combobox
      aria-label="Frameworks"
      multiple
      options={[
        { label: 'Next.js', value: 'next' },
        { label: 'Remix', value: 'remix' },
        { label: 'Astro', value: 'astro' },
      ]}
      value={value}
      onChange={setValue}
    />
  )
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
  Carousel,
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
  Checkbox,
  Code,
  Collapsible,
  ColorPicker,
  Combobox,
  Command,
  ContextMenu,
  DataList,
  DataTable,
  DataTableAdvanced,
  MembersTable,
  DatePicker,
  DatetimeInput,
  Dialog,
  EventDatePicker,
  ReportRangePicker,
  FrameworkCombobox,
  StackMultiCombobox,
  CopyButton,
  FileTree,
  Drawer,
  Editable,
  EmptyState,
  FileUpload,
  Inbox,
  Rating,
  Stat,
  Steps,
  Timeline,
  Tour,
  Tree,
  Sortable,
  SortableDemo,
  VirtualList,
  VirtualListDemo,
  SwapDemo,
  TaskTourDemo,
  DropdownMenu,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormatInput,
  Heading,
  HeatMap,
  Home,
  HoverCard,
  Info,
  Input,
  Italic,
  Kbd,
  Label,
  Link,
  Menubar,
  InvoiceTable,
  PerformanceHeatMap,
  NavigationMenu,
  NumberInput,
  OtpInput,
  Pagination,
  PasswordInput,
  PhoneInput,
  Popover,
  ProfileForm,
  Progress,
  QrCode,
  Radio,
  Resizable,
  ScrollArea,
  SearchInput,
  Select,
  Separator,
  Settings,
  Sheet,
  Sidebar,
  Skeleton,
  Slider,
  Sparkline,
  Spinner,
  Switch,
  Table,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tag,
  TagsInput,
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
