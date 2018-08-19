(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom'], factory) :
  (factory((global.Remount = {}),global.React,global.ReactDOM));
}(this, (function (exports,React,ReactDOM) { 'use strict';

  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

  /* global HTMLElement */

  let injected;

  /*
   * Adapted from https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.0.4/custom-elements-es5-adapter.js
   * Rolling this in so we don't need another polyfill.
   */

  function inject () {
    if (
      injected ||
      void 0 === window.Reflect ||
      void 0 === window.customElements ||
      window.customElements.hasOwnProperty('polyfillWrapFlushCallback')
    ) {
      return
    }
    const a = HTMLElement;

    window.HTMLElement = function () {
      return Reflect.construct(a, [], this.constructor)
    };

    HTMLElement.prototype = a.prototype;
    HTMLElement.prototype.constructor = HTMLElement;
    Object.setPrototypeOf(HTMLElement, a);
    injected = true;
  }

  // @flow

  /*::
  import type {
    Component,
    PropertyMap,
    ElementMap,
    Defaults,
    ElementSpec,
    ReactAdapter,
    ElementEvents
  } from './types'
  */

  /**
   * Registers a custom element.
   *
   * This creates a custom element (ie, a subclass of `window.HTMLElement`) and
   * registers it (ie, `window.customElements.define`).
   *
   * Events will be triggered when something interesting happens.
   *
   * @example
   *     defineElement(
   *       { component: Tooltip },
   *       'x-tooltip',
   *       { onUpdate, onUnmount }
   *     )
   *
   * @private
   */

  function defineElement (
    elSpec /*: ElementSpec */,
    name /*: string */,
    { onUpdate, onUnmount } /*: ElementEvents */
  ) {
    inject();
    const attributes = elSpec.attributes || [];

    class ComponentElement extends window.HTMLElement {
      static get observedAttributes () {
        return ['props-json', ...attributes]
      }

      connectedCallback () {
        this._mountPoint = createMountPoint(this, elSpec);
        onUpdate(this, this._mountPoint);
      }

      disconnectedCallback () {
        if (!this._mountPoint) return
        onUnmount(this, this._mountPoint);
      }

      attributeChangedCallback () {
        if (!this._mountPoint) return
        onUpdate(this, this._mountPoint);
      }
    }

    // Supress warning when quiet mode is on
    if (elSpec.quiet && window.customElements.get(name)) {
      return
    }

    window.customElements.define(name, ComponentElement);
  }

  function isSupported () {
    return window.customElements && window.customElements.define
  }

  /**
   * Creates a `<span>` element that serves as the mounting point for React
   * components. If `shadow: true` is requested, it'll attach a shadow node.
   * @private
   */

  function createMountPoint (
    element /*: Element */,
    { shadow } /*: ElementSpec */
  ) {
    if (shadow) {
      const mountPoint = document.createElement('span');
      element.attachShadow({ mode: 'open' }).appendChild(mountPoint);
      return mountPoint
    } else {
      return element
    }
  }

  const name = 'CustomElements';

  var ElementsAdapter = /*#__PURE__*/Object.freeze({
    defineElement: defineElement,
    isSupported: isSupported,
    name: name
  });

  function isSupported$1 () {
    return !!window.MutationObserver
  }

  function defineElement$1 (elSpec, name, { onUpdate, onUnmount }) {
    name = name.toLowerCase();

    const observer = new window.MutationObserver(mutations => {
      each(mutations, mutation => {
        each(mutation.addedNodes, node => {
          if (node.nodeName.toLowerCase() !== name) return
          onUpdate(node, node);
        });

        // todo handle update

        each(mutation.removedNodes, node => {
          if (node.nodeName.toLowerCase() !== name) return
          onUnmount(node, node);
        });
      });
    });

    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true
    });
  }

  /**
   * Some implementations of MutationObserver don't have .forEach,
   * so we need our own `forEach` shim. This is usually the case with
   * polyfilled environments.
   *
   * @private
   */

  function each (list, fn) {
    for (let i = 0, len = list.length; i < len; i++) {
      fn(list[i]);
    }
  }

  const name$1 = 'MutationObserver';

  var MutationAdapter = /*#__PURE__*/Object.freeze({
    isSupported: isSupported$1,
    defineElement: defineElement$1,
    name: name$1
  });

  // @flow

  /*::
  import type { ElementSpec } from './types'
  */

  /**
   * Updates a custom element by calling `ReactDOM.render()`.
   * @private
   */

  function update (
    { component, attributes } /*: ElementSpec */,
    mountPoint /*: Element */,
    props /*: {} */
  ) {
    const reactElement = React.createElement(component, props);
    ReactDOM.render(reactElement, mountPoint);
  }

  /**
   * Unmounts a component.
   * @private
   */

  function unmount (_ /*: any */, mountPoint /*: Element */) {
    ReactDOM.unmountComponentAtNode(mountPoint);
  }

  // @flow

  /*::
  import type {
    Component,
    PropertyMap,
    ElementMap,
    Defaults,
    ElementSpec
  } from './lib/types'
  */

  const Adapter = isSupported()
    ? ElementsAdapter
    : isSupported$1()
      ? MutationAdapter
      : null;

  if (!Adapter) {
    throw new Error('Unsupported platform')
  } else {
    console.log('Remount: using adapter', Adapter.name);
  }

  /**
   * Inspect `Remount.adapterName` to see what adapter's being used.
   */

  const adapterName = Adapter.name;

  /**
   * Registers elements.
   */

  function define (
    components /*: ElementMap */,
    defaults /*: ?Defaults */
  ) {
    Object.keys(components).forEach((name$$1 /*: string */) => {
      // Construct the specs for the element.
      // (eg, { component: Tooltip, attributes: ['title'] })
      const elSpec /*: ElementSpec */ = Object.assign(
        {},
        defaults,
        toElementSpec(components[name$$1])
      );

      // Define a custom element.
      Adapter.defineElement(elSpec, name$$1, {
        onUpdate (element /*: Element */, mountPoint /*: Element */) {
          const props = getProps(element, elSpec.attributes);
          update(elSpec, mountPoint, props);
        },

        onUnmount (element /*: Element */, mountPoint /*: Element */) {
          unmount(elSpec, mountPoint);
        }
      });
    });
  }

  /**
   * Coerces something into an `ElementSpec` type.
   * @private
   *
   * @example
   *     toElementSpec(Tooltip)
   *     // => { component: Tooltip }
   *
   *     toElementSpec({ component: Tooltip })
   *     // => { component: Tooltip }
   */

  function toElementSpec (
    thing /*: ElementSpec | Component */
  ) /*: ElementSpec */ {
    // $FlowFixMe$
    if (typeof thing === 'object' && thing.component) return thing
    return { component: thing }
  }

  /**
   * Returns properties for a given HTML element.
   * @private
   *
   * @example
   *     getProps(div, ['name'])
   *     // => { name: 'Romeo' }
   */

  function getProps (element /*: Element */, attributes /*: ?Array<string> */) {
    const rawJson = element.getAttribute('props-json');
    if (rawJson) return JSON.parse(rawJson)

    const names /*: Array<string> */ = attributes || [];
    return names.reduce((result /*: PropertyMap */, attribute /*: string */) => {
      result[attribute] = element.getAttribute(attribute);
      return result
    }, {})
  }

  exports.adapterName = adapterName;
  exports.define = define;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
