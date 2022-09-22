/** @jest-environment jsdom */
/* eslint-env mocha */
import { raf } from './utils'

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
      mount (a, b) {
        calls.push({ method: 'mount', args: [a, b] })
      },
      update (a, b) {
        calls.push({ method: 'update', args: [a, b] })
      },
      unmount (a, b, c) {
        calls.push({ method: 'unmount', args: [a, b, c] })
      }
    }
  })

  it('calls mount()', () => {
    Remount.define({ 'x-coconut': 'MyComponent' }, { adapter: MyCustomAdapter })

    const el = document.createElement('x-coconut')
    div.appendChild(el)

    return raf().then(() => {
      expect(calls[0]).not.toEqual(undefined)
      expect(calls[0].method).toEqual('mount')
      expect(calls[0].args[0].component).toEqual('MyComponent')
    })
  })

  it('calls update()', () => {
    Remount.define(
      { 'x-kumquat': 'MyComponent' },
      { attributes: ['title'], adapter: MyCustomAdapter }
    )

    const el = document.createElement('x-kumquat')
    div.appendChild(el)

    return raf()
      .then(() => {
        el.setAttribute('title', 'hello')
        return raf()
      })
      .then(() => {
        expect(calls[1]).not.toEqual(undefined)
        expect(calls[1].method).toEqual('update')
        expect(calls[1].args[0].component).toEqual('MyComponent')
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
        expect(calls[1]).not.toEqual(undefined)
        expect(calls[1].method).toEqual('unmount')
        expect(calls[1].args[0].component).toEqual('MyComponent')
        expect(calls[1].args[1].nodeName.toLowerCase()).toEqual('x-raspberry')
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

  // A simple adapter that delegates to the component
  const VanillaAdapter = {
    mount (spec, el, props) {
      spec.component.mount(spec, el, props)
    },
    update (spec, el, props) {
      spec.component.update(spec, el, props)
    },
    unmount (spec, el) {
      spec.component.unmount(spec, el)
    }
  }

  it('calls update()', () => {
    const MyComponent = {
      mount (_, el) {
        el.innerHTML = 'Hey :)'
      },
      update (_, el) {
        // pass
      },
      unmount (_, el) {
        // pass
      }
    }

    Remount.define({ 'x-chocolate': MyComponent }, { adapter: VanillaAdapter })

    const el = document.createElement('x-chocolate')
    div.appendChild(el)

    return raf().then(() => {
      expect(el.textContent).toEqual('Hey :)')
    })
  })
})
