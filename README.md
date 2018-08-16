# react-web-components

> I'll explain later, as soon as I have a name

## Usage

Given this React component:

```js
const Greeter = ({ name }) => {
  return <div>Hello, {name}!</div>
}
```

Define it with:

```js
import { define } from 'react-web-components'

define({
  'x-greeter': Greeter
})
```

Use it:

```html
<x-greeter name='John'></x-greeter>
```

## Polyfills

You will need the ES5 adaptor if you plan to support ES5 browsers.

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
