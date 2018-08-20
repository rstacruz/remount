/* eslint-env mocha */
import { Remount } from './setup'

const name = Remount.getAdapter().name

describe('Remount mode: ' + name, () => {
  if (name === 'MutationObserver') {
    it('Custom Elements are not supported on this platform.')

    const ms = window.MutationObserver._period
    if (ms) {
      it(`Falling back to MutationObserver (polyfill, polling ${ms}ms).`)
    } else {
      it('Falling back to MutationObserver (native).')
    }
  } else if (name === 'CustomElements') {
    it('Custom Elements: supported! :)')

    if (document.body.attachShadow) {
      it('Shadow DOM: supported! :)')
    } else {
      it('Shadow DOM: not supported; skipping shadow DOM tests')
    }
  }
})
