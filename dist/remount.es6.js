(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom'], factory) :
  (factory((global.Remount = {}),global.React,global.ReactDOM));
}(this, (function (exports,React,ReactDOM) { 'use strict';

  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

  /* global HTMLElement */

  /*
   * Adapted from https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.0.4/custom-elements-es5-adapter.js
   * Rolling this in so we don't need another polyfill.
   */

  function inject () {
    if (
      (window.HTMLElement && window.HTMLElement._babelES5Adapter) ||
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
    HTMLElement._babelES5Adapter = true;
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
  } from '../types'
  */

  const name = 'CustomElements';

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
    if (shadow && element.attachShadow) {
      const mountPoint = document.createElement('span');
      element.attachShadow({ mode: 'open' }).appendChild(mountPoint);
      return mountPoint
    } else {
      return element
    }
  }

  /**
   * Check if Shadow DOM is supported.
   */

  function supportsShadow () {
    return !!(document && document.body && document.body.attachShadow)
  }

  var CustomElementsStrategy = /*#__PURE__*/Object.freeze({
    name: name,
    defineElement: defineElement,
    isSupported: isSupported,
    supportsShadow: supportsShadow
  });

  // @flow
  /*::
  import type {
    ElementSpec,
    ElementEvents
  } from '../types'
  */

  const name$1 = 'MutationObserver';

  // List of observers tags
  const observers = {};

  function isSupported$1 () {
    return !!window.MutationObserver
  }

  /**
   * Defines a custom element.
   *
   * @example
   *     defineElement(
   *       { component: MyComponent },
   *       'my-div',
   *       {
   *         onUpdate: () => {},
   *         onUnmount: () => {},
   *       }
   *     )
   *
   * @private
   */

  function defineElement$1 (
    elSpec /*: ElementSpec */,
    name /*: string */,
    { onUpdate, onUnmount } /*: ElementEvents */
  ) {
    name = name.toLowerCase();

    // Maintain parity with what would happen in Custom Elements mode
    if (!isValidName(name)) {
      if (elSpec.quiet) return
      throw new Error(`Remount: "${name}" is not a valid custom element name`)
    }

    if (observers[name]) {
      if (elSpec.quiet) return
      throw new Error(`Remount: "${name}" is already registered`)
    }

    const observer = new window.MutationObserver(mutations => {
      each(mutations, (mutation /*: { addedNodes: HTMLCollection<*> } */) => {
        each(mutation.addedNodes, (node /*: Element */) => {
          checkForMount(node, name, { onUpdate, onUnmount });
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    observers[name] = true;
  }

  /**
   * Checks if this new element should fire an `onUpdate` hook.
   * Recurses down to its descendant nodes.
   */

  function checkForMount (
    node /*: Element */,
    name /*: string */,
    events /*: ElementEvents */
  ) {
    if (node.nodeName.toLowerCase() === name) {
      // It's a match!
      events.onUpdate(node, node);
      observeForUpdates(node, events);
      observeForRemoval(node, events);
    } else if (node.children && node.children.length) {
      // Recurse down into the other additions
      each(node.children, (subnode /*: Element */) => {
        checkForMount(subnode, name, events);
      });
    }
  }

  /**
   * Observes for any changes in attributes
   */

  function observeForUpdates (
    node /*: Element */,
    { onUpdate } /*: ElementEvents */
  ) {
    const observer = new window.MutationObserver(mutations => {
      each(mutations, (mutation /*: { target: Element } */) => {
        const node = mutation.target;
        onUpdate(node, node);
      });
    });

    observer.observe(node, { attributes: true });
  }

  /**
   * Observes a node's parent to wait until the node is removed
   */

  function observeForRemoval (
    node /*: Element */,
    { onUnmount } /*: ElementEvents */
  ) {
    const parent = node.parentNode;

    const observer = new window.MutationObserver(mutations => {
      each(mutations, (mutation /*: { removedNodes: HTMLCollection<*> } */) => {
        each(mutation.removedNodes, (subnode /*: Element */) => {
          if (node !== subnode) return
          observer.disconnect(parent);
          onUnmount(node, node);
        });
      });
    });

    observer.observe(parent, { childList: true, subtree: true });
  }

  /**
   * Some implementations of MutationObserver don't have .forEach,
   * so we need our own `forEach` shim. This is usually the case with
   * polyfilled environments.
   *
   * @private
   */

  function each /*:: <Item> */(
    list /*: Array<Item> | HTMLCollection<*> */,
    fn /*: Item => any */
  ) {
    for (let i = 0, len = list.length; i < len; i++) {
      fn(list[i]);
    }
  }

  /**
   * Validate a custom tag.
   *
   * Since Remount can work with either Custom Elements or MutationObserver API's,
   * it'd be wise if we rejected element names that won't work in Custom Elements
   * mode (even if we're using MutationObserver mode).
   *
   * @example
   *     isValidName('div')      // => false
   *     isValidName('my-div')   // => true
   *     isValidName('123-456')  // => false
   *     isValidName('my-123')   // => true
   *
   * @private
   */

  function isValidName (name /*: string */) /*: boolean */ {
    return !!(name.indexOf('-') !== -1 && name.match(/^[a-z][a-z0-9-]*$/))
  }

  /**
   * Shadow DOM is not supported with the Mutation Observer strategy.
   */

  function supportsShadow$1 () {
    return false
  }

  var MutationObserverStrategy = /*#__PURE__*/Object.freeze({
    name: name$1,
    observers: observers,
    isSupported: isSupported$1,
    defineElement: defineElement$1,
    supportsShadow: supportsShadow$1
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

  function unmount (_ /*: ElementSpec */, mountPoint /*: Element */) {
    ReactDOM.unmountComponentAtNode(mountPoint);
  }

  var ReactAdapter = /*#__PURE__*/Object.freeze({
    update: update,
    unmount: unmount
  });

  // @flow

  /*::
  import type {
    Adapter,
    Component,
    Defaults,
    ElementMap,
    ElementSpec,
    PropertyMap
  } from './lib/types'
  */

  /**
   * Detect what API can be used.
   *
   * @example
   *     Remount.getStrategy().name
   */

  function getStrategy () {
    // $FlowFixMe$ obviously
    if (getStrategy._result !== undefined) {
      return getStrategy._result
    }

    const Strategy = [CustomElementsStrategy, MutationObserverStrategy].reduce(
      (result, strat) => {
        return result || (strat.isSupported() && strat)
      },
      null
    );

    if (!Strategy) {
      console.warn(
        "Remount: This browser doesn't support the " +
          'MutationObserver API or the Custom Elements API. Including ' +
          'polyfills might fix this. Remount elements will not work. ' +
          'https://github.com/rstacruz/remount'
      );
    }

    getStrategy._result = Strategy;
    return Strategy
  }

  /**
   * Registers custom elements and links them to React components.
   *
   * @example
   *     define({ 'x-tooltip': Tooltip })
   *
   * @example
   *     define(
   *       { 'x-tooltip': Tooltip },
   *       { attributes: ['title', 'body'] }
   *     )
   */

  function define (
    components /*: ElementMap */,
    defaults /*: ?Defaults */
  ) {
    const Strategy = getStrategy();
    if (!Strategy) return

    Object.keys(components).forEach((name$$1 /*: string */) => {
      // Construct the specs for the element.
      // (eg, { component: Tooltip, attributes: ['title'] })
      const elSpec /*: ElementSpec */ = Object.assign(
        {},
        defaults,
        toElementSpec(components[name$$1])
      );

      const adapter /*: Adapter */ = elSpec.adapter || ReactAdapter;

      // Define a custom element.
      Strategy.defineElement(elSpec, name$$1, {
        onUpdate (element /*: Element */, mountPoint /*: Element */) {
          const props = getProps(element, elSpec.attributes);
          adapter.update(elSpec, mountPoint, props);
        },

        onUnmount (element /*: Element */, mountPoint /*: Element */) {
          adapter.unmount(elSpec, mountPoint);
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

    const names = attributes || [];
    return names.reduce((result /*: PropertyMap */, attribute /*: string */) => {
      result[attribute] = element.getAttribute(attribute);
      return result
    }, {})
  }

  exports.getStrategy = getStrategy;
  exports.define = define;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
