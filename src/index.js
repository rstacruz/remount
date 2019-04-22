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

export { defineReact as define, getStrategy }
