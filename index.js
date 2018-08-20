// @flow
import * as ElementsAdapter from './lib/custom_elements'
import * as MutationAdapter from './lib/mutation_observer'
import * as ReactAdapter from './lib/react'

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
 * Detect what API can be used; die otherwise.
 *
 * @example
 *     Remount.getAdapter().name
 */

export function getAdapter () {
  // $FlowFixMe$ obviously
  if (getAdapter._result !== undefined) {
    return getAdapter._result
  }

  const Adapter = ElementsAdapter.isSupported()
    ? ElementsAdapter
    : MutationAdapter.isSupported()
      ? MutationAdapter
      : null

  if (!Adapter) {
    console.warn(
      "Remount: This browser doesn't support the " +
        'MutationObserver API or the Custom Elements API. Including ' +
        'polyfills might fix this. Remount elements will not work. ' +
        'https://github.com/rstacruz/remount'
    )
  }

  getAdapter._result = Adapter
  return Adapter
}

/**
 * Registers custom elements and links them to React components.
 *
 * @example
 *     define({ 'x-tooltip': Tooltip })
 *
 * @example
 *     define(
 *       { 'x-tooltip': Tooltip },
 *       { attributes: ['title', 'body'] }
 *     )
 */

export function define (
  components /*: ElementMap */,
  defaults /*: ?Defaults */
) {
  const Adapter = getAdapter()
  if (!Adapter) return

  Object.keys(components).forEach((name /*: string */) => {
    // Construct the specs for the element.
    // (eg, { component: Tooltip, attributes: ['title'] })
    const elSpec /*: ElementSpec */ = Object.assign(
      {},
      defaults,
      toElementSpec(components[name])
    )

    // Define a custom element.
    Adapter.defineElement(elSpec, name, {
      onUpdate (element /*: Element */, mountPoint /*: Element */) {
        const props = getProps(element, elSpec.attributes)
        ReactAdapter.update(elSpec, mountPoint, props)
      },

      onUnmount (element /*: Element */, mountPoint /*: Element */) {
        ReactAdapter.unmount(elSpec, mountPoint)
      }
    })
  })
}

/**
 * Coerces something into an `ElementSpec` type.
 * @private
 *
 * @example
 *     toElementSpec(Tooltip)
 *     // => { component: Tooltip }
 *
 *     toElementSpec({ component: Tooltip })
 *     // => { component: Tooltip }
 */

function toElementSpec (
  thing /*: ElementSpec | Component */
) /*: ElementSpec */ {
  // $FlowFixMe$
  if (typeof thing === 'object' && thing.component) return thing
  return { component: thing }
}

/**
 * Returns properties for a given HTML element.
 * @private
 *
 * @example
 *     getProps(div, ['name'])
 *     // => { name: 'Romeo' }
 */

function getProps (element /*: Element */, attributes /*: ?Array<string> */) {
  const rawJson = element.getAttribute('props-json')
  if (rawJson) return JSON.parse(rawJson)

  const names = attributes || []
  return names.reduce((result /*: PropertyMap */, attribute /*: string */) => {
    result[attribute] = element.getAttribute(attribute)
    return result
  }, {})
}
