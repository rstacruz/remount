/* eslint-env mocha */
'use strict'

// Root element
export const root = document.getElementById('debug')

// True if in ?debug mode
export const IS_DEBUG = window.location.search.indexOf('debug') !== -1

if (IS_DEBUG) root.classList.add('-visible')

after(() => {
  const div = document.createElement('div')
  div.id = 'finish'
  document.body.appendChild(div)
})

// Mocha's "before" is Jest's "beforeAll"
window.beforeAll = window.before
window.IS_DEBUG = IS_DEBUG
window.root = root
