/* eslint-env jest */
import puppeteer from 'puppeteer'
jest.setTimeout(25000)
let browser

function example (what) {
  const url = require('path').join('file://', __dirname, '..', 'examples', what)
  return url
}

describe('puppeteer tests', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
  })

  afterAll(async () => {
    await browser.close()
  })

  it('basic.html', async () => {
    const url = example('basic.html')

    const page = await browser.newPage()
    await page.goto(url)
    await page.waitForSelector('#greeter')
    const text = await page.evaluate(() => document.body.textContent)
    expect(text).toContain('Oh hello, John!')
  })

  it('es5.html', async () => {
    const url = example('basic.html')

    const page = await browser.newPage()
    await page.goto(url)
    await page.waitForSelector('#greeter')
    const text = await page.evaluate(() => document.body.textContent)
    expect(text).toContain('Oh hello, John!')
  })
})
