'use strict';

/* eslint-env mocha */

var root = document.getElementById('debug'); // True if in ?debug mode

function assert(value) {
  if (!value) throw new Error('Assertion failed');
}

assert.equal = function (left, right) {
  if (left !== right) {
    throw new Error('Equal assertion failed\n\n' + "Left:  ".concat(JSON.stringify(left), "\n") + "Right: ".concat(JSON.stringify(right), "\n\n"));
  }
};

assert.notEqual = function (left, right) {
  if (left === right) {
    throw new Error('Not equal assertion failed\n\n' + "Left:  ".concat(JSON.stringify(left), "\n") + "Right: ".concat(JSON.stringify(right), "\n\n"));
  }
};

assert.match = function (haystack, needle) {
  if (!haystack.match(needle)) {
    throw new Error('Match assertion failed\n\n' + "Left:  ".concat(JSON.stringify(haystack), "\n") + "Right: ".concat(needle.toString(), "\n\n"));
  }
}; // Defer until next frame


function raf() {
  if (window.MutationObserver._period) {
    // If MutationObserver was polyfilled, it will be
    // checking with a polling period.
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve();
      }, window.MutationObserver._period * 2);
    });
  } else {
    return new Promise(function (resolve, reject) {
      window.requestAnimationFrame(function () {
        resolve();
      });
    });
  }
}
var Remount = window.Remount;
var React = window.React;
root.classList.add('-visible');
after(function () {
  var div = document.createElement('div');
  div.id = 'finish';
  document.body.appendChild(div);
});

/* eslint-env mocha */
var strat = Remount.getStrategy();
var name = Remount.getStrategy().name;
describe('Remount strategy: ' + strat.name, function () {
  if (strat.name === 'MutationObserver') {
    it('Custom Elements are not supported on this platform.');
    var ms = window.MutationObserver._period;

    if (ms) {
      it("Falling back to MutationObserver (polyfill, polling ".concat(ms, "ms)."));
    } else {
      it('Falling back to MutationObserver (native).');
    }
  } else if (strat.name === 'CustomElements') {
    it('Custom Elements: supported! :)');
  }

  if (strat.supportsShadow()) {
    it('Shadow DOM: supported! :)');
  } else {
    it('Shadow DOM: not supported; skipping shadow DOM tests.');
  }
});

/* eslint-env mocha */

var Greeter = function Greeter(_ref) {
  var name = _ref.name;
  return React.createElement("span", {
    className: "greeter"
  }, "Hello ", name || '(unknown)', "!");
};

describe('Remount', function () {
  var div;
  beforeEach(function () {
    div = document.createElement('div');
    root.appendChild(div);
  });
  afterEach(function () {
  });
  describe('Props', function () {
    it('supports props-json', function () {
      Remount.define({
        'x-red': Greeter
      });
      div.innerHTML = "<x-red props-json='{\"name\":\"John\"}'></x-greeter>";
      return raf().then(function () {
        console.log('div.textContent', div.textContent);
        assert.match(div.textContent, /Hello John/);
      });
    });
    it('ignores other props', function () {
      Remount.define({
        'x-blue': Greeter
      });
      div.innerHTML = "<x-blue name='Alice'></x-blue>";
      return raf().then(function () {
        assert.match(div.textContent, /Hello \(unknown\)/);
      });
    });
    it('can handle JSON errors (TODO)');
  }); // describe('Remount.define()', () => {
  //   it('accepts { component }', () => {
  //     Remount.define({
  //       'x-apple': {
  //         component: Greeter
  //       }
  //     })
  //     div.innerHTML = `<x-apple props-json='{"name":"Apple"}'></x-apple>`
  //     return raf().then(() => {
  //       assert.match(div.textContent, /Hello Apple/)
  //     })
  //   })
  //   it('accepts { component, attributes }', () => {
  //     Remount.define({
  //       'x-banana': {
  //         component: Dumper,
  //         attributes: ['name']
  //       }
  //     })
  //     div.innerHTML = `<x-banana name='Banana'></x-banana>`
  //     return raf().then(() => {
  //       assert.equal(div.textContent, '[{"name":"Banana"}]')
  //     })
  //   })
  //   it('attribute names are case insensitive', () => {
  //     Remount.define({
  //       'x-cherry': {
  //         component: Dumper,
  //         attributes: ['name']
  //       }
  //     })
  //     div.innerHTML = `<x-cherry NAME='Cherry'></x-cherry>`
  //     return raf().then(() => {
  //       assert.equal(div.textContent, '[{"name":"Cherry"}]')
  //     })
  //   })
  //   it('support blank string values', () => {
  //     Remount.define({
  //       'x-guava': {
  //         component: Dumper,
  //         attributes: ['name']
  //       }
  //     })
  //     div.innerHTML = `<x-guava name=''></x-guava>`
  //     return raf().then(() => {
  //       assert.equal(div.textContent, '[{"name":""}]')
  //     })
  //   })
  //   it('empty values become empty strings', () => {
  //     Remount.define({
  //       'x-melon': {
  //         component: Dumper,
  //         attributes: ['name']
  //       }
  //     })
  //     div.innerHTML = `<x-melon name></x-melon>`
  //     return raf().then(() => {
  //       assert.equal(div.textContent, '[{"name":""}]')
  //     })
  //   })
  //   it('tag names are case insensitive', () => {
  //     Remount.define({
  //       'x-apricot': {
  //         component: Dumper,
  //         attributes: ['name']
  //       }
  //     })
  //     div.innerHTML = `<X-APRICOT name='Apricot'></X-APRICOT>`
  //     return raf().then(() => {
  //       assert.equal(div.textContent, '[{"name":"Apricot"}]')
  //     })
  //   })
  //   it('tag names will fail to be defined twice (case sensitive)', () => {
  //     try {
  //       Remount.define({ 'x-dragonfruit': Greeter })
  //       Remount.define({ 'x-dragonfruit': Greeter })
  //       throw new Error('Failed')
  //     } catch (e) {
  //       assert.notEqual(e.message, 'Failed')
  //     }
  //   })
  //   it('tag names will fail to be defined twice (case insensitive)', () => {
  //     try {
  //       Remount.define({ 'x-currant': Greeter })
  //       Remount.define({ 'x-CURRANT': Dumper })
  //       throw new Error('Failed')
  //     } catch (e) {
  //       assert.notEqual(e.message, 'Failed')
  //     }
  //   })
  // })
  // describe('Names', () => {
  //   it('rejects no hyphens', () => {
  //     try {
  //       Remount.define({ banana: Greeter })
  //       throw new Error('Failed')
  //     } catch (e) {
  //       assert.notEqual(e.message, 'Failed')
  //     }
  //   })
  //   it('allows numbers', () => {
  //     Remount.define({ 'element-0': Dumper })
  //   })
  //   it('allows multiple hyphens', () => {
  //     Remount.define({ 'element--element': Dumper })
  //   })
  //   it('allows ending with hyphen', () => {
  //     Remount.define({ 'element-': Dumper })
  //   })
  //   it('allows a-', () => {
  //     Remount.define({ 'a-': Dumper })
  //   })
  //   it('rejects starting with number', () => {
  //     try {
  //       Remount.define({ '0-element': Greeter })
  //       throw new Error('Failed')
  //     } catch (e) {
  //       assert.notEqual(e.message, 'Failed')
  //     }
  //   })
  //   it('rejects starting with hyphen', () => {
  //     try {
  //       Remount.define({ '-element': Greeter })
  //       throw new Error('Failed')
  //     } catch (e) {
  //       assert.notEqual(e.message, 'Failed')
  //     }
  //   })
  // })
  // describe('Quiet mode', () => {
  //   it('will supress errors', () => {
  //     Remount.define({
  //       'x-peach': {
  //         component: Greeter
  //       }
  //     })
  //     Remount.define({
  //       'x-peach': {
  //         component: Greeter,
  //         quiet: true
  //       }
  //     })
  //   })
  //   it('can be passed as a second argument', () => {
  //     Remount.define({
  //       'x-blueberry': Greeter
  //     })
  //     Remount.define(
  //       {
  //         'x-blueberry': Greeter
  //       },
  //       {
  //         quiet: true
  //       }
  //     )
  //   })
  // })
  // describe('Shadow DOM mode', () => {
  //   // Skip this for now; only Chrome supports this.
  //   // Polyfilled environments have no way of hiding it from .textContent.
  //   it.skip('will not be seen by .textContent', () => {
  //     Remount.define({ 'x-grape': Greeter }, { shadow: true })
  //     div.innerHTML = `Grape: <x-grape></x-grape>`
  //     // It's "shadowed" so we can't see it
  //     assert(!div.textContent.match(/Hello/))
  //   })
  //   // Shadow DOM isn't always available
  //   const hasShadow =
  //     Remount.getStrategy().name === 'CustomElements' &&
  //     document.body.attachShadow
  //   ;(hasShadow ? it : it.skip)('will be seen in .shadowRoot', () => {
  //     Remount.define({ 'x-orange': Greeter }, { shadow: true })
  //     div.innerHTML = `Orange: <x-orange></x-orange>`
  //     const shadowHTML = document.querySelector('x-orange').shadowRoot.innerHTML
  //     assert.match(shadowHTML, /Hello/)
  //   })
  // })
  // describe('Removing', () => {
  //   it('calls componentWillUnmount', () => {
  //     let unmounted
  //     class Removable extends React.Component {
  //       componentWillUnmount () {
  //         unmounted = true
  //       }
  //       render () {
  //         return <span>Hola</span>
  //       }
  //     }
  //     return Promise.resolve()
  //       .then(() => {
  //         Remount.define({ 'x-watermelon': Removable })
  //         div.innerHTML = `<x-watermelon></x-watermelon>`
  //         return raf()
  //       })
  //       .then(() => {
  //         assert(div.textContent.includes('Hola'))
  //         // Disconnect it
  //         div.removeChild(div.children[0])
  //         return raf()
  //       })
  //       .then(() => {
  //         // Assert that componentWillUnmount is ran
  //         assert.equal(unmounted, true)
  //         assert.equal(div.textContent.trim(), '')
  //       })
  //   })
  //   it('is triggered via reordering (TODO)')
  // })
  // describe('Updating', () => {
  //   it('works', () => {
  //     return Promise.resolve()
  //       .then(() => {
  //         Remount.define({ 'x-lemon': Dumper })
  //         div.innerHTML = `<x-lemon props-json='{"value":123}'></x-lemon>`
  //         return raf()
  //       })
  //       .then(() => {
  //         assert.equal(div.textContent.trim(), '[{"value":123}]')
  //         const el = div.querySelector('x-lemon')
  //         el.setAttribute('props-json', '{"value":456}')
  //         return raf()
  //       })
  //       .then(() => {
  //         assert.equal(div.textContent.trim(), '[{"value":456}]')
  //       })
  //   })
  // })
});
