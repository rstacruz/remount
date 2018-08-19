/* eslint-env mocha */
import { Remount } from './setup'

describe('Remount mode: ' + Remount.adapterName, () => {
  if (Remount.adapterName === 'MutationObserver') {
    it('Custom Elements are not supported on this platform.')

    const ms = window.MutationObserver._period
    if (ms) {
      it(`Falling back to MutationObserver (polyfill, polling ${ms}ms).`)
    } else {
      it('Falling back to MutationObserver (native).')
    }
  } else if (Remount.adapterName === 'CustomElements') {
    it('Custom Elements are supported!')
    it(':)')
  }
})
