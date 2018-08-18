'use strict';

/* eslint-env mocha */

var root = document.getElementById('debug');
if (window.location.hash === '#debug') root.classList.add('-visible');

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

Remount.define({
  'x-greeter': Greeter
});

function assert(value) {
  if (!value) throw new Error('Assertion failed');
}

after(function () {
  var div = document.createElement('div');
  div.id = 'finish';
  document.body.appendChild(div);
});

describe('Remount', function () {
  var div = void 0;

  beforeEach(function () {
    div = document.createElement('div');
    root.appendChild(div);
  });

  afterEach(function () {
    if (window.location.hash === '#debug') return;
    root.removeChild(div);
  });

  describe('Basic tests', function () {
    it('works', function () {
      div.innerHTML = '<x-greeter props-json=\'{"name":"John"}\'></x-greeter>';
      assert(div.textContent.match(/Hello John/));
    });

    it('ignores other props', function () {
      div.innerHTML = '<x-greeter name=\'Alice\'></x-greeter>';
      assert(div.textContent.match(/Hello \(unknown\)/));
    });
  });

  describe('Remount.define()', function () {
    it('accepts { component }', function () {
      Remount.define({
        'x-apple': {
          component: Greeter
        }
      });

      div.innerHTML = '<x-apple props-json=\'{"name":"Apple"}\'></x-apple>';
      assert(div.textContent.match(/Hello Apple/));
    });

    it('accepts { component, attributes }', function () {
      Remount.define({
        'x-banana': {
          component: Dumper,
          attributes: ['name']
        }
      });

      div.innerHTML = '<x-banana name=\'Banana\'></x-banana>';
      assert(div.textContent === '[{"name":"Banana"}]');
    });

    it('attribute names are case insensitive', function () {
      Remount.define({
        'x-cherry': {
          component: Dumper,
          attributes: ['name']
        }
      });

      div.innerHTML = '<x-cherry NAME=\'Cherry\'></x-cherry>';
      assert(div.textContent === '[{"name":"Cherry"}]');
    });

    it('support blank string values', function () {
      Remount.define({
        'x-guava': {
          component: Dumper,
          attributes: ['name']
        }
      });

      div.innerHTML = '<x-guava name=\'\'></x-guava>';
      assert(div.textContent === '[{"name":""}]');
    });

    it('empty values become empty strings', function () {
      Remount.define({
        'x-melon': {
          component: Dumper,
          attributes: ['name']
        }
      });

      div.innerHTML = '<x-melon name></x-melon>';
      assert(div.textContent === '[{"name":""}]');
    });

    it('tag names are case insensitive', function () {
      Remount.define({
        'x-apricot': {
          component: Dumper,
          attributes: ['name']
        }
      });

      div.innerHTML = '<X-APRICOT name=\'Apricot\'></X-APRICOT>';
      assert(div.textContent === '[{"name":"Apricot"}]');
    });

    it('rejects bad component names', function () {
      try {
        Remount.define({
          banana: Greeter
        });
        assert('Failed');
      } catch (e) {
        assert(e.message !== 'Failed');
      }
    });

    it('tag names will fail to be defined twice', function () {
      try {
        Remount.define({
          'x-dragonfruit': Greeter
        });

        Remount.define({
          'x-dragonfruit': Greeter
        });

        assert('Failed');
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
    it('will not be seen by .textContent', function () {
      Remount.define({ 'x-grape': Greeter }, { shadow: true });
      div.innerHTML = 'Grape: <x-grape></x-grape>';

      // It's "shadowed" so we can't see it
      assert(!div.textContent.match(/Hello/));
    });

    it('will be seen in .shadowRoot', function () {
      Remount.define({ 'x-orange': Greeter }, { shadow: true });

      div.innerHTML = 'Orange: <x-orange></x-orange>';
      var shadowHTML = document.querySelector('x-orange').shadowRoot.innerHTML;
      assert(shadowHTML.match(/Hello/));
    });
  });
});
