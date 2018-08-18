# Developer notes

To run tests, use:

```sh
yarn watch
# This opens your browser
```

...Doing `yarn test` (or `npm test`) will spawn a headless browser in your CLI to check if the browser tests pass or fail. Custom Elements aren't supported by JSDOM, so this (at the moment) is the most practical option IMHO :\

## Creating codepens

Add these URL's (Tip - right-click and *copy URL*):

<script src='https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.0.4/custom-elements-es5-adapter.js'></script>
<script src='https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.0.4/webcomponents-loader.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/react/16.4.2/umd/react.production.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.4.2/umd/react-dom.production.min.js'></script>
<script src='https://cdn.jsdelivr.net/npm/remount@0.3.1'></script>
