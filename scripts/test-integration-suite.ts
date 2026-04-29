import { parseIntegrationFixtures, runIntegrationFixtures } from './integration-fixture-harness'

await runIntegrationFixtures(parseIntegrationFixtures(process.argv[2] ?? 'all'))
