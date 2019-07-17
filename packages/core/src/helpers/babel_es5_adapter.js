/* global HTMLElement */

/*
 * Adapted from https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.0.4/custom-elements-es5-adapter.js
 * Rolling this in so we don't need another polyfill.
 */

export function inject() {
  if (
    (window.HTMLElement && window.HTMLElement._babelES5Adapter) ||
    void 0 === window.Reflect ||
    void 0 === window.customElements ||
    window.customElements.hasOwnProperty('polyfillWrapFlushCallback')
  ) {
    return
  }
  const a = HTMLElement

  window.HTMLElement = function() {
    return Reflect.construct(a, [], this.constructor)
  }

  HTMLElement.prototype = a.prototype
  HTMLElement.prototype.constructor = HTMLElement
  Object.setPrototypeOf(HTMLElement, a)
  HTMLElement._babelES5Adapter = true
}
