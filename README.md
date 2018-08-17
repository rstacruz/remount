<br>

<p align='center'><img src='docs/images/remount.png' width='500'></p>

<p align='center'><a href='https://codepen.io/rstacruz/pen/EpBZRv?editors=1010'><b>Demo</b></a></p>

<br>

# Remount

> 🔌 Mount React components to the DOM using custom elements

*Experimental* - Remount lets you use your React components anywhere in the page as a web component (custom element).

[![Status](https://travis-ci.org/rstacruz/remount.svg?branch=master)](https://travis-ci.org/rstacruz/remount "See test builds")

## Install

Remount is available through the [npm package repository](https://yarnpkg.com/en/package/remount).

- Via yarn: `yarn add remount`
- or npm: `npm install remount`

Be sure to use the [recommended polyfills](#polyfills) below as well!

## Usage

👇 Given any React component, such as this:

```js
const Greeter = ({ name }) => {
  return <div>Hello, {name}!</div>
}
```

📝 You can use *define()* to define custom elements. Let's define `<x-greeter>` like so:

```js
import { define } from 'remount'

define({
  'x-greeter': Greeter
})
```

🎉 You can then use it in your HTML, or even in your other React components!

```html
<x-greeter props-json='{"name":"John"}'></x-greeter>
```

## Custom properties

> `<x-greeter name="John"></x-greeter>`

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

## Browser support

Remount supports all browsers [supported by React](https://reactjs.org/docs/react-dom.html#browser-support). Use the polyfills below to ensure the best compatibility.

## Polyfills

We recommend these two polyfills provided by the [@webcomponents/webcomponentsjs][@webcomponents/webcomponentsjs] package. Load it via JavaScript in your app's entry point:

```js
// Add the package via: yarn add @webcomponents/webcomponentsjs
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

## Legacy support

If you are encountering UglifyJS errors, try the legacy ES5 build.

```js
import { define } from 'remount/dist/remount.legacy.js'
```

You can see all available builds at [here](https://cdn.jsdelivr.net/npm/remount/dist).

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
