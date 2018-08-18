/* eslint-env mocha */
/* global React, Remount */
'use strict'

const root = document.getElementById('debug')
if (window.location.hash === '#debug') root.classList.add('-visible')

const Greeter = ({ name }) => {
  return <span className='greeter'>Hello {name || '(unknown)'}!</span>
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
          component: Greeter,
          attributes: ['name']
        }
      })

      div.innerHTML = `<x-banana name='Banana'></x-banana>`
      assert(div.textContent.match(/Hello Banana/))
    })

    it('attribute names are case insensitive', () => {
      Remount.define({
        'x-cherry': {
          component: Greeter,
          attributes: ['name']
        }
      })

      div.innerHTML = `<x-cherry NAME='Cherry'></x-cherry>`
      assert(div.textContent.match(/Hello Cherry/))
    })

    it('tag names are case insensitive', () => {
      Remount.define({
        'x-apricot': {
          component: Greeter,
          attributes: ['name']
        }
      })

      div.innerHTML = `<X-APRICOT name='Apricot'></X-APRICOT>`
      assert(div.textContent.match(/Hello Apricot/))
    })

    it('rejects bad component names', () => {
      try {
        Remount.define({
          banana: Greeter
        })
        assert('Failed')
      } catch (e) {
        assert(e.message !== 'Failed')
      }
    })

    it('tag names will fail to be defined twice', () => {
      try {
        Remount.define({
          'x-dragonfruit': Greeter
        })

        Remount.define({
          'x-dragonfruit': Greeter
        })

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

      Remount.define({
        'x-blueberry': Greeter
      }, {
        quiet: true
      })
    })
  })
})
