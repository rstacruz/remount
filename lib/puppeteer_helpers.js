import puppeteer from 'puppeteer'

global.beforeAll(async () => {
  global.browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
})

global.afterAll(async () => {
  await global.browser.close()
})
