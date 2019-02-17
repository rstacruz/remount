/* eslint-env jest */
/* eslint-disable no-console */
/* global browser */
import './puppeteer_helpers'
jest.setTimeout(20000)

function example(what) {
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
    await assertSuccess(page)
  })

  // TODO: support { mode: 'MutationObserver' } for tests
  it.skip('mocha tests, mutation observer mode', async () => {
    const url = 'http://localhost:10049/?mutation'
    page = await browser.newPage()
    await page.goto(url)
    await assertSuccess(page)
  })

  afterEach(async () => {
    await page.close()
  })
})

const assertSuccess = async page => {
  let text

  try {
    await page.waitForSelector('#finish')
  } catch (e) {
    text = await getContent(page)
    console.warn('Mocha did not finish.')
    console.warn(text)
    throw e
  }

  try {
    text = await getContent(page)
    expect(text).toContain('failures: 0')
  } catch (e) {
    console.warn('Mocha finished with errors.')
    console.warn(text)
    throw e
  }
}

const getContent = page => {
  return page.evaluate(() => document.body.textContent)
}
