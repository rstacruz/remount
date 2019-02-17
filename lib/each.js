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
    fn(list[i])
  }
}

export default each
