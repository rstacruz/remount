/** @jest-environment jsdom */
import { raf } from './utils'

const Dumper = props => {
  return <span className='dumper'>[{JSON.stringify(props)}]</span>
}

describe('Children', () => {
  let div

  beforeEach(() => {
    div = document.createElement('div')
    root.appendChild(div)
  })

  beforeAll(() => {
    Remount.define({ 'x-indigo': Dumper }, { attributes: ['value'] })
  })

  describe('with cleanups', () => {
    afterEach(() => {
      if (!IS_DEBUG) root.removeChild(div)
    })

    it('will be overridden by React', () => {
      const el = document.createElement('x-indigo')
      el.setAttribute('value', 'abc')
      el.innerHTML = '<span>I will be overridden by React</span>'

      // After appending it, it will trigger the custom element handler,
      // which will pass control over to React. ReactDOM.render() will override
      // whatever HTML we had earlier.
      div.appendChild(el)

      return raf().then(() => {
        expect(div.textContent).toEqual('[{"value":"abc"}]')
      })
    })
  })

  describe('without cleanups', () => {
    // Skip this in IE10 and other weird environments
    ;(window.LEGACY ? it.skip : it)('can be forced via innerHTML', () => {
      const el = document.createElement('x-indigo')
      el.setAttribute('value', 'abc')

      div.appendChild(el)

      return raf()
        .then(() => {
          expect(div.textContent).toEqual('[{"value":"abc"}]')
          div.innerHTML = '<span>I am overridding React</span>'
          return raf()
        })
        .then(() => {
          expect(div.textContent).toEqual('I am overridding React')
          // At this point, we lose the mutation observer, because we did an evil thing
          // of overriding innerHTML. This new attribute change will now not be detected.
          el.setAttribute('value', 'def')
          return raf()
        })
        .then(() => {
          expect(div.textContent).toEqual('I am overridding React')
        })
    })
  })
})
