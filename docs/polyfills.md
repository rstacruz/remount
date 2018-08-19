# Browser support

Remount supports all modern browsers, including IE11 (Internet Explorer's oldest supported version as of 2016). Remember to use the polyfills below to ensure the best compatibility.

As of August 2018, IE10 only has [0.09%](https://caniuse.com/usage-table) usage share. Microsoft ended official support for IE10 on [January 2016](https://en.wikipedia.org/wiki/Internet_Explorer_10).

<!-- TODO: talk about what the webcomponentsjs polyfills are and why they're necessary -->

## Option 1: via CDN

```html
<script crossorigin src='https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.0.4/custom-elements-es5-adapter.js'></script>
<script crossorigin src='https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.0.4/webcomponents-loader.js'></script>
```

Loads almost nothing if your browser already supports web components. Loads around 30kb otherwise.

## Option 2: in JS

```sh
yarn add @webcomponents/webcomponentsjs
```

```js
// load webcomponents bundle, which includes all the necessary polyfills
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'
import '@webcomponents/webcomponentsjs/webcomponents-bundle.js'
```

Unconditionally loads around 30kb gzip'd. More info [here](https://github.com/webcomponents/webcomponentsjs).

[@webcomponents/webcomponentsjs]: https://github.com/webcomponents/webcomponentsjs
