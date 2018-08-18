# Developer notes

**Start looking in [index.js](./index.js)!** This is the *only* file, seriously. Everything else is boilerplate, docs, tests, and other noise.

## Running tests

```sh
yarn watch
# This opens your browser
```

## CI tests

`yarn test` will will spawn a headless browser in your CLI to check if the browser tests pass or fail. This is only useful in CI; just use `yarn watch` locally.

Custom Elements aren't supported by Jsdom yet, so running tests with Jest isn't the most ideal scenario at the moment.

## Creating Codepen/JSFiddle:

Add these URL's:

```html
<script src='https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.0.4/custom-elements-es5-adapter.js'></script>
<script src='https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.0.4/webcomponents-loader.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/react/16.4.2/umd/react.production.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.4.2/umd/react-dom.production.min.js'></script>
<script src='https://cdn.jsdelivr.net/npm/remount@0.5.0'></script>
```

## Contacting me

I'm on Twitter as [@rstacruz](https://twitter.com/rstacruz), hit me up for any questions at all. I'm happy to help!
