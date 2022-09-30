# Browser support

Remount supports all browsers that React 18 supports.

## API used

Remount supports 2 modes of operations: Custom Elements and Mutation Observers. It will pick whichever is available. These two API's are supported in these browser versions:

| Feature              |     IE     |   Chrome   |  Firefox   |     iOS     |
| -------------------- | :--------: | :--------: | :--------: | :---------: |
| [Custom elements]    |     -      | 67+ (2018) | 63+ (2018) |             |
| [Mutation observers] | 11+ (2013) | 18+ (2012) | 14+ (2012) | 6.1+ (2013) |

[custom elements]: https://caniuse.com/#search=custom%20elements
[mutation observers]: http://caniuse.com/mutationobserver

## Legacy IE support

React 18 doesn't officially support IE11, though polyfills are reported to work. Remount itself can work with IE11 via the Mutation Observer API. For more information on React's compatilibity with IE, see:

- [JavaScript Environment Requirements – React](https://reactjs.org/docs/javascript-environment-requirements.html) _(reactjs.org)_
