// @ts-check
/*
 * Adapter for React 18.
 */

/** @typedef { import('../types').ElementSpec } ElementSpec */

import React from 'react'
import { createRoot } from 'react-dom/client'
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
 * @param {HTMLElement & { __remountRoot?: any }} mountPoint
 * @param {object} props
 * @param {HTMLElement | null} element
 */

export function update(elSpec, mountPoint, props, element) {
  const { component } = elSpec
  const reactElement = React.createElement(component, props)
  const root = createRoot(mountPoint)
  /** @type {any} */ mountPoint.__remountRoot = root
  root.render(reactElement)
  if (element) {
    retargetEvents(element.shadowRoot)
  }
}

/**
 * Unmounts a component.
 * @private
 *
 * @param {ElementSpec} _elSpec
 * @param {HTMLElement & { __remountRoot?: any }} mountPoint
 */

export function unmount(_elSpec, mountPoint) {
  mountPoint.__remountRoot?.unmount()
}
