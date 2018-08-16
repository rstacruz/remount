const React = require('react')
const ReactDOM = require('react-dom')

/*::
export type PropertyMap = {
  [string]: string
}

export type ComponentMap = {
  [string]: React.Component
}
*/

/**
 * Registers elements.
 */

function define (components /*: ComponentMap */) {
  Object.keys(components).forEach((name /*: string */) => {
    const Component = components[name]
    defineOne(Component, name)
  })
}

/**
 * Registers one element.
 * @private
 */

function defineOne (Component /*: React.Component */, name /*: string */) {
  class ComponentElement extends window.HTMLElement {
    connectedCallback () {
      this._mountPoint = createMountPoint(this)
      update(this, Component, this._mountPoint)
    }

    disconnectedCallback () {
      if (!this._mountPoint) return
      ReactDOM.unmountComponentAtNode(this._mountPoint)
    }

    attributeChangedCallback () {
      if (!this._mountPoint) return
      update(this, Component, this._mountPoint)
    }
  }

  window.customElements.define(name, ComponentElement)
}

/**
 * Creates a `<span>` element that serves as the mounting point for React
 * components.
 * @private
 */

function createMountPoint (element) {
  const mountPoint = document.createElement('span')
  element.attachShadow({ mode: 'open' }).appendChild(mountPoint)
  return mountPoint
}

/**
 * Updates a custom element by calling `ReactDOM.render()`.
 * @private
 */

function update (element, Component, mountPoint) {
  const props = element.hasAttribute('props-json')
    ? JSON.parse(element.getAttribute('props-json'))
    : getProps(element)

  ReactDOM.render(React.createElement(Component, props), mountPoint)
}

/**
 * Returns properties for a given HTML element.
 * @private
 */

function getProps (element /*: Element */) {
  const names /*: Array<string> */ = element.getAttributeNames()
  return names.reduce((result /*: PropertyMap */, attribute /*: string */) => {
    result[attribute] = element.getAttribute(attribute)
    return result
  }, {})
}

module.exports = { define }
