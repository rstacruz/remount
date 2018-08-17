/* eslint-env jest */
/* global browser */
import './puppeteer_helpers'
jest.setTimeout(25000)

function example (what) {
  const url = require('path').join('file://', __dirname, '..', 'examples', what)
  return url
}

describe('puppeteer tests', () => {
  it('basic.html', async () => {
    const url = example('basic.html')

    const page = await browser.newPage()
    await page.goto(url)
    await page.waitForSelector('#greeter')
    const text = await getContent(page)
    expect(text).toContain('Oh hello, John!')
  })

  it('es5.html', async () => {
    const url = example('es5.html')

    const page = await browser.newPage()
    await page.goto(url)
    await page.waitForSelector('#greeter')
    const text = await getContent(page)
    expect(text).toContain('Oh hello, John!')
  })
})

const getContent = (page) => {
  return page.evaluate(() => document.body.textContent)
}
