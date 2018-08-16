/* global React, ReactDOM */
// import React from 'react'
// import ReactDOM from 'react-dom'

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

function register (components /*: ComponentMap */) {
  Object.keys(components).forEach((name /*: string */) => {
    const Component = components[name]
    registerOne(Component, name)
  })
}

/**
 * Registers one element.
 * @private
 */

function registerOne (Component /*: React.Component */, name /*: string */) {
  class ComponentElement extends window.HTMLElement {
    connectedCallback () {
      const mountPoint = document.createElement('span')
      this.attachShadow({ mode: 'open' }).appendChild(mountPoint)

      const props = this.hasAttribute('props-json')
        ? JSON.parse(this.getAttribute('props-json'))
        : getProps(this)

      ReactDOM.render(React.createElement(Component, props), mountPoint)
    }
  }

  window.customElements.define(name, ComponentElement)
}

/**
 * Returns properties for a given HTML element.
 */

function getProps (element /*: Element */) {
  const names /*: Array<string> */ = element.getAttributeNames()
  return names.reduce((result /*: PropertyMap */, attribute /*: string */) => {
    result[attribute] = element.getAttribute(attribute)
    return result
  }, {})
}

export default register
