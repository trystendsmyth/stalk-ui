import type { CustomProjectConfig } from 'lost-pixel'

export const config: CustomProjectConfig = {
  storybookShots: {
    storybookUrl: './apps/storybook/storybook-static',
  },
  generateOnly: false,
  failOnDifference: true,
  imagePathBaseline: './apps/storybook/.lost-pixel/baseline',
  imagePathCurrent: './apps/storybook/.lost-pixel/current',
  imagePathDifference: './apps/storybook/.lost-pixel/difference',
}
