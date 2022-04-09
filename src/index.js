/** @typedef { import('./types').ElementMap } ElementMap */
/** @typedef { import('./types').Defaults } Defaults */

import { define, getStrategy } from './core'
import * as ReactAdapter from './react'

/**
 * @param {ElementMap} components
 * @param {Defaults=} defaults
 */

function defineReact(components = {}, options = {}) {
  return define(components, {
    adapter: ReactAdapter,
    ...options
  })
}

// Alias for doing `import Remount from 'remount'` rather than `import * as Remount`
const Remount = { define: defineReact, getStrategy }

export { defineReact as define, getStrategy, Remount as default }
