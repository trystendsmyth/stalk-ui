const links = [
  { href: 'https://stalk-ui.dev/r/', label: 'Native registry' },
  { href: 'https://stalk-ui.dev/r/shadcn/', label: 'shadcn-compatible registry' },
]

export default function HomePage() {
  return (
    <main className="shell">
      <p className="eyebrow">Stalk UI docs shell</p>
      <h1>PandaCSS-native components, distributed as source.</h1>
      <p className="lede">
        This placeholder keeps the docs app buildable while component documentation and Fumadocs
        content are introduced in later phases.
      </p>
      <ul aria-label="Planned registry outputs">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </main>
  )
}
