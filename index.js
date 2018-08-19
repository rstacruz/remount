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

const Adapter = ElementsAdapter.isSupported()
  ? ElementsAdapter
  : MutationAdapter.isSupported()
    ? MutationAdapter
    : null

if (!Adapter) {
  throw new Error('Unsupported platform')
} else {
  console.log('Remount: using adapter', Adapter.name)
}

/**
 * Inspect `Remount.adapterName` to see what adapter's being used.
 */

export const adapterName = Adapter.name

/**
 * Registers elements.
 */

export function define (
  components /*: ElementMap */,
  defaults /*: ?Defaults */
) {
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

  const names /*: Array<string> */ = attributes || []
  return names.reduce((result /*: PropertyMap */, attribute /*: string */) => {
    result[attribute] = element.getAttribute(attribute)
    return result
  }, {})
}
