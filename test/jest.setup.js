import * as Remount from '../src/index.js'
import React from 'react'
import ReactDOM from 'react-dom/client'

global.Remount = Remount
global.React = React
global.ReactDOM = ReactDOM
global.IS_DEBUG = false

beforeEach(() => {
  const root = document.createElement('div')
  document.body.appendChild(root)
  global.root = root
})

afterEach(() => {
  document.body.removeChild(root)
})
