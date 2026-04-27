export const componentExamples = {
  badge: [
    '<Badge>Published</Badge>',
    '<Badge variant="solid">Stable</Badge>',
    '<Badge size="sm" variant="outline">Beta</Badge>',
  ],
  button: [
    '<Button>Save</Button>',
    '<Button variant="outline">Cancel</Button>',
    '<Button loading>Saving</Button>',
  ],
  checkbox: [
    '<Checkbox label="Accept terms" />',
    '<Checkbox description="Receive product release notes." id="release-notes" label="Release notes" />',
    '<Checkbox invalid label="Required checkbox" />',
  ],
  dialog: [
    '<Dialog.Root><Dialog.Trigger>Open</Dialog.Trigger><Dialog.Content><Dialog.Title>Title</Dialog.Title></Dialog.Content></Dialog.Root>',
    '<Dialog.Content><Dialog.Header><Dialog.Title>Settings</Dialog.Title><Dialog.Description>Manage preferences.</Dialog.Description></Dialog.Header></Dialog.Content>',
    '<Dialog.Footer><Dialog.Close>Cancel</Dialog.Close></Dialog.Footer>',
  ],
  'dropdown-menu': [
    '<DropdownMenu.Root><DropdownMenu.Trigger>Open</DropdownMenu.Trigger><DropdownMenu.Content><DropdownMenu.Item>Edit</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Root>',
    '<DropdownMenu.Label>Project</DropdownMenu.Label><DropdownMenu.Separator />',
    '<DropdownMenu.Item>Rename<DropdownMenu.Shortcut>⌘R</DropdownMenu.Shortcut></DropdownMenu.Item>',
  ],
  input: [
    '<Input aria-label="Email" placeholder="hello@stalk-ui.com" />',
    '<Input invalid aria-label="Email" placeholder="Invalid email" />',
    '<Input disabled aria-label="Disabled input" placeholder="Disabled" />',
  ],
  label: [
    '<Label htmlFor="email">Email</Label>',
    '<Label required htmlFor="name">Name</Label>',
    '<Label size="lg">Large label</Label>',
  ],
  popover: [
    '<Popover.Root><Popover.Trigger>Open</Popover.Trigger><Popover.Content>Interactive content</Popover.Content></Popover.Root>',
    '<Popover.Content aria-label="Project settings"><Popover.Close>Close</Popover.Close></Popover.Content>',
    '<Popover.Content side="bottom">Positioned below the trigger</Popover.Content>',
  ],
  radio: [
    '<Radio label="Basic" name="plan" value="basic" />',
    '<Radio description="Best for small teams." id="plan-basic" label="Basic" name="plan" value="basic" />',
    '<Radio invalid label="Required choice" name="plan" value="required" />',
  ],
  select: [
    '<Select aria-label="Status"><option>Draft</option><option>Published</option></Select>',
    '<Select invalid aria-label="Status"><option>Choose a status</option></Select>',
    '<Select disabled aria-label="Disabled select"><option>Disabled</option></Select>',
  ],
  switch: [
    '<Switch label="Email notifications" />',
    '<Switch description="Send product updates." id="product-updates" label="Product updates" />',
    '<Switch invalid label="Required setting" />',
  ],
  textarea: [
    '<Textarea aria-label="Message" placeholder="Write a message..." />',
    '<Textarea invalid aria-label="Message" placeholder="Message is required" />',
    '<Textarea disabled aria-label="Disabled textarea" placeholder="Disabled" />',
  ],
  tooltip: [
    '<Tooltip.Provider><Tooltip.Root><Tooltip.Trigger>Help</Tooltip.Trigger><Tooltip.Content>Helpful context</Tooltip.Content></Tooltip.Root></Tooltip.Provider>',
    '<Tooltip.Root defaultOpen><Tooltip.Trigger>Open</Tooltip.Trigger><Tooltip.Content>Visible by default</Tooltip.Content></Tooltip.Root>',
    '<Tooltip.Content side="bottom">Positioned below the trigger</Tooltip.Content>',
  ],
} as const
