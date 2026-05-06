# Stalk UI CLI Reference

Configuration is read from `stalk.config.json`.

> **IMPORTANT:** Always run commands using the project's package runner: `npx @stalk-ui/cli`, `pnpm dlx @stalk-ui/cli`, or `bunx @stalk-ui/cli`. Check `packageManager` from project context to choose the right one. Examples below use `npx`.

> **IMPORTANT:** Only use the flags documented below. Do not invent flags. The CLI auto-detects the package manager from the project's lockfile.

## Contents

- Global options
- Commands: init, add, diff, upgrade, theme, info, mcp
- Variants: radix (default) vs base
- stalk.config.json shape

---

## Global options

Available on `init`, `add`, `diff`, `upgrade`, `info`:

| Flag                 | Description                                       |
| -------------------- | ------------------------------------------------- |
| `--dry-run`          | Print intended changes without writing files.     |
| `--force`            | Overwrite existing files without prompting.       |
| `--verbose`          | Print detailed debug output.                      |
| `--no-codegen`       | Skip running `panda codegen` after the operation. |
| `--registry <url>`   | Override registry URL or URL template.            |
| `--config <path>`    | Path to panda config.                             |
| `--workspace <name>` | Workspace name when running at a monorepo root.   |

---

## `init` — Initialize Stalk UI in a project

```bash
npx @stalk-ui/cli init
```

Patches the existing `panda.config.ts` (or creates one), installs `@pandacss/dev`, `@stalk-ui/preset`, `@stalk-ui/i18n`, writes `stalk.config.json`, runs `panda codegen`. Adds `.stalk-ui-backup/` to `.gitignore`.

## `add` — Install one or more components

```bash
npx @stalk-ui/cli add button
npx @stalk-ui/cli add @stalk-ui/dialog
```

Resolves the manifest from the registry, copies source files into the configured `components` directory (default `./src/components/ui`), installs npm + registry dependencies, runs `panda codegen`. Existing files are backed up under `.stalk-ui-backup/<timestamp>/` before overwrite.

## `diff` — Compare local copy against the registry

```bash
npx @stalk-ui/cli diff button
```

Reports which manifest files are missing or differ from local copies. Prints `<name>: no differences` when clean.

## `upgrade` — Update shared runtime packages

```bash
npx @stalk-ui/cli upgrade
```

Bumps `@stalk-ui/preset@latest` and `@stalk-ui/i18n@latest`, runs `panda codegen`. Component source files are not touched.

## `theme` — Show theme usage

```bash
npx @stalk-ui/cli theme            # list themes
npx @stalk-ui/cli theme rainbow    # show usage for one theme
```

Stalk ships three themes: `neutral` (default), `rainbow`, `monochrome`. Apply via `data-panda-theme` on `<html>` or any subtree.

## `info` — Project context

```bash
npx @stalk-ui/cli info
npx @stalk-ui/cli info --json
```

Prints the resolved `stalk.config.json`, detected package manager, and the list of components already installed under the configured directory. JSON form is the source of truth used by the skill and MCP project context.

## `mcp` — MCP server

```bash
npx @stalk-ui/cli mcp                       # start the stdio MCP server
npx @stalk-ui/cli mcp init --client claude  # write .mcp.json for the project
npx @stalk-ui/cli mcp init --client cursor
npx @stalk-ui/cli mcp init --client vscode
npx @stalk-ui/cli mcp init --client opencode
npx @stalk-ui/cli mcp init --client codex
npx @stalk-ui/cli mcp init --client claude --local   # use stdio instead of remote
```

`mcp init` defaults to the **remote** MCP server at `https://stalk-ui.com/mcp` so editors get registry data with zero install. Pass `--local` to wire the stdio server (`npx @stalk-ui/cli mcp`) for project-aware tools.

See [mcp.md](./mcp.md) for the tool catalog.

---

## Variants

`stalk.config.json` accepts `"primitives": "radix" | "base"`.

- `radix` (default): components use Radix primitives where an established accessible primitive exists.
- `base`: lower-level primitives. Manifests resolve from `<registry>/base/<name>.json`.

Switch by editing `stalk.config.json` and re-running `add` for affected components.

## `stalk.config.json` shape

```json
{
  "$schema": "https://stalk-ui.com/schema/v1/config.json",
  "preset": "@stalk-ui/preset",
  "components": "./src/components/ui",
  "utils": "./src/lib/utils",
  "styledSystem": "styled-system",
  "registries": {
    "@stalk-ui": "https://stalk-ui.com/r/{name}.json"
  },
  "primitives": "radix",
  "packageManager": "pnpm"
}
```

Add custom registries by extending the `registries` map; namespaces must start with `@` and the URL must contain `{name}`.
