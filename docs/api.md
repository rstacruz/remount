# Remount API

```js
import { define } from 'remount'
```

<!-- TOC depthFrom:2 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [define()](#define)
	- [Multiple elements](#multiple-elements)
	- [Passing options](#passing-options)
	- [Per-element options](#per-element-options)
	- [Named attributes](#named-attributes)
	- [props-json](#props-json)
	- [Shadow DOM](#shadow-dom)
	- [Options](#options)

<!-- /TOC -->

## define()

> `define({ [string]: React.Component, ... }, options?: Options)`

Defines custom elements.

```js
define({
  'x-my-element': MyComponent
})
```

### Multiple elements

You can pass as many elements to *define()* as you need.

```js
define({
  'x-my-element': MyComponent,
  'x-other-element': OtherComponent
})
```

### Passing options

You can pass options as the second parameter of *define()*. This example below will apply the `attributes: ['name']` option to the 2 components defined:

```js
define({
  'x-my-element': MyComponent,
  'x-other-element': OtherComponent
}, {
  attributes: ['name']
})
```

### Per-element options

Alternatively, you can also pass options per component using this syntax:

```js
define({
  'x-checkbox': {
    component: Checkbox,
    attributes: ['value', 'label']
  }
  'x-tooltip': {
    component: Tooltip,
    attributes: ['title', 'body']
  }
})
```


### Named attributes

You have to pass attributes that you want to listen to, see above. All attributes not specified in `define()` will be ignored.

Remount relies on the [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) HTML API, so all limitations of the Custom Elements API apply. Keep these in mind:

- Attribute names are case insensitive.

- Values can only be expressed as strings.

### props-json

All elements allow for the `props-json` attribute.

```html
<x-my-element props-json='{"color":"red"}'></x-my-element>
```

While being more verbose than [named attributes](#named-attributes), it lets you have props without the limitations of named attributes:

- You can use non-string values like numbers or booleans. (named attributes only support strings.)

- You can use `mixedCase` property names. (named attributes are case insensitive.)

If a `props-json` property exists, all other named attributes will be ignored.

### Shadow DOM

Remount doesn't use Shadow DOM by default. To enable it, pass the `shadow: true` option.

[The Shadow DOM API](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) should be available anywhere custom elements are, but keep in mind that your React elements will be "hidden" from JavaScript. Depending on your situation, this may be a good or bad thing.

```js
define({
  'x-component': MyComponent
}, {
  shadow: true
})
```

### Options

*define()* accepts these options:

- `component` - The React component to bind to. This is only required if you use the [per-element options](#per-element-options) syntax.

- `attributes` - The attributes to listen to (see [Named attributes](#named-attributes)).

- `quiet` - If *true*, warnings will be supressed.

- `shadow` - If *true*, uses shadow DOM.
