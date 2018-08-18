/* eslint-env mocha */
/* global React, Remount */
'use strict'

const root = document.getElementById('debug')
if (window.location.hash === '#debug') root.classList.add('-visible')

const Greeter = ({ name }) => {
  return <span className='greeter'>Hello {name || '(unknown)'}!</span>
}

const Dumper = props => {
  return <span className='dumper'>[{JSON.stringify(props)}]</span>
}

Remount.define({
  'x-greeter': Greeter
})

function assert (value) {
  if (!value) throw new Error('Assertion failed')
}

after(() => {
  const div = document.createElement('div')
  div.id = 'finish'
  document.body.appendChild(div)
})

describe('Remount', () => {
  let div

  beforeEach(() => {
    div = document.createElement('div')
    root.appendChild(div)
  })

  afterEach(() => {
    if (window.location.hash === '#debug') return
    root.removeChild(div)
  })

  describe('Basic tests', () => {
    it('works', () => {
      div.innerHTML = `<x-greeter props-json='{"name":"John"}'></x-greeter>`
      assert(div.textContent.match(/Hello John/))
    })

    it('ignores other props', () => {
      div.innerHTML = `<x-greeter name='Alice'></x-greeter>`
      assert(div.textContent.match(/Hello \(unknown\)/))
    })
  })

  describe('Remount.define()', () => {
    it('accepts { component }', () => {
      Remount.define({
        'x-apple': {
          component: Greeter
        }
      })

      div.innerHTML = `<x-apple props-json='{"name":"Apple"}'></x-apple>`
      assert(div.textContent.match(/Hello Apple/))
    })

    it('accepts { component, attributes }', () => {
      Remount.define({
        'x-banana': {
          component: Dumper,
          attributes: ['name']
        }
      })

      div.innerHTML = `<x-banana name='Banana'></x-banana>`
      assert(div.textContent === '[{"name":"Banana"}]')
    })

    it('attribute names are case insensitive', () => {
      Remount.define({
        'x-cherry': {
          component: Dumper,
          attributes: ['name']
        }
      })

      div.innerHTML = `<x-cherry NAME='Cherry'></x-cherry>`
      assert(div.textContent === '[{"name":"Cherry"}]')
    })

    it('support blank string values', () => {
      Remount.define({
        'x-guava': {
          component: Dumper,
          attributes: ['name']
        }
      })

      div.innerHTML = `<x-guava name=''></x-guava>`
      assert(div.textContent === '[{"name":""}]')
    })

    it('empty values become empty strings', () => {
      Remount.define({
        'x-melon': {
          component: Dumper,
          attributes: ['name']
        }
      })

      div.innerHTML = `<x-melon name></x-melon>`
      assert(div.textContent === '[{"name":""}]')
    })

    it('tag names are case insensitive', () => {
      Remount.define({
        'x-apricot': {
          component: Dumper,
          attributes: ['name']
        }
      })

      div.innerHTML = `<X-APRICOT name='Apricot'></X-APRICOT>`
      assert(div.textContent === '[{"name":"Apricot"}]')
    })

    it('rejects bad component names', () => {
      try {
        Remount.define({ banana: Greeter })
        assert('Failed')
      } catch (e) {
        assert(e.message !== 'Failed')
      }
    })

    it('tag names will fail to be defined twice (case sensitive)', () => {
      try {
        Remount.define({ 'x-dragonfruit': Greeter })
        Remount.define({ 'x-dragonfruit': Greeter })
        assert('Failed')
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

    it('will be seen in .shadowRoot', () => {
      Remount.define({ 'x-orange': Greeter }, { shadow: true })

      div.innerHTML = `Orange: <x-orange></x-orange>`
      const shadowHTML = document.querySelector('x-orange').shadowRoot.innerHTML
      assert(shadowHTML.match(/Hello/))
    })
  })

  describe('removing', () => {
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
  })
})

// TODO: test disconnection
// TODO: test moving components
// TODO: test failed json
// TODO: test wrong parameter types

/*
 * Helper: defers until next animation frame
 */

function raf () {
  return new Promise((resolve, reject) => {
    window.requestAnimationFrame(() => {
      resolve()
    })
  })
}
