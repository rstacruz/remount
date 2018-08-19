// @flow

/*::
import type {
  Component,
  PropertyMap,
  ElementMap,
  Defaults,
  ElementSpec,
  ReactAdapter
} from './types'
*/

/**
 * Registers a custom element.
 * @private
 */

export function defineOne (
  elSpec /*: ElementSpec */,
  name /*: string */,
  { update, unmount } /*: ReactAdapter */
) {
  const attributes = elSpec.attributes || []

  class ComponentElement extends window.HTMLElement {
    static get observedAttributes () {
      return ['props-json', ...attributes]
    }

    connectedCallback () {
      this._mountPoint = createMountPoint(this, elSpec)
      update(this, elSpec, this._mountPoint)
    }

    disconnectedCallback () {
      if (!this._mountPoint) return
      unmount(this._mountPoint)
    }

    attributeChangedCallback () {
      if (!this._mountPoint) return
      update(this, elSpec, this._mountPoint)
    }
  }

  if (!ensureSupported()) return

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
 * components.
 *
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
