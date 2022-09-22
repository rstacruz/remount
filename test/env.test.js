/** @jest-environment jsdom */
/* eslint-env mocha */
const strat = Remount.getStrategy()
const name = Remount.getStrategy().name

describe('Remount strategy: ' + strat.name, () => {
  if (strat.name === 'MutationObserver') {
    it('Custom Elements are not supported on this platform.', () => {})

    const ms = window.MutationObserver._period
    if (ms) {
      it(`Falling back to MutationObserver (polyfill, polling ${ms}ms).`, () => {})
    } else {
      it('Falling back to MutationObserver (native).', () => {})
    }
  } else if (strat.name === 'CustomElements') {
    it('Custom Elements: supported! :)', () => {})
  }

  if (strat.supportsShadow()) {
    it('Shadow DOM: supported! :)', () => {})
  } else {
    it('Shadow DOM: not supported; skipping shadow DOM tests.', () => {})
  }
})
