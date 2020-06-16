import { createElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import retargetEvents from 'react-shadow-dom-retarget-events';

/* global HTMLElement */

/*
 * Adapted from https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.0.4/custom-elements-es5-adapter.js
 * Rolling this in so we don't need another polyfill.
 */

function inject() {
  if (
    (window.HTMLElement && window.HTMLElement._babelES5Adapter) ||
    void 0 === window.Reflect ||
    void 0 === window.customElements ||
    window.customElements.hasOwnProperty('polyfillWrapFlushCallback')
  ) {
    return
  }
  const a = HTMLElement;

  window.HTMLElement = function() {
    return Reflect.construct(a, [], this.constructor)
  };

  HTMLElement.prototype = a.prototype;
  HTMLElement.prototype.constructor = HTMLElement;
  Object.setPrototypeOf(HTMLElement, a);
  HTMLElement._babelES5Adapter = true;
}

// @ts-check

/**
 * The name of this strategy.
 * @type string
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
 * @param {ElementSpec} elSpec
 * @param {string} elName
 * @param {ElementEvents} events
 */

function defineElement(elSpec, elName, events) {
  const { onUpdate, onUnmount, onMount } = events;
  inject();
  const attributes = elSpec.attributes || [];

  class ComponentElement extends HTMLElement {
    static get observedAttributes() {
      return ['props-json', ...attributes]
    }

    connectedCallback() {
      this._mountPoint = createMountPoint(this, elSpec);
      onMount(this, this._mountPoint);
    }

    disconnectedCallback() {
      if (!this._mountPoint) {
        return
      }
      onUnmount(this, this._mountPoint);
    }

    attributeChangedCallback() {
      if (!this._mountPoint) {
        return
      }
      onUpdate(this, this._mountPoint);
    }
  }

  // Supress warning when quiet mode is on
  if (elSpec.quiet && window.customElements.get(elName)) {
    return
  }

  window.customElements.define(elName, ComponentElement);
}

function isSupported() {
  return !!(window.customElements && window.customElements.define)
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
  const { shadow } = elSpec;
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

function supportsShadow() {
  return !!(document && document.body && document.body.attachShadow)
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

function each(/** @type any */ list, /** @type any */ fn) {
  for (let i = 0, len = list.length; i < len; i++) {
    fn(list[i]);
  }
}

// @ts-check

/**
 * The name of this strategy.
 * @type string
 */

const name$1 = 'MutationObserver';

/**
 * List of observers tags.
 * @type ObserverList
 */

const observers = {};

function isSupported$1() {
  return 'MutationObserver' in window
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
  elName = elName.toLowerCase();

  // Maintain parity with what would happen in Custom Elements mode
  if (!isValidName(elName)) {
    if (elSpec.quiet) {
      return
    }
    throw new Error(`Remount: "${elName}" is not a valid custom element elName`)
  }

  if (observers[elName]) {
    if (elSpec.quiet) {
      return
    }
    throw new Error(`Remount: "${elName}" is already registered`)
  }

  const observer = new MutationObserver(
    /** @type MutationCallback */ mutations => {
      each(mutations, (/** @type MutationRecord */ mutation) => {
        each(mutation.addedNodes, (/** @type Node */ node) => {
          if (isElement(node)) {
            checkForMount(node, elName, events);
          }
        });
      });
    }
  );

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  observers[name$1] = /* true */ observer;

  window.addEventListener('DOMContentLoaded', () => {
    const nodes = document.getElementsByTagName(name$1);
    each(nodes, (/** @type HTMLElement */ node) =>
      checkForMount(node, name$1, events)
    );
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
    each(node.children, (/** @type HTMLElement */ subnode) => {
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
  const { onUpdate } = events;
  const observer = new MutationObserver(
    /** @type MutationCallback */ mutations => {
      each(mutations, (/** @type MutationRecord */ mutation) => {
        const targetNode = mutation.target;
        if (isElement(targetNode)) {
          onUpdate(targetNode, targetNode);
        }
      });
    }
  );

  observer.observe(node, { attributes: true });
}

/**
 * Observes a node's parent to wait until the node is removed
 * @param {HTMLElement} node
 * @param {ElementEvents} events
 */

function observeForRemoval(node, events) {
  const { onUnmount } = events;
  const parent = node.parentNode;

  // Not sure when this can happen, but let's add this for type safety
  if (!parent) {
    return
  }

  const observer = new MutationObserver(
    /** @type MutationCallback */ mutations => {
      each(mutations, (/** @type MutationRecord */ mutation) => {
        each(mutation.removedNodes, (/** @type Node */ subnode) => {
          if (node !== subnode) {
            return
          }
          if (isElement(node)) {
            // @ts-ignore TypeScript expects 0 arguments...?
            observer.disconnect(parent);
            onUnmount(node, node);
          }
        });
      });
    }
  );

  observer.observe(parent, { childList: true, subtree: true });
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
  return !!(elName.indexOf('-') !== -1 && elName.match(/^[a-z][a-z0-9-]*$/))
}

/**
 * Shadow DOM is not supported with the Mutation Observer strategy.
 */

function supportsShadow$1() {
  return false
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
    return true
  }
  return false
}

var MutationObserverStrategy = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$1,
  observers: observers,
  isSupported: isSupported$1,
  defineElement: defineElement$1,
  supportsShadow: supportsShadow$1
});

// @ts-check

/**
 * Cache of the strategy determined by `getStrategy()`.
 * @type {Strategy | null | undefined}
 */

let cachedStrategy;

/**
 * Detect what API can be used.
 *
 * @example
 *     Remount.getStrategy().name
 */

function getStrategy() {
  if (cachedStrategy) {
    return cachedStrategy
  }

  const StrategyUsed = [CustomElementsStrategy, MutationObserverStrategy].find(
    strategy => !!strategy.isSupported()
  );

  if (!StrategyUsed) {
    /* tslint:disable no-console */
    console.warn(
      "Remount: This browser doesn't support the " +
        'MutationObserver API or the Custom Elements API. Including ' +
        'polyfills might fix this. Remount elements will not work. ' +
        'https://github.com/rstacruz/remount'
    );
  }

  cachedStrategy = StrategyUsed;
  return StrategyUsed
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
  const Strategy = getStrategy();
  if (!Strategy) {
    return
  }

  Object.keys(components).forEach((/** @type string */ name) => {
    // Construct the specs for the element.
    // (eg, { component: Tooltip, attributes: ['title'] })
    /** @type ElementSpec */
    const elSpec = Object.assign({}, defaults, toElementSpec(components[name]));

    /** @type Adapter | null | undefined */
    const adapter = elSpec.adapter;
    if (!adapter) throw new Error('No suitable adapter found')

    // Define a custom element.
    Strategy.defineElement(elSpec, name, {
      onMount(element, mountPoint) {
        const props = getProps(element, elSpec.attributes);
        if (elSpec.shadow && elSpec.retarget) {
          adapter.mount(elSpec, mountPoint, props, element);
        } else {
          adapter.mount(elSpec, mountPoint, props, null);
        }
      },

      onUpdate(element, mountPoint) {
        const props = getProps(element, elSpec.attributes);
        adapter.update(elSpec, mountPoint, props, null);
      },

      onUnmount(element, mountPoint) {
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
    return thing
  }
  return { component: thing }
}

/**
 * Checks if a given `spec` is an ElementSpec.
 *
 * @param {any} spec
 * @returns {spec is ElementSpec}
 */

function isElementSpec(spec) {
  return typeof spec === 'object' && spec.component
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
  const rawJson = element.getAttribute('props-json');
  if (rawJson) {
    return JSON.parse(rawJson)
  }

  const names = attributes || [];
  return names.reduce((
    /** @type PropertyMap */ result,
    /** @type string */ attribute
  ) => {
    result[attribute] = element.getAttribute(attribute) || element[attribute];
    return result
  }, {})
}

// @ts-check

/**
 * @param {ElementSpec} elSpec
 * @param {HTMLElement} mountPoint
 * @param {object} props
 * @param {HTMLElement | null} element
 */

function mount(elSpec, mountPoint, props, element) {
  return update(elSpec, mountPoint, props, element)
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
  const { component } = elSpec;
  const reactElement = createElement(component, props);
  render(reactElement, mountPoint);
  if (element) {
    retargetEvents(element.shadowRoot);
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
  unmountComponentAtNode(mountPoint);
}

var ReactAdapter = /*#__PURE__*/Object.freeze({
  __proto__: null,
  mount: mount,
  update: update,
  unmount: unmount
});

/** @typedef { import('./types').ElementMap } ElementMap */

/**
 * @param {ElementMap} components
 * @param {Defaults=} defaults
 */

function defineReact(components = {}, options = {}) {
  return define(components, {
    adapter: ReactAdapter,
    ...options
  })
}

export { defineReact as define, getStrategy };
