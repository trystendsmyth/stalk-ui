# Security Policy

## Reporting A Vulnerability

Please report suspected vulnerabilities through GitHub Security Advisories for this repository. Do not open public issues for private vulnerability reports.

Include as much detail as possible:

- Affected package, command, or generated artifact
- Steps to reproduce
- Expected and actual behavior
- Impact and known workarounds

## Supported Versions

Security fixes target the latest released version unless a maintainer documents an exception.

## Secrets And Tokens

Automation tokens are scoped to the smallest practical permissions. Long-lived secrets should live in repository or organization secret storage, never in source-controlled files.

## npm Publishing — Trusted Publishing (OIDC)

`@stalk-ui/cli`, `@stalk-ui/preset`, and `@stalk-ui/i18n` publish to npm via [trusted publishing](https://docs.npmjs.com/trusted-publishers) over OIDC from `.github/workflows/release.yml`. There is no long-lived `NPM_TOKEN` in repository secrets, and each package has **"Require two-factor authentication and disallow tokens"** enabled on its npm settings page.

Each publish:

- Mints a short-lived OIDC token at workflow runtime that is scoped to the `release.yml` workflow on the `trystendsmyth/stalk-ui` repository.
- Generates a provenance attestation automatically (public-repository requirement, satisfied once the repo flips public).
- Cannot be replayed or extracted from logs.

Operational requirements:

- The `release` job in `.github/workflows/release.yml` must keep `permissions: id-token: write`.
- The runner must have npm CLI `>=11.5.1`. The workflow installs `npm@latest` after `setup-node` to satisfy this on Node 24 runners.
- Each package's `repository.url` in its `package.json` must continue to match `https://github.com/trystendsmyth/stalk-ui.git`.
- If `release.yml` is renamed, the npm trusted-publisher configuration on each package must be updated to match the new filename **before** the next push.

If the trusted-publisher relationship needs to be re-established (for example after a workflow rename or org change), update the configuration at `https://www.npmjs.com/package/<name>/access` for each package.

## Token Rotation

Trusted publishing eliminated the recurring `NPM_TOKEN` rotation chore. No automation tokens with publish scope exist on the npm account; `npm token list` should show only read-only tokens (if any) used for installing private dependencies.

If a publish token is ever introduced (for example to bootstrap a new package that doesn't yet have a trusted-publisher configuration), record it here and revoke it as soon as the trusted-publisher entry is in place:

| Token | Purpose | Created | Revoked |
| ----- | ------- | ------- | ------- |
| _none_ | _trusted publishing in use_ | — | — |
