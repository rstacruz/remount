// @ts-check
/** @typedef { import('../types').ElementSpec } ElementSpec */
/** @typedef { import('../types').ElementEvents } ElementEvents */
/** @typedef { import('../types').ObserverList } ObserverList */

import each from '../each'

/**
 * The name of this strategy.
 * @type string
 */

export const name = 'MutationObserver'

/**
 * List of observers tags.
 * @type ObserverList
 */

export const observers = {}

export function isSupported() {
  return 'MutationObserver' in window
}

/**
 * Defines a custom element.
 *
 * @example
 *     defineElement(
 *       { component: MyComponent },
 *       'my-div',
 *       {
 *         onMount: () => {},
 *         onUpdate: () => {},
 *         onUnmount: () => {},
 *       }
 *     )
 *
 * @private
 * @param {ElementSpec} elSpec
 * @param {string} elName
 * @param {ElementEvents} events
 */

export function defineElement(elSpec, elName, events) {
  elName = elName.toLowerCase()

  // Maintain parity with what would happen in Custom Elements mode
  if (!isValidName(elName)) {
    if (elSpec.quiet) {
      return
    }
    throw new Error(`Remount: "${elName}" is not a valid custom element elName`)
  }

  if (observers[elName]) {
    if (elSpec.quiet) {
      return
    }
    throw new Error(`Remount: "${elName}" is already registered`)
  }

  const observer = new MutationObserver(
    /** @type MutationCallback */ mutations => {
      each(mutations, (/** @type MutationRecord */ mutation) => {
        each(mutation.addedNodes, (/** @type Node */ node) => {
          if (isElement(node)) {
            checkForMount(node, elName, events)
          }
        })
      })
    }
  )

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  observers[elName] = /* true */ observer

  function mountElementsInDOM() {
    const nodes = document.getElementsByTagName(elName)
    each(nodes, (/** @type HTMLElement */ node) =>
      checkForMount(node, elName, events)
    )
  }

  if (
    document.readyState === 'complete' ||
    document.readyState === 'interactive'
  ) {
    mountElementsInDOM()
  } else {
    window.addEventListener('DOMContentLoaded', mountElementsInDOM)
  }
}

/**
 * Checks if this new element should fire an `onUpdate` hook.
 * Recurses down to its descendant nodes.
 *
 * @param {HTMLElement} node
 * @param {string} elName
 * @param {ElementEvents} events
 */

function checkForMount(node, elName, events) {
  if (node.nodeName.toLowerCase() === elName) {
    // It's a match!
    events.onMount(node, node)
    observeForUpdates(node, events)
    observeForRemoval(node, events)
  } else if (node.children && node.children.length) {
    // Recurse down into the other additions
    each(node.children, (/** @type HTMLElement */ subnode) => {
      if (isElement(subnode)) {
        checkForMount(subnode, elName, events)
      }
    })
  }
}

/**
 * Observes for any changes in attributes.
 *
 * @param {Element} node
 * @param {ElementEvents} events
 */

function observeForUpdates(node, events) {
  const { onUpdate } = events
  const observer = new MutationObserver(
    /** @type MutationCallback */ mutations => {
      each(mutations, (/** @type MutationRecord */ mutation) => {
        const targetNode = mutation.target
        if (isElement(targetNode)) {
          onUpdate(targetNode, targetNode)
        }
      })
    }
  )

  observer.observe(node, { attributes: true })
}

/**
 * Observes a node's parent to wait until the node is removed
 * @param {HTMLElement} node
 * @param {ElementEvents} events
 */

function observeForRemoval(node, events) {
  const { onUnmount } = events
  const parent = node.parentNode

  // Not sure when this can happen, but let's add this for type safety
  if (!parent) {
    return
  }

  const observer = new MutationObserver(
    /** @type MutationCallback */ mutations => {
      each(mutations, (/** @type MutationRecord */ mutation) => {
        each(mutation.removedNodes, (/** @type Node */ subnode) => {
          if (node !== subnode) {
            return
          }
          if (isElement(node)) {
            // @ts-ignore TypeScript expects 0 arguments...?
            observer.disconnect(parent)
            onUnmount(node, node)
          }
        })
      })
    }
  )

  observer.observe(parent, { childList: true, subtree: true })
}

/**
 * Validate a custom tag.
 *
 * Since Remount can work with either Custom Elements or MutationObserver API's,
 * it'd be wise if we rejected element names that won't work in Custom Elements
 * mode (even if we're using MutationObserver mode).
 *
 * @param {string} elName
 * @returns {boolean}
 *
 * @example
 *     isValidName('div')      // => false
 *     isValidName('my-div')   // => true
 *     isValidName('123-456')  // => false
 *     isValidName('my-123')   // => true
 *
 * @private
 */

function isValidName(elName) {
  return !!(elName.indexOf('-') !== -1 && elName.match(/^[a-z][a-z0-9-]*$/))
}

/**
 * Shadow DOM is not supported with the Mutation Observer strategy.
 */

export function supportsShadow() {
  return false
}

/**
 * Checks if a given Node is an HTMLElement.
 *
 * It's possible that a mutation's `addedNodes` return something that isn't an
 * HTMLElement.
 *
 * @param {any} node
 * @returns {node is HTMLElement}
 */

function isElement(node) {
  if (node) {
    return true
  }
  return false
}
