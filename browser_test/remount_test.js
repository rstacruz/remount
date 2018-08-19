/* eslint-env mocha */
import { assert, React, Remount, IS_DEBUG, raf, root } from './setup'

const Greeter = ({ name }) => {
  return <span className='greeter'>Hello {name || '(unknown)'}!</span>
}

const Dumper = props => {
  return <span className='dumper'>[{JSON.stringify(props)}]</span>
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
        assert(div.textContent.match(/Hello John/))
      })
    })

    it('ignores other props', () => {
      Remount.define({ 'x-blue': Greeter })
      div.innerHTML = `<x-blue name='Alice'></x-blue>`
      return raf().then(() => {
        assert(div.textContent.match(/Hello \(unknown\)/))
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
        assert(div.textContent.match(/Hello Apple/))
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
        assert(div.textContent === '[{"name":"Banana"}]')
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
        assert(div.textContent === '[{"name":"Cherry"}]')
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
        assert(div.textContent === '[{"name":""}]')
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
        assert(div.textContent === '[{"name":""}]')
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
        assert(div.textContent === '[{"name":"Apricot"}]')
      })
    })

    it('tag names will fail to be defined twice (case sensitive)', () => {
      try {
        Remount.define({ 'x-dragonfruit': Greeter })
        Remount.define({ 'x-dragonfruit': Greeter })
        throw new Error('Failed')
      } catch (e) {
        assert(e.message !== 'Failed')
      }
    })

    it('tag names will fail to be defined twice (case insensitive)', () => {
      try {
        Remount.define({ 'x-currant': Greeter })
        Remount.define({ 'x-CURRANT': Dumper })
        assert('Failed')
      } catch (e) {
        assert(e.message !== 'Failed')
      }
    })
  })

  describe('Names', () => {
    it('rejects no hyphens', () => {
      try {
        Remount.define({ banana: Greeter })
        throw new Error('Failed')
      } catch (e) {
        assert(e.message !== 'Failed')
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
        assert(e.message !== 'Failed')
      }
    })

    it('rejects starting with hyphen', () => {
      try {
        Remount.define({ '-element': Greeter })
        throw new Error('Failed')
      } catch (e) {
        assert(e.message !== 'Failed')
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
      assert(!div.textContent.match(/Hello/))
    })
    ;(Remount.adapterName === 'CustomElements' ? it : it.skip)(
      'will be seen in .shadowRoot',
      () => {
        Remount.define({ 'x-orange': Greeter }, { shadow: true })

        div.innerHTML = `Orange: <x-orange></x-orange>`
        const shadowHTML = document.querySelector('x-orange').shadowRoot
          .innerHTML
        assert(shadowHTML.match(/Hello/))
      }
    )
  })

  describe('Removing', () => {
    it('calls componentWillUnmount', () => {
      let unmounted

      class Removable extends React.Component {
        componentWillUnmount () {
          unmounted = true
        }
        render () {
          return <span>Hola</span>
        }
      }

      return Promise.resolve()
        .then(() => {
          Remount.define({ 'x-watermelon': Removable })
          div.innerHTML = `<x-watermelon></x-watermelon>`
          return raf()
        })
        .then(() => {
          assert(div.textContent.includes('Hola'))
          // Disconnect it
          div.removeChild(div.children[0])
          return raf()
        })
        .then(() => {
          // Assert that componentWillUnmount is ran
          assert(unmounted === true)
          assert(div.textContent.trim() === '')
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
          assert(div.textContent.trim() === '[{"value":123}]')
          const el = div.querySelector('x-lemon')
          el.setAttribute('props-json', '{"value":456}')
          return raf()
        })
        .then(() => {
          assert(div.textContent.trim() === '[{"value":456}]')
        })
    })
  })
})
