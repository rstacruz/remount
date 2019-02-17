// @ts-check
/** @typedef { import('./types').ElementSpec } ElementSpec */

import * as React from 'react'
import * as ReactDOM from 'react-dom'

/**
 * @param {ElementSpec} elSpec
 * @param {HTMLElement} mountPoint
 * @param {object} props
 */

export function mount(elSpec, mountPoint, props) {
  return update(elSpec, mountPoint, props)
}

/**
 * Updates a custom element by calling `ReactDOM.render()`.
 * @private
 *
 * @param {ElementSpec} elSpec
 * @param {HTMLElement} mountPoint
 * @param {object} props
 */

export function update(elSpec, mountPoint, props) {
  const { component } = elSpec
  const reactElement = React.createElement(component, props)
  ReactDOM.render(reactElement, mountPoint)
}

/**
 * Unmounts a component.
 * @private
 *
 * @param {ElementSpec} elSpec
 * @param {HTMLElement} mountPoint
 */

export function unmount(elSpec, mountPoint) {
  ReactDOM.unmountComponentAtNode(mountPoint)
}
