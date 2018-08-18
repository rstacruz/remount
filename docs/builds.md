# Builds

Remount comes in 3 flavors:

| Version       | Description                           |
| ------------- | ------------------------------------- |
| `remount/es5` | Supports legacy browsers (default)    |
| `remount/es6` | Uses classes and other ES2015+ syntax |
| `remount/esm` | es modules .mjs build                 |

## Using builds

You can use them like so:

```js
import { define } from 'remount/es6'
```

Or if you're using Webpack:

```js
/* webpack.config.js */
module.exports = {
  /* ... */
  resolve: {
    alias: {
      remount: 'remount/es6'
    }
  }
}
```

## Using in browser

When used like so, Remount will be available as `window.Remount`. Great for using in JSFiddle/Codepen.

```js
<script src='https://cdn.jsdelivr.net/npm/remount'></script>
<script src='https://cdn.jsdelivr.net/npm/remount/dist/remount.es6.js'></script>
<script src='https://cdn.jsdelivr.net/npm/remount/dist/remount.esm.js'></script>
```
