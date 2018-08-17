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

We recommend using these two polyfills to support browsers down to IE9 (~1.7kb gzipped), provided by the [`@webcomponents/webcomponentsjs`][@webcomponents/webcomponentsjs] package. Load it via JavaScript in your app's entry point:

```js
/*
 * Add the package via: yarn add @webcomponents/webcomponentsjs
 */

import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'
import '@webcomponents/webcomponentsjs/webcomponents-loader.js'
```

Or you can load it via CDN:

```html
<script crossorigin src='https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.0.4/custom-elements-es5-adapter.js'></script>
<script crossorigin src='https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.0.4/webcomponents-loader.js'></script>
```

[@webcomponents/webcomponentsjs]: https://yarn.pm/@webcomponents/webcomponentsjs

More info at the [Polyfills documentation →](./docs/polyfills.md)

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
