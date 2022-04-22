/** @typedef { import('./types').ElementMap } ElementMap */
/** @typedef { import('./types').Defaults } Defaults */

import { defineWithAdapter, getStrategy } from './core'
import * as ReactAdapter from './adapters/react'

const define = defineWithAdapter(ReactAdapter)

// Alias for doing `import Remount from 'remount'` rather than `import * as Remount`
const Remount = { define, getStrategy }
export { define, getStrategy, Remount as default }
