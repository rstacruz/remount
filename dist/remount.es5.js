(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom'], factory) :
  (global = global || self, factory(global.Remount = {}, global.React, global.ReactDOM));
}(this, (function (exports, React, ReactDOM) { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

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

  /**
   * The name of this strategy.
   * @type string
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
   * @param {ElementSpec} elSpec
   * @param {string} elName
   * @param {ElementEvents} events
   */

  function defineElement(elSpec, elName, events) {
    var onUpdate = events.onUpdate,
        onUnmount = events.onUnmount,
        onMount = events.onMount;
    inject();
    var attributes = elSpec.attributes || [];

    var ComponentElement =
    /*#__PURE__*/
    function (_HTMLElement) {
      _inherits(ComponentElement, _HTMLElement);

      function ComponentElement() {
        _classCallCheck(this, ComponentElement);

        return _possibleConstructorReturn(this, _getPrototypeOf(ComponentElement).apply(this, arguments));
      }

      _createClass(ComponentElement, [{
        key: "connectedCallback",
        value: function connectedCallback() {
          this._mountPoint = createMountPoint(this, elSpec);
          onMount(this, this._mountPoint);
        }
      }, {
        key: "disconnectedCallback",
        value: function disconnectedCallback() {
          if (!this._mountPoint) {
            return;
          }

          onUnmount(this, this._mountPoint);
        }
      }, {
        key: "attributeChangedCallback",
        value: function attributeChangedCallback() {
          if (!this._mountPoint) {
            return;
          }

          onUpdate(this, this._mountPoint);
        }
      }], [{
        key: "observedAttributes",
        get: function get() {
          return ['props-json'].concat(_toConsumableArray(attributes));
        }
      }]);

      return ComponentElement;
    }(_wrapNativeSuper(HTMLElement)); // Supress warning when quiet mode is on


    if (elSpec.quiet && window.customElements.get(elName)) {
      return;
    }

    window.customElements.define(elName, ComponentElement);
  }
  function isSupported() {
    return !!(window.customElements && window.customElements.define);
  }
  /**
   * Creates a `<span>` element that serves as the mounting point for React
   * components. If `shadow: true` is requested, it'll attach a shadow node.
   *
   * @private
   * @param {HTMLElement} element
   * @param {ElementSpec} elSpec
   */

  function createMountPoint(element, elSpec) {
    var shadow = elSpec.shadow;

    if (shadow && element.attachShadow) {
      var mountPoint = document.createElement('span');
      element.attachShadow({
        mode: 'open'
      }).appendChild(mountPoint);
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
    __proto__: null,
    name: name,
    defineElement: defineElement,
    isSupported: isSupported,
    supportsShadow: supportsShadow
  });

  // @ts-check

  /**
   * Some implementations of MutationObserver don't have .forEach,
   * so we need our own `forEach` shim. This is usually the case with
   * polyfilled environments.
   *
   * @type { import('./types').Each }
   */
  function each(
  /** @type any */
  list,
  /** @type any */
  fn) {
    for (var i = 0, len = list.length; i < len; i++) {
      fn(list[i]);
    }
  }

  // @ts-check
  /**
   * The name of this strategy.
   * @type string
   */

  var name$1 = 'MutationObserver';
  /**
   * List of observers tags.
   * @type ObserverList
   */

  var observers = {};
  function isSupported$1() {
    return 'MutationObserver' in window;
  }
  /**
   * Defines a custom element.
   *
   * @example
   *     defineElement(
   *       { component: MyComponent },
   *       'my-div',
   *       {
   *         onMount: () => {},
   *         onUpdate: () => {},
   *         onUnmount: () => {},
   *       }
   *     )
   *
   * @private
   * @param {ElementSpec} elSpec
   * @param {string} elName
   * @param {ElementEvents} events
   */

  function defineElement$1(elSpec, elName, events) {
    elName = elName.toLowerCase(); // Maintain parity with what would happen in Custom Elements mode

    if (!isValidName(elName)) {
      if (elSpec.quiet) {
        return;
      }

      throw new Error("Remount: \"".concat(elName, "\" is not a valid custom element elName"));
    }

    if (observers[elName]) {
      if (elSpec.quiet) {
        return;
      }

      throw new Error("Remount: \"".concat(elName, "\" is already registered"));
    }

    var observer = new MutationObserver(
    /** @type MutationCallback */
    function (mutations) {
      each(mutations, function (
      /** @type MutationRecord */
      mutation) {
        each(mutation.addedNodes, function (
        /** @type Node */
        node) {
          if (isElement(node)) {
            checkForMount(node, elName, events);
          }
        });
      });
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    observers[name$1] =
    /* true */
    observer;
    window.addEventListener('DOMContentLoaded', function () {
      var nodes = document.getElementsByTagName(name$1);
      each(nodes, function (
      /** @type HTMLElement */
      node) {
        return checkForMount(node, name$1, events);
      });
    });
  }
  /**
   * Checks if this new element should fire an `onUpdate` hook.
   * Recurses down to its descendant nodes.
   *
   * @param {HTMLElement} node
   * @param {string} elName
   * @param {ElementEvents} events
   */

  function checkForMount(node, elName, events) {
    if (node.nodeName.toLowerCase() === elName) {
      // It's a match!
      events.onMount(node, node);
      observeForUpdates(node, events);
      observeForRemoval(node, events);
    } else if (node.children && node.children.length) {
      // Recurse down into the other additions
      each(node.children, function (
      /** @type HTMLElement */
      subnode) {
        if (isElement(subnode)) {
          checkForMount(subnode, elName, events);
        }
      });
    }
  }
  /**
   * Observes for any changes in attributes.
   *
   * @param {Element} node
   * @param {ElementEvents} events
   */


  function observeForUpdates(node, events) {
    var onUpdate = events.onUpdate;
    var observer = new MutationObserver(
    /** @type MutationCallback */
    function (mutations) {
      each(mutations, function (
      /** @type MutationRecord */
      mutation) {
        var targetNode = mutation.target;

        if (isElement(targetNode)) {
          onUpdate(targetNode, targetNode);
        }
      });
    });
    observer.observe(node, {
      attributes: true
    });
  }
  /**
   * Observes a node's parent to wait until the node is removed
   * @param {HTMLElement} node
   * @param {ElementEvents} events
   */


  function observeForRemoval(node, events) {
    var onUnmount = events.onUnmount;
    var parent = node.parentNode; // Not sure when this can happen, but let's add this for type safety

    if (!parent) {
      return;
    }

    var observer = new MutationObserver(
    /** @type MutationCallback */
    function (mutations) {
      each(mutations, function (
      /** @type MutationRecord */
      mutation) {
        each(mutation.removedNodes, function (
        /** @type Node */
        subnode) {
          if (node !== subnode) {
            return;
          }

          if (isElement(node)) {
            // @ts-ignore TypeScript expects 0 arguments...?
            observer.disconnect(parent);
            onUnmount(node, node);
          }
        });
      });
    });
    observer.observe(parent, {
      childList: true,
      subtree: true
    });
  }
  /**
   * Validate a custom tag.
   *
   * Since Remount can work with either Custom Elements or MutationObserver API's,
   * it'd be wise if we rejected element names that won't work in Custom Elements
   * mode (even if we're using MutationObserver mode).
   *
   * @param {string} elName
   * @returns {boolean}
   *
   * @example
   *     isValidName('div')      // => false
   *     isValidName('my-div')   // => true
   *     isValidName('123-456')  // => false
   *     isValidName('my-123')   // => true
   *
   * @private
   */


  function isValidName(elName) {
    return !!(elName.indexOf('-') !== -1 && elName.match(/^[a-z][a-z0-9-]*$/));
  }
  /**
   * Shadow DOM is not supported with the Mutation Observer strategy.
   */


  function supportsShadow$1() {
    return false;
  }
  /**
   * Checks if a given Node is an HTMLElement.
   *
   * It's possible that a mutation's `addedNodes` return something that isn't an
   * HTMLElement.
   *
   * @param {any} node
   * @returns {node is HTMLElement}
   */

  function isElement(node) {
    if (node) {
      return true;
    }

    return false;
  }

  var MutationObserverStrategy = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$1,
    observers: observers,
    isSupported: isSupported$1,
    defineElement: defineElement$1,
    supportsShadow: supportsShadow$1
  });

  /**
   * Cache of the strategy determined by `getStrategy()`.
   * @type {Strategy | null | undefined}
   */

  var cachedStrategy;
  /**
   * Detect what API can be used.
   *
   * @example
   *     Remount.getStrategy().name
   */

  function getStrategy() {
    if (cachedStrategy) {
      return cachedStrategy;
    }

    var StrategyUsed = [CustomElementsStrategy, MutationObserverStrategy].find(function (strategy) {
      return !!strategy.isSupported();
    });

    if (!StrategyUsed) {
      /* tslint:disable no-console */
      console.warn("Remount: This browser doesn't support the " + 'MutationObserver API or the Custom Elements API. Including ' + 'polyfills might fix this. Remount elements will not work. ' + 'https://github.com/rstacruz/remount');
    }

    cachedStrategy = StrategyUsed;
    return StrategyUsed;
  }
  /**
   * Registers custom elements and links them to React components.
   * @param {ElementMap} components
   * @param {Defaults=} defaults
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

  function define(components, defaults) {
    var Strategy = getStrategy();

    if (!Strategy) {
      return;
    }

    Object.keys(components).forEach(function (
    /** @type string */
    name) {
      // Construct the specs for the element.
      // (eg, { component: Tooltip, attributes: ['title'] })

      /** @type ElementSpec */
      var elSpec = Object.assign({}, defaults, toElementSpec(components[name]));
      /** @type Adapter | null | undefined */

      var adapter = elSpec.adapter;
      if (!adapter) throw new Error('No suitable adapter found'); // Define a custom element.

      Strategy.defineElement(elSpec, name, {
        onMount: function onMount(element, mountPoint) {
          var props = getProps(element, elSpec.attributes);

          if (elSpec.shadow && elSpec.retarget) {
            adapter.mount(elSpec, mountPoint, props, element);
          } else {
            adapter.mount(elSpec, mountPoint, props, null);
          }
        },
        onUpdate: function onUpdate(element, mountPoint) {
          var props = getProps(element, elSpec.attributes);
          adapter.update(elSpec, mountPoint, props, null);
        },
        onUnmount: function onUnmount(element, mountPoint) {
          adapter.unmount(elSpec, mountPoint);
        }
      });
    });
  }
  /**
   * Coerces something into an `ElementSpec` type.
   *
   * @param {ElementSpec | Component} thing
   * @returns {ElementSpec}
   * @private
   *
   * @example
   *     toElementSpec(Tooltip)
   *     // => { component: Tooltip }
   *
   *     toElementSpec({ component: Tooltip })
   *     // => { component: Tooltip }
   */

  function toElementSpec(thing) {
    if (isElementSpec(thing)) {
      return thing;
    }

    return {
      component: thing
    };
  }
  /**
   * Checks if a given `spec` is an ElementSpec.
   *
   * @param {any} spec
   * @returns {spec is ElementSpec}
   */


  function isElementSpec(spec) {
    return _typeof(spec) === 'object' && spec.component;
  }
  /**
   * Returns properties for a given HTML element.
   *
   * @private
   * @param {HTMLElement} element
   * @param {string[] | null | undefined} attributes
   *
   * @example
   *     getProps(div, ['name'])
   *     // => { name: 'Romeo' }
   */


  function getProps(element, attributes) {
    var rawJson = element.getAttribute('props-json');

    if (rawJson) {
      return JSON.parse(rawJson);
    }

    var names = attributes || [];
    return names.reduce(function (
    /** @type PropertyMap */
    result,
    /** @type string */
    attribute) {
      result[attribute] = element.getAttribute(attribute) || element[attribute];
      return result;
    }, {});
  }

  var reactEvents = ["onAbort", "onAnimationCancel", "onAnimationEnd", "onAnimationIteration", "onAuxClick", "onBlur",
      "onChange", "onClick", "onClose", "onContextMenu", "onDoubleClick", "onError", "onFocus", "onGotPointerCapture",
      "onInput", "onKeyDown", "onKeyPress", "onKeyUp", "onLoad", "onLoadEnd", "onLoadStart", "onLostPointerCapture",
      "onMouseDown", "onMouseMove", "onMouseOut", "onMouseOver", "onMouseUp", "onPointerCancel", "onPointerDown",
      "onPointerEnter", "onPointerLeave", "onPointerMove", "onPointerOut", "onPointerOver", "onPointerUp", "onReset",
      "onResize", "onScroll", "onSelect", "onSelectionChange", "onSelectStart", "onSubmit", "onTouchCancel",
      "onTouchMove", "onTouchStart", "onTransitionCancel", "onTransitionEnd", "onDrag", "onDragEnd", "onDragEnter",
      "onDragExit", "onDragLeave", "onDragOver", "onDragStart", "onDrop", "onFocusOut"];

  var divergentNativeEvents = {
      onDoubleClick: 'dblclick'
  };

  var mimickedReactEvents = {
      onInput: 'onChange',
      onFocusOut: 'onBlur',
      onSelectionChange: 'onSelect'
  };

  var reactShadowDomRetargetEvents = function retargetEvents(shadowRoot) {
      var removeEventListeners = [];

      reactEvents.forEach(function (reactEventName) {

          var nativeEventName = getNativeEventName(reactEventName);
          
          function retargetEvent(event) {
              
              var path = event.path || (event.composedPath && event.composedPath()) || composedPath(event.target);

              for (var i = 0; i < path.length; i++) {

                  var el = path[i];
                  var reactComponent = findReactComponent(el);
                  var props = findReactProps(reactComponent);

                  if (reactComponent && props) {
                      dispatchEvent(event, reactEventName, props);
                  }

                  if (reactComponent && props && mimickedReactEvents[reactEventName]) {
                      dispatchEvent(event, mimickedReactEvents[reactEventName], props);
                  }

                  if (event.cancelBubble) { 
                      break; 
                  }                

                  if (el === shadowRoot) {
                      break;
                  }
              }
          }

          var eventListenerOptions = false;

          // See https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
          if (supportsPassiveEventListeners() && (nativeEventName === 'touchmove' || nativeEventName === 'touchstart')) {
              eventListenerOptions = {capture: true, passive: true};
          }

          shadowRoot.addEventListener(nativeEventName, retargetEvent, eventListenerOptions);
          
          removeEventListeners.push(function () { shadowRoot.removeEventListener(nativeEventName, retargetEvent, false); });
      });
      
      return function () {
        
        removeEventListeners.forEach(function (removeEventListener) {
          
          removeEventListener();
        });
      };
  };

  function findReactComponent(item) {
      for (var key in item) {
          if (item.hasOwnProperty(key) && key.indexOf('_reactInternal') !== -1) {
              return item[key];
          }
      }
  }

  function findReactProps(component) {
      if (!component) return undefined;
      if (component.memoizedProps) return component.memoizedProps; // React 16 Fiber
      if (component._currentElement && component._currentElement.props) return component._currentElement.props; // React <=15

  }

  function dispatchEvent(event, eventType, componentProps) {
      event.persist = function() {
          event.isPersistent = function(){ return true};
      };

      if (componentProps[eventType]) {
          componentProps[eventType](event);
      }
  }

  function getNativeEventName(reactEventName) {
      if (divergentNativeEvents[reactEventName]) {
          return divergentNativeEvents[reactEventName];
      }
      return reactEventName.replace(/^on/, '').toLowerCase();
  }

  function composedPath(el) {
    var path = [];
    while (el) {
      path.push(el);
      if (el.tagName === 'HTML') {
        path.push(document);
        path.push(window);
        return path;
      }
      el = el.parentElement;
    }
  }

  // Copied from https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
  function supportsPassiveEventListeners() {
    var supportsPassive = false;
    try {
      var opts = Object.defineProperty({}, 'passive', {
          get: function() {
          supportsPassive = true;
          }
      });
      window.addEventListener("testPassive", null, opts);
      window.removeEventListener("testPassive", null, opts);
    } catch (e) {}

    return supportsPassive;
  }

  // @ts-check
  /**
   * @param {ElementSpec} elSpec
   * @param {HTMLElement} mountPoint
   * @param {object} props
   * @param {HTMLElement | null} element
   */

  function mount(elSpec, mountPoint, props, element) {
    return update(elSpec, mountPoint, props, element);
  }
  /**
   * Updates a custom element by calling `ReactDOM.render()`.
   * @private
   *
   * @param {ElementSpec} elSpec
   * @param {HTMLElement} mountPoint
   * @param {object} props
   * @param {HTMLElement | null} element
   */

  function update(elSpec, mountPoint, props, element) {
    var component = elSpec.component;
    var reactElement = React.createElement(component, props);
    ReactDOM.render(reactElement, mountPoint);

    if (element) {
      reactShadowDomRetargetEvents(element.shadowRoot);
    }
  }
  /**
   * Unmounts a component.
   * @private
   *
   * @param {ElementSpec} elSpec
   * @param {HTMLElement} mountPoint
   */

  function unmount(elSpec, mountPoint) {
    ReactDOM.unmountComponentAtNode(mountPoint);
  }

  var ReactAdapter = /*#__PURE__*/Object.freeze({
    __proto__: null,
    mount: mount,
    update: update,
    unmount: unmount
  });

  /**
   * @param {ElementMap} components
   * @param {Defaults=} defaults
   */

  function defineReact() {
    var components = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return define(components, _objectSpread2({
      adapter: ReactAdapter
    }, options));
  }

  exports.define = defineReact;
  exports.getStrategy = getStrategy;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
