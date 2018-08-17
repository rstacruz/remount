import puppeteer from 'puppeteer'

const OPTIONS = {
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
}

const CI_OPTIONS = {
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  exitOnPageError: true
}

global.beforeAll(async () => {
  const options = process.env.CI === 'true' ? CI_OPTIONS : OPTIONS
  console.log('[puppeteer] Using options:', options)
  global.browser = await puppeteer.launch(options)
})

global.afterAll(async () => {
  await global.browser.close()
})
