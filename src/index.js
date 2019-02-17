// @ts-check
/** @typedef { import('./types').Adapter } Adapter */
/** @typedef { import('./types').Component } Component */
/** @typedef { import('./types').Defaults } Defaults */
/** @typedef { import('./types').ElementMap } ElementMap */
/** @typedef { import('./types').ElementSpec } ElementSpec */
/** @typedef { import('./types').PropertyMap } PropertyMap */
/** @typedef { import('./types').Strategy } Strategy */

/** @type Strategy */
import * as CustomElementsStrategy from './strategies/custom_elements'

/** @type Strategy */
import * as MutationObserverStrategy from './strategies/mutation_observer'
import * as ReactAdapter from './react'

/**
 * @callback StrategyCallback
 * @param {Strategy | null} result
 * @param {Strategy} strat
 * @returns {Strategy | null | undefined}
 */

/**
 * Cache of the strategy determined by `getStrategy()`.
 * @type {Strategy | null | undefined}
 */

let strategy

/**
 * Detect what API can be used.
 *
 * @example
 *     Remount.getStrategy().name
 */

export function getStrategy() {
  if (strategy) {
    return strategy
  }

  const StrategyUsed = [CustomElementsStrategy, MutationObserverStrategy].find(
    strategy => !!strategy.isSupported()
  )

  if (!StrategyUsed) {
    /* eslint-disable no-console */
    console.warn(
      "Remount: This browser doesn't support the " +
        'MutationObserver API or the Custom Elements API. Including ' +
        'polyfills might fix this. Remount elements will not work. ' +
        'https://github.com/rstacruz/remount'
    )
  }

  strategy = StrategyUsed
  return StrategyUsed
}

/**
 * Registers custom elements and links them to React components.
 * @param {ElementMap} components
 * @param {Defaults=} defaults
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

export function define(components, defaults) {
  const Strategy = getStrategy()
  if (!Strategy) return

  Object.keys(components).forEach((/** @type string */ name) => {
    // Construct the specs for the element.
    // (eg, { component: Tooltip, attributes: ['title'] })
    /** @type ElementSpec */
    const elSpec = Object.assign({}, defaults, toElementSpec(components[name]))

    /** @type Adapter */
    const adapter = elSpec.adapter || ReactAdapter

    // Define a custom element.
    Strategy.defineElement(elSpec, name, {
      /**
       * @param {HTMLElement} element
       * @param {HTMLElement} mountPoint
       */

      onMount(element, mountPoint) {
        const props = getProps(element, elSpec.attributes)
        adapter.mount(elSpec, mountPoint, props)
      },

      /**
       * @param {HTMLElement} element
       * @param {HTMLElement} mountPoint
       */

      onUpdate(element, mountPoint) {
        const props = getProps(element, elSpec.attributes)
        adapter.update(elSpec, mountPoint, props)
      },

      /**
       * @param {HTMLElement} element
       * @param {HTMLElement} mountPoint
       */

      onUnmount(element, mountPoint) {
        adapter.unmount(elSpec, mountPoint)
      }
    })
  })
}

/**
 * Coerces something into an `ElementSpec` type.
 * @param {ElementSpec | Component} thing
 * @returns {ElementSpec}
 * @private
 *
 * @example
 *     toElementSpec(Tooltip)
 *     // => { component: Tooltip }
 *
 *     toElementSpec({ component: Tooltip })
 *     // => { component: Tooltip }
 */

function toElementSpec(thing) {
  if (isElementSpec(thing)) return thing
  return { component: thing }
}

/**
 * @param {any} spec
 * @returns {spec is ElementSpec}
 */

function isElementSpec(spec) {
  return typeof spec === 'object' && spec.component
}

/**
 * Returns properties for a given HTML element.
 * @private
 * @param {HTMLElement} element
 * @param {string[] | null | undefined} attributes
 *
 * @example
 *     getProps(div, ['name'])
 *     // => { name: 'Romeo' }
 */

function getProps(element, attributes) {
  const rawJson = element.getAttribute('props-json')
  if (rawJson) return JSON.parse(rawJson)

  const names = attributes || []
  return names.reduce((
    /** @type PropertyMap */ result,
    /** @type string */ attribute
  ) => {
    result[attribute] = element.getAttribute(attribute)
    return result
  }, {})
}
