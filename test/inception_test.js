/* eslint-env mocha */
import { React, ReactDOM, Remount, root, raf, IS_DEBUG } from './setup.js'

describe('Inception mode', () => {
  let div

  beforeEach(() => {
    div = document.createElement('div')
    root.appendChild(div)
  })

  afterEach(() => {
    if (!IS_DEBUG) root.removeChild(div)
  })

  it('works', () => {
    const Inner = ({ name }) => {
      // return <span>Inside{name}</span>
      return React.createElement('span', {}, 'Inside', name)
    }

    Remount.define({ 'x-mauve': Inner }, { attributes: ['name'] })

    const Outer = () => {
      // return (
      //   <blockquote>
      //     <span>Outside</span>
      //     <x-mauve name={'Hello'} />
      //   </blockquote>
      // )
      return React.createElement(
        'blockquote',
        {},
        React.createElement('span', {}, 'Outside'),
        React.createElement('x-mauve', { name: 'Hello' })
      )
    }

    // ReactDOM.render(<Outer />, div)
    ReactDOM.render(React.createElement(Outer), div)

    return raf().then(() => {
      expect(div.textContent).toEqual('OutsideInsideHello')
    })
  })
})
