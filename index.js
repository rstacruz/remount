// @flow
import * as CustomElementsStrategy from './lib/strategies/custom_elements'
import * as MutationObserverStrategy from './lib/strategies/mutation_observer'
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
 *     Remount.getStrategy().name
 */

export function getStrategy () {
  // $FlowFixMe$ obviously
  if (getStrategy._result !== undefined) {
    return getStrategy._result
  }

  const Strategy = [CustomElementsStrategy, MutationObserverStrategy].reduce(
    (result, strat) => {
      return result || (strat.isSupported() && strat)
    },
    null
  )

  if (!Strategy) {
    console.warn(
      "Remount: This browser doesn't support the " +
        'MutationObserver API or the Custom Elements API. Including ' +
        'polyfills might fix this. Remount elements will not work. ' +
        'https://github.com/rstacruz/remount'
    )
  }

  getStrategy._result = Strategy
  return Strategy
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
  const Strategy = getStrategy()
  if (!Strategy) return

  Object.keys(components).forEach((name /*: string */) => {
    // Construct the specs for the element.
    // (eg, { component: Tooltip, attributes: ['title'] })
    const elSpec /*: ElementSpec */ = Object.assign(
      {},
      defaults,
      toElementSpec(components[name])
    )

    const adapter = elSpec.adapter || ReactAdapter

    // Define a custom element.
    Strategy.defineElement(elSpec, name, {
      onUpdate (element /*: Element */, mountPoint /*: Element */) {
        const props = getProps(element, elSpec.attributes)
        adapter.update(elSpec, mountPoint, props)
      },

      onUnmount (element /*: Element */, mountPoint /*: Element */) {
        adapter.unmount(elSpec, mountPoint)
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
