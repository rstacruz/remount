// @ts-check
/** @typedef { import('../types').Adapter } Adapter */
/** @typedef { import('../types').Component } Component */
/** @typedef { import('../types').Defaults } Defaults */
/** @typedef { import('../types').ElementMap } ElementMap */
/** @typedef { import('../types').ElementSpec } ElementSpec */
/** @typedef { import('../types').ElementEvents } ElementEvents */
/** @typedef { import('../types').ReactAdapter } ReactAdapter */
/** @typedef { import('../types').PropertyMap } PropertyMap */

import { inject as enableBabelClasses } from '../helpers/babel_es5_adapter'

/**
 * The name of this strategy.
 * @type string
 */

export const name = 'CustomElements'

/**
 * Registers a custom element.
 *
 * This creates a custom element (ie, a subclass of `window.HTMLElement`) and
 * registers it (ie, `window.customElements.define`).
 *
 * Events will be triggered when something interesting happens.
 *
 * @example
 *     defineElement(
 *       { component: Tooltip },
 *       'x-tooltip',
 *       { onUpdate, onUnmount }
 *     )
 *
 * @private
 * @param {ElementSpec} elSpec
 * @param {string} elName
 * @param {ElementEvents} events
 */

export function defineElement(elSpec, elName, events) {
  const { onUpdate, onUnmount, onMount } = events
  enableBabelClasses()
  const attributes = elSpec.attributes || []

  class ComponentElement extends HTMLElement {
    static get observedAttributes() {
      return ['props-json', ...attributes]
    }

    connectedCallback() {
      this._mountPoint = createMountPoint(this, elSpec)
      onMount(this, this._mountPoint)
    }

    disconnectedCallback() {
      if (!this._mountPoint) {
        return
      }
      onUnmount(this, this._mountPoint)
    }

    attributeChangedCallback() {
      if (!this._mountPoint) {
        return
      }
      onUpdate(this, this._mountPoint)
    }
  }

  // Supress warning when quiet mode is on
  if (elSpec.quiet && window.customElements.get(elName)) {
    return
  }

  window.customElements.define(elName, ComponentElement)
}

export function isSupported() {
  return !!(window.customElements && window.customElements.define)
}

/**
 * Creates a `<span>` element that serves as the mounting point for React
 * components. If `shadow: true` is requested, it'll attach a shadow node.
 *
 * @private
 * @param {HTMLElement} element
 * @param {ElementSpec} elSpec
 */

function createMountPoint(element, elSpec) {
  const { shadow } = elSpec
  if (shadow && element.attachShadow) {
    const mountPoint = document.createElement('span')
    element.attachShadow({ mode: 'open' }).appendChild(mountPoint)
    return mountPoint
  } else {
    return element
  }
}

/**
 * Check if Shadow DOM is supported.
 */

export function supportsShadow() {
  return !!(document && document.body && document.body.attachShadow)
}
