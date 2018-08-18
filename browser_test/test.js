/* eslint-env mocha */
/* global React, Remount */
'use strict'

const h = React.createElement

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
      } catch (e) {
        assert(e.message)
      }
    })
  })
})
