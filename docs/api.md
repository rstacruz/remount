# API

> This document is a stub. You can help by expanding it.

## define()

> `define({ [string]: React.Component, ... })`

Defines a custom element.

```js
define({
  'x-my-element': MyComponent
})
```

## Passing options

```js
define({
  'x-my-element': {
    component: MyComponent,
    attributes: ['name']
  }
})
```

or

```js
define({
  'x-my-element': MyComponent,
  'x-other-element': OtherComponent
}, {
  attributes: ['name']
})
```

## Options

### attributes

The attributes to listen to.

### quiet

If passed, it will warnings will be supressed.
