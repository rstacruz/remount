# Browser support

All modern browsers are supported out-of-the-box, including IE11 (Internet Explorer's oldest supported version as of 2016). Legacy IE support (IE9) is available using polyfills.

## API used

Remount supports 2 modes of operations: Custom Elements and Mutation Observers. It will pick whichever is available.

| Feature              |         IE         |         Chrome         |         Firefox         |         iOS          |
| -------------------- | :----------------: | :--------------------: | :---------------------: | :------------------: |
| [Custom elements]    |         -          | Chrome/67+ <br> _2018_ |            -            |                      |
| [Mutation observers] | IE/11+ <br> _2013_ | Chrome/18+ <br> _2012_ | Firefox/14+ <br> _2012_ | iOS/6.1+ <br> _2013_ |

[custom elements]: https://caniuse.com/#search=custom%20elements
[mutation observers]: http://caniuse.com/mutationobserver

Remount supports all modern browsers, including IE11 (Internet Explorer's oldest supported version as of 2016). Remember to use the polyfills below to ensure the best compatibility.

## Legacy IE support

To support IE9, add the MutationObserver polyfill for legacy IE support.

- Via polyfill.io:

  ```js
  <script src="https://cdn.polyfill.io/v2/polyfill.js?features=MutationObserver" />
  ```

- via Jsdelivr CDN (conditional):

  ```js
  <script>if(!window.MutationObserver){document.write('<script src="https://cdn.jsdelivr.net/g/mutationobserver/"></scr'+'ipt>')}</script>
  ```

Also see <https://www.npmjs.com/package/mutation-observer>.
