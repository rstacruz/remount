(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom'], factory) :
  (factory((global.Remount = {}),global.React,global.ReactDOM));
}(this, (function (exports,React,ReactDOM) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  /*::
  export type PropertyMap = {
    [string]: string
  }

  export type ElementMap = {
    [string]: ElementSpecArg
  }

  export type ElementSpec = {
    component: React.Component
    attributes?: Array<string>
  }

  export type ElementSpecArg = ElementSpec | React.Component
  */

  /**
   * Registers elements.
   */

  function define(components /*: ElementMap */) {
    Object.keys(components).forEach(function (name /*: string */) {
      var elSpec /*: ElementSpec */ = toElementSpec(components[name]);
      defineOne(elSpec, name);
    });
  }

  function toElementSpec(thing /*: ElementSpecArg */) /*: ElementSpec */{
    if (thing.hasOwnProperty('component')) return thing;

    return { component: thing };
  }

  /**
   * Registers one element.
   * @private
   */

  function defineOne(elSpec /*: ElementSpec */, name /*: string */) {
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
          this._mountPoint = createMountPoint(this);
          update(this, elSpec, this._mountPoint);
        }
      }, {
        key: 'disconnectedCallback',
        value: function disconnectedCallback() {
          if (!this._mountPoint) return;
          ReactDOM.unmountComponentAtNode(this._mountPoint);
        }
      }, {
        key: 'attributeChangedCallback',
        value: function attributeChangedCallback() {
          if (!this._mountPoint) return;
          update(this, elSpec, this._mountPoint);
        }
      }], [{
        key: 'observedAttributes',
        get: function get() {
          return ['props-json'].concat(_toConsumableArray(attributes));
        }
      }]);

      return ComponentElement;
    }(window.HTMLElement);

    if (!ensureSupported()) return;
    window.customElements.define(name, ComponentElement);
  }

  /**
   * Ensures that custom elements are supported
   * @private
   */

  function ensureSupported() {
    if (!window.customElements || !window.customElements.define) {
      console.error("remount: Custom elements aren't support in this browser. " + 'Remount will not work. ' + 'Including polyfills will likely fix this. ' + 'See Remount documentation for more info: ' + 'https://github.com/rstacruz/remount');
      return false;
    }

    return true;
  }

  /**
   * Creates a `<span>` element that serves as the mounting point for React
   * components.
   * @private
   */

  function createMountPoint(element /*: Element */) {
    return element;
    // const mountPoint = document.createElement('span')
    // element.attachShadow({ mode: 'open' }).appendChild(mountPoint)
    // return mountPoint
  }

  /**
   * Updates a custom element by calling `ReactDOM.render()`.
   * @private
   */

  function update(element /* Element */
  , _ref /*: ElementSpec */
  , mountPoint /* Element */
  ) {
    var component = _ref.component,
        attributes = _ref.attributes;

    var props = element.hasAttribute('props-json') ? JSON.parse(element.getAttribute('props-json')) : getProps(element, attributes);

    // Same as <Component {...props} />
    var reactElement = React.createElement(component, props);

    ReactDOM.render(reactElement, mountPoint);
  }

  /**
   * Returns properties for a given HTML element.
   * @private
   */

  function getProps(element /*: Element */, attributes /*: ?Array<string> */) {
    var names /*: Array<string> */ = attributes || [];
    return names.reduce(function (result /*: PropertyMap */, attribute /*: string */) {
      result[attribute] = element.getAttribute(attribute);
      return result;
    }, {});

    // By the way, did you know el.getAttributeNames()
    // will not work in IE11? Now you do.
  }

  exports.define = define;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
