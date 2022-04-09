import ReactDOM from 'react-dom'
import React from 'react'

let Remount

if (process.env.REMOUNT_VERSION === 'cjs') {
  Remount = await import('../dist/remount.cjs')
} else if (process.env.REMOUNT_VERSION === 'modern') {
  Remount = await import('../dist/remount.modern.js')
} else {
  Remount = await import('../src/index')
}

// Root element
const root = document.createElement('div')
root.id = 'debug'
document.body.appendChild(root)

// True if in ?debug mode
const IS_DEBUG = window.location.search.indexOf('debug') !== -1
if (IS_DEBUG) root.classList.add('-visible')

// For happy-dom, the define() implementation doesn't throw errors, so this will
// emulate browser behaviour better
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

let assert
if (typeof expect === 'function') {
  assert = (value) => expect(value).toBeTruthy()
  assert.notEqual = (a, b) => expect(a).not.toEqual(b)
  assert.equal = (a, b) => expect(a).toEqual(b)
  assert.match = (a, b) => expect(a).toMatch(b)
} else {
  // Crappy knock-off of an assertion library because
  // we don't need the entire chai library in Mocha mode
  assert = (value) => {
    if (!value) throw new Error('Assertion failed')
  }

  assert.equal = (left, right) => {
    if (left !== right) {
      throw new Error(
        'Equal assertion failed\n\n' +
          `Left:  ${JSON.stringify(left)}\n` +
          `Right: ${JSON.stringify(right)}\n\n`
      )
    }
  }

  assert.notEqual = (left, right) => {
    if (left === right) {
      throw new Error(
        'Not equal assertion failed\n\n' +
          `Left:  ${JSON.stringify(left)}\n` +
          `Right: ${JSON.stringify(right)}\n\n`
      )
    }
  }

  assert.match = (haystack, needle) => {
    if (!haystack.match(needle)) {
      throw new Error(
        'Match assertion failed\n\n' +
          `Left:  ${JSON.stringify(haystack)}\n` +
          `Right: ${needle.toString()}\n\n`
      )
    }
  }
}

// Defer until next frame
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

export { root, IS_DEBUG, assert, raf, Remount, React, ReactDOM }
