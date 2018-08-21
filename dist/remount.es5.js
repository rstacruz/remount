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

  function inject() {
    if (window.HTMLElement && window.HTMLElement._babelES5Adapter || void 0 === window.Reflect || void 0 === window.customElements || window.customElements.hasOwnProperty('polyfillWrapFlushCallback')) {
      return;
    }
    var a = HTMLElement;

    window.HTMLElement = function () {
      return Reflect.construct(a, [], this.constructor);
    };

    HTMLElement.prototype = a.prototype;
    HTMLElement.prototype.constructor = HTMLElement;
    Object.setPrototypeOf(HTMLElement, a);
    HTMLElement._babelES5Adapter = true;
  }

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

  var name = 'CustomElements';

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

  function defineElement(elSpec /*: ElementSpec */
  , name /*: string */
  , _ref /*: ElementEvents */
  ) {
    var onUpdate = _ref.onUpdate,
        onUnmount = _ref.onUnmount;

    inject();
    var attributes = elSpec.attributes || [];

    var ComponentElement = function (_window$HTMLElement) {
      _inherits(ComponentElement, _window$HTMLElement);

      function ComponentElement() {
        _classCallCheck(this, ComponentElement);

        return _possibleConstructorReturn(this, (ComponentElement.__proto__ || Object.getPrototypeOf(ComponentElement)).apply(this, arguments));
      }

      _createClass(ComponentElement, [{
        key: 'connectedCallback',
        value: function connectedCallback() {
          this._mountPoint = createMountPoint(this, elSpec);
          onUpdate(this, this._mountPoint);
        }
      }, {
        key: 'disconnectedCallback',
        value: function disconnectedCallback() {
          if (!this._mountPoint) return;
          onUnmount(this, this._mountPoint);
        }
      }, {
        key: 'attributeChangedCallback',
        value: function attributeChangedCallback() {
          if (!this._mountPoint) return;
          onUpdate(this, this._mountPoint);
        }
      }], [{
        key: 'observedAttributes',
        get: function get() {
          return ['props-json'].concat(_toConsumableArray(attributes));
        }
      }]);

      return ComponentElement;
    }(window.HTMLElement);

    // Supress warning when quiet mode is on


    if (elSpec.quiet && window.customElements.get(name)) {
      return;
    }

    window.customElements.define(name, ComponentElement);
  }

  function isSupported() {
    return window.customElements && window.customElements.define;
  }

  /**
   * Creates a `<span>` element that serves as the mounting point for React
   * components. If `shadow: true` is requested, it'll attach a shadow node.
   * @private
   */

  function createMountPoint(element /*: Element */
  , _ref2 /*: ElementSpec */
  ) {
    var shadow = _ref2.shadow;

    if (shadow && element.attachShadow) {
      var mountPoint = document.createElement('span');
      element.attachShadow({ mode: 'open' }).appendChild(mountPoint);
      return mountPoint;
    } else {
      return element;
    }
  }

  /**
   * Check if Shadow DOM is supported.
   */

  function supportsShadow() {
    return !!(document && document.body && document.body.attachShadow);
  }

  var CustomElementsStrategy = /*#__PURE__*/Object.freeze({
    name: name,
    defineElement: defineElement,
    isSupported: isSupported,
    supportsShadow: supportsShadow
  });

  /*::
  import type {
    ElementSpec,
    ElementEvents
  } from '../types'
  */

  var name$1 = 'MutationObserver';

  // List of observers tags
  var observers = {};

  function isSupported$1() {
    return !!window.MutationObserver;
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

  function defineElement$1(elSpec /*: ElementSpec */
  , name /*: string */
  , _ref /*: ElementEvents */
  ) {
    var onUpdate = _ref.onUpdate,
        onUnmount = _ref.onUnmount;

    name = name.toLowerCase();

    // Maintain parity with what would happen in Custom Elements mode
    if (!isValidName(name)) {
      if (elSpec.quiet) return;
      throw new Error('Remount: "' + name + '" is not a valid custom element name');
    }

    if (observers[name]) {
      if (elSpec.quiet) return;
      throw new Error('Remount: "' + name + '" is already registered');
    }

    var observer = new window.MutationObserver(function (mutations) {
      each(mutations, function (mutation /*: { addedNodes: HTMLCollection<*> } */) {
        each(mutation.addedNodes, function (node /*: Element */) {
          checkForMount(node, name, { onUpdate: onUpdate, onUnmount: onUnmount });
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

  function checkForMount(node /*: Element */
  , name /*: string */
  , events /*: ElementEvents */
  ) {
    if (node.nodeName.toLowerCase() === name) {
      // It's a match!
      events.onUpdate(node, node);
      observeForUpdates(node, events);
      observeForRemoval(node, events);
    } else if (node.children && node.children.length) {
      // Recurse down into the other additions
      each(node.children, function (subnode /*: Element */) {
        checkForMount(subnode, name, events);
      });
    }
  }

  /**
   * Observes for any changes in attributes
   */

  function observeForUpdates(node /*: Element */
  , _ref2 /*: ElementEvents */
  ) {
    var onUpdate = _ref2.onUpdate;

    var observer = new window.MutationObserver(function (mutations) {
      each(mutations, function (mutation /*: { target: Element } */) {
        var node = mutation.target;
        onUpdate(node, node);
      });
    });

    observer.observe(node, { attributes: true });
  }

  /**
   * Observes a node's parent to wait until the node is removed
   */

  function observeForRemoval(node /*: Element */
  , _ref3 /*: ElementEvents */
  ) {
    var onUnmount = _ref3.onUnmount;

    var parent = node.parentNode;

    var observer = new window.MutationObserver(function (mutations) {
      each(mutations, function (mutation /*: { removedNodes: HTMLCollection<*> } */) {
        each(mutation.removedNodes, function (subnode /*: Element */) {
          if (node !== subnode) return;
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

  function each /*:: <Item> */(list /*: Array<Item> | HTMLCollection<*> */
  , fn /*: Item => any */
  ) {
    for (var i = 0, len = list.length; i < len; i++) {
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

  function isValidName(name /*: string */) /*: boolean */{
    return !!(name.indexOf('-') !== -1 && name.match(/^[a-z][a-z0-9-]*$/));
  }

  /**
   * Shadow DOM is not supported with the Mutation Observer strategy.
   */

  function supportsShadow$1() {
    return false;
  }

  var MutationObserverStrategy = /*#__PURE__*/Object.freeze({
    name: name$1,
    observers: observers,
    isSupported: isSupported$1,
    defineElement: defineElement$1,
    supportsShadow: supportsShadow$1
  });

  /*::
  import type { ElementSpec } from './types'
  */

  /**
   * Updates a custom element by calling `ReactDOM.render()`.
   * @private
   */

  function update(_ref /*: ElementSpec */
  , mountPoint /*: Element */
  , props /*: {} */
  ) {
    var component = _ref.component,
        attributes = _ref.attributes;

    var reactElement = React.createElement(component, props);
    ReactDOM.render(reactElement, mountPoint);
  }

  /**
   * Unmounts a component.
   * @private
   */

  function unmount(_ /*: ElementSpec */, mountPoint /*: Element */) {
    ReactDOM.unmountComponentAtNode(mountPoint);
  }

  var ReactAdapter = /*#__PURE__*/Object.freeze({
    update: update,
    unmount: unmount
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

  function getStrategy() {
    // $FlowFixMe$ obviously
    if (getStrategy._result !== undefined) {
      return getStrategy._result;
    }

    var Strategy = [CustomElementsStrategy, MutationObserverStrategy].reduce(function (result, strat) {
      return result || strat.isSupported() && strat;
    }, null);

    if (!Strategy) {
      console.warn("Remount: This browser doesn't support the " + 'MutationObserver API or the Custom Elements API. Including ' + 'polyfills might fix this. Remount elements will not work. ' + 'https://github.com/rstacruz/remount');
    }

    getStrategy._result = Strategy;
    return Strategy;
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

  function define(components /*: ElementMap */
  , defaults /*: ?Defaults */
  ) {
    var Strategy = getStrategy();
    if (!Strategy) return;

    Object.keys(components).forEach(function (name$$1 /*: string */) {
      // Construct the specs for the element.
      // (eg, { component: Tooltip, attributes: ['title'] })
      var elSpec /*: ElementSpec */ = Object.assign({}, defaults, toElementSpec(components[name$$1]));

      var adapter /*: Adapter */ = elSpec.adapter || ReactAdapter;

      // Define a custom element.
      Strategy.defineElement(elSpec, name$$1, {
        onUpdate: function onUpdate(element /*: Element */, mountPoint /*: Element */) {
          var props = getProps(element, elSpec.attributes);
          adapter.update(elSpec, mountPoint, props);
        },
        onUnmount: function onUnmount(element /*: Element */, mountPoint /*: Element */) {
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

  function toElementSpec(thing /*: ElementSpec | Component */
  ) /*: ElementSpec */{
    // $FlowFixMe$
    if ((typeof thing === 'undefined' ? 'undefined' : _typeof(thing)) === 'object' && thing.component) return thing;
    return { component: thing };
  }

  /**
   * Returns properties for a given HTML element.
   * @private
   *
   * @example
   *     getProps(div, ['name'])
   *     // => { name: 'Romeo' }
   */

  function getProps(element /*: Element */, attributes /*: ?Array<string> */) {
    var rawJson = element.getAttribute('props-json');
    if (rawJson) return JSON.parse(rawJson);

    var names = attributes || [];
    return names.reduce(function (result /*: PropertyMap */, attribute /*: string */) {
      result[attribute] = element.getAttribute(attribute);
      return result;
    }, {});
  }

  exports.getStrategy = getStrategy;
  exports.define = define;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
