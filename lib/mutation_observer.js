export function isSupported () {
  return !!window.MutationObserver
}

export function defineElement (elSpec, name, { onUpdate, onUnmount }) {
  name = name.toLowerCase()

  const observer = new window.MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeName.toLowerCase() !== name) return
        onUpdate(node, node)
      })

      // todo handle update

      mutation.removedNodes.forEach(node => {
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

export const name = 'MutationObserver'
