/* eslint-env mocha */
import { Remount } from './setup'

describe('Remount mode: ' + Remount.adapterName, () => {
  if (Remount.adapterName === 'MutationObserver') {
    it('Custom Elements are not supported on this platform.')
    it('Falling back to MutationObserver.')
  } else if (Remount.adapterName === 'CustomElements') {
    it('Custom Elements are supported!')
    it(':)')
  }
})
