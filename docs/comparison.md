# Comparison

Remount is built upon the ideas of other libraries that have similar goals.

## Comparison charts

### Basic features

|                                  |      Remount       | [React docs example] | [react-web-component] |   [react-mount]    | [reactive-elements] |
| -------------------------------- | :----------------: | :------------------: | :-------------------: | :----------------: | :-----------------: |
| a. Mounting React components     | :white_check_mark: |  :white_check_mark:  |  :white_check_mark:   | :white_check_mark: | :white_check_mark:  |
| b. Using within React components | :white_check_mark: |  :white_check_mark:  |  :white_check_mark:   | :white_check_mark: | :white_check_mark:  |

### API used

|                           |      Remount       | [React docs example] | [react-web-component] | [react-mount] | [reactive-elements] |
| ------------------------- | :----------------: | :------------------: | :-------------------: | :-----------: | :-----------------: |
| Web Components API (2018) | :white_check_mark: |  :white_check_mark:  |  :white_check_mark:   |       -       | :white_check_mark:  |
| MutationObserver (2012)   | :white_check_mark: |                      |                       |               |                     |
| Slow DOM traversal        |         -          |          -           |           -           | :warning: Yes |          -          |

Remount supports Web Components API and MutationObserver API for maximum compatibility.

### Shadow DOM

|                        |      Remount       | [React docs example] | [react-web-component] | [react-mount] | [reactive-elements] |
| ---------------------- | :----------------: | :------------------: | :-------------------: | :-----------: | :-----------------: |
| a. Shadow DOM mode     | :white_check_mark: |                      |                       |               |          ?          |
| b. Non-shadow DOM mode | :white_check_mark: |  :white_check_mark:  |  :white_check_mark:   |               |          ?          |

Remount doesn't use Shadow DOM by default, but can be enabled using `shadow: true` (experimental).

### Properties

|                               |      Remount       | [React docs example] | [react-web-component] |   [react-mount]    | [reactive-elements] |
| ----------------------------- | :----------------: | :------------------: | :-------------------: | :----------------: | :-----------------: |
| a. Props from HTML attributes | :white_check_mark: |  :white_check_mark:  |                       | :white_check_mark: |          ?          |
| b. Props as JSON              | :white_check_mark: |                      |                       |                    |                     |
| c. Non-string values          | :white_check_mark: |                      |                       | :white_check_mark: |          ?          |
| d. Attribute updates          | :white_check_mark: |                      |                       | :white_check_mark: |          ?          |

Remount supports specifying component props as JSON. This makes it easier to integrate with some backends, and brings some extra features that regular HTML attributes won't be able to handle (ie, non-string values, case sensitivity).

### Children

|                          | Remount | [React docs example] | [react-web-component] |   [react-mount]    | [reactive-elements] |
| ------------------------ | :-----: | :------------------: | :-------------------: | :----------------: | :-----------------: |
| a. `this.props.children` |         |                      |                       | :white_check_mark: |          ?          |
| b. Nesting               |         |                      |                       | :white_check_mark: |          ?          |

Remount intentionally doesn't support `this.props.children` and nesting. Doing so would incur a significant performance penalty, and would come with hefty dependencies. [react-mounter] is the only one I've found to support this, but it requires the now-deprecated JSXTransformer to do so.

### Others

|                             |              Remount               |        [React docs example]        | [react-web-component] |              [react-mount]               | [reactive-elements] |
| --------------------------- | :--------------------------------: | :--------------------------------: | :-------------------: | :--------------------------------------: | :-----------------: |
| a. Third-party dependencies | :white_check_mark: <br> just React | :white_check_mark: <br> just React |           -           |        JSXTransformer/react-tools        |          ?          |
| b. React API                |          just React's API          |          just React's API          |   just React's API    | Extended React API with custom callbacks |          ?          |
| c. License                  |               `MIT`                |               `MIT`                |         `MIT`         |                  `MIT`                   |        `MIT`        |

[react docs example]: https://reactjs.org/docs/web-components.html
[react-mount]: https://yarnpkg.com/en/package/react-mount
[react-web-component]: https://yarnpkg.com/en/package/react-web-component
[reactive-elements]: https://yarnpkg.com/en/package/reactive-elements

## Compared to [React docs example]

The React docs suggest a small code snippet to embed React components as web components:

```js
// Taken from https://reactjs.org/docs/web-components.html
class XSearch extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('span')
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint)

    const name = this.getAttribute('name')
    const url = 'https://www.google.com/search?q=' + encodeURIComponent(name)
    ReactDOM.render(<a href={url}>{name}</a>, mountPoint)
  }
}
customElements.define('x-search', XSearch)
```

This is, in fact, where Remount itself started. Remount just adds more polish, such as optional Shadow DOM support, and support for changing & unmounting.

## Compared to [reactive-elements]

**Attribute conventions** &mdash; reactive-elements v0.10.0 supports additional conventions for properties, such as:

- JS expressions (`<my-component items="{window.someArray}">`)
- Boolean transformations (`<my-component is-logged-in="true">`)

In Remount, named properties are _always_ predictably strings, with no type coercion involved. To use non-string values, Remount supports passing props as JSON (via `props-json`) for finer control.

**Attribute changes** &mdash; reactive-elements handles changes by a custom `attributeChanged` handler (see below). In contrast, changes in Remount are handled with the standard React lifecycle API (eg, `componentDidUpdate`).

```js
// reactive-elements -- custom handlers
class MyComponent extends React.Component {
  attributeChanged(attributeName, oldValue, newValue) {
    /* ... */
  }
}
```

```js
// remount -- uses React lifecycle API
class MyComponent extends React.Component {
  componentDidUpdate(newProps, newState) {
    /* ... */
  }
}
```

reactive-elements excels in having more features aimed for developer convenience. Remount excesl in having _less_ features with as little "magic" (eg, type coercion, or DSL's) as possible.

## Compared to [react-mount]

react-mount v0.1.3 offers support for passing inner HTML as JSX children.

```html
<!-- Works in react-mount, but not Remount -->
<x-tooltip>
  This field is <strong>required</strong>.
</x-tooltip>
```

It does this at the cost of a dependency to JSXTransformer, which the React team has [deprecated in 2015](https://reactjs.org/docs/web-components.html).

## Compared to [react-web-component]

react-web-component has inherent support for loading a component's accompanying CSS stylesheets using [react-web-component-style-loader](https://www.npmjs.com/package/react-web-component-style-loader). In contrast, Remount offers no such thing, though users are welcome to use whatever CSS-in-JS (or CSS-in-HTML?) solution fits their project.

react-web-component also requires you to pass elements instead of React components (eg, `<Component />` and not `Component`).

```js
// Using react-web-component
ReactWebComponent.create(<RoutedApp />, 'my-routed-component')
```

```js
// Using Remount
define({ 'my-routed-component': RoutedApp })
```

HTML attributes in react-web-component won't be passed onto the React component, though it can be extracted by using its custom callbacks.

```js
// Using react-web-component
class App extends React.Component {
  webComponentAttached() {
    // todo: get element properties and set it as state
  }
}
```
