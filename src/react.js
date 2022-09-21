// @ts-check
/** @typedef { import('./types').ElementSpec } ElementSpec */

import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

/**
 * @param {ElementSpec} elSpec
 * @param {HTMLElement} mountPoint
 * @param {object} props
 * @param {HTMLElement | null} element
 */

export function mount(elSpec, mountPoint, props, element) {
  return update(elSpec, mountPoint, props, element)
}

/**
 * Updates a custom element by calling `ReactDOM.render()`.
 * @private
 *
 * @param {ElementSpec} elSpec
 * @param {HTMLElement} mountPoint
 * @param {object} props
 * @param {HTMLElement | null} element
 */

export function update(elSpec, mountPoint, props, element) {
  const { component } = elSpec
  const reactElement = React.createElement(component, props)
  mountPoint.__reactRoot = ReactDOM.createRoot(mountPoint)
  mountPoint.__reactRoot.render(reactElement)
}

/**
 * Unmounts a component.
 * @private
 *
 * @param {ElementSpec} elSpec
 * @param {HTMLElement} mountPoint
 */

export function unmount(elSpec, mountPoint) {
  mountPoint.__reactRoot.unmount()
}
