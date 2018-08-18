# Builds

You can see all available builds at [here](https://cdn.jsdelivr.net/npm/remount/dist).
Each version ships with three variants:

| Version | Description                           |
| ------- | ------------------------------------- |
| `es5`   | For legacy browsers (default)         |
| `es6`   | Uses classes and other ES2015+ syntax |
| `esm`   | es modules .mjs build                 |

Each build also comes with minified versions, putting the total to 6 builds.

## Using builds

You can use them like so:

```js
import { define } 'remount/dist/remount.es6.js'
```

Or if you're using Webpack:

```js
/* webpack.config.js */
module.exports = {
  /* ... */
  resolve: {
    alias: {
      remount: 'remount/dist/remount.es6.js'
    }
  }
}
```
