// @ts-check
/** @typedef { import('./types').ElementSpec } ElementSpec */

import React from 'react'
import ReactDOM from 'react-dom'
import retargetEvents from 'react-shadow-dom-retarget-events'

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
  ReactDOM.render(reactElement, mountPoint)
  if (element) {
    retargetEvents(element.shadowRoot)
  }
}

/**
 * Unmounts a component.
 * @private
 *
 * @param {ElementSpec} _elSpec
 * @param {HTMLElement} mountPoint
 */

export function unmount(_elSpec, mountPoint) {
  ReactDOM.unmountComponentAtNode(mountPoint)
}
