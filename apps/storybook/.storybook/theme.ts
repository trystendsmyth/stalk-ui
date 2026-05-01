import { create } from 'storybook/theming'

const shared = {
  appBorderRadius: 8,
  brandTarget: '_self' as const,
  brandTitle: 'Stalk UI',
  brandUrl: 'https://stalk-ui.com',
  fontBase: 'var(--font-sans, ui-sans-serif, system-ui, sans-serif)',
  fontCode: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
  inputBorderRadius: 8,
}

export const lightTheme = create({
  base: 'light',
  brandImage: './stalk-ui-logo.svg',
  ...shared,
  colorPrimary: '#3d9a2a',
  colorSecondary: '#5c6370',
  appBg: '#f4f5f7',
  appContentBg: '#ffffff',
  appBorderColor: '#e2e4e9',
  barBg: '#ffffff',
  barTextColor: '#3c4149',
  textColor: '#111318',
  textInverseColor: '#f6f7f9',
  barSelectedColor: '#3d9a2a',
  barHoverColor: '#d6f0cc',
  inputBg: '#ffffff',
  inputBorder: '#d0d3da',
  inputTextColor: '#111318',
})

export const darkTheme = create({
  base: 'dark',
  brandImage: './stalk-ui-logo.svg',
  ...shared,
  colorPrimary: '#74e050',
  colorSecondary: '#74e050',
  appBg: '#13151a',
  appContentBg: '#1a1d24',
  appBorderColor: '#2a2f3a',
  barBg: '#1e222b',
  barTextColor: '#c8cdd6',
  textColor: '#f6f7f9',
  textInverseColor: '#111318',
  barSelectedColor: '#74e050',
  barHoverColor: '#2a3a28',
  inputBg: '#1a1d24',
  inputBorder: '#3a4150',
  inputTextColor: '#f6f7f9',
})
