'use strict';

/* eslint-env mocha */

var IS_DEBUG = window.location.search.indexOf('debug') !== -1;

function assert(value) {
  if (!value) throw new Error('Assertion failed');
}

/*
 * Helper: defers until next animation frame
 */

function raf() {
  return new Promise(function (resolve, reject) {
    window.requestAnimationFrame(function () {
      resolve();
    });
  });
}

var Remount = window.Remount;

var React = window.React;

var root = document.getElementById('debug');
if (IS_DEBUG) root.classList.add('-visible');

/* eslint-env mocha */

describe('Remount mode: ' + Remount.adapterName, function () {
  if (Remount.adapterName === 'MutationObserver') {
    it('... Custom Elements are not supported on this platform.');
    it('... falling back to MutationObserver.');
  } else if (Remount.adapterName === 'CustomElements') {
    it('... Custom Elements are supported!');
  }
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var root$1 = document.getElementById('debug');

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

after(function () {
  var div = document.createElement('div');
  div.id = 'finish';
  document.body.appendChild(div);
});

describe('Remount', function () {
  var div = void 0;

  beforeEach(function () {
    div = document.createElement('div');
    root$1.appendChild(div);
  });

  afterEach(function () {
    if (IS_DEBUG) return;
    root$1.removeChild(div);
  });

  describe('Props', function () {
    it('supports props-json', function () {
      Remount.define({ 'x-red': Greeter });
      div.innerHTML = '<x-red props-json=\'{"name":"John"}\'></x-greeter>';
      return raf().then(function () {
        assert(div.textContent.match(/Hello John/));
      });
    });

    it('ignores other props', function () {
      Remount.define({ 'x-blue': Greeter });
      div.innerHTML = '<x-blue name=\'Alice\'></x-blue>';
      return raf().then(function () {
        assert(div.textContent.match(/Hello \(unknown\)/));
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
        assert(div.textContent.match(/Hello Apple/));
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
        assert(div.textContent === '[{"name":"Banana"}]');
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
        assert(div.textContent === '[{"name":"Cherry"}]');
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
        assert(div.textContent === '[{"name":""}]');
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
        assert(div.textContent === '[{"name":""}]');
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
        assert(div.textContent === '[{"name":"Apricot"}]');
      });
    });

    it('tag names will fail to be defined twice (case sensitive)', function () {
      try {
        Remount.define({ 'x-dragonfruit': Greeter });
        Remount.define({ 'x-dragonfruit': Greeter });
        throw new Error('Failed');
      } catch (e) {
        assert(e.message !== 'Failed');
      }
    });

    it('tag names will fail to be defined twice (case insensitive)', function () {
      try {
        Remount.define({ 'x-currant': Greeter });
        Remount.define({ 'x-CURRANT': Dumper });
        assert('Failed');
      } catch (e) {
        assert(e.message !== 'Failed');
      }
    });
  });

  describe('Names', function () {
    it('rejects no hyphens', function () {
      try {
        Remount.define({ banana: Greeter });
        throw new Error('Failed');
      } catch (e) {
        assert(e.message !== 'Failed');
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
        assert(e.message !== 'Failed');
      }
    });

    it('rejects starting with hyphen', function () {
      try {
        Remount.define({ '-element': Greeter });
        throw new Error('Failed');
      } catch (e) {
        assert(e.message !== 'Failed');
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
      assert(shadowHTML.match(/Hello/));
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
        assert(unmounted === true);
        assert(div.textContent.trim() === '');
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
        assert(div.textContent.trim() === '[{"value":123}]');
        var el = div.querySelector('x-lemon');
        el.setAttribute('props-json', '{"value":456}');
        return raf();
      }).then(function () {
        assert(div.textContent.trim() === '[{"value":456}]');
      });
    });
  });
});

/* eslint-env mocha */
