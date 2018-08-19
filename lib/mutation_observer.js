/* List of observers tags */
let observers = {}

export function isSupported () {
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
 *         onUpdate: () => {},
 *         onUnmount: () => {},
 *       }
 *     )
 *
 * @private
 */

export function defineElement (elSpec, name, { onUpdate, onUnmount }) {
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
    each(mutations, mutation => {
      each(mutation.addedNodes, node => {
        if (node.nodeName.toLowerCase() !== name) return
        onUpdate(node, node)

        observeForUpdates(node, onUpdate)
        observeForRemoval(node, onUnmount)
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
 * Observes for any changes in attributes
 */

function observeForUpdates (node /*: Element */, onUpdate) {
  const observer = new window.MutationObserver(mutations => {
    each(mutations, mutation => {
      const node = mutation.target
      onUpdate(node, node)
    })
  })

  observer.observe(node, { attributes: true })
}

/**
 * Observes a node's parent to wait until the node is removed
 */

function observeForRemoval (node /*: Element */, onUnmount) {
  const parent = node.parentNode

  const observer = new window.MutationObserver(mutations => {
    each(mutations, mutation => {
      each(mutation.removedNodes, subnode => {
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

function each (list, fn) {
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

function isValidName (name /*: string */) /*: boolean */ {
  return name.indexOf('-') !== -1 && name.match(/^[a-z][a-z0-9-]*$/)
}

export const name = 'MutationObserver'
