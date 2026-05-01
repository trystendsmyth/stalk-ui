import { StalkI18nProvider } from '@stalk-ui/i18n'
import { en } from '@stalk-ui/i18n/locales/en'

import { getTheme, injectTheme, type ThemeName } from '../styled-system/themes'

import type { Decorator } from '@storybook/react-vite'

type PreviewColorMode = 'dark' | 'light'
type Direction = 'ltr' | 'rtl'
type PandaTheme = 'neutral' | 'rainbow'

/** Panda emits non-default themes as a separate JSON payload that must be injected as a
 *  `<style>` tag at runtime; once injected, the theme is gated by `[data-panda-theme=…]`
 *  selectors so simply clearing the attribute reverts to the default. */
const injectedThemes = new Set<ThemeName>()
const ensureThemeLoaded = async (themeName: ThemeName) => {
  if (injectedThemes.has(themeName)) return
  const theme = await getTheme(themeName)
  injectTheme(document.documentElement, theme)
  injectedThemes.add(themeName)
}

export interface StorybookGlobals {
  direction?: Direction | undefined
  mode?: PreviewColorMode | undefined
  pandaTheme?: PandaTheme | undefined
}

/** Drives Panda's color-mode (`.dark`), theme (`data-panda-theme`), and writing direction
 *  from Storybook globals. Page colors come from CSS variables in preview.css — no JS paint.
 *  Exported so the Docs container can re-apply on global changes (decorators only wrap
 *  `<Story>` blocks, not surrounding MDX). */
export const applyPreviewGlobals = (globals: StorybookGlobals) => {
  if (typeof document === 'undefined') return

  const html = document.documentElement
  const mode: PreviewColorMode = globals.mode === 'dark' ? 'dark' : 'light'
  const dir: Direction = globals.direction === 'rtl' ? 'rtl' : 'ltr'
  const pandaTheme = globals.pandaTheme === 'rainbow' ? 'rainbow' : undefined

  html.setAttribute('data-color-mode', mode)
  html.classList.toggle('dark', mode === 'dark')
  html.setAttribute('dir', dir)

  if (pandaTheme) {
    void ensureThemeLoaded(pandaTheme).then(() => {
      html.setAttribute('data-panda-theme', pandaTheme)
    })
  } else {
    html.removeAttribute('data-panda-theme')
  }
}

const decorators: Decorator[] = [
  (Story, context) => {
    applyPreviewGlobals(context.globals)

    return (
      <StalkI18nProvider locale="en" messages={en}>
        <Story />
      </StalkI18nProvider>
    )
  },
]

export default decorators
