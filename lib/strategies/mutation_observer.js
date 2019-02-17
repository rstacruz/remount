// @flow
/*::
import type {
  ElementSpec,
  ElementEvents
} from '../types'
*/

export const name = 'MutationObserver'

// List of observers tags
export const observers = {}

export function isSupported() {
  return !!window.MutationObserver
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
 */

export function defineElement(
  elSpec /*: ElementSpec */,
  name /*: string */,
  events /*: ElementEvents */
) {
  name = name.toLowerCase()

  // Maintain parity with what would happen in Custom Elements mode
  if (!isValidName(name)) {
    if (elSpec.quiet) return
    throw new Error(`Remount: "${name}" is not a valid custom element name`)
  }

  if (observers[name]) {
    if (elSpec.quiet) return
    throw new Error(`Remount: "${name}" is already registered`)
  }

  const observer = new window.MutationObserver(mutations => {
    each(mutations, (mutation /*: { addedNodes: HTMLCollection<*> } */) => {
      each(mutation.addedNodes, (node /*: Element */) => {
        checkForMount(node, name, events)
      })
    })
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  observers[name] = true
}

/**
 * Checks if this new element should fire an `onUpdate` hook.
 * Recurses down to its descendant nodes.
 */

function checkForMount(
  node /*: Element */,
  name /*: string */,
  events /*: ElementEvents */
) {
  if (node.nodeName.toLowerCase() === name) {
    // It's a match!
    events.onMount(node, node)
    observeForUpdates(node, events)
    observeForRemoval(node, events)
  } else if (node.children && node.children.length) {
    // Recurse down into the other additions
    each(node.children, (subnode /*: Element */) => {
      checkForMount(subnode, name, events)
    })
  }
}

/**
 * Observes for any changes in attributes
 */

function observeForUpdates(
  node /*: Element */,
  { onUpdate } /*: ElementEvents */
) {
  const observer = new window.MutationObserver(mutations => {
    each(mutations, (mutation /*: { target: Element } */) => {
      const node = mutation.target
      onUpdate(node, node)
    })
  })

  observer.observe(node, { attributes: true })
}

/**
 * Observes a node's parent to wait until the node is removed
 */

function observeForRemoval(
  node /*: Element */,
  { onUnmount } /*: ElementEvents */
) {
  const parent = node.parentNode

  const observer = new window.MutationObserver(mutations => {
    each(mutations, (mutation /*: { removedNodes: HTMLCollection<*> } */) => {
      each(mutation.removedNodes, (subnode /*: Element */) => {
        if (node !== subnode) return
        observer.disconnect(parent)
        onUnmount(node, node)
      })
    })
  })

  observer.observe(parent, { childList: true, subtree: true })
}

/**
 * Some implementations of MutationObserver don't have .forEach,
 * so we need our own `forEach` shim. This is usually the case with
 * polyfilled environments.
 *
 * @private
 */

function each /*:: <Item> */(
  list /*: Array<Item> | HTMLCollection<*> */,
  fn /*: Item => any */
) {
  for (let i = 0, len = list.length; i < len; i++) {
    fn(list[i])
  }
}

/**
 * Validate a custom tag.
 *
 * Since Remount can work with either Custom Elements or MutationObserver API's,
 * it'd be wise if we rejected element names that won't work in Custom Elements
 * mode (even if we're using MutationObserver mode).
 *
 * @example
 *     isValidName('div')      // => false
 *     isValidName('my-div')   // => true
 *     isValidName('123-456')  // => false
 *     isValidName('my-123')   // => true
 *
 * @private
 */

function isValidName(name /*: string */) /*: boolean */ {
  return !!(name.indexOf('-') !== -1 && name.match(/^[a-z][a-z0-9-]*$/))
}

/**
 * Shadow DOM is not supported with the Mutation Observer strategy.
 */

export function supportsShadow() {
  return false
}
