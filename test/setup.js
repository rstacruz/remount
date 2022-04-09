let Remount, React, ReactDOM

if (process.env.MOCHA) {
  React = window.React
  ReactDOM = window.ReactDOM
  Remount = window.Remount

  // Make Mocha behave like Vitest/Jest, complete with a simplified
  // assertion library so we can avoid using Chai
  window.beforeAll = window.before
  window.expect = (value) => {
    return {
      toBeTruthy() {
        if (!value) throw new Error('toBeTruthy() failed')
      },
      toEqual(other) {
        if (value !== other) throw new Error('toEqual() failed')
      },
      toMatch(expr) {
        if (!value.match(expr)) throw new Error('toMatch() failed')
      },
      not: {
        toEqual(other) {
          if (value === other) throw new Error('not.toEqual() failed')
        }
      }
    }
  }
} else {
  React = await import('react')
  ReactDOM = await import('react-dom')

  if (process.env.REMOUNT_VERSION === 'cjs') {
    Remount = await import('../dist/remount.cjs')
  } else if (process.env.REMOUNT_VERSION === 'modern') {
    Remount = await import('../dist/remount.modern.js')
  } else {
    Remount = await import('../src/index')
  }
}

/*
 * Root element
 */

const root = document.createElement('div')
root.id = 'debug'
document.body.appendChild(root)

/*
 * Debug mode in mocha makes the elements visible
 */

const IS_DEBUG = window.location.search.indexOf('debug') !== -1
if (IS_DEBUG) root.classList.add('-visible')

/*
 * Happy-DOM workarounds:
 * For happy-dom, the define() implementation doesn't throw errors, so this will
 * emulate browser behaviour better
 */

if (window.happyDOM) {
  const oldDefine = window.customElements.define.bind(window.customElements)

  window.customElements.define = (name, customClass) => {
    if (window.customElements.get(name)) {
      throw new Error(`'${name}' has already been defined`)
    }

    // Validate names according to:
    // https://html.spec.whatwg.org/#valid-custom-element-name
    if (!name.match(/^[a-z]+\-([a-z0-9\-]*)+$/)) {
      throw new Error(`'${name}' is not the correct format`)
    }

    return oldDefine(name, customClass)
  }
}

/**
 * Defer until next frame in a way that's aware of polyfiils
 */

function raf() {
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
      window.requestAnimationFrame(() => {
        resolve()
      })
    })
  }
}

export { root, IS_DEBUG, raf, Remount, React, ReactDOM }
