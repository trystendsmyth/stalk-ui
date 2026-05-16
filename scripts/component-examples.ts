export const componentExamples = {
  alert: [
    '<Alert.Root tone="info">\n  <Alert.Icon><Info /></Alert.Icon>\n  <Alert.Body>\n    <Alert.Title>Heads up</Alert.Title>\n    <Alert.Description>You can add components using the CLI.</Alert.Description>\n  </Alert.Body>\n</Alert.Root>',
    '<Alert.Root tone="warning">\n  <Alert.Icon><AlertTriangle /></Alert.Icon>\n  <Alert.Body>\n    <Alert.Title>Storage almost full</Alert.Title>\n    <Alert.Description>You\'re using 92% of your storage.</Alert.Description>\n  </Alert.Body>\n  <Alert.Close aria-label="Dismiss"><X /></Alert.Close>\n</Alert.Root>',
    '<Alert.Root tone="danger">\n  <Alert.Icon><AlertCircle /></Alert.Icon>\n  <Alert.Body>\n    <Alert.Title>Deployment failed</Alert.Title>\n    <Alert.Description>Build #424 exited with code 1.</Alert.Description>\n    <Alert.Actions>\n      <Button size="sm" tone="danger">Retry</Button>\n    </Alert.Actions>\n  </Alert.Body>\n</Alert.Root>',
  ],
  avatar: [
    '<Avatar name="Ada Lovelace" />',
    '<Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop" name="Ada Lovelace" size="lg" />',
    '<Avatar name="Linus Torvalds" tone="success" radius="md" />',
  ],
  badge: [
    '<Badge>Published</Badge>',
    '<Badge variant="solid" tone="success">Live</Badge>',
    '<Badge variant="outline" tone="danger" size="sm" radius="sm">Error</Badge>',
  ],
  button: [
    '<Button>Save changes</Button>',
    '<Button variant="outline">Cancel</Button>',
    '<Button variant="ghost" size="sm">Learn more</Button>',
    '<Button loading>Saving…</Button>',
  ],
  checkbox: [
    '<Checkbox aria-label="Accept terms" />',
    '<Checkbox defaultChecked aria-label="Subscribed" />',
    '<Checkbox checked="indeterminate" aria-label="Bulk select" />',
    '<Checkbox disabled aria-label="Locked" />',
  ],
  dialog: [
    '<Dialog.Root>\n  <Dialog.Trigger>Open dialog</Dialog.Trigger>\n  <Dialog.Content>\n    <Dialog.Title>Confirm changes</Dialog.Title>\n  </Dialog.Content>\n</Dialog.Root>',
    '<Dialog.Root>\n  <Dialog.Trigger>Settings</Dialog.Trigger>\n  <Dialog.Content>\n    <Dialog.Header>\n      <Dialog.Title>Settings</Dialog.Title>\n      <Dialog.Description>Manage your preferences.</Dialog.Description>\n    </Dialog.Header>\n    <Dialog.Footer>\n      <Dialog.Close>Cancel</Dialog.Close>\n    </Dialog.Footer>\n  </Dialog.Content>\n</Dialog.Root>',
  ],
  'dropdown-menu': [
    '<DropdownMenu.Root>\n  <DropdownMenu.Trigger>Open menu</DropdownMenu.Trigger>\n  <DropdownMenu.Content>\n    <DropdownMenu.Item>Edit</DropdownMenu.Item>\n    <DropdownMenu.Item>Duplicate</DropdownMenu.Item>\n    <DropdownMenu.Separator />\n    <DropdownMenu.Item>Delete</DropdownMenu.Item>\n  </DropdownMenu.Content>\n</DropdownMenu.Root>',
    '<DropdownMenu.Root>\n  <DropdownMenu.Trigger>Project</DropdownMenu.Trigger>\n  <DropdownMenu.Content>\n    <DropdownMenu.Label>Project</DropdownMenu.Label>\n    <DropdownMenu.Item>Rename<DropdownMenu.Shortcut>⌘R</DropdownMenu.Shortcut></DropdownMenu.Item>\n    <DropdownMenu.Item>Archive<DropdownMenu.Shortcut>⌘E</DropdownMenu.Shortcut></DropdownMenu.Item>\n  </DropdownMenu.Content>\n</DropdownMenu.Root>',
    '<DropdownMenu.Root>\n  <DropdownMenu.Trigger>View</DropdownMenu.Trigger>\n  <DropdownMenu.Content>\n    <DropdownMenu.CheckboxItem defaultChecked>Show toolbar</DropdownMenu.CheckboxItem>\n    <DropdownMenu.CheckboxItem>Show sidebar</DropdownMenu.CheckboxItem>\n  </DropdownMenu.Content>\n</DropdownMenu.Root>',
  ],
  input: [
    '<Input aria-label="Email" placeholder="hello@stalk-ui.com" />',
    '<Input invalid aria-label="Email" defaultValue="not-an-email" />',
    '<Input disabled aria-label="Read only" defaultValue="acme-corp" />',
  ],
  label: [
    '<Label htmlFor="email">Email</Label>',
    '<Label required htmlFor="name">Name</Label>',
    '<Label size="lg" htmlFor="bio">About you</Label>',
  ],
  popover: [
    '<Popover.Root>\n  <Popover.Trigger>Open popover</Popover.Trigger>\n  <Popover.Content>Quick actions go here.</Popover.Content>\n</Popover.Root>',
    '<Popover.Root>\n  <Popover.Trigger>Filters</Popover.Trigger>\n  <Popover.Content side="bottom" align="start">Filter controls render below the trigger.</Popover.Content>\n</Popover.Root>',
  ],
  radio: [
    '<Radio.Root defaultValue="basic" name="plan">\n  <Radio.Item value="basic" aria-label="Basic" />\n  <Radio.Item value="pro" aria-label="Pro" />\n  <Radio.Item value="team" aria-label="Team" />\n</Radio.Root>',
    '<Radio.Root name="plan-invalid">\n  <Radio.Item invalid value="required" aria-label="Required choice" />\n</Radio.Root>',
  ],
  select: [
    '<Select.Root>\n  <Select.Trigger aria-label="Status"><Select.Value placeholder="Choose a status" /></Select.Trigger>\n  <Select.Content>\n    <Select.Item value="draft">Draft</Select.Item>\n    <Select.Item value="published">Published</Select.Item>\n    <Select.Item value="archived">Archived</Select.Item>\n  </Select.Content>\n</Select.Root>',
    '<Select.Root>\n  <Select.Trigger invalid aria-label="Status"><Select.Value placeholder="Required" /></Select.Trigger>\n  <Select.Content>\n    <Select.Item value="draft">Draft</Select.Item>\n  </Select.Content>\n</Select.Root>',
    '<Select.Root disabled>\n  <Select.Trigger aria-label="Locked"><Select.Value placeholder="Locked" /></Select.Trigger>\n  <Select.Content>\n    <Select.Item value="locked">Locked</Select.Item>\n  </Select.Content>\n</Select.Root>',
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
    '<Tag>Frontend</Tag>',
    '<Tag tone="success" dot>Online</Tag>',
    '<Tag tone="danger" count={12}>Errors</Tag>',
    '<Tag variant="outline" onClose={() => {}}>Removable</Tag>',
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
  tooltip: [
    '<Tooltip.Provider>\n  <Tooltip.Root>\n    <Tooltip.Trigger>Help</Tooltip.Trigger>\n    <Tooltip.Content>Helpful context</Tooltip.Content>\n  </Tooltip.Root>\n</Tooltip.Provider>',
    '<Tooltip.Provider>\n  <Tooltip.Root defaultOpen>\n    <Tooltip.Trigger>Pinned</Tooltip.Trigger>\n    <Tooltip.Content side="bottom">Visible by default</Tooltip.Content>\n  </Tooltip.Root>\n</Tooltip.Provider>',
  ],
} as const
