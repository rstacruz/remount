/* eslint-env mocha */

import { Remount, assert, raf, root } from './setup'

describe('Custom adapters', () => {
  let div

  beforeEach(() => {
    div = document.createElement('div')
    root.appendChild(div)
  })

  afterEach(() => {
    root.removeChild(div)
  })

  let calls, MyCustomAdapter

  beforeEach(() => {
    calls = []
    MyCustomAdapter = {
      update (a, b) {
        calls.push({ method: 'update', args: [a, b] })
      },
      unmount (a, b, c) {
        calls.push({ method: 'unmount', args: [a, b, c] })
      }
    }
  })

  it('calls update()', () => {
    Remount.define({ 'x-coconut': 'MyComponent' }, { adapter: MyCustomAdapter })

    const el = document.createElement('x-coconut')
    div.appendChild(el)

    return raf().then(() => {
      assert(calls[0])
      assert.equal(calls[0].method, 'update')
      assert.equal(calls[0].args[0].component, 'MyComponent')
    })
  })

  it('calls unmount()', () => {
    Remount.define(
      { 'x-raspberry': 'MyComponent' },
      { adapter: MyCustomAdapter }
    )

    const el = document.createElement('x-raspberry')
    div.appendChild(el)

    return raf()
      .then(() => {
        div.removeChild(el)
        return raf()
      })
      .then(() => {
        assert(calls[1])
        assert.equal(calls[1].method, 'unmount')
        assert.equal(calls[1].args[0].component, 'MyComponent')
        assert.equal(calls[1].args[1].nodeName.toLowerCase(), 'x-raspberry')
      })
  })
})

describe('Example vanilla adapter', () => {
  let div

  beforeEach(() => {
    div = document.createElement('div')
    root.appendChild(div)
  })

  afterEach(() => {
    root.removeChild(div)
  })

  const VanillaAdapter = {
    update ({ component }, el) {
      component(el)
    },
    unmount (_, _el) {
    }
  }

  it('calls update()', () => {
    function MyComponent (el) {
      el.innerHTML = 'Hey :)'
    }

    Remount.define({ 'x-chocolate': MyComponent }, { adapter: VanillaAdapter })

    const el = document.createElement('x-chocolate')
    div.appendChild(el)

    return raf().then(() => {
      assert.equal(el.textContent, 'Hey :)')
    })
  })
})
