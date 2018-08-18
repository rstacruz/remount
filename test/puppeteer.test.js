/* eslint-env jest */
/* global browser */
import './puppeteer_helpers'
jest.setTimeout(9000)

function example (what) {
  const url = require('path').join('file://', __dirname, '..', 'examples', what)
  return url
}

describe('puppeteer tests', () => {
  let page

  // it('basic.html', async () => {
  //   const url = example('basic.html')

  //   page = await browser.newPage()
  //   await page.goto(url)
  //   await page.waitForSelector('#greeter')
  //   const text = await getContent(page)
  //   expect(text).toContain('Oh hello, John!')
  // })

  // it('es5.html', async () => {
  //   const url = example('es5.html')

  //   page = await browser.newPage()
  //   await page.goto(url)
  //   await page.waitForSelector('#greeter')
  //   const text = await getContent(page)
  //   expect(text).toContain('Oh hello, John!')
  // })

  it('mocha tests', async () => {
    const url = 'http://localhost:10049/'
    page = await browser.newPage()
    await page.goto(url)
    await page.waitForSelector('#finish')
    const text = await getContent(page)
    expect(text).toContain('failures: 0')
  })

  afterEach(async () => {
    await page.close()
  })
})

const getContent = page => {
  return page.evaluate(() => document.body.textContent)
}
