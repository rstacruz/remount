// @ts-check
/** @typedef { import('./types').ElementSpec } ElementSpec */
/** @typedef { import('react-dom/client').Root } Root */

import * as React from 'react'
import retargetEvents from 'react-shadow-dom-retarget-events'

/**
 * @param {ElementSpec} elSpec
 * @param {Root} root
 * @param {object} props
 * @param {HTMLElement | null} element
 */

export function mount(elSpec, root, props, element) {
  return update(elSpec, root, props, element)
}

/**
 * Updates a custom element by calling `createRoot().render()`.
 * @private
 *
 * @param {ElementSpec} elSpec
 * @param {Root} root
 * @param {object} props
 * @param {HTMLElement | null} element
 */

export function update(elSpec, root, props, element) {
  const { component } = elSpec
  const reactElement = React.createElement(component, props)
  root.render(reactElement);
  if (element) {
    retargetEvents(element.shadowRoot)
  }
}

/**
 * Unmounts a component.
 * @private
 *
 * @param {ElementSpec} _elSpec
 * @param {Root} root
 */

export function unmount(_elSpec, root) {
  root.unmount();
}
