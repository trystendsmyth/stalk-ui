import {
  getAddCommandTool,
  getAuditChecklistTool,
  getInstallInstructionsTool,
  listItemsTool,
  remoteContext,
  searchItemsTool,
  viewItemsTool,
} from '@stalk-ui/cli/mcp'
import { createMcpHandler } from 'mcp-handler'
import { z } from 'zod'

const variantField = z.enum(['radix', 'base']).optional()
const flavorField = z.enum(['stalk', 'shadcn']).optional()

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      'list_items',
      {
        description:
          "List components in Stalk UI registries. Filter by variant ('radix' or 'base') and flavor ('stalk' or 'shadcn').",
        inputSchema: {
          registries: z.array(z.string()).optional(),
          variant: variantField,
          flavor: flavorField,
        },
      },
      async (args) => {
        const result = await listItemsTool(remoteContext(), args)
        return { content: [{ type: 'text', text: result.text }] }
      },
    )

    server.registerTool(
      'search_items',
      {
        description: 'Fuzzy search for Stalk UI components by name across registries.',
        inputSchema: {
          query: z.string(),
          registries: z.array(z.string()).optional(),
          variant: variantField,
          flavor: flavorField,
          limit: z.number().int().positive().optional(),
        },
      },
      async (args) => {
        const result = await searchItemsTool(remoteContext(), args)
        return { content: [{ type: 'text', text: result.text }] }
      },
    )

    server.registerTool(
      'view_items',
      {
        description:
          'Fetch full manifests (file contents, dependencies, recipes, semantic tokens) for one or more registry items. Names use the @<registry>/<name> form, e.g. @stalk-ui/button.',
        inputSchema: {
          items: z.array(z.string()).min(1),
        },
      },
      async (args) => {
        const result = await viewItemsTool(remoteContext(), args)
        return { content: [{ type: 'text', text: result.text }] }
      },
    )

    server.registerTool(
      'get_add_command',
      {
        description: 'Return the CLI command(s) to install one or more Stalk UI components.',
        inputSchema: {
          items: z.array(z.string()).min(1),
        },
      },
      (args) => {
        const result = getAddCommandTool(remoteContext(), args)
        return { content: [{ type: 'text', text: result.text }] }
      },
    )

    server.registerTool(
      'get_install_instructions',
      {
        description:
          'Return prerequisites and setup steps for installing Stalk UI in a Next.js or React project.',
        inputSchema: {},
      },
      () => ({
        content: [{ type: 'text', text: getInstallInstructionsTool().text }],
      }),
    )

    server.registerTool(
      'get_audit_checklist',
      {
        description:
          'Return a Stalk UI audit checklist (panda codegen, semantic tokens, RTL, tree-shaking) to run after generating or modifying components.',
        inputSchema: {},
      },
      () => ({
        content: [{ type: 'text', text: getAuditChecklistTool().text }],
      }),
    )
  },
  { serverInfo: { name: 'stalk-ui', version: '1.0.0' } },
  {
    basePath: '/api',
    maxDuration: 60,
  },
)

// Next rewrites `/mcp` and `/sse` to this route file but `request.url`
// still reflects the public path. mcp-handler matches request.url against
// its configured `basePath: '/api'` endpoints, so prepend `/api` when the
// request arrived through the rewrite.
const proxiedHandler = (request: Request) => {
  const url = new URL(request.url)
  if (url.pathname.startsWith('/api/')) {
    return handler(request)
  }
  url.pathname = `/api${url.pathname}`
  return handler(new Request(url.toString(), request))
}

export { proxiedHandler as DELETE, proxiedHandler as GET, proxiedHandler as POST }
