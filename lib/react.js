// @flow
import * as React from 'react'
import ReactDOM from 'react-dom'

/*::
import type { ElementSpec, PropertyMap } from './types'
*/

/**
 * Updates a custom element by calling `ReactDOM.render()`.
 * @private
 */

export function update (
  element /*: Element */,
  { component, attributes } /*: ElementSpec */,
  mountPoint /*: Element */
) {
  const props = getProps(element, attributes) // TODO: get rid
  const reactElement = React.createElement(component, props)
  ReactDOM.render(reactElement, mountPoint)
}

/**
 * Unmounts a component
 * @private
 */

export function unmount (mountPoint /*: Element */) {
  ReactDOM.unmountComponentAtNode(mountPoint)
}

/**
 * Returns properties for a given HTML element.
 * @private
 */

function getProps (element /*: Element */, attributes /*: ?Array<string> */) {
  const rawJson = element.getAttribute('props-json')
  if (rawJson) return JSON.parse(rawJson)

  const names /*: Array<string> */ = attributes || []
  return names.reduce((result /*: PropertyMap */, attribute /*: string */) => {
    result[attribute] = element.getAttribute(attribute)
    return result
  }, {})

  // By the way, did you know el.getAttributeNames()
  // will not work in IE11? Now you do.
}
