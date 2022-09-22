// Defer until next frame
export function raf () {
  if (window.MutationObserver._period) {
    // If MutationObserver was polyfilled, it will be
    // checking with a polling period.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, window.MutationObserver._period * 2)
    })
  } else {
    return new Promise((resolve, reject) => {
      // Since React 18, updates sometimes get deferred by 2 animation frames intermittently
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          resolve()
        })
      })
    })
  }
}
