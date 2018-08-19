// @flow
import { defineOne } from './lib/custom_elements'
import { update, unmount } from './lib/react'

/*::
import type {
  Component,
  PropertyMap,
  ElementMap,
  Defaults,
  ElementSpec
} from './lib/types'
*/

/**
 * Registers elements.
 */

export function define (
  components /*: ElementMap */,
  defaults /*: ?Defaults */
) {
  Object.keys(components).forEach((name /*: string */) => {
    const elSpec /*: ElementSpec */ = toElementSpec(components[name])
    const newElSpec = Object.assign({}, defaults, elSpec)
    defineOne(newElSpec, name, { update, unmount })
  })
}

function toElementSpec (
  thing /*: ElementSpec | Component */
) /*: ElementSpec */ {
  // $FlowFixMe$
  if (typeof thing === 'object' && thing.component) return thing
  return { component: thing }
}
