/** @jest-environment jsdom */
import { raf } from './utils'

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

    const root = ReactDOM.createRoot(div)
    root.render(<Outer />)

    return raf().then(() => {
      expect(div.textContent).toEqual('OutsideInsideHello')
    })
  })
})
