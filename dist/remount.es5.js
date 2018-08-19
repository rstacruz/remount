(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom'], factory) :
  (factory((global.Remount = {}),global.React,global.ReactDOM));
}(this, (function (exports,React,ReactDOM) { 'use strict';

  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

  /* global HTMLElement */

  var injected = void 0;

  /*
   * Adapted from https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.0.4/custom-elements-es5-adapter.js
   * Rolling this in so we don't need another polyfill.
   */

  function inject() {
    if (injected || void 0 === window.Reflect || void 0 === window.customElements || window.customElements.hasOwnProperty('polyfillWrapFlushCallback')) {
      return;
    }
    var a = HTMLElement;

    window.HTMLElement = function () {
      return Reflect.construct(a, [], this.constructor);
    };

    HTMLElement.prototype = a.prototype;
    HTMLElement.prototype.constructor = HTMLElement;
    Object.setPrototypeOf(HTMLElement, a);
    injected = true;
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

    if (shadow) {
      var mountPoint = document.createElement('span');
      element.attachShadow({ mode: 'open' }).appendChild(mountPoint);
      return mountPoint;
    } else {
      return element;
    }
  }

  var name = 'CustomElements';

  var ElementsAdapter = /*#__PURE__*/Object.freeze({
    defineElement: defineElement,
    isSupported: isSupported,
    name: name
  });

  function isSupported$1() {
    return !!window.MutationObserver;
  }

  function defineElement$1(elSpec, name, _ref) {
    var onUpdate = _ref.onUpdate,
        onUnmount = _ref.onUnmount;

    name = name.toLowerCase();

    var observer = new window.MutationObserver(function (mutations) {
      each(mutations, function (mutation) {
        each(mutation.addedNodes, function (node) {
          if (node.nodeName.toLowerCase() !== name) return;
          onUpdate(node, node);
        });

        // todo handle update

        each(mutation.removedNodes, function (node) {
          if (node.nodeName.toLowerCase() !== name) return;
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

  function each(list, fn) {
    for (var i = 0, len = list.length; i < len; i++) {
      fn(list[i]);
    }
  }

  var name$1 = 'MutationObserver';

  var MutationAdapter = /*#__PURE__*/Object.freeze({
    isSupported: isSupported$1,
    defineElement: defineElement$1,
    name: name$1
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

  function unmount(_ /*: any */, mountPoint /*: Element */) {
    ReactDOM.unmountComponentAtNode(mountPoint);
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  /*::
  import type {
    Component,
    PropertyMap,
    ElementMap,
    Defaults,
    ElementSpec
  } from './lib/types'
  */

  var Adapter = isSupported() ? ElementsAdapter : isSupported$1() ? MutationAdapter : null;

  if (!Adapter) {
    throw new Error('Unsupported platform');
  } else {
    console.log('Remount: using adapter', Adapter.name);
  }

  /**
   * Inspect `Remount.adapterName` to see what adapter's being used.
   */

  var adapterName = Adapter.name;

  /**
   * Registers elements.
   */

  function define(components /*: ElementMap */
  , defaults /*: ?Defaults */
  ) {
    Object.keys(components).forEach(function (name$$1 /*: string */) {
      // Construct the specs for the element.
      // (eg, { component: Tooltip, attributes: ['title'] })
      var elSpec /*: ElementSpec */ = Object.assign({}, defaults, toElementSpec(components[name$$1]));

      // Define a custom element.
      Adapter.defineElement(elSpec, name$$1, {
        onUpdate: function onUpdate(element /*: Element */, mountPoint /*: Element */) {
          var props = getProps(element, elSpec.attributes);
          update(elSpec, mountPoint, props);
        },
        onUnmount: function onUnmount(element /*: Element */, mountPoint /*: Element */) {
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

    var names /*: Array<string> */ = attributes || [];
    return names.reduce(function (result /*: PropertyMap */, attribute /*: string */) {
      result[attribute] = element.getAttribute(attribute);
      return result;
    }, {});
  }

  exports.adapterName = adapterName;
  exports.define = define;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
