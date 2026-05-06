# Stalk UI MCP Server

The Stalk UI MCP server lets AI assistants search, browse, view, and install components from the Stalk UI registry.

There are **two transports**, both using the same tool surface:

- **Remote (default):** `https://stalk-ui.com/mcp` — Streamable HTTP. Zero install. Knows the catalog but not your project.
- **Local stdio:** `npx @stalk-ui/cli mcp` — runs in your project directory. Adds project-context tools that read `stalk.config.json` and detect your package manager.

---

## Setup

```bash
npx @stalk-ui/cli mcp init --client claude
```

Writes the editor's MCP config pointing at `https://stalk-ui.com/mcp`.

| Editor      | Config file          | Flag                |
| ----------- | -------------------- | ------------------- |
| Claude Code | `.mcp.json`          | `--client claude`   |
| Cursor      | `.cursor/mcp.json`   | `--client cursor`   |
| VS Code     | `.vscode/mcp.json`   | `--client vscode`   |
| OpenCode    | `opencode.json`      | `--client opencode` |
| Codex       | `.codex/config.toml` | `--client codex`    |

Pass `--local` to point at the stdio server instead:

```bash
npx @stalk-ui/cli mcp init --client claude --local
```

---

## Tools

> **Tip:** All tools are pure read operations. Component installation still happens through the CLI (`add` command). The `get_add_command` tool returns the exact command to run.

### `stalk-ui:list_items`

List components in registries. Default: `@stalk-ui` registry, `radix` variant, `stalk` flavor.

**Input:** `registries?` (string[]), `variant?` (`'radix' | 'base'`), `flavor?` (`'stalk' | 'shadcn'`)

### `stalk-ui:search_items`

Fuzzy search across registries.

**Input:** `query` (string), `registries?` (string[]), `variant?`, `flavor?`, `limit?` (number)

### `stalk-ui:view_items`

Fetch full manifests including file contents, dependencies, recipes, and semantic tokens.

**Input:** `items` (string[]) — e.g. `["@stalk-ui/button", "@stalk-ui/dialog"]`

### `stalk-ui:get_add_command`

Return the CLI install command. Local server uses the detected package manager; remote server returns one line per package manager.

**Input:** `items` (string[])

### `stalk-ui:get_install_instructions`

Prerequisites and setup steps (PandaCSS 1.9.1, `@stalk-ui/cli init`, panda codegen).

**Input:** none

### `stalk-ui:get_audit_checklist`

Stalk-specific checklist to run after generating or modifying components: `pnpm verify`, semantic tokens, RTL, tree-shaking, recipes from generated `styled-system/recipes`.

**Input:** none

### `stalk-ui:get_project_registries` _(local-only)_

Return registries from the current project's `stalk.config.json`. Only registered on the local stdio server — the remote server has no filesystem access.

**Input:** none

---

## Configuring Custom Registries

Extend `stalk.config.json`:

```json
{
  "registries": {
    "@stalk-ui": "https://stalk-ui.com/r/{name}.json",
    "@acme": "https://acme.example.com/r/{name}.json"
  }
}
```

- Namespaces must start with `@`.
- URLs must contain `{name}` (the CLI substitutes `{name}` with `<variant>/<component>` for non-default variants).

The local MCP server enumerates `@acme` automatically. The remote server only knows `@stalk-ui` — for custom registries, run the local server.
