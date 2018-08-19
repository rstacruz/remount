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

// Defer until next frame
export function raf () {
  return new Promise((resolve, reject) => {
    window.requestAnimationFrame(() => {
      resolve()
    })
  })
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
