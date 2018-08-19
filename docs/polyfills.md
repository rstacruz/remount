# Browser support

Remount supports 2 modes of operations: Custom Elements and Mutation Observers. It will pick whichever is available.

| Feature              |      IE       |      Chrome       |      Firefox       |       iOS       |
| -------------------- | :-----------: | :---------------: | :----------------: | :-------------: |
| [Custom elements]    |       -       | Chrome/67+ (2018) |         -          |                 |
| [Mutation observers] | IE/11+ (2013) | Chrome/18+ (2012) | Firefox/14+ (2012) | iOS 6.1+ (2013) |

[custom elements]: https://caniuse.com/#search=custom%20elements
[mutation observers]: http://caniuse.com/mutationobserver

Remount supports all modern browsers, including IE11 (Internet Explorer's oldest supported version as of 2016). Remember to use the polyfills below to ensure the best compatibility.

## Legacy IE support

To support IE9, add the MutationObserver polyfill for legacy IE support.

```js
<script src='https://cdn.polyfill.io/v2/polyfill.js?features=MutationObserver'></script>
```

Also see <https://www.npmjs.com/package/mutation-observer>.
