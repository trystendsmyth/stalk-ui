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

`NPM_TOKEN` and other release credentials should be reviewed and rotated at least annually.
