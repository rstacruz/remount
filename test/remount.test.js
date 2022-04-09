/* eslint-env mocha */
import { React, Remount, IS_DEBUG, raf, root } from './setup.js'

const Greeter = ({ name }) => {
  // return <span className='greeter'>Hello {name || '(unknown)'}!</span>
  return React.createElement(
    'span',
    { className: 'greeter' },
    'Hello ',
    name || '(unknown)',
    '!'
  )
}

const Dumper = (props) => {
  // return <span className='dumper'>[{JSON.stringify(props)}]</span>
  return React.createElement(
    'span',
    { className: 'dumper' },
    '[',
    JSON.stringify(props),
    ']'
  )
}

describe('Remount', () => {
  let div

  beforeEach(() => {
    div = document.createElement('div')
    root.appendChild(div)
  })

  afterEach(() => {
    if (!IS_DEBUG) root.removeChild(div)
  })

  describe('Props', () => {
    it('supports props-json', () => {
      Remount.define({ 'x-red': Greeter })
      div.innerHTML = `<x-red props-json='{"name":"John"}'></x-greeter>`
      return raf().then(() => {
        expect(div.textContent).toMatch(/Hello John/)
      })
    })

    it('ignores other props', () => {
      Remount.define({ 'x-blue': Greeter })
      div.innerHTML = `<x-blue name='Alice'></x-blue>`
      return raf().then(() => {
        expect(div.textContent).toMatch(/Hello \(unknown\)/)
      })
    })

    it('can handle JSON errors (TODO)')
  })

  describe('Remount.define()', () => {
    it('accepts { component }', () => {
      Remount.define({
        'x-apple': {
          component: Greeter
        }
      })

      div.innerHTML = `<x-apple props-json='{"name":"Apple"}'></x-apple>`
      return raf().then(() => {
        expect(div.textContent).toMatch(/Hello Apple/)
      })
    })

    it('accepts { component, attributes }', () => {
      Remount.define({
        'x-banana': {
          component: Dumper,
          attributes: ['name']
        }
      })

      div.innerHTML = `<x-banana name='Banana'></x-banana>`
      return raf().then(() => {
        expect(div.textContent).toEqual('[{"name":"Banana"}]')
      })
    })

    it('attribute names are case insensitive', () => {
      Remount.define({
        'x-cherry': {
          component: Dumper,
          attributes: ['name']
        }
      })

      div.innerHTML = `<x-cherry NAME='Cherry'></x-cherry>`
      return raf().then(() => {
        expect(div.textContent).toEqual('[{"name":"Cherry"}]')
      })
    })

    it('support blank string values', () => {
      Remount.define({
        'x-guava': {
          component: Dumper,
          attributes: ['name']
        }
      })

      div.innerHTML = `<x-guava name=''></x-guava>`
      return raf().then(() => {
        expect(div.textContent).toEqual('[{"name":""}]')
      })
    })

    it('empty values become empty strings', () => {
      Remount.define({
        'x-melon': {
          component: Dumper,
          attributes: ['name']
        }
      })

      div.innerHTML = `<x-melon name></x-melon>`
      return raf().then(() => {
        expect(div.textContent).toEqual('[{"name":""}]')
      })
    })

    it('tag names are case insensitive', () => {
      Remount.define({
        'x-apricot': {
          component: Dumper,
          attributes: ['name']
        }
      })

      div.innerHTML = `<X-APRICOT name='Apricot'></X-APRICOT>`
      return raf().then(() => {
        expect(div.textContent).toEqual('[{"name":"Apricot"}]')
      })
    })

    it('tag names will fail to be defined twice (case sensitive)', () => {
      try {
        Remount.define({ 'x-dragonfruit': Greeter })
        Remount.define({ 'x-dragonfruit': Greeter })
        throw new Error('Failed')
      } catch (e) {
        expect(e.message).not.toEqual('Failed')
      }
    })

    it('tag names will fail to be defined twice (case insensitive)', () => {
      try {
        Remount.define({ 'x-currant': Greeter })
        Remount.define({ 'x-CURRANT': Dumper })
        throw new Error('Failed')
      } catch (e) {
        expect(e.message).not.toEqual('Failed')
      }
    })
  })

  describe('Names', () => {
    it('rejects no hyphens', () => {
      try {
        Remount.define({ banana: Greeter })
        throw new Error('Failed')
      } catch (e) {
        expect(e.message).not.toEqual('Failed')
      }
    })

    it('allows numbers', () => {
      Remount.define({ 'element-0': Dumper })
    })

    it('allows multiple hyphens', () => {
      Remount.define({ 'element--element': Dumper })
    })

    it('allows ending with hyphen', () => {
      Remount.define({ 'element-': Dumper })
    })

    it('allows a-', () => {
      Remount.define({ 'a-': Dumper })
    })

    it('rejects starting with number', () => {
      try {
        Remount.define({ '0-element': Greeter })
        throw new Error('Failed')
      } catch (e) {
        expect(e.message).not.toEqual('Failed')
      }
    })

    it('rejects starting with hyphen', () => {
      try {
        Remount.define({ '-element': Greeter })
        throw new Error('Failed')
      } catch (e) {
        expect(e.message).not.toEqual('Failed')
      }
    })
  })

  describe('Quiet mode', () => {
    it('will supress errors', () => {
      Remount.define({
        'x-peach': {
          component: Greeter
        }
      })

      Remount.define({
        'x-peach': {
          component: Greeter,
          quiet: true
        }
      })
    })

    it('can be passed as a second argument', () => {
      Remount.define({
        'x-blueberry': Greeter
      })

      Remount.define(
        {
          'x-blueberry': Greeter
        },
        {
          quiet: true
        }
      )
    })
  })

  describe('Shadow DOM mode', () => {
    // Skip this for now; only Chrome supports this.
    // Polyfilled environments have no way of hiding it from .textContent.
    it.skip('will not be seen by .textContent', () => {
      Remount.define({ 'x-grape': Greeter }, { shadow: true })
      div.innerHTML = `Grape: <x-grape></x-grape>`

      // It's "shadowed" so we can't see it
      expect(!div.textContent.match(/Hello/)).toBeTruthy()
    })

    // Shadow DOM isn't always available
    const hasShadow =
      Remount.getStrategy().name === 'CustomElements' &&
      document.body.attachShadow
    ;(hasShadow ? it : it.skip)('will be seen in .shadowRoot', () => {
      Remount.define({ 'x-orange': Greeter }, { shadow: true })

      div.innerHTML = `Orange: <x-orange></x-orange>`
      const shadowHTML = document.querySelector('x-orange').shadowRoot.innerHTML
      expect(shadowHTML).toMatch(/Hello/)
    })
  })

  describe('Removing', () => {
    it('calls componentWillUnmount', () => {
      let unmounted

      class Removable extends React.Component {
        componentWillUnmount() {
          unmounted = true
        }
        render() {
          // return <span>Hola</span>
          return React.createElement('span', {}, 'Hola')
        }
      }

      return Promise.resolve()
        .then(() => {
          Remount.define({ 'x-watermelon': Removable })
          div.innerHTML = `<x-watermelon></x-watermelon>`
          return raf()
        })
        .then(() => {
          expect(div.textContent.includes('Hola')).toBeTruthy()
          // Disconnect it
          div.removeChild(div.children[0])
          return raf()
        })
        .then(() => {
          // Assert that componentWillUnmount is ran
          expect(unmounted).toEqual(true)
          expect(div.textContent.trim()).toEqual('')
        })
    })

    it('is triggered via reordering (TODO)')
  })

  describe('Updating', () => {
    it('works', () => {
      return Promise.resolve()
        .then(() => {
          Remount.define({ 'x-lemon': Dumper })
          div.innerHTML = `<x-lemon props-json='{"value":123}'></x-lemon>`
          return raf()
        })
        .then(() => {
          expect(div.textContent.trim()).toEqual('[{"value":123}]')
          const el = div.querySelector('x-lemon')
          el.setAttribute('props-json', '{"value":456}')
          return raf()
        })
        .then(() => {
          expect(div.textContent.trim()).toEqual('[{"value":456}]')
        })
    })
  })
})
