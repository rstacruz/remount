/* eslint-env jest, browser */
import { define } from '../index'
import React from 'react'
import ReactDOM from 'react-dom'

describe('remount', () => {
  it('works', () => {
    const div = document.createElement('div')
    ReactDOM.render(<span>hi</span>, div)
  })
})
