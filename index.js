// @flow
import * as React from 'react'
import ReactDOM from 'react-dom'

import { defineOne } from './lib/custom_elements'

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
    defineOne(newElSpec, name, update, unmount)
  })
}

function toElementSpec (
  thing /*: ElementSpec | Component */
) /*: ElementSpec */ {
  // $FlowFixMe$
  if (typeof thing === 'object' && thing.component) return thing
  return { component: thing }
}

/**
 * Updates a custom element by calling `ReactDOM.render()`.
 * @private
 */

function update (
  element /* Element */,
  { component, attributes } /*: ElementSpec */,
  mountPoint /* Element */
) {
  const rawJson = element.getAttribute('props-json')
  const props = rawJson ? JSON.parse(rawJson) : getProps(element, attributes)
  const reactElement = React.createElement(component, props)
  ReactDOM.render(reactElement, mountPoint)
}

/**
 * Unmount
 * @private
 */

function unmount (mountPoint /*: Element */) {
  ReactDOM.unmountComponentAtNode(mountPoint)
}

/**
 * Returns properties for a given HTML element.
 * @private
 */

function getProps (element /*: Element */, attributes /*: ?Array<string> */) {
  const names /*: Array<string> */ = attributes || []
  return names.reduce((result /*: PropertyMap */, attribute /*: string */) => {
    result[attribute] = element.getAttribute(attribute)
    return result
  }, {})

  // By the way, did you know el.getAttributeNames()
  // will not work in IE11? Now you do.
}
