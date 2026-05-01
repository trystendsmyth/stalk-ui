import { DocsContainer, type DocsContainerProps } from '@storybook/addon-docs/blocks'
import { useEffect } from 'react'

import { applyPreviewGlobals, type StorybookGlobals } from './decorators'
import { darkTheme, lightTheme } from './theme'

import type { PropsWithChildren } from 'react'

type ContainerProps = PropsWithChildren<DocsContainerProps>

const getGlobals = (context: DocsContainerProps['context']): StorybookGlobals => {
  const store = (context as { store?: { userGlobals?: { globals?: StorybookGlobals } } }).store
  return store?.userGlobals?.globals ?? {}
}

const DocsShell = ({ children, context }: ContainerProps) => {
  const { direction, mode, pandaTheme } = getGlobals(context)
  const theme = mode === 'dark' ? darkTheme : lightTheme

  useEffect(() => {
    applyPreviewGlobals({ direction, mode, pandaTheme })
  }, [direction, mode, pandaTheme])

  return (
    <DocsContainer context={context} theme={theme}>
      {children}
    </DocsContainer>
  )
}

export default DocsShell
