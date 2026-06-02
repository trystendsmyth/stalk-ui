import type { CustomProjectConfig } from 'lost-pixel'

export const config: CustomProjectConfig = {
  storybookShots: {
    storybookUrl: './apps/storybook/storybook-static',
  },
  // Drive the runner's system Chrome instead of downloading Playwright's Chromium
  // (that download hangs on CI). CI sets PUPPETEER_EXECUTABLE_PATH to the installed
  // binary; locally we fall back to the `chrome` channel. The flags keep headless
  // Chrome from hanging/crashing on CI.
  browserLaunchOptions: {
    chromium: {
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      ...(process.env.PUPPETEER_EXECUTABLE_PATH
        ? { executablePath: process.env.PUPPETEER_EXECUTABLE_PATH }
        : { channel: 'chrome' }),
    },
  },
  generateOnly: false,
  failOnDifference: true,
  // Small per-image tolerance for anti-aliasing and minor system-Chrome version
  // drift on the runner (the system browser isn't version-pinned like Playwright's
  // was). 0.002 = 0.2%; real visual regressions are far larger. Tune if needed.
  threshold: 0.002,
  imagePathBaseline: './apps/storybook/.lost-pixel/baseline',
  imagePathCurrent: './apps/storybook/.lost-pixel/current',
  imagePathDifference: './apps/storybook/.lost-pixel/difference',
}
