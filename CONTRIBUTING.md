# Contributing

Stalk UI is built with Node 24, pnpm 10, TypeScript 5.x, React 19, and PandaCSS 1.9.1. PandaCSS is pinned at 1.9.1; do not upgrade it to 1.10+ without explicit maintainer approval.

## Port Allocations

| Port | Service                                                                  |
| ---- | ------------------------------------------------------------------------ |
| 3000 | `apps/docs` development server                                           |
| 6006 | Storybook development server and test-runner target                      |
| 4873 | Verdaccio local npm registry                                             |
| 4874 | Local registry server for `public/r/*.json` and `public/r/shadcn/*.json` |

## Development Setup

1. Use Node 24 from `.nvmrc` or `.node-version`.
2. Use pnpm 10. The root `packageManager` field pins `pnpm@10.0.0`.
3. Run installs with pnpm only.
4. Do not add npm, Yarn, Tailwind tooling, `prettier-plugin-tailwindcss`, or `bradlc.vscode-tailwindcss`.

## Branches And Commits

Use Conventional Commits:

```text
<type>(<scope>): <subject>
```

Allowed types include `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`, and `a11y`.

Branch names should follow `<type>/<kebab-description>`.

## Pull Requests

Every behavior change should include the narrowest useful tests. Component changes require tests, stories, documentation, registry manifests, and accessibility coverage.

Changes that affect published packages require a changeset once Changesets is enabled.

## Component Authoring

Every component must include source, registry manifest, stories, tests, accessibility coverage, documentation, and tree-shaking verification where compound dot notation is used. Public dot-notation APIs must be built from named exports with `Object.assign`.

## Accessibility

Accessibility is a first-class CI gate. Components require jsx-a11y strict compliance, axe coverage through `vitest-axe`, keyboard interaction tests, and screen reader label checks.

## RTL Verification

Use logical CSS properties such as `marginInlineStart`, `paddingInlineEnd`, and `insetInlineStart`. Stories for layout-sensitive components should include RTL variants.

## Turbo Cache Strategy

Turbo task outputs are limited to generated build artifacts such as `dist/` and test coverage. Turbo's local cache lives in `.turbo/`. Both `dist/` and `.turbo/` are ignored and should not be committed.

## Visual Regression Testing

Stalk UI uses Lost Pixel in OSS mode. Baseline screenshots live in `apps/storybook/.lost-pixel/baseline/` and are committed to git.

### When You Intentionally Change Appearance

1. Make your code change.
2. Run `pnpm lost-pixel:local`.
3. Review PNGs in `apps/storybook/.lost-pixel/difference/`.
4. Run `pnpm lost-pixel:update`.
5. Commit code and updated baseline PNGs.
6. Mention in the PR description that baselines changed and why.

### When CI Finds An Unexpected Regression

1. Download the `lost-pixel-diff` artifact.
2. Inspect the images in `difference/`.
3. Fix the underlying bug.
4. Push again without updating baselines.

### Seeding Initial Baselines

Let CI fail once for the first baseline of a component, download the artifact, and copy `current/*.png` into `apps/storybook/.lost-pixel/baseline/`. Do not create first baselines locally if CI runs on Ubuntu.

## Maintaining shadcn Compatibility

The `shadcn-compat` CI job runs on PRs touching registry or component code. If it fails, check for shadcn CLI schema drift, run `pnpm test:shadcn-compat`, update the serializer, and update compatibility docs when user-visible behavior changes.

# Contributing

Stalk UI is built with Node 24, pnpm 10, TypeScript 5.x, React 19, and PandaCSS 1.9.1. PandaCSS is pinned at 1.9.1; do not upgrade it to 1.10+ without explicit maintainer approval.

## Development Setup

1. Use Node 24 from `.nvmrc` or `.node-version`.
2. Use pnpm 10. The root `packageManager` field pins `pnpm@10.0.0`.
3. Run installs with pnpm only. Do not add npm, Yarn, Tailwind tooling, `prettier-plugin-tailwindcss`, or `bradlc.vscode-tailwindcss`.

## Turbo Cache Strategy

Turbo task outputs are limited to generated build artifacts such as `dist/` and test coverage. Turbo's local cache lives in `.turbo/`. Both `dist/` and `.turbo/` are ignored and should not be committed.

## Commits

Use Conventional Commits:

```text
<type>(<scope>): <subject>
```

Allowed types include `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`, and `a11y`.

## Component Authoring

Every component must include source, registry manifest, stories, tests, accessibility coverage, documentation, and tree-shaking verification where compound dot notation is used. Public dot-notation APIs must be built from named exports with `Object.assign`.

## Accessibility

Accessibility is a first-class CI gate. Components require jsx-a11y strict compliance, axe coverage through `vitest-axe`, keyboard interaction tests, and screen reader label checks.

## Visual Regression Testing

Stalk UI uses Lost Pixel in OSS mode. Baseline screenshots live in `apps/storybook/.lost-pixel/baseline/` and are committed to git.

### When You Intentionally Change Appearance

1. Make your code change.
2. Run `pnpm lost-pixel:local`.
3. Review PNGs in `apps/storybook/.lost-pixel/difference/`.
4. Run `pnpm lost-pixel:update`.
5. Commit code and updated baseline PNGs.
6. Mention in the PR description that baselines changed and why.

### When CI Finds an Unexpected Regression

1. Download the `lost-pixel-diff` artifact.
2. Inspect the images in `difference/`.
3. Fix the underlying bug.
4. Push again without updating baselines.

### Seeding Initial Baselines

Let CI fail once for the first baseline of a component, download the artifact, and copy `current/*.png` into `apps/storybook/.lost-pixel/baseline/`. Do not create first baselines locally if CI runs on Ubuntu.

## Maintaining Shadcn Compatibility

The `shadcn-compat` CI job runs on PRs touching registry or component code. If it fails, check for shadcn CLI schema drift, run `pnpm test:shadcn-compat`, update the serializer, and update compatibility docs when user-visible behavior changes.
