/* eslint-env jest, browser */
// import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'
// import '@webcomponents/webcomponentsjs/webcomponents-loader.js'
import { define } from '../index'
import React from 'react'
import ReactDOM from 'react-dom'

const Greeter = ({ name }) => <span>Hello, {name}</span>

const j = val => JSON.stringify(val)

describe('remount', () => {
  beforeAll(() => {
    define({
      'x-greeter': Greeter
    })
  })

  xit('works', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <span>
        <x-greeter props-json={j({ name: 'John' })} />
      </span>,
      div
    )
  })
})
