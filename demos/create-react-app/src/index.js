import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { define } from 'remount'

ReactDOM.render(<App />, document.getElementById('root'))

define({
  'x-hello': () => {
    return <div>Hello from Remount :)</div>
  }
})
