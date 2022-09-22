/* eslint-env mocha */
import { assert, raf } from './utils'

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
      return (
        <span>
          Inside
          {name}
        </span>
      )
    }

    Remount.define({ 'x-mauve': Inner }, { attributes: ['name'] })

    const Outer = () => {
      return (
        <blockquote>
          <span>Outside</span>
          <x-mauve name={'Hello'} />
        </blockquote>
      )
    }

    ReactDOM.render(<Outer />, div)

    return raf().then(() => {
      assert.equal(div.textContent, 'OutsideInsideHello')
    })
  })
})
