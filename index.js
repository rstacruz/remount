// @flow
import * as React from 'react'
import ReactDOM from 'react-dom'

/*::
export type Component = React.ComponentType<{}>

export type PropertyMap = {
  [string]: ?string
}

export type ElementMap = {
  [string]: ElementSpec | Component
}

export type Defaults = {
  attributes?: Array<string>,
  quiet?: boolean,
  shadow?: boolean
}

export type ElementSpec = {
  component: Component,
  attributes?: Array<string>,
  quiet?: boolean,
  shadow?: boolean
}
*/

/**
 * Registers elements.
 */

export function define (components /*: ElementMap */, defaults /*: ?Defaults */) {
  Object.keys(components).forEach((name /*: string */) => {
    const elSpec /*: ElementSpec */ = toElementSpec(components[name])
    defineOne(Object.assign({}, defaults, elSpec), name)
  })
}

function toElementSpec (thing /*: ElementSpec | Component */) /*: ElementSpec */ {
  // $FlowFixMe$
  if (typeof thing === 'object' && thing.component) return thing
  return { component: thing }
}

/**
 * Registers one element.
 * @private
 */

function defineOne (elSpec /*: ElementSpec */, name /*: string */) {
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
      ReactDOM.unmountComponentAtNode(this._mountPoint)
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
 * Ensures that custom elements are supported
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

/**
 * Updates a custom element by calling `ReactDOM.render()`.
 * @private
 */

function update (
  element /* Element */,
  { component, attributes } /*: ElementSpec */,
  mountPoint /* Element */
) {
  const props = element.hasAttribute('props-json')
    ? JSON.parse(element.getAttribute('props-json'))
    : getProps(element, attributes)

  const reactElement = React.createElement(component, props)

  ReactDOM.render(reactElement, mountPoint)
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
