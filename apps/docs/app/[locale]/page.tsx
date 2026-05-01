interface LocaleHomePageProps {
  params: Promise<{
    locale: string
  }>
}

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const { locale } = await params

  return (
    <main className="hero">
      <p className="eyebrow">PandaCSS-native components</p>
      <h1>Accessible source components, distributed through a first-party registry.</h1>
      <p className="lede">
        Stalk UI gives teams a PandaCSS preset, installable source components, and compatibility
        manifests for projects that already use the shadcn CLI.
      </p>
      <div className="action-list" aria-label="Documentation entry points">
        <a href={`/${locale}/docs`}>Get started</a>
        <a href={`/${locale}/components/button`}>Button docs</a>
        <a href="/r/shadcn/button.json">shadcn manifest</a>
      </div>
    </main>
  )
}
