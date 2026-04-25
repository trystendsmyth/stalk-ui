# Stalk UI

A PandaCSS-native component library distributed through a first-party CLI, a preset package, and static registry manifests.

## Installation

Stalk UI has two install paths:

**`@stalk-ui/cli` (recommended for new projects)**

```sh
pnpm dlx stalk-ui@latest init
pnpm dlx stalk-ui@latest add @stalk-ui/button
```

**shadcn CLI (for mixed shadcn + Stalk projects)**

```sh
npx shadcn@latest add https://stalk-ui.dev/r/shadcn/button.json
```

The shadcn-compatible path assumes the project already satisfies Stalk UI's PandaCSS prerequisites.

## Features

- Zero-runtime CSS via PandaCSS build-time extraction
- WCAG 2.1 AA defaults, enforced in CI
- Radix-style semantic theming with light and dark support
- RTL-ready styles through logical properties
- Source-file ownership: components are copied into consumer repositories

## Quick Start

```sh
pnpm dlx stalk-ui@latest init
pnpm dlx stalk-ui@latest add @stalk-ui/button
pnpm dlx stalk-ui@latest theme violet
```

## Documentation

- Docs: https://stalk-ui.dev
- Storybook: https://trystendsmyth.github.io/stalk-ui

## Packages

- `@stalk-ui/cli`
- `@stalk-ui/preset`
- `@stalk-ui/i18n`

No component npm package is planned. Components ship as source files through registry manifests under `public/r/`.

## Contributing

See `CONTRIBUTING.md`.

## License

MIT

# Stalk UI

Stalk UI is a PandaCSS-native component library distributed through a first-party CLI, a PandaCSS preset package, and generated static registry manifests.

The primary install path is the `stalk-ui` CLI. Shadcn-compatible registry output exists only as a secondary, degraded compatibility path for projects that already satisfy the PandaCSS prerequisites.

## Planned Packages

- `@stalk-ui/cli`: install and management CLI
- `@stalk-ui/preset`: PandaCSS preset with tokens, recipes, and themes
- `@stalk-ui/i18n`: published locale/runtime support
- `packages/components`: private internal source of truth for copied component source

No component npm package is planned. Components are shipped as source files through registry manifests under `public/r/`.
