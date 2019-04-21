# Builds

Remount comes in 3 flavors:

| Version       | Description                           |
| ------------- | ------------------------------------- |
| `remount`     | ES Modules build - the default        |
| `remount/es5` | CommonJS build                        |
| `remount/es6` | Uses classes and other ES2015+ syntax |

## Using builds

If you'd like to use an alternate build, you can import from it like so:

```js
import { define } from 'remount/es5'
```

Or if you're using Webpack:

```js
/* webpack.config.js */
module.exports = {
  /* ... */
  resolve: {
    alias: {
      remount: 'remount/es5'
    }
  }
}
```

## Using in browser

When used like so, Remount will be available as `window.Remount`. Great for using in JSFiddle/Codepen.

```js
<script src='https://cdn.jsdelivr.net/npm/remount/dist/remount.es5.js' />
```
