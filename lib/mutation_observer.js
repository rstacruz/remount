export function isSupported () {
  return !!window.MutationObserver
}

export function defineElement (elSpec, name, { onUpdate, onUnmount }) {
  name = name.toLowerCase()

  const observer = new window.MutationObserver(mutations => {
    each(mutations, mutation => {
      each(mutation.addedNodes, node => {
        if (node.nodeName.toLowerCase() !== name) return
        onUpdate(node, node)
      })

      // todo handle update

      each(mutation.removedNodes, node => {
        if (node.nodeName.toLowerCase() !== name) return
        onUnmount(node, node)
      })
    })
  })

  observer.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true
  })
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

export const name = 'MutationObserver'
