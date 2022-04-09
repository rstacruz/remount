// import Remount from '../dist/remount.cjs'
// import Remount from '../dist/remount.modern.js'
import Remount from '../src/index'

import ReactDOM from 'react-dom'
import React from 'react'

// Root element
const root = document.createElement('div')
root.id = 'debug'
document.body.appendChild(root)

// True if in ?debug mode
const IS_DEBUG = window.location.search.indexOf('debug') !== -1

// For happy-dom, this isn't
if (true) {
  const oldDefine = window.customElements.define.bind(window.customElements)

  window.customElements.define = (name, customClass) => {
    if (window.customElements.get(name)) {
      throw new Error(`'${name}' has already been defined`)
    }

    // Validate https://html.spec.whatwg.org/#valid-custom-element-name
    if (!name.match(/^[a-z]+\-([a-z0-9\-]*)+$/)) {
      throw new Error(`'${name}' is not the correct format`)
    }

    return oldDefine(name, customClass)
  }
}

// Crappy knock-off of an assertion library
function assert(value) {
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

if (import.meta.vitest) {
  assert.notEqual = (a, b) => expect(a).not.toEqual(b)
}

export { root, IS_DEBUG, assert, raf, Remount, React, ReactDOM }
// export const React = window.React
// export const ReactDOM = window.ReactDOM

if (IS_DEBUG) root.classList.add('-visible')
