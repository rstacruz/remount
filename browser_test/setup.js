/* eslint-env mocha */
'use strict'

export const IS_DEBUG = window.location.search.indexOf('debug') !== -1

export function assert (value) {
  if (!value) throw new Error('Assertion failed')
}

/*
 * Helper: defers until next animation frame
 */

export function raf () {
  return new Promise((resolve, reject) => {
    window.requestAnimationFrame(() => {
      resolve()
    })
  })
}

export const Remount = window.Remount

export const React = window.React

const root = document.getElementById('debug')
if (IS_DEBUG) root.classList.add('-visible')
