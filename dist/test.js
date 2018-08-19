'use strict';

/* eslint-env mocha */

// Root element

var root = document.getElementById('debug');

// True if in ?debug mode
var IS_DEBUG = window.location.search.indexOf('debug') !== -1;

// Crappy knock-off of an assertion library
function assert(value) {
  if (!value) throw new Error('Assertion failed');
}

assert.equal = function (left, right) {
  if (left !== right) {
    throw new Error('Equal assertion failed\n\n' + ('Left:  ' + JSON.stringify(left) + '\n') + ('Right: ' + JSON.stringify(right) + '\n\n'));
  }
};

assert.notEqual = function (left, right) {
  if (left === right) {
    throw new Error('Not equal assertion failed\n\n' + ('Left:  ' + JSON.stringify(left) + '\n') + ('Right: ' + JSON.stringify(right) + '\n\n'));
  }
};

assert.match = function (haystack, needle) {
  if (!haystack.match(needle)) {
    throw new Error('Match assertion failed\n\n' + ('Left:  ' + JSON.stringify(haystack) + '\n') + ('Right: ' + needle.toString() + '\n\n'));
  }
};

// Defer until next frame
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
var ReactDOM = window.ReactDOM;

if (IS_DEBUG) root.classList.add('-visible');

after(function () {
  var div = document.createElement('div');
  div.id = 'finish';
  document.body.appendChild(div);
});

/* eslint-env mocha */

describe('Remount mode: ' + Remount.adapterName, function () {
  if (Remount.adapterName === 'MutationObserver') {
    it('Custom Elements are not supported on this platform.');

    var ms = window.MutationObserver._period;
    if (ms) {
      it('Falling back to MutationObserver (polyfill, polling ' + ms + 'ms).');
    } else {
      it('Falling back to MutationObserver (native).');
    }
  } else if (Remount.adapterName === 'CustomElements') {
    it('Custom Elements are supported!');
    it(':)');
  }
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Greeter = function Greeter(_ref) {
  var name = _ref.name;

  return React.createElement(
    'span',
    { className: 'greeter' },
    'Hello ',
    name || '(unknown)',
    '!'
  );
};

var Dumper = function Dumper(props) {
  return React.createElement(
    'span',
    { className: 'dumper' },
    '[',
    JSON.stringify(props),
    ']'
  );
};

describe('Remount', function () {
  var div = void 0;

  beforeEach(function () {
    div = document.createElement('div');
    root.appendChild(div);
  });

  afterEach(function () {
    if (!IS_DEBUG) root.removeChild(div);
  });

  describe('Props', function () {
    it('supports props-json', function () {
      Remount.define({ 'x-red': Greeter });
      div.innerHTML = '<x-red props-json=\'{"name":"John"}\'></x-greeter>';
      return raf().then(function () {
        assert.match(div.textContent, /Hello John/);
      });
    });

    it('ignores other props', function () {
      Remount.define({ 'x-blue': Greeter });
      div.innerHTML = '<x-blue name=\'Alice\'></x-blue>';
      return raf().then(function () {
        assert.match(div.textContent, /Hello \(unknown\)/);
      });
    });

    it('can handle JSON errors (TODO)');
  });

  describe('Remount.define()', function () {
    it('accepts { component }', function () {
      Remount.define({
        'x-apple': {
          component: Greeter
        }
      });

      div.innerHTML = '<x-apple props-json=\'{"name":"Apple"}\'></x-apple>';
      return raf().then(function () {
        assert.match(div.textContent, /Hello Apple/);
      });
    });

    it('accepts { component, attributes }', function () {
      Remount.define({
        'x-banana': {
          component: Dumper,
          attributes: ['name']
        }
      });

      div.innerHTML = '<x-banana name=\'Banana\'></x-banana>';
      return raf().then(function () {
        assert.equal(div.textContent, '[{"name":"Banana"}]');
      });
    });

    it('attribute names are case insensitive', function () {
      Remount.define({
        'x-cherry': {
          component: Dumper,
          attributes: ['name']
        }
      });

      div.innerHTML = '<x-cherry NAME=\'Cherry\'></x-cherry>';
      return raf().then(function () {
        assert.equal(div.textContent, '[{"name":"Cherry"}]');
      });
    });

    it('support blank string values', function () {
      Remount.define({
        'x-guava': {
          component: Dumper,
          attributes: ['name']
        }
      });

      div.innerHTML = '<x-guava name=\'\'></x-guava>';
      return raf().then(function () {
        assert.equal(div.textContent, '[{"name":""}]');
      });
    });

    it('empty values become empty strings', function () {
      Remount.define({
        'x-melon': {
          component: Dumper,
          attributes: ['name']
        }
      });

      div.innerHTML = '<x-melon name></x-melon>';
      return raf().then(function () {
        assert.equal(div.textContent, '[{"name":""}]');
      });
    });

    it('tag names are case insensitive', function () {
      Remount.define({
        'x-apricot': {
          component: Dumper,
          attributes: ['name']
        }
      });

      div.innerHTML = '<X-APRICOT name=\'Apricot\'></X-APRICOT>';
      return raf().then(function () {
        assert.equal(div.textContent, '[{"name":"Apricot"}]');
      });
    });

    it('tag names will fail to be defined twice (case sensitive)', function () {
      try {
        Remount.define({ 'x-dragonfruit': Greeter });
        Remount.define({ 'x-dragonfruit': Greeter });
        throw new Error('Failed');
      } catch (e) {
        assert.notEqual(e.message, 'Failed');
      }
    });

    it('tag names will fail to be defined twice (case insensitive)', function () {
      try {
        Remount.define({ 'x-currant': Greeter });
        Remount.define({ 'x-CURRANT': Dumper });
        throw new Error('Failed');
      } catch (e) {
        assert.notEqual(e.message, 'Failed');
      }
    });
  });

  describe('Names', function () {
    it('rejects no hyphens', function () {
      try {
        Remount.define({ banana: Greeter });
        throw new Error('Failed');
      } catch (e) {
        assert.notEqual(e.message, 'Failed');
      }
    });

    it('allows numbers', function () {
      Remount.define({ 'element-0': Dumper });
    });

    it('allows multiple hyphens', function () {
      Remount.define({ 'element--element': Dumper });
    });

    it('allows ending with hyphen', function () {
      Remount.define({ 'element-': Dumper });
    });

    it('allows a-', function () {
      Remount.define({ 'a-': Dumper });
    });

    it('rejects starting with number', function () {
      try {
        Remount.define({ '0-element': Greeter });
        throw new Error('Failed');
      } catch (e) {
        assert.notEqual(e.message, 'Failed');
      }
    });

    it('rejects starting with hyphen', function () {
      try {
        Remount.define({ '-element': Greeter });
        throw new Error('Failed');
      } catch (e) {
        assert.notEqual(e.message, 'Failed');
      }
    });
  });

  describe('Quiet mode', function () {
    it('will supress errors', function () {
      Remount.define({
        'x-peach': {
          component: Greeter
        }
      });

      Remount.define({
        'x-peach': {
          component: Greeter,
          quiet: true
        }
      });
    });

    it('can be passed as a second argument', function () {
      Remount.define({
        'x-blueberry': Greeter
      });

      Remount.define({
        'x-blueberry': Greeter
      }, {
        quiet: true
      });
    });
  });

  describe('Shadow DOM mode', function () {
    // Skip this for now; only Chrome supports this.
    // Polyfilled environments have no way of hiding it from .textContent.
    it.skip('will not be seen by .textContent', function () {
      Remount.define({ 'x-grape': Greeter }, { shadow: true });
      div.innerHTML = 'Grape: <x-grape></x-grape>';

      // It's "shadowed" so we can't see it
      assert(!div.textContent.match(/Hello/));
    });(Remount.adapterName === 'CustomElements' ? it : it.skip)('will be seen in .shadowRoot', function () {
      Remount.define({ 'x-orange': Greeter }, { shadow: true });

      div.innerHTML = 'Orange: <x-orange></x-orange>';
      var shadowHTML = document.querySelector('x-orange').shadowRoot.innerHTML;
      assert.match(shadowHTML, /Hello/);
    });
  });

  describe('Removing', function () {
    it('calls componentWillUnmount', function () {
      var unmounted = void 0;

      var Removable = function (_React$Component) {
        _inherits(Removable, _React$Component);

        function Removable() {
          _classCallCheck(this, Removable);

          return _possibleConstructorReturn(this, (Removable.__proto__ || Object.getPrototypeOf(Removable)).apply(this, arguments));
        }

        _createClass(Removable, [{
          key: 'componentWillUnmount',
          value: function componentWillUnmount() {
            unmounted = true;
          }
        }, {
          key: 'render',
          value: function render() {
            return React.createElement(
              'span',
              null,
              'Hola'
            );
          }
        }]);

        return Removable;
      }(React.Component);

      return Promise.resolve().then(function () {
        Remount.define({ 'x-watermelon': Removable });
        div.innerHTML = '<x-watermelon></x-watermelon>';
        return raf();
      }).then(function () {
        assert(div.textContent.includes('Hola'));
        // Disconnect it
        div.removeChild(div.children[0]);
        return raf();
      }).then(function () {
        // Assert that componentWillUnmount is ran
        assert.equal(unmounted, true);
        assert.equal(div.textContent.trim(), '');
      });
    });

    it('is triggered via reordering (TODO)');
  });

  describe('Updating', function () {
    it('works', function () {
      return Promise.resolve().then(function () {
        Remount.define({ 'x-lemon': Dumper });
        div.innerHTML = '<x-lemon props-json=\'{"value":123}\'></x-lemon>';
        return raf();
      }).then(function () {
        assert.equal(div.textContent.trim(), '[{"value":123}]');
        var el = div.querySelector('x-lemon');
        el.setAttribute('props-json', '{"value":456}');
        return raf();
      }).then(function () {
        assert.equal(div.textContent.trim(), '[{"value":456}]');
      });
    });
  });
});

/* eslint-env mocha */

describe('Inception mode', function () {
  var div = void 0;

  beforeEach(function () {
    div = document.createElement('div');
    root.appendChild(div);
  });

  afterEach(function () {
    if (!IS_DEBUG) root.removeChild(div);
  });

  it('works', function () {
    var Inner = function Inner(_ref) {
      var name = _ref.name;

      return React.createElement(
        'span',
        null,
        'Inside',
        name
      );
    };

    Remount.define({ 'x-mauve': Inner }, { attributes: ['name'] });

    var Outer = function Outer() {
      return React.createElement(
        'blockquote',
        null,
        React.createElement(
          'span',
          null,
          'Outside'
        ),
        React.createElement('x-mauve', { name: 'Hello' })
      );
    };

    ReactDOM.render(React.createElement(Outer, null), div);

    return raf().then(function () {
      assert.equal(div.textContent, 'OutsideInsideHello');
    });
  });
});

/* eslint-env mocha */

var Dumper$1 = function Dumper(props) {
  return React.createElement(
    'span',
    { className: 'dumper' },
    '[',
    JSON.stringify(props),
    ']'
  );
};

describe('Appearance', function () {
  var div = void 0;

  beforeEach(function () {
    div = document.createElement('div');
    root.appendChild(div);
  });

  afterEach(function () {
    if (!IS_DEBUG) root.removeChild(div);
  });

  before(function () {
    Remount.define({ 'x-white': Dumper$1 }, { attributes: ['value'] });
  });

  describe('via innerHTML', function () {
    it('works with 1 appearance', function () {
      div.innerHTML = '<x-white value="abc"></x-white>';

      return raf().then(function () {
        assert.equal(div.textContent, '[{"value":"abc"}]');
      });
    });

    it('works in a deep appearance (inline)', function () {
      div.innerHTML = '<span><x-white value="ABC"></x-white></span>';

      return raf().then(function () {
        assert.equal(div.textContent, '[{"value":"ABC"}]');
      });
    });

    it('works in a deep appearance (block)', function () {
      div.innerHTML = '<p><x-white value="abcd"></x-white></p>';

      return raf().then(function () {
        assert.equal(div.textContent, '[{"value":"abcd"}]');
      });
    });

    it('works with 2 appearances', function () {
      div.innerHTML = '\n        <x-white value="def"></x-white><x-white value="ghi"></x-white>\n      ';

      return raf().then(function () {
        assert.equal(div.textContent.trim(), '[{"value":"def"}][{"value":"ghi"}]');
      });
    });

    it('works with 2 appearances (deep)', function () {
      div.innerHTML = '\n        <p><x-white value="def"></x-white><span><x-white value="ghi"></x-white></span></p>\n      ';

      return raf().then(function () {
        assert.equal(div.textContent.trim(), '[{"value":"def"}][{"value":"ghi"}]');
      });
    });
  });

  describe('via appendChild', function () {
    it('works with 1 appearance', function () {
      var el = document.createElement('x-white');
      el.setAttribute('value', 'abc');
      div.appendChild(el);

      return raf().then(function () {
        assert(div.textContent === '[{"value":"abc"}]');
      });
    });

    it('via with deep appearance (container first)', function () {
      var el = document.createElement('x-white');
      el.setAttribute('value', 'def');

      var container = document.createElement('span');

      container.appendChild(el);
      div.appendChild(container);

      return raf().then(function () {
        assert(div.textContent === '[{"value":"def"}]');
      });
    });

    it('via with deep appearance (late append)', function () {
      var el = document.createElement('x-white');
      el.setAttribute('value', 'ghi');

      var container = document.createElement('span');

      div.appendChild(container);
      container.appendChild(el);

      return raf().then(function () {
        assert(div.textContent === '[{"value":"ghi"}]');
      });
    });
  });
});

/* eslint-env mocha */
