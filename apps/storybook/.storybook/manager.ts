import { createElement as h } from 'react'
import { addons, types } from 'storybook/manager-api'

import { darkTheme } from './theme'

import type { CSSProperties, ReactNode } from 'react'

addons.setConfig({
  theme: darkTheme,
})

const REPO_URL = 'https://github.com/trystendsmyth/stalk-ui'
const NPM_URL = 'https://www.npmjs.com/package/@stalk-ui/cli'

// The 24×24 GitHub and npm marks as path data, so the manager needs no icon
// dependency. This file stays `.ts` like its siblings (TypeScript does not pick up
// `.tsx` under `.storybook`), so the links are built with `createElement`.
const GITHUB_PATH =
  'M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z'
const NPM_PATH =
  'M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z'

const linkStyle: CSSProperties = {
  alignItems: 'center',
  color: 'inherit',
  display: 'inline-flex',
  height: '100%',
  padding: '0 8px',
}

const toolbarLink = (href: string, label: string, iconPath: string): ReactNode =>
  h(
    'a',
    {
      'aria-label': label,
      href,
      rel: 'noreferrer',
      style: linkStyle,
      target: '_blank',
      title: label,
    },
    h(
      'svg',
      { 'aria-hidden': true, fill: 'currentColor', height: 16, viewBox: '0 0 24 24', width: 16 },
      h('path', { d: iconPath }),
    ),
  )

// Right-aligned toolbar links (TOOLEXTRA), the way most component-library sites
// surface their repo and package.
addons.register('stalk-ui/toolbar-links', () => {
  addons.add('stalk-ui/github', {
    type: types.TOOLEXTRA,
    title: 'GitHub',
    render: () => toolbarLink(REPO_URL, 'Stalk UI on GitHub', GITHUB_PATH),
  })
  addons.add('stalk-ui/npm', {
    type: types.TOOLEXTRA,
    title: 'npm',
    render: () => toolbarLink(NPM_URL, 'Stalk UI on npm', NPM_PATH),
  })
})
