<br>

<p align='center'><img src='docs/images/remount.png'></p>

<p align='center'><a href='https://codepen.io/rstacruz/pen/EpBZRv?editors=1010'><b>Demo</b></a></p>

<br>

# Remount

> :electric_plug: Mount React components to the DOM using custom elements

*Experimental* - Remount lets you use your React components anywhere in the page as a web component (custom element).

[![Status](https://travis-ci.org/rstacruz/remount.svg?branch=master)](https://travis-ci.org/rstacruz/remount "See test builds")

## Install

```sh
yarn add remount
```

## Usage

> ```html
> <x-greeter props-json='{"name":"John"}'></x-greeter>
> ```

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
<x-greeter props-json='{"name":"John"}'></x-greeter>
```

## Custom properties

> ```html
> <x-greeter name="John"></x-greeter>
> ```

Only the `props-json` attribute is supported by default. To support custom properties like above, pass the names of attributes you want Remount to use.

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

More info at the [Polyfills documentation](./docs/polyfills.md).

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
