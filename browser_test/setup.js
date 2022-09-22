/* eslint-env mocha */
'use strict'

// Root element
export const root = document.getElementById('debug')

// True if in ?debug mode
export const IS_DEBUG = window.location.search.indexOf('debug') !== -1

// Crappy knock-off of an assertion library
export function assert (value) {
  if (!value) throw new Error('Assertion failed')
}

assert.equal = (left, right) => {
  if (left !== right) {
    throw new Error('Equal assertion failed\n\n' +
      `Left:  ${JSON.stringify(left)}\n` +
      `Right: ${JSON.stringify(right)}\n\n`)
  }
}

assert.notEqual = (left, right) => {
  if (left === right) {
    throw new Error('Not equal assertion failed\n\n' +
      `Left:  ${JSON.stringify(left)}\n` +
      `Right: ${JSON.stringify(right)}\n\n`)
  }
}

assert.match = (haystack, needle) => {
  if (!haystack.match(needle)) {
    throw new Error('Match assertion failed\n\n' +
      `Left:  ${JSON.stringify(haystack)}\n` +
      `Right: ${needle.toString()}\n\n`)
  }
}

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

export const Remount = window.Remount
export const React = window.React
export const ReactDOM = window.ReactDOM

if (IS_DEBUG) root.classList.add('-visible')

after(() => {
  const div = document.createElement('div')
  div.id = 'finish'
  document.body.appendChild(div)
})
