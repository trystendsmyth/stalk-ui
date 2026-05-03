export const componentExamples = {
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
  tooltip: [
    '<Tooltip.Provider>\n  <Tooltip.Root>\n    <Tooltip.Trigger>Help</Tooltip.Trigger>\n    <Tooltip.Content>Helpful context</Tooltip.Content>\n  </Tooltip.Root>\n</Tooltip.Provider>',
    '<Tooltip.Provider>\n  <Tooltip.Root defaultOpen>\n    <Tooltip.Trigger>Pinned</Tooltip.Trigger>\n    <Tooltip.Content side="bottom">Visible by default</Tooltip.Content>\n  </Tooltip.Root>\n</Tooltip.Provider>',
  ],
} as const
