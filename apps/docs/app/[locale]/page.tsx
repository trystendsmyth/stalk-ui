import { InstallCommand } from '../../components/install-command'

interface LocaleHomePageProps {
  params: Promise<{
    locale: string
  }>
}

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const { locale } = await params

  return (
    <main className="hero">
      <p className="eyebrow">Radix & PandaCSS-native components</p>
      <h1>Accessible source components, distributed through a first-party registry.</h1>
      <p className="lede">
        Stalk UI provides a Radix compatible PandaCSS preset, installable source components, and
        shadcn-compatible registry manifests — install with the Stalk CLI, or with the shadcn CLI
        you already have.
      </p>
      <InstallCommand command="pnpm dlx @stalk-ui/cli add button" />
      <InstallCommand command="npx shadcn@latest add https://stalk-ui.com/r/shadcn/button.json" />
      <div className="action-list" aria-label="Documentation entry points">
        <a href={`/${locale}/docs`}>Get started</a>
        <a href={`/${locale}/components`}>Browse components</a>
        <a href={`/${locale}/docs/getting-started/registry`}>Registry & shadcn compatibility</a>
      </div>
    </main>
  )
}
