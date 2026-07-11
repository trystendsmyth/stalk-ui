export const componentExamples = {
  'copy-button': ['<CopyButton value="pnpm dlx @stalk-ui/cli add copy-button" />'],
  drawer: [
    '<Drawer.Root>\n  <Drawer.Trigger asChild>\n    <Button variant="outline">Open filters</Button>\n  </Drawer.Trigger>\n  <Drawer.Content>\n    <Drawer.Header>\n      <Drawer.Title>Filters</Drawer.Title>\n      <Drawer.Description>Narrow the results.</Drawer.Description>\n    </Drawer.Header>\n    <Drawer.Footer>\n      <Drawer.Close asChild><Button>Apply</Button></Drawer.Close>\n    </Drawer.Footer>\n  </Drawer.Content>\n</Drawer.Root>',
  ],
  editable: ['<Editable aria-label="Project name" defaultValue="Untitled project" />'],
  'empty-state': [
    '<EmptyState.Root>\n  <EmptyState.Icon><Inbox /></EmptyState.Icon>\n  <EmptyState.Title>No devices found</EmptyState.Title>\n  <EmptyState.Description>Try widening the date range or clearing filters.</EmptyState.Description>\n  <EmptyState.Actions>\n    <Button size="sm">Clear filters</Button>\n  </EmptyState.Actions>\n</EmptyState.Root>',
  ],
  'file-upload': ['<FileUpload accept=".csv" hint="CSV up to 1 MB" maxSize={1048576} multiple />'],
  rating: [
    '<Rating aria-label="Quality" defaultValue={3} />',
    '<Rating aria-label="Vendor score" readOnly value={4} />',
  ],
  stat: [
    '<Stat.Root>\n  <Stat.Label>Storage used</Stat.Label>\n  <Stat.Value>412 <Stat.Unit>GB</Stat.Unit></Stat.Value>\n  <Stat.Delta direction="up">+8.2% vs yesterday</Stat.Delta>\n</Stat.Root>',
  ],
  steps: [
    '<Steps aria-label="Onboarding" current={1} steps={[{ title: "Account" }, { title: "Site" }, { title: "Review" }]} />',
  ],
  timeline: [
    '<Timeline.Root aria-label="Activity">\n  <Timeline.Item tone="success">\n    <Timeline.Content>\n      <Timeline.Time dateTime="2026-07-03T14:10">Today, 14:10</Timeline.Time>\n      <Timeline.Title>Deploy finished</Timeline.Title>\n      <Timeline.Description>Build #424 promoted to production.</Timeline.Description>\n    </Timeline.Content>\n  </Timeline.Item>\n  <Timeline.Item tone="danger">\n    <Timeline.Content>\n      <Timeline.Title>Alert raised</Timeline.Title>\n    </Timeline.Content>\n  </Timeline.Item>\n</Timeline.Root>',
  ],
  tour: ['<TaskTourDemo />'],
  swap: ['<SwapDemo />'],
  tree: ['<FileTree />'],
  'virtual-list': ['<VirtualListDemo />'],
  sortable: ['<SortableDemo />'],
  accordion: [
    '<Accordion type="single" collapsible defaultValue="item-1">\n  <Accordion.Item value="item-1">\n    <Accordion.Trigger>Is it accessible?</Accordion.Trigger>\n    <Accordion.Content>Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content>\n  </Accordion.Item>\n  <Accordion.Item value="item-2">\n    <Accordion.Trigger>Is it styled?</Accordion.Trigger>\n    <Accordion.Content>Yes. Defaults use semantic tokens from the preset.</Accordion.Content>\n  </Accordion.Item>\n</Accordion>',
    '<Accordion type="multiple" defaultValue={["a", "b"]}>\n  <Accordion.Item value="a">\n    <Accordion.Trigger>First section</Accordion.Trigger>\n    <Accordion.Content>Multiple sections can be open at once.</Accordion.Content>\n  </Accordion.Item>\n  <Accordion.Item value="b">\n    <Accordion.Trigger>Second section</Accordion.Trigger>\n    <Accordion.Content>Pass type=&quot;multiple&quot; to enable this.</Accordion.Content>\n  </Accordion.Item>\n</Accordion>',
  ],
  alert: [
    '<Alert.Root tone="info">\n  <Alert.Icon><Info /></Alert.Icon>\n  <Alert.Body>\n    <Alert.Title>Heads up</Alert.Title>\n    <Alert.Description>You can add components using the CLI.</Alert.Description>\n  </Alert.Body>\n</Alert.Root>',
    '<Alert.Root tone="warning">\n  <Alert.Icon><AlertTriangle /></Alert.Icon>\n  <Alert.Body>\n    <Alert.Title>Storage almost full</Alert.Title>\n    <Alert.Description>You\'re using 92% of your storage.</Alert.Description>\n  </Alert.Body>\n  <Alert.Close aria-label="Dismiss"><X /></Alert.Close>\n</Alert.Root>',
    '<Alert.Root tone="danger">\n  <Alert.Icon><AlertCircle /></Alert.Icon>\n  <Alert.Body>\n    <Alert.Title>Deployment failed</Alert.Title>\n    <Alert.Description>Build #424 exited with code 1.</Alert.Description>\n    <Alert.Actions>\n      <Button size="sm" tone="danger">Retry</Button>\n    </Alert.Actions>\n  </Alert.Body>\n</Alert.Root>',
  ],
  'alert-dialog': [
    '<AlertDialog.Root>\n  <AlertDialog.Trigger asChild>\n    <Button tone="danger" variant="outline">Delete project</Button>\n  </AlertDialog.Trigger>\n  <AlertDialog.Content>\n    <AlertDialog.Header>\n      <AlertDialog.Title>Delete this project?</AlertDialog.Title>\n      <AlertDialog.Description>This permanently removes the project and all of its data. This action cannot be undone.</AlertDialog.Description>\n    </AlertDialog.Header>\n    <AlertDialog.Footer>\n      <AlertDialog.Cancel asChild><Button variant="outline">Cancel</Button></AlertDialog.Cancel>\n      <AlertDialog.Action asChild><Button tone="danger">Delete</Button></AlertDialog.Action>\n    </AlertDialog.Footer>\n  </AlertDialog.Content>\n</AlertDialog.Root>',
  ],
  'aspect-ratio': [
    '<div style={{ width: 320 }}>\n  <AspectRatio ratio={16 / 9}>\n    <img alt="Sand dunes under a clear sky" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=640&h=360&fit=crop" style={{ borderRadius: 8 }} />\n  </AspectRatio>\n</div>',
    '<div style={{ width: 200 }}>\n  <AspectRatio ratio={1}>\n    <div style={{ alignItems: "center", border: "1px solid var(--colors-border-default)", borderRadius: 8, color: "var(--colors-fg-muted)", display: "flex", justifyContent: "center" }}>1 : 1</div>\n  </AspectRatio>\n</div>',
  ],
  avatar: [
    '<Avatar name="Ada Lovelace" />',
    '<Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop" name="Ada Lovelace" size="lg" />',
    '<Avatar name="Linus Torvalds" tone="success" radius="md" />',
  ],
  badge: [
    '<Badge>Published</Badge>',
    '<Badge variant="solid" tone="success">Live</Badge>',
    '<Badge variant="outline" tone="danger" size="md" radius="sm">Error</Badge>',
    '<Badge tone="neutral" size="micro">vendor-reported</Badge>',
  ],
  blockquote: [
    '<Blockquote>The quick brown fox jumps over the lazy dog.</Blockquote>',
    '<Blockquote tone="accent">A tinted pull quote draws the eye.</Blockquote>',
    '<Blockquote size="sm">Compact attribution or aside.</Blockquote>',
  ],
  breadcrumb: [
    '<Breadcrumb>\n  <Breadcrumb.List>\n    <Breadcrumb.Item>\n      <Breadcrumb.Link href="#">Home</Breadcrumb.Link>\n    </Breadcrumb.Item>\n    <Breadcrumb.Separator />\n    <Breadcrumb.Item>\n      <Breadcrumb.Link href="#">Components</Breadcrumb.Link>\n    </Breadcrumb.Item>\n    <Breadcrumb.Separator />\n    <Breadcrumb.Item>\n      <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>\n    </Breadcrumb.Item>\n  </Breadcrumb.List>\n</Breadcrumb>',
    '<Breadcrumb>\n  <Breadcrumb.List>\n    <Breadcrumb.Item>\n      <Breadcrumb.Link href="#">Home</Breadcrumb.Link>\n    </Breadcrumb.Item>\n    <Breadcrumb.Separator />\n    <Breadcrumb.Item>\n      <Breadcrumb.Ellipsis />\n    </Breadcrumb.Item>\n    <Breadcrumb.Separator />\n    <Breadcrumb.Item>\n      <Breadcrumb.Page>Settings</Breadcrumb.Page>\n    </Breadcrumb.Item>\n  </Breadcrumb.List>\n</Breadcrumb>',
  ],
  button: [
    '<Button>Save changes</Button>',
    '<Button variant="outline">Cancel</Button>',
    '<Button variant="ghost" size="sm">Learn more</Button>',
    '<Button loading>Saving…</Button>',
  ],
  calendar: ['<Calendar mode="single" />', '<Calendar mode="range" numberOfMonths={2} />'],
  carousel: [
    '<div style={{ paddingInline: 40, width: 320 }}>\n  <Carousel>\n    <Carousel.Content>\n      {Array.from({ length: 5 }, (_, i) => (\n        <Carousel.Item key={i}>\n          <div style={{ alignItems: "center", background: "var(--colors-bg-subtle)", border: "1px solid var(--colors-border-default)", borderRadius: 8, display: "flex", height: 160, justifyContent: "center" }}>{i + 1}</div>\n        </Carousel.Item>\n      ))}\n    </Carousel.Content>\n    <Carousel.Previous />\n    <Carousel.Next />\n  </Carousel>\n</div>',
  ],
  card: [
    '<Card.Root>\n  <Card.Header>\n    <Card.Title>Project settings</Card.Title>\n    <Card.Description>Manage how this project is shared with your team.</Card.Description>\n  </Card.Header>\n  <Card.Content>Cards group related content and actions into one surface.</Card.Content>\n</Card.Root>',
    '<Card.Root>\n  <Card.Header>\n    <Card.Title>Invite people</Card.Title>\n    <Card.Description>Add collaborators to this project.</Card.Description>\n  </Card.Header>\n  <Card.Content>An invite gives full edit access.</Card.Content>\n  <Card.Footer>\n    <Button size="sm">Send invite</Button>\n    <Button size="sm" variant="outline">Cancel</Button>\n  </Card.Footer>\n</Card.Root>',
    '<Card.Root variant="elevated">\n  <Card.Header>\n    <Card.Title>Billing</Card.Title>\n    <Card.Description>You are on the Pro plan.</Card.Description>\n    <Card.Action>\n      <Button size="sm" variant="outline">Upgrade</Button>\n    </Card.Action>\n  </Card.Header>\n  <Card.Content>Your plan renews on the 1st of each month.</Card.Content>\n</Card.Root>',
  ],
  chart: [
    '<div style={{ width: 360 }}>\n  <ChartContainer config={{ desktop: { label: "Desktop", color: "var(--colors-accent-solid)" }, mobile: { label: "Mobile", color: "var(--colors-success-solid)" } }} style={{ aspectRatio: "auto" }}>\n    <div style={{ display: "grid", gap: 16, width: "100%" }}>\n      <ChartTooltipContent active label="January" payload={[{ dataKey: "desktop", value: 186 }, { dataKey: "mobile", value: 80 }]} />\n      <ChartLegendContent payload={[{ dataKey: "desktop" }, { dataKey: "mobile" }]} />\n    </div>\n  </ChartContainer>\n</div>',
  ],
  checkbox: [
    '<Checkbox aria-label="Accept terms" />',
    '<Checkbox defaultChecked aria-label="Subscribed" />',
    '<Checkbox checked="indeterminate" aria-label="Bulk select" />',
    '<Checkbox disabled aria-label="Locked" />',
  ],
  code: [
    '<Code>npm install</Code>',
    '<Code variant="outline">pnpm build</Code>',
    '<Text>Run <Code>pnpm dlx @stalk-ui/cli add button</Code> to copy a component.</Text>',
  ],
  collapsible: [
    '<Collapsible>\n  <Collapsible.Trigger>Show details</Collapsible.Trigger>\n  <Collapsible.Content>Hidden content that toggles open.</Collapsible.Content>\n</Collapsible>',
    '<Collapsible defaultOpen>\n  <Collapsible.Trigger>Toggle</Collapsible.Trigger>\n  <Collapsible.Content>Visible from the start.</Collapsible.Content>\n</Collapsible>',
  ],
  'color-picker': [
    '<ColorPicker defaultValue="#4f46e5">\n  <ColorPicker.Trigger aria-label="Brand color" />\n  <ColorPicker.Content>\n    <ColorPicker.Picker />\n    <ColorPicker.Controls>\n      <ColorPicker.Input aria-label="Hex value" />\n      <ColorPicker.EyeDropper />\n    </ColorPicker.Controls>\n    <ColorPicker.Swatches>\n      <ColorPicker.Swatch color="#ef4444" />\n      <ColorPicker.Swatch color="#f97316" />\n      <ColorPicker.Swatch color="#22c55e" />\n      <ColorPicker.Swatch color="#3b82f6" />\n      <ColorPicker.Swatch color="#8b5cf6" />\n    </ColorPicker.Swatches>\n  </ColorPicker.Content>\n</ColorPicker>',
    '<ColorPicker alpha defaultValue="#4f46e5cc">\n  <ColorPicker.Trigger aria-label="Overlay color" />\n  <ColorPicker.Content>\n    <ColorPicker.Picker />\n    <ColorPicker.Controls>\n      <ColorPicker.Input aria-label="Hex value" />\n    </ColorPicker.Controls>\n  </ColorPicker.Content>\n</ColorPicker>',
  ],
  combobox: ['<FrameworkCombobox />', '<StackMultiCombobox />'],
  command: [
    '<Command label="Command menu" style={{ maxWidth: "24rem", border: "1px solid" }}>\n  <Command.Input aria-label="Search commands" placeholder="Type a command or search…" />\n  <Command.List>\n    <Command.Empty>No results found.</Command.Empty>\n    <Command.Group heading="Suggestions">\n      <Command.Item>Calendar</Command.Item>\n      <Command.Item>Search emoji</Command.Item>\n    </Command.Group>\n    <Command.Separator />\n    <Command.Group heading="Settings">\n      <Command.Item>Profile<Command.Shortcut>⌘P</Command.Shortcut></Command.Item>\n      <Command.Item>Settings<Command.Shortcut>⌘S</Command.Shortcut></Command.Item>\n    </Command.Group>\n  </Command.List>\n</Command>',
  ],
  'context-menu': [
    '<ContextMenu>\n  <ContextMenu.Trigger>Right click here</ContextMenu.Trigger>\n  <ContextMenu.Content>\n    <ContextMenu.Item>Cut</ContextMenu.Item>\n    <ContextMenu.Item>Copy</ContextMenu.Item>\n    <ContextMenu.Separator />\n    <ContextMenu.Item>Paste</ContextMenu.Item>\n  </ContextMenu.Content>\n</ContextMenu>',
  ],
  'data-list': [
    '<DataList.Root>\n  <DataList.Item>\n    <DataList.Label>Status</DataList.Label>\n    <DataList.Value>\n      <Badge tone="success" variant="subtle">Authorized</Badge>\n    </DataList.Value>\n  </DataList.Item>\n  <DataList.Item>\n    <DataList.Label>ID</DataList.Label>\n    <DataList.Value><Code>u_2J89JSA4GJ</Code></DataList.Value>\n  </DataList.Item>\n  <DataList.Item>\n    <DataList.Label>Name</DataList.Label>\n    <DataList.Value>Ada Lovelace</DataList.Value>\n  </DataList.Item>\n  <DataList.Item>\n    <DataList.Label>Email</DataList.Label>\n    <DataList.Value><Link href="mailto:ada@example.com">ada@example.com</Link></DataList.Value>\n  </DataList.Item>\n</DataList.Root>',
    '<DataList.Root orientation="vertical">\n  <DataList.Item>\n    <DataList.Label tone="accent">Accent</DataList.Label>\n    <DataList.Value>Primary brand palette</DataList.Value>\n  </DataList.Item>\n  <DataList.Item>\n    <DataList.Label tone="success">Success</DataList.Label>\n    <DataList.Value>Operation completed</DataList.Value>\n  </DataList.Item>\n  <DataList.Item>\n    <DataList.Label tone="danger">Danger</DataList.Label>\n    <DataList.Value>Action required</DataList.Value>\n  </DataList.Item>\n</DataList.Root>',
  ],
  'data-table': ['<InvoiceTable />'],
  'data-table-advanced': ['<MembersTable />'],
  'date-picker': ['<EventDatePicker />', '<ReportRangePicker />'],
  heatmap: ['<PerformanceHeatMap />'],
  'datetime-input': [
    '<DatetimeInput aria-label="Date" />',
    '<DatetimeInput aria-label="Time" mode="time" />',
    '<DatetimeInput aria-label="Date and time" mode="datetime" />',
  ],
  dialog: [
    '<Dialog.Root>\n  <Dialog.Trigger>Open dialog</Dialog.Trigger>\n  <Dialog.Content>\n    <Dialog.Title>Confirm changes</Dialog.Title>\n  </Dialog.Content>\n</Dialog.Root>',
    '<Dialog.Root>\n  <Dialog.Trigger>Settings</Dialog.Trigger>\n  <Dialog.Content>\n    <Dialog.Header>\n      <Dialog.Title>Settings</Dialog.Title>\n      <Dialog.Description>Manage your preferences.</Dialog.Description>\n    </Dialog.Header>\n    <Dialog.Footer>\n      <Dialog.Close asChild>\n        <Button variant="outline">Cancel</Button>\n      </Dialog.Close>\n    </Dialog.Footer>\n  </Dialog.Content>\n</Dialog.Root>',
  ],
  'dropdown-menu': [
    '<DropdownMenu.Root>\n  <DropdownMenu.Trigger>Open menu</DropdownMenu.Trigger>\n  <DropdownMenu.Content>\n    <DropdownMenu.Item>Edit</DropdownMenu.Item>\n    <DropdownMenu.Item>Duplicate</DropdownMenu.Item>\n    <DropdownMenu.Separator />\n    <DropdownMenu.Item>Delete</DropdownMenu.Item>\n  </DropdownMenu.Content>\n</DropdownMenu.Root>',
    '<DropdownMenu.Root>\n  <DropdownMenu.Trigger>Project</DropdownMenu.Trigger>\n  <DropdownMenu.Content>\n    <DropdownMenu.Label>Project</DropdownMenu.Label>\n    <DropdownMenu.Item>Rename<DropdownMenu.Shortcut>⌘R</DropdownMenu.Shortcut></DropdownMenu.Item>\n    <DropdownMenu.Item>Archive<DropdownMenu.Shortcut>⌘E</DropdownMenu.Shortcut></DropdownMenu.Item>\n  </DropdownMenu.Content>\n</DropdownMenu.Root>',
    '<DropdownMenu.Root>\n  <DropdownMenu.Trigger>View</DropdownMenu.Trigger>\n  <DropdownMenu.Content>\n    <DropdownMenu.CheckboxItem defaultChecked>Show toolbar</DropdownMenu.CheckboxItem>\n    <DropdownMenu.CheckboxItem>Show sidebar</DropdownMenu.CheckboxItem>\n  </DropdownMenu.Content>\n</DropdownMenu.Root>',
  ],
  form: ['<ProfileForm />'],
  'format-input': [
    '<FormatInput aria-label="Email" format="email" placeholder="you@stalk-ui.com" />',
    '<FormatInput aria-label="Website" format="url" placeholder="https://stalk-ui.com" />',
    '<FormatInput aria-label="Email" format="email" showValidity placeholder="Type a valid email" />',
  ],
  heading: [
    '<Heading as="h1">Page title</Heading>',
    '<Heading as="h2">Section heading</Heading>',
    '<Heading as="h1" size="display">Hero headline</Heading>',
    '<Heading as="h3" tone="accent">Tinted subsection</Heading>',
  ],
  'hover-card': [
    '<HoverCard.Root>\n  <HoverCard.Trigger asChild>\n    <Link href="#">@ada</Link>\n  </HoverCard.Trigger>\n  <HoverCard.Content>\n    <Text weight="medium">Ada Lovelace</Text>\n    <Text size="bodySm">Mathematician and the first computer programmer.</Text>\n  </HoverCard.Content>\n</HoverCard.Root>',
  ],
  input: [
    '<Input aria-label="Email" placeholder="hello@stalk-ui.com" />',
    '<Input invalid aria-label="Email" defaultValue="not-an-email" />',
    '<Input disabled aria-label="Read only" defaultValue="acme-corp" />',
  ],
  kbd: [
    '<Kbd>Esc</Kbd>',
    '<Text>Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to open search.</Text>',
    '<Kbd size="lg">Enter</Kbd>',
  ],
  label: [
    '<Label htmlFor="email">Email</Label>',
    '<Label required htmlFor="name">Name</Label>',
    '<Label size="lg" htmlFor="bio">About you</Label>',
  ],
  link: [
    '<Link href="#">View documentation</Link>',
    '<Link href="#" underline="always">Always underlined</Link>',
    '<Text>Read the <Link href="#">getting started guide</Link> first.</Text>',
  ],
  menubar: [
    '<Menubar>\n  <Menubar.Menu>\n    <Menubar.Trigger>File</Menubar.Trigger>\n    <Menubar.Content>\n      <Menubar.Item>New tab<Menubar.Shortcut>⌘T</Menubar.Shortcut></Menubar.Item>\n      <Menubar.Item>New window<Menubar.Shortcut>⌘N</Menubar.Shortcut></Menubar.Item>\n    </Menubar.Content>\n  </Menubar.Menu>\n  <Menubar.Menu>\n    <Menubar.Trigger>Edit</Menubar.Trigger>\n    <Menubar.Content>\n      <Menubar.Item>Undo</Menubar.Item>\n      <Menubar.Item>Redo</Menubar.Item>\n    </Menubar.Content>\n  </Menubar.Menu>\n</Menubar>',
  ],
  'navigation-menu': [
    '<NavigationMenu.Root>\n  <NavigationMenu.List>\n    <NavigationMenu.Item>\n      <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>\n      <NavigationMenu.Content>\n        <ul style={{ minWidth: "14rem" }}>\n          <li><NavigationMenu.Link href="#">Analytics</NavigationMenu.Link></li>\n          <li><NavigationMenu.Link href="#">Automation</NavigationMenu.Link></li>\n          <li><NavigationMenu.Link href="#">Reports</NavigationMenu.Link></li>\n        </ul>\n      </NavigationMenu.Content>\n    </NavigationMenu.Item>\n    <NavigationMenu.Item>\n      <NavigationMenu.Link href="#">Pricing</NavigationMenu.Link>\n    </NavigationMenu.Item>\n  </NavigationMenu.List>\n</NavigationMenu.Root>',
  ],
  'number-input': [
    '<NumberInput aria-label="Quantity" defaultValue={1} min={0} max={10} />',
    '<NumberInput aria-label="Quantity" defaultValue={1} min={0} max={99} layout="split" />',
    '<NumberInput aria-label="Price" defaultValue={19.99} step={0.5} currency="USD" />',
  ],
  'otp-input': [
    '<OtpInput maxLength={6} aria-label="One-time passcode">\n  <OtpInput.Group>\n    <OtpInput.Slot index={0} />\n    <OtpInput.Slot index={1} />\n    <OtpInput.Slot index={2} />\n  </OtpInput.Group>\n  <OtpInput.Separator />\n  <OtpInput.Group>\n    <OtpInput.Slot index={3} />\n    <OtpInput.Slot index={4} />\n    <OtpInput.Slot index={5} />\n  </OtpInput.Group>\n</OtpInput>',
  ],
  pagination: [
    '<Pagination>\n  <Pagination.Content>\n    <Pagination.Item>\n      <Pagination.Previous href="#" />\n    </Pagination.Item>\n    <Pagination.Item>\n      <Pagination.Link href="#">1</Pagination.Link>\n    </Pagination.Item>\n    <Pagination.Item>\n      <Pagination.Link href="#" isActive>2</Pagination.Link>\n    </Pagination.Item>\n    <Pagination.Item>\n      <Pagination.Link href="#">3</Pagination.Link>\n    </Pagination.Item>\n    <Pagination.Item>\n      <Pagination.Ellipsis />\n    </Pagination.Item>\n    <Pagination.Item>\n      <Pagination.Next href="#" />\n    </Pagination.Item>\n  </Pagination.Content>\n</Pagination>',
  ],
  'password-input': [
    '<PasswordInput aria-label="Password" placeholder="Enter your password" />',
    '<PasswordInput aria-label="Password" defaultValue="hunter2" invalid />',
  ],
  'phone-input': ['<PhoneInput aria-label="Phone number" defaultCountry="us" />'],
  popover: [
    '<Popover.Root>\n  <Popover.Trigger>Open popover</Popover.Trigger>\n  <Popover.Content>Quick actions go here.</Popover.Content>\n</Popover.Root>',
    '<Popover.Root>\n  <Popover.Trigger>Filters</Popover.Trigger>\n  <Popover.Content side="bottom" align="start">Filter controls render below the trigger.</Popover.Content>\n</Popover.Root>',
  ],
  progress: [
    '<Progress aria-label="Upload" value={42} />',
    '<Progress aria-label="Sync" max={200} value={120} size="lg" />',
    '<Progress aria-label="Loading" />',
    '<Progress aria-label="Capacity" shape="circular" showValue value={72} />',
  ],
  'qr-code': [
    '<QrCode value="https://example.com" aria-label="QR code linking to example.com" />',
    '<QrCode value="https://example.com" size={160} qrStyle="dots" eyeRadius={8} fgColor="#4f46e5" aria-label="Styled QR code" />',
  ],
  radio: [
    '<Radio.Root defaultValue="basic" name="plan" style={{ display: "flex", flexDirection: "column", gap: 10 }}>\n  <label style={{ alignItems: "center", display: "flex", gap: 8 }}>\n    <Radio.Item value="basic" /> Basic\n  </label>\n  <label style={{ alignItems: "center", display: "flex", gap: 8 }}>\n    <Radio.Item value="pro" /> Pro\n  </label>\n  <label style={{ alignItems: "center", display: "flex", gap: 8 }}>\n    <Radio.Item value="team" /> Team\n  </label>\n</Radio.Root>',
    '<Radio.Root name="plan-invalid">\n  <Radio.Item invalid value="required" aria-label="Required choice" />\n</Radio.Root>',
  ],
  'search-input': [
    '<SearchInput aria-label="Search" placeholder="Search…" />',
    '<SearchInput aria-label="Search" defaultValue="design system" />',
  ],
  select: [
    '<Select.Root>\n  <Select.Trigger aria-label="Status"><Select.Value placeholder="Choose a status" /></Select.Trigger>\n  <Select.Content>\n    <Select.Item value="draft">Draft</Select.Item>\n    <Select.Item value="published">Published</Select.Item>\n    <Select.Item value="archived">Archived</Select.Item>\n  </Select.Content>\n</Select.Root>',
    '<Select.Root>\n  <Select.Trigger invalid aria-label="Status"><Select.Value placeholder="Required" /></Select.Trigger>\n  <Select.Content>\n    <Select.Item value="draft">Draft</Select.Item>\n  </Select.Content>\n</Select.Root>',
    '<Select.Root disabled>\n  <Select.Trigger aria-label="Locked"><Select.Value placeholder="Locked" /></Select.Trigger>\n  <Select.Content>\n    <Select.Item value="locked">Locked</Select.Item>\n  </Select.Content>\n</Select.Root>',
  ],
  resizable: [
    '<div style={{ blockSize: 200, border: "1px solid var(--colors-border-default)", borderRadius: 8, inlineSize: 420, overflow: "hidden" }}>\n  <Resizable direction="horizontal">\n    <Resizable.Panel defaultSize={50}>\n      <div style={{ alignItems: "center", blockSize: "100%", display: "flex", justifyContent: "center", padding: 16 }}>One</div>\n    </Resizable.Panel>\n    <Resizable.Handle withHandle />\n    <Resizable.Panel defaultSize={50}>\n      <div style={{ alignItems: "center", blockSize: "100%", display: "flex", justifyContent: "center", padding: 16 }}>Two</div>\n    </Resizable.Panel>\n  </Resizable>\n</div>',
  ],
  'scroll-area': [
    '<div style={{ border: "1px solid var(--colors-border-default)", borderRadius: 8, overflow: "hidden" }}>\n  <ScrollArea style={{ blockSize: 180, inlineSize: 240 }}>\n    <div style={{ padding: 12 }}>\n      {Array.from({ length: 24 }, (_, i) => (\n        <div key={i} style={{ borderBottom: "1px solid var(--colors-border-muted)", padding: "6px 0" }}>Row {i + 1}</div>\n      ))}\n    </div>\n  </ScrollArea>\n</div>',
  ],
  separator: [
    '<div style={{ width: 320 }}>\n  <div style={{ color: "var(--colors-fg-default)" }}>Stalk UI</div>\n  <Separator style={{ marginBlock: 12 }} />\n  <div style={{ color: "var(--colors-fg-muted)" }}>An accessible, PandaCSS-native component library.</div>\n</div>',
    '<div style={{ alignItems: "center", color: "var(--colors-fg-default)", display: "flex", gap: 12, height: 20 }}>\n  <span>Docs</span>\n  <Separator orientation="vertical" />\n  <span>Storybook</span>\n  <Separator orientation="vertical" />\n  <span>GitHub</span>\n</div>',
  ],
  sheet: [
    '<Sheet.Root>\n  <Sheet.Trigger asChild>\n    <Button>Open sheet</Button>\n  </Sheet.Trigger>\n  <Sheet.Content side="right">\n    <Sheet.Header>\n      <Sheet.Title>Edit profile</Sheet.Title>\n      <Sheet.Description>Update your details, then save to apply changes.</Sheet.Description>\n    </Sheet.Header>\n    <Sheet.Footer>\n      <Sheet.Close asChild><Button variant="outline">Cancel</Button></Sheet.Close>\n      <Button>Save</Button>\n    </Sheet.Footer>\n  </Sheet.Content>\n</Sheet.Root>',
    '<Sheet.Root>\n  <Sheet.Trigger asChild>\n    <Button variant="outline">Open left</Button>\n  </Sheet.Trigger>\n  <Sheet.Content side="left">\n    <Sheet.Header>\n      <Sheet.Title>Navigation</Sheet.Title>\n      <Sheet.Description>A panel anchored to the start edge.</Sheet.Description>\n    </Sheet.Header>\n  </Sheet.Content>\n</Sheet.Root>',
  ],
  sidebar: [
    '<div style={{ border: "1px solid var(--colors-border-default)", borderRadius: 8, display: "flex", height: 280, overflow: "hidden" }}>\n  <Sidebar.Provider style={{ minHeight: "100%" }}>\n    <Sidebar>\n      <Sidebar.Header>\n        <Sidebar.Trigger />\n        <span style={{ fontWeight: 600 }}>Acme</span>\n      </Sidebar.Header>\n      <Sidebar.Content>\n        <Sidebar.Group>\n          <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>\n          <Sidebar.Menu>\n            <Sidebar.MenuItem>\n              <Sidebar.MenuButton isActive><Home /><span>Queue</span></Sidebar.MenuButton>\n            </Sidebar.MenuItem>\n            <Sidebar.MenuItem>\n              <Sidebar.MenuButton><Settings /><span>Settings</span></Sidebar.MenuButton>\n            </Sidebar.MenuItem>\n          </Sidebar.Menu>\n        </Sidebar.Group>\n      </Sidebar.Content>\n      <Sidebar.Rail />\n    </Sidebar>\n    <Sidebar.Inset>\n      <div style={{ alignItems: "center", display: "flex", gap: 8, padding: 12 }}>\n        <Sidebar.Trigger />\n        <strong>Task Queue</strong>\n      </div>\n    </Sidebar.Inset>\n  </Sidebar.Provider>\n</div>',
  ],
  skeleton: [
    '<Skeleton style={{ height: 14, width: 240 }} />',
    '<Skeleton radius="full" style={{ height: 48, width: 48 }} />',
  ],
  slider: [
    '<Slider aria-label="Volume" defaultValue={[40]} />',
    '<Slider aria-label="Price range" defaultValue={[20, 80]} />',
    '<Slider aria-label="Locked" defaultValue={[60]} disabled />',
  ],
  sparkline: [
    '<Sparkline data={[4, 6, 5, 8, 7, 9, 6, 10, 12, 9, 13, 11]} aria-label="Revenue, last 12 weeks" />',
    '<Sparkline data={[4, 6, 5, 8, 7, 9, 6, 10, 12, 9, 13, 11]} tone="success" area showLastPoint aria-label="Signups trend" />',
  ],
  spinner: [
    '<Spinner aria-label="Loading" />',
    '<Spinner size="lg" aria-label="Loading project" />',
    '<Spinner size="sm" aria-label="Saving" />',
  ],
  switch: [
    '<Switch aria-label="Email notifications" />',
    '<Switch defaultChecked aria-label="Push notifications" />',
    '<Switch disabled aria-label="Locked setting" />',
  ],
  table: [
    '<Table.Root>\n  <Table.Caption>Recent invoices.</Table.Caption>\n  <Table.Header>\n    <Table.Row>\n      <Table.Head scope="col">Invoice</Table.Head>\n      <Table.Head scope="col">Status</Table.Head>\n      <Table.Head scope="col">Amount</Table.Head>\n    </Table.Row>\n  </Table.Header>\n  <Table.Body>\n    <Table.Row>\n      <Table.Cell>INV-001</Table.Cell>\n      <Table.Cell><Badge tone="success" variant="subtle">Paid</Badge></Table.Cell>\n      <Table.Cell>$250.00</Table.Cell>\n    </Table.Row>\n    <Table.Row>\n      <Table.Cell>INV-002</Table.Cell>\n      <Table.Cell><Badge tone="warning" variant="subtle">Pending</Badge></Table.Cell>\n      <Table.Cell>$150.00</Table.Cell>\n    </Table.Row>\n  </Table.Body>\n</Table.Root>',
    '<Table.Root>\n  <Table.Header>\n    <Table.Row>\n      <Table.Head scope="col">Name</Table.Head>\n      <Table.Head scope="col">Role</Table.Head>\n    </Table.Row>\n  </Table.Header>\n  <Table.Body>\n    <Table.Row data-state="selected">\n      <Table.Cell>Ada Lovelace</Table.Cell>\n      <Table.Cell>Owner</Table.Cell>\n    </Table.Row>\n    <Table.Row>\n      <Table.Cell>Linus Torvalds</Table.Cell>\n      <Table.Cell>Maintainer</Table.Cell>\n    </Table.Row>\n  </Table.Body>\n</Table.Root>',
  ],
  'time-picker': [
    '<TimePicker hourCycle="12" minuteStep={5} />',
    '<TimePicker hourCycle="24" minuteStep={15} />',
  ],
  text: [
    '<Text>The quick brown fox jumps over the lazy dog.</Text>',
    '<Text size="bodyLg" weight="medium">A lead paragraph with more presence.</Text>',
    '<Text tone="danger">Something needs your attention.</Text>',
    '<Text>Press <Text.Strong>Save</Text.Strong> to keep changes, or <Text.Em>cancel</Text.Em>.</Text>',
  ],
  textarea: [
    '<Textarea aria-label="Message" placeholder="Write a message…" />',
    '<Textarea invalid aria-label="Message" defaultValue="too short" />',
    '<Textarea disabled aria-label="Read only" defaultValue="This textarea is disabled." />',
  ],
  tabs: [
    '<Tabs defaultValue="overview">\n  <TabsList>\n    <TabsTrigger value="overview">Overview</TabsTrigger>\n    <TabsTrigger value="analytics">Analytics</TabsTrigger>\n    <TabsTrigger value="settings">Settings</TabsTrigger>\n  </TabsList>\n  <TabsContent value="overview">Overview panel.</TabsContent>\n  <TabsContent value="analytics">Analytics panel.</TabsContent>\n  <TabsContent value="settings">Settings panel.</TabsContent>\n</Tabs>',
    '<Tabs defaultValue="a" variant="segmented" fitted>\n  <TabsList>\n    <TabsTrigger value="a">Day</TabsTrigger>\n    <TabsTrigger value="b">Week</TabsTrigger>\n    <TabsTrigger value="c">Month</TabsTrigger>\n  </TabsList>\n  <TabsContent value="a">Day view.</TabsContent>\n  <TabsContent value="b">Week view.</TabsContent>\n  <TabsContent value="c">Month view.</TabsContent>\n</Tabs>',
    '<Tabs defaultValue="a" variant="pills">\n  <TabsList>\n    <TabsTrigger value="a">All</TabsTrigger>\n    <TabsTrigger value="b">Open</TabsTrigger>\n    <TabsTrigger value="c">Closed</TabsTrigger>\n  </TabsList>\n  <TabsContent value="a">All issues.</TabsContent>\n  <TabsContent value="b">Open issues.</TabsContent>\n  <TabsContent value="c">Closed issues.</TabsContent>\n</Tabs>',
  ],
  tag: [
    '<Tag><Tag.Label>Frontend</Tag.Label></Tag>',
    '<Tag tone="success" dot><Tag.Label>Online</Tag.Label></Tag>',
    '<Tag tone="danger">\n  <Tag.Label>Errors</Tag.Label>\n  <Tag.Count>12</Tag.Count>\n</Tag>',
    '<Tag size="lg">\n  <Tag.Avatar>AB</Tag.Avatar>\n  <Tag.Label>Ada Byron</Tag.Label>\n</Tag>',
    '<Tag variant="outline" onClose={() => {}}>\n  <Tag.Label>Removable</Tag.Label>\n  <Tag.Close />\n</Tag>',
  ],
  'tags-input': [
    '<TagsInput aria-label="Tags" defaultValue={["design", "engineering"]} placeholder="Add a tag…" />',
    '<TagsInput aria-label="Tags" defaultValue={["one", "two"]} max={5} tone="success" />',
  ],
  toast: [
    "<>\n  <Button onClick={() => toast('Project saved')}>Show toast</Button>\n  <Toaster />\n</>",
    "<>\n  <Button onClick={() => toast.success('Invite sent', { description: 'teammate@stalk-ui.com will receive an email shortly.' })}>Success</Button>\n  <Toaster richColors />\n</>",
    "<>\n  <Button onClick={() => toast('Message archived', { description: 'Removed from your inbox.', action: { label: 'Undo', onClick: () => toast('Restored') } })}>Archive</Button>\n  <Toaster />\n</>",
  ],
  toggle: [
    '<Toggle aria-label="Bold">B</Toggle>',
    '<ToggleGroup type="single" defaultValue="left" aria-label="Alignment" attached>\n  <ToggleGroupItem value="left" aria-label="Left">L</ToggleGroupItem>\n  <ToggleGroupItem value="center" aria-label="Center">C</ToggleGroupItem>\n  <ToggleGroupItem value="right" aria-label="Right">R</ToggleGroupItem>\n</ToggleGroup>',
    '<ToggleGroup type="multiple" defaultValue={["bold"]} aria-label="Formatting">\n  <ToggleGroupItem value="bold" aria-label="Bold">B</ToggleGroupItem>\n  <ToggleGroupItem value="italic" aria-label="Italic">I</ToggleGroupItem>\n  <ToggleGroupItem value="underline" aria-label="Underline">U</ToggleGroupItem>\n</ToggleGroup>',
  ],
  toolbar: [
    '<Toolbar aria-label="Formatting">\n  <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">\n    <Toolbar.ToggleItem value="bold" aria-label="Bold"><Bold /></Toolbar.ToggleItem>\n    <Toolbar.ToggleItem value="italic" aria-label="Italic"><Italic /></Toolbar.ToggleItem>\n  </Toolbar.ToggleGroup>\n  <Toolbar.Separator />\n  <Toolbar.Button>Comment</Toolbar.Button>\n  <Toolbar.Link href="#">Share</Toolbar.Link>\n</Toolbar>',
  ],
  tooltip: [
    '<Tooltip.Provider>\n  <Tooltip.Root>\n    <Tooltip.Trigger>Help</Tooltip.Trigger>\n    <Tooltip.Content>Helpful context</Tooltip.Content>\n  </Tooltip.Root>\n</Tooltip.Provider>',
    '<Tooltip.Provider>\n  <Tooltip.Root defaultOpen>\n    <Tooltip.Trigger>Pinned</Tooltip.Trigger>\n    <Tooltip.Content side="bottom">Visible by default</Tooltip.Content>\n  </Tooltip.Root>\n</Tooltip.Provider>',
  ],
} as const
