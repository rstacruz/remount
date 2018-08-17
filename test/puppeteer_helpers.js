import puppeteer from 'puppeteer'

const OPTIONS = {
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
}

const CI_OPTIONS = {
  headless: true,
  args: ['--no-sandbox', '--disable-gpu']
}

global.beforeAll(async () => {
  const options = process.env.CI ? CI_OPTIONS : OPTIONS
  global.browser = await puppeteer.launch(options)
})

global.afterAll(async () => {
  await global.browser.close()
})
