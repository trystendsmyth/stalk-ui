const imports = [
  ['@stalk-ui/i18n', '../packages/i18n/dist/index.js'],
  ['@stalk-ui/i18n/locales/en', '../packages/i18n/dist/locales/en.js'],
] as const

for (const [specifier, relativePath] of imports) {
  await import(new URL(relativePath, import.meta.url).href)
  console.log(`Resolved ${specifier}`)
}
