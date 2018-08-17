# Remount

> Mount React components to the DOM using custom elements

## Usage

Given this React component:

```js
const Greeter = ({ name }) => {
  return <div>Hello, {name}!</div>
}
```

Define it with:

```js
import { define } from 'remount'

define({
  'x-greeter': Greeter
})
```

Use it:

```html
<x-greeter data-props='{"name":"John"}'></x-greeter>
```

## Named attributes

```html
<x-greeter name="John"></x-greeter>
<!-- This doesn't work by default, unless you do the thing below -->
```

```js
import { define } from 'react-web-components'

define({
  'x-greeter': {
    component: Greeter,
    attributes: ['name']
  }
})
```

## Polyfills

Currently supported by the following browsers. All others will need a polyfill. ([more info](https://caniuse.com/#feat=custom-elementsv1))

- Chrome 54+ (Oct 2016)
- iOS 10.3 (Mar 2017)

You will need the ES5 adaptor if you plan to support ES5 browsers. These are all provided by the [@webcomponents/webcomponentsjs] package.

- ES5 adapter (1kb minified, 600 bytes gzipped)
- Web components polyfill (2.5kb minified, 1160 bytes gzipped)

Loading it via JS:

```js
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'
import '@webcomponents/webcomponentsjs/webcomponents-loader.js'
```

Or via HTML:

```html
<script crossorigin src='https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.0.4/custom-elements-es5-adapter.js'></script>
<script crossorigin src='https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.0.4/webcomponents-loader.js'></script>
```

[@webcomponents/webcomponentsjs]: https://yarn.pm/@webcomponents/webcomponentsjs

## Thanks

**remount** © 2018, Rico Sta. Cruz. Released under the [MIT] License.<br>
Authored and maintained by Rico Sta. Cruz with help from contributors ([list][contributors]).

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[![](https://img.shields.io/github/followers/rstacruz.svg?style=social&label=@rstacruz)](https://github.com/rstacruz) &nbsp;
[![](https://img.shields.io/twitter/follow/rstacruz.svg?style=social&label=@rstacruz)](https://twitter.com/rstacruz)

[mit]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/remount/contributors
