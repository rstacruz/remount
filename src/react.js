// @ts-check
/** @typedef { import('./types').ElementSpec } ElementSpec */
/** @typedef { import('react-dom/client').Root } ReactDOMRoot */

import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

/** @type {Map<HTMLElement, ReactDOMRoot>} */
const roots = new Map()

/**
 * @param {ElementSpec} elSpec
 * @param {HTMLElement} mountPoint
 * @param {object} props
 * @param {HTMLElement | null} element
 */

export function mount(elSpec, mountPoint, props, element) {
  const reactElement = React.createElement(elSpec.component, props)
  const root = ReactDOM.createRoot(mountPoint)
  roots.set(mountPoint, root)
  root.render(reactElement)
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
  const reactElement = React.createElement(elSpec.component, props)
  const root = roots.get(mountPoint)
  if (root) root.render(reactElement)
}

/**
 * Unmounts a component.
 * @private
 *
 * @param {ElementSpec} elSpec
 * @param {HTMLElement} mountPoint
 */

export function unmount(elSpec, mountPoint) {
  const root = roots.get(mountPoint)
  if (!root) return

  root.unmount()
  roots.delete(mountPoint)
}
