# Browser support

All modern browsers are supported out-of-the-box, including IE11 (Internet Explorer's oldest supported version as of 2016). Legacy IE support (IE9) is available using polyfills.

## API used

Remount supports 2 modes of operations: Custom Elements and Mutation Observers. It will pick whichever is available. These two API's are supported in these browser versions:

| Feature              |     IE     |   Chrome   |  Firefox   |     iOS     |
| -------------------- | :--------: | :--------: | :--------: | :---------: |
| [Custom elements]    |     -      | 67+ (2018) | 63+ (2018) |             |
| [Mutation observers] | 11+ (2013) | 18+ (2012) | 14+ (2012) | 6.1+ (2013) |

[custom elements]: https://caniuse.com/#search=custom%20elements
[mutation observers]: http://caniuse.com/mutationobserver

## Legacy IE support

To support IE9, add the MutationObserver polyfill for legacy IE support. Here are two ways to include it (my preference is for the first one):

- via Jsdelivr CDN ([source](https://github.com/megawac/MutationObserver.js)):

  ```html
  <script>if(!window.MutationObserver){document.write('<script src="https://cdn.jsdelivr.net/g/mutationobserver/"></scr'+'ipt>')}</script>
  ```
- Via polyfill.io:

  ```js
  <script src="https://cdn.polyfill.io/v2/polyfill.js?features=MutationObserver" />
  ```
