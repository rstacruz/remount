import puppeteer from 'puppeteer'

const OPTIONS = {
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
}

const CI_OPTIONS = {
  args: ['--disable-dev-shm-usage']
}

global.beforeAll(async () => {
  const options = process.env.CI ? CI_OPTIONS : OPTIONS
  global.browser = await puppeteer.launch(options)
})

global.afterAll(async () => {
  // Not sure why, but this sometimes isn't available
  // in Travis
  if (!global.browser || !global.browser.close) return
  await global.browser.close()
})
