import { parseIntegrationFixtures, runIntegrationFixtures } from './integration-fixture-harness'

await runIntegrationFixtures(parseIntegrationFixtures(process.argv[2] ?? 'all'))

// Belt-and-suspenders: ensure the process exits cleanly even if any leftover
// open handle (puppeteer FDs, async-local-storage, etc.) would otherwise keep
// the event loop alive after every fixture has reported success.
process.exit(0)
