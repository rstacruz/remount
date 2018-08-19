/* List of observers tags */
let observers = {}

export function isSupported () {
  return !!window.MutationObserver
}

export function defineElement (elSpec, name, { onUpdate, onUnmount }) {
  name = name.toLowerCase()

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
      })

      each(mutation.removedNodes, node => {
        if (node.nodeName.toLowerCase() !== name) return
        onUnmount(node, node)
      })

      if (mutation.type === 'attributes') {
        const node = mutation.target
        if (node.nodeName.toLowerCase() !== name) return
        onUpdate(node, node)
      }
    })
  })

  observer.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true
  })

  observers[name] = observer
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

function isValidName (name) {
  return (
    name.indexOf('-') !== -1 && name.match(/^[a-z][a-z0-9-]*$/)
  )
}

export const name = 'MutationObserver'
