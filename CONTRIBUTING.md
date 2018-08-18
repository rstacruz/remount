# Developer notes

To run tests, use:

```sh
yarn watch
# This opens your browser
```

...Doing `yarn test` (or `npm test`) will spawn a headless browser in your CLI to check if the browser tests pass or fail. Custom Elements aren't supported by JSDOM, so this (at the moment) is the most practical option IMHO :\

## Creating codepens

```html
<script crossorigin src='https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.0.4/custom-elements-es5-adapter.js'></script>
<script crossorigin src='https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.0.4/webcomponents-loader.js'></script>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script src="https://cdn.jsdelivr.net/npm/remount@0.1.0/dist/remount.umd.min.js"></script>
```
