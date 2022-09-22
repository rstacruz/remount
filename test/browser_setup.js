/* eslint-env mocha */
// Root element
export const root = document.getElementById('debug')

// True if in ?debug mode
export const IS_DEBUG = window.location.search.indexOf('debug') !== -1

if (IS_DEBUG) root.classList.add('-visible')

after(() => {
  const div = document.createElement('div')
  div.id = 'finish'
  document.body.appendChild(div)
})

function expect(left) {
  return {
    toEqual(right) {
      if (left !== right) {
        throw new Error('Equal assertion failed\n\n' +
          `Left:  ${JSON.stringify(left)}\n` +
          `Right: ${JSON.stringify(right)}\n\n`)
      }
    },
    toMatch(right) {
      if (!left.match(right)) {
        throw new Error('Match assertion failed\n\n' +
          `Left:  ${JSON.stringify(left)}\n` +
          `Right: ${right.toString()}\n\n`)
      }
    },
    not: {
      toEqual(right) {
        if (left === right) {
          throw new Error('Not equal assertion failed\n\n' +
            `Left:  ${JSON.stringify(left)}\n` +
            `Right: ${JSON.stringify(right)}\n\n`)
        }
      }
    }
  }
}

// Mocha's "before" is Jest's "beforeAll"
window.beforeAll = window.before
window.IS_DEBUG = IS_DEBUG
window.root = root
window.expect = expect
