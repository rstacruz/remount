// @flow
import { inject as enableBabelClasses } from '../helpers/babel_es5_adapter'

/*::
import type {
  Component,
  PropertyMap,
  ElementMap,
  Defaults,
  ElementSpec,
  ReactAdapter,
  ElementEvents
} from '../types'
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
 */

export function defineElement (
  elSpec /*: ElementSpec */,
  name /*: string */,
  { onUpdate, onUnmount } /*: ElementEvents */
) {
  enableBabelClasses()
  const attributes = elSpec.attributes || []

  class ComponentElement extends window.HTMLElement {
    static get observedAttributes () {
      return ['props-json', ...attributes]
    }

    connectedCallback () {
      this._mountPoint = createMountPoint(this, elSpec)
      onUpdate(this, this._mountPoint)
    }

    disconnectedCallback () {
      if (!this._mountPoint) return
      onUnmount(this, this._mountPoint)
    }

    attributeChangedCallback () {
      if (!this._mountPoint) return
      onUpdate(this, this._mountPoint)
    }
  }

  // Supress warning when quiet mode is on
  if (elSpec.quiet && window.customElements.get(name)) {
    return
  }

  window.customElements.define(name, ComponentElement)
}

export function isSupported () {
  return window.customElements && window.customElements.define
}

/**
 * Creates a `<span>` element that serves as the mounting point for React
 * components. If `shadow: true` is requested, it'll attach a shadow node.
 * @private
 */

function createMountPoint (
  element /*: Element */,
  { shadow } /*: ElementSpec */
) {
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

export function supportsShadow () {
  return !!(document && document.body && document.body.attachShadow)
}
