/** @jest-environment jsdom */
import { raf } from './utils'

const Dumper = props => {
  return <span className='dumper'>[{JSON.stringify(props)}]</span>
}

describe('Appearance', () => {
  let div

  beforeEach(() => {
    div = document.createElement('div')
    root.appendChild(div)
  })

  afterEach(() => {
    if (!IS_DEBUG) root.removeChild(div)
  })

  beforeAll(() => {
    Remount.define({ 'x-white': Dumper }, { attributes: ['value'] })
  })

  describe('via innerHTML', () => {
    it('works with 1 appearance', () => {
      div.innerHTML = '<x-white value="abc"></x-white>'

      return raf().then(() => {
        expect(div.textContent).toEqual('[{"value":"abc"}]')
      })
    })

    it('works in a deep appearance (inline)', () => {
      div.innerHTML = '<span><x-white value="ABC"></x-white></span>'

      return raf().then(() => {
        expect(div.textContent).toEqual('[{"value":"ABC"}]')
      })
    })

    it('works in a deep appearance (block)', () => {
      div.innerHTML = '<p><x-white value="abcd"></x-white></p>'

      return raf().then(() => {
        expect(div.textContent).toEqual('[{"value":"abcd"}]')
      })
    })

    it('works with 2 appearances', () => {
      div.innerHTML = `
        <x-white value="def"></x-white><x-white value="ghi"></x-white>
      `

      return raf().then(() => {
        expect(div.textContent.trim()).toEqual('[{"value":"def"}][{"value":"ghi"}]')
      })
    })

    it('works with 2 appearances (deep)', () => {
      div.innerHTML = `
        <p><x-white value="def"></x-white><span><x-white value="ghi"></x-white></span></p>
      `

      return raf().then(() => {
        expect(div.textContent.trim()).toEqual('[{"value":"def"}][{"value":"ghi"}]')
      })
    })
  })

  describe('via appendChild', () => {
    it('works with 1 appearance', () => {
      const el = document.createElement('x-white')
      el.setAttribute('value', 'abc')
      div.appendChild(el)

      return raf().then(() => {
        expect(div.textContent).toEqual('[{"value":"abc"}]')
      })
    })

    it('via with deep appearance (container first)', () => {
      const el = document.createElement('x-white')
      el.setAttribute('value', 'def')

      const container = document.createElement('span')

      container.appendChild(el)
      div.appendChild(container)

      return raf().then(() => {
        expect(div.textContent).toEqual('[{"value":"def"}]')
      })
    })

    it('via with deep appearance (late append)', () => {
      const el = document.createElement('x-white')
      el.setAttribute('value', 'ghi')

      const container = document.createElement('span')

      div.appendChild(container)
      container.appendChild(el)

      return raf().then(() => {
        expect(div.textContent).toEqual('[{"value":"ghi"}]')
      })
    })
  })
})
