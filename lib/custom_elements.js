// @flow

/*::
import type {
  Component,
  PropertyMap,
  ElementMap,
  Defaults,
  ElementSpec,
  ReactAdapter,
  ElementEvents
} from './types'
*/

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
  if (!ensureSupported()) return

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

/**
 * Ensures that custom elements are supported.
 * Throws an error if not.
 * @private
 */

function ensureSupported () {
  if (!window.customElements || !window.customElements.define) {
    console.error(
      "remount: Custom elements aren't support in this browser. " +
        'Remount will not work. ' +
        'Including polyfills will likely fix this. ' +
        'See Remount documentation for more info: ' +
        'https://github.com/rstacruz/remount'
    )
    return false
  }

  return true
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
  if (shadow) {
    const mountPoint = document.createElement('span')
    element.attachShadow({ mode: 'open' }).appendChild(mountPoint)
    return mountPoint
  } else {
    return element
  }
}
